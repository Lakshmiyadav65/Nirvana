from __future__ import annotations

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ..db import get_db, ping

router = APIRouter(tags=["health"])


@router.get("/health")
async def health(db=Depends(get_db)):
    try:
        await ping(db)
        return {"status": "ok"}
    except Exception:
        return JSONResponse(
            status_code=503,
            content={"detail": {"code": "DB_DOWN", "message": "Database is unreachable."}},
        )
