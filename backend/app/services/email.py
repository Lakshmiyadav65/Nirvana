"""Best-effort admin notification on a new booking.

Failure isolation by construction: the booking is already committed before this
runs (scheduled via FastAPI ``BackgroundTasks``), and the entire SMTP exchange
is wrapped in try/except — a down/slow/misconfigured mail server can never lose,
delay, or roll back a confirmed booking. With ``SMTP_HOST`` empty the message is
logged instead of sent, so local dev and CI need zero mail config.
"""
from __future__ import annotations

import logging
from email.message import EmailMessage

from motor.motor_asyncio import AsyncIOMotorDatabase

from ..config import get_settings

logger = logging.getLogger("nirvana.email")


def _render(booking: dict) -> EmailMessage:
    s = get_settings()
    msg = EmailMessage()
    msg["Subject"] = f"New site visit booking — {booking['plan_name']}"
    msg["From"] = s.email_from
    msg["To"] = s.admin_email or s.email_from
    msg.set_content(
        "A new site visit has been booked.\n\n"
        f"Project:    {booking['plan_name']} ({booking['plan_id']})\n"
        f"Date:       {booking['date_label']}\n"
        f"Time:       {booking['label']} (IST)\n"
        f"Name:       {booking['customer_name']}\n"
        f"Email:      {booking['customer_email']}\n"
        f"Booking ID: {booking['booking_id']}\n"
        f"Created:    {booking['created_at']}\n"
    )
    return msg


async def send_admin_notification(db: AsyncIOMotorDatabase | None, booking: dict) -> None:
    s = get_settings()
    oid = booking.get("_id")
    try:
        msg = _render(booking)

        if not s.smtp_host:
            # Dev fallback: log non-PII metadata only. The full body (which
            # contains the customer's name + email) goes to DEBUG, off by default.
            logger.info(
                "[DEV] SMTP_HOST empty — booking email not sent (plan_id=%s booking_id=%s slot=%s %s).",
                booking.get("plan_id"),
                booking.get("booking_id"),
                booking.get("date_label"),
                booking.get("label"),
            )
            logger.debug("Unsent booking email body:\n%s", msg.get_content())
            return

        import aiosmtplib

        # Port 465 is implicit TLS (handshake on connect); 587 uses STARTTLS.
        # aiosmtplib rejects use_tls and start_tls both being True, so they are
        # mutually exclusive here.
        implicit_tls = s.smtp_port == 465
        await aiosmtplib.send(
            msg,
            hostname=s.smtp_host,
            port=s.smtp_port,
            username=s.smtp_username or None,
            password=s.smtp_password.get_secret_value() or None,
            use_tls=implicit_tls,
            start_tls=(s.smtp_use_tls and not implicit_tls),
        )
        if db is not None and oid is not None:
            await db.bookings.update_one({"_id": oid}, {"$set": {"email_sent": True}})
    except Exception as exc:  # never surface email failure to the request
        # Log the error type without the full traceback body, which could carry
        # recipient addresses; persist only the exception class for follow-up.
        logger.error("Failed to send booking notification email: %s", type(exc).__name__)
        try:
            if db is not None and oid is not None:
                await db.bookings.update_one(
                    {"_id": oid},
                    {"$set": {"email_sent": False, "email_error": type(exc).__name__}},
                )
        except Exception:
            logger.error("Failed to record email error on booking.")
