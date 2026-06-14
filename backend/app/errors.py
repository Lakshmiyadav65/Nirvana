"""Domain errors, each mapped to a stable HTTP status + machine code.

The global handler in ``main.py`` renders these as
``{"detail": {"code": "<CODE>", "message": "<text>"}}`` so the frontend can
branch on ``code`` (especially ``SLOT_TAKEN``) without string-matching.
"""
from __future__ import annotations


class AppError(Exception):
    code: str = "APP_ERROR"
    status: int = 400
    message: str = "Application error."

    def __init__(self, message: str | None = None):
        if message is not None:
            self.message = message
        super().__init__(self.message)


class PlanNotFound(AppError):
    code = "PLAN_NOT_FOUND"
    status = 404
    message = "Plan not found."


class MalformedSlot(AppError):
    code = "MALFORMED_SLOT"
    status = 422
    message = "The selected time slot id is malformed."


class InvalidSlot(AppError):
    code = "INVALID_SLOT"
    status = 422
    message = "The selected time is not a bookable slot."


class SlotExpired(AppError):
    code = "SLOT_EXPIRED"
    status = 422
    message = "That time has already passed. Please choose a future slot."


class SlotTaken(AppError):
    code = "SLOT_TAKEN"
    status = 409
    message = "That time was just booked. Please choose another."
