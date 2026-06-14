from __future__ import annotations

from fastapi import APIRouter, BackgroundTasks, Depends

from ..db import get_db
from ..models import BookingCreate, BookingOut
from ..services import bookings as bookings_service
from ..services.email import send_admin_notification

router = APIRouter(tags=["bookings"])


@router.post("/bookings", response_model=BookingOut, status_code=201)
async def create_booking(
    payload: BookingCreate,
    background_tasks: BackgroundTasks,
    db=Depends(get_db),
):
    # Raises AppError subclasses (404/422/409) handled by the global handler.
    booking = await bookings_service.create_booking(db, payload)
    # Best-effort admin email — off the request critical path.
    background_tasks.add_task(send_admin_notification, db, booking)
    return booking
