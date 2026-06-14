from __future__ import annotations

from fastapi import APIRouter, Depends

from ..db import get_db
from ..models import PlanDetailOut, PlansListOut
from ..services import bookings as bookings_service
from ..services import plans as plans_service

router = APIRouter(tags=["plans"])


@router.get("/plans", response_model=PlansListOut)
async def list_plans(db=Depends(get_db)):
    plans = await plans_service.list_plans(db)
    return {"plans": plans}


@router.get("/plans/{plan_id}", response_model=PlanDetailOut)
async def get_plan(plan_id: str, db=Depends(get_db)):
    plan = await plans_service.get_plan(db, plan_id)  # raises PlanNotFound -> 404
    slots = await bookings_service.available_slots(db, plan_id)
    return {"plan": plan, "slots": slots}
