"""HTTP-level tests: routers, status codes, and the error envelope.

Runs the real FastAPI app (including lifespan + ensure_indexes) over an
in-memory Mongo, so the {"detail": {"code", "message"}} contract the frontend
relies on is verified end to end.
"""
from __future__ import annotations

import asyncio

import pytest
from fastapi.testclient import TestClient


def _make_seeded_db():
    from mongomock_motor import AsyncMongoMockClient

    from app.db import ensure_indexes
    from app.seed import seed_plans

    db = AsyncMongoMockClient()["nirvana_api_test"]

    async def setup():
        await ensure_indexes(db)
        await seed_plans(db)

    asyncio.run(setup())
    return db


@pytest.fixture
def client(monkeypatch):
    import app.main as main_module
    from app.db import get_db

    db = _make_seeded_db()
    # Lifespan ensure_indexes + request handling both use the mongomock db.
    monkeypatch.setattr(main_module, "get_database", lambda: db)
    main_module.app.dependency_overrides[get_db] = lambda: db
    with TestClient(main_module.app) as c:
        yield c
    main_module.app.dependency_overrides.clear()


def test_list_plans(client):
    r = client.get("/plans")
    assert r.status_code == 200
    plans = r.json()["plans"]
    assert len(plans) == 16
    assert "mainImage" in plans[0] and "id" in plans[0]


def test_get_plan_with_slots(client):
    r = client.get("/plans/manohara")
    assert r.status_code == 200
    body = r.json()
    assert body["plan"]["id"] == "manohara"
    assert body["slots"], "expected available slots"
    slot = body["slots"][0]
    assert slot["slot_id"].endswith("Z")
    assert slot["label"] and slot["date_label"]


def test_unknown_plan_404(client):
    r = client.get("/plans/does-not-exist")
    assert r.status_code == 404
    assert r.json()["detail"]["code"] == "PLAN_NOT_FOUND"


def test_booking_happy_then_conflict(client):
    slots = client.get("/plans/manohara").json()["slots"]
    slot_id = slots[len(slots) // 2]["slot_id"]  # a stable mid-grid slot
    body = {
        "plan_id": "manohara",
        "slot_id": slot_id,
        "customer_name": "Asha R",
        "customer_email": "asha@example.com",
    }
    r1 = client.post("/bookings", json=body)
    assert r1.status_code == 201, r1.text
    out = r1.json()
    assert out["booking_id"] and out["slot_id"] == slot_id
    assert out["label"] and out["date_label"]

    # Same slot again => 409 SLOT_TAKEN
    r2 = client.post("/bookings", json={**body, "customer_email": "b@example.com"})
    assert r2.status_code == 409
    assert r2.json()["detail"]["code"] == "SLOT_TAKEN"

    # The booked slot disappears from availability.
    after = client.get("/plans/manohara").json()["slots"]
    assert slot_id not in {s["slot_id"] for s in after}


def test_malformed_slot_422(client):
    r = client.post(
        "/bookings",
        json={
            "plan_id": "manohara",
            "slot_id": "garbage",
            "customer_name": "A",
            "customer_email": "a@b.com",
        },
    )
    assert r.status_code == 422
    assert r.json()["detail"]["code"] == "MALFORMED_SLOT"


def test_invalid_email_422(client):
    slots = client.get("/plans/manohara").json()["slots"]
    r = client.post(
        "/bookings",
        json={
            "plan_id": "manohara",
            "slot_id": slots[0]["slot_id"],
            "customer_name": "A",
            "customer_email": "not-an-email",
        },
    )
    assert r.status_code == 422
    assert r.json()["detail"]["code"] == "VALIDATION_ERROR"


def test_whitespace_only_name_422(client):
    slots = client.get("/plans/manohara").json()["slots"]
    r = client.post(
        "/bookings",
        json={
            "plan_id": "manohara",
            "slot_id": slots[0]["slot_id"],
            "customer_name": "   ",  # strips to empty -> must be rejected
            "customer_email": "a@b.com",
        },
    )
    assert r.status_code == 422
    assert r.json()["detail"]["code"] == "VALIDATION_ERROR"


def test_unknown_route_envelope(client):
    r = client.get("/nope")
    assert r.status_code == 404
    detail = r.json()["detail"]
    assert isinstance(detail, dict) and "code" in detail and "message" in detail


def test_method_not_allowed_envelope(client):
    r = client.put("/bookings")
    assert r.status_code == 405
    detail = r.json()["detail"]
    assert isinstance(detail, dict) and detail["code"] == "HTTP_ERROR"


def test_internal_error_envelope(monkeypatch):
    """A get_db that raises should still yield the {code,message} envelope."""
    import app.main as main_module
    from app.db import get_db

    def _boom():
        raise RuntimeError("db exploded")

    main_module.app.dependency_overrides[get_db] = _boom
    try:
        c = TestClient(main_module.app, raise_server_exceptions=False)
        r = c.get("/plans")
        assert r.status_code == 500
        assert r.json()["detail"]["code"] == "INTERNAL_ERROR"
    finally:
        main_module.app.dependency_overrides.clear()
