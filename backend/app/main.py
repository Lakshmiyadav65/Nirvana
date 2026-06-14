"""FastAPI application factory.

Wires CORS, the lifespan (Mongo connect -> ensure_indexes -> optional seed),
the routers, and the exception handlers that render every error as the stable
``{"detail": {"code", "message"}}`` envelope the frontend branches on.
"""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo.errors import DuplicateKeyError
from starlette.exceptions import HTTPException as StarletteHTTPException

from .config import get_settings
from .db import close_client, ensure_indexes, get_database
from .errors import AppError
from .routers import bookings, health, plans
from .seed import seed_plans

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nirvana")


@asynccontextmanager
async def lifespan(app: FastAPI):
    s = get_settings()
    db = get_database()
    # The unique index is the no-double-booking authority — it MUST exist
    # before any traffic, so a failure here is fatal.
    await ensure_indexes(db)
    if s.seed_on_startup:
        try:
            n = await seed_plans(db)
            logger.info("Seeded %s plans on startup.", n)
        except Exception:
            logger.exception("Startup seed failed (continuing).")
    yield
    close_client()


def create_app() -> FastAPI:
    s = get_settings()
    app = FastAPI(title="Nirvana Builders API", version="1.0.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=s.cors_origins_list,
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    @app.exception_handler(AppError)
    async def _app_error(request: Request, exc: AppError):
        return JSONResponse(
            status_code=exc.status,
            content={"detail": {"code": exc.code, "message": exc.message}},
        )

    @app.exception_handler(RequestValidationError)
    async def _validation_error(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=422,
            content={
                "detail": {
                    "code": "VALIDATION_ERROR",
                    "message": "One or more fields are invalid.",
                    "errors": jsonable_encoder(exc.errors()),
                }
            },
        )

    @app.exception_handler(DuplicateKeyError)
    async def _duplicate_key(request: Request, exc: DuplicateKeyError):
        # Safety net in case a duplicate insert escapes the service layer.
        return JSONResponse(
            status_code=409,
            content={
                "detail": {
                    "code": "SLOT_TAKEN",
                    "message": "That time was just booked. Please choose another.",
                }
            },
        )

    @app.exception_handler(StarletteHTTPException)
    async def _http_error(request: Request, exc: StarletteHTTPException):
        # Re-wrap raw HTTP errors (404 unknown route, 405 wrong method) into the
        # stable envelope so every error response carries {code, message}.
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": {"code": "HTTP_ERROR", "message": str(exc.detail)}},
        )

    @app.exception_handler(Exception)
    async def _unhandled(request: Request, exc: Exception):
        logger.exception("Unhandled error")
        return JSONResponse(
            status_code=500,
            content={"detail": {"code": "INTERNAL_ERROR", "message": "Something went wrong."}},
        )

    app.include_router(health.router)
    app.include_router(plans.router)
    app.include_router(bookings.router)
    return app


app = create_app()
