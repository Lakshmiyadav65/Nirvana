"""Best-effort admin notification on a new booking.

Failure isolation by construction: the booking is already committed before this
runs (scheduled via FastAPI ``BackgroundTasks``), and the entire SMTP exchange
is wrapped in try/except — a down/slow/misconfigured mail server can never lose,
delay, or roll back a confirmed booking. With ``SMTP_HOST`` empty the message is
logged instead of sent, so local dev and CI need zero mail config.

The email is multipart: a plain-text part (fallback / accessibility) plus a
branded HTML part (dark-green + gold, table-based with inline styles for broad
email-client compatibility).
"""
from __future__ import annotations

import html
import logging
from datetime import datetime
from email.message import EmailMessage
from zoneinfo import ZoneInfo

from motor.motor_asyncio import AsyncIOMotorDatabase

from ..config import get_settings

logger = logging.getLogger("nirvana.email")


def _format_created(created_at_iso: str) -> str:
    """Render the UTC 'Z' created_at timestamp as a friendly IST string."""
    try:
        dt = datetime.fromisoformat(created_at_iso.replace("Z", "+00:00"))
        ist = dt.astimezone(ZoneInfo(get_settings().booking_timezone))
        return ist.strftime("%d %b %Y · %I:%M %p IST")
    except Exception:
        return created_at_iso


def _plain_text(b: dict) -> str:
    return (
        "A new site visit has been booked.\n\n"
        f"Project:    {b['plan_name']} ({b['plan_id']})\n"
        f"Date:       {b['date_label']}\n"
        f"Time:       {b['label']} (IST)\n"
        f"Name:       {b['customer_name']}\n"
        f"Email:      {b['customer_email']}\n"
        f"Booking ID: {b['booking_id']}\n"
        f"Booked at:  {_format_created(str(b.get('created_at', '')))}\n"
    )


def _html_body(b: dict) -> str:
    e = html.escape
    name = e(str(b.get("customer_name", "")))
    email = e(str(b.get("customer_email", "")))
    plan = e(str(b.get("plan_name", "")))
    plan_id = e(str(b.get("plan_id", "")))
    date_label = e(str(b.get("date_label", "")))
    time_label = e(str(b.get("label", "")))
    booking_id = e(str(b.get("booking_id", "")))
    created = e(_format_created(str(b.get("created_at", ""))))

    return f"""\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>New Site Visit Booking</title>
</head>
<body style="margin:0;padding:0;background-color:#ece8e1;-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ece8e1;padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e3ddd0;border-radius:16px;overflow:hidden;">

  <!-- Header -->
  <tr><td style="background-color:#06180e;padding:26px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:23px;letter-spacing:0.5px;color:#e7c66a;font-weight:bold;line-height:1;">Nirvana</div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:3px;color:#93a98f;text-transform:uppercase;margin-top:6px;">Builders &amp; Developers</div>
      </td>
      <td align="right" style="vertical-align:middle;">
        <span style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#06180e;background-color:#e7c66a;padding:7px 14px;border-radius:999px;font-weight:bold;">New Booking</span>
      </td>
    </tr></table>
  </td></tr>

  <!-- Intro -->
  <tr><td style="padding:34px 36px 6px 36px;font-family:Arial,Helvetica,sans-serif;">
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c2922e;font-weight:bold;">Site Visit Request</div>
    <h1 style="margin:10px 0 6px 0;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.3;color:#13211a;font-weight:normal;">A new site visit has been booked</h1>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#6b7169;">A prospective client has requested an appointment. Details below.</p>
  </td></tr>

  <!-- Project + date highlight -->
  <tr><td style="padding:20px 36px 4px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f1e6;border:1px solid #ece1ca;border-radius:12px;">
      <tr>
        <td style="padding:18px 22px;font-family:Arial,Helvetica,sans-serif;vertical-align:top;">
          <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a98e4f;font-weight:bold;">Project</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#13211a;margin-top:5px;line-height:1.3;">{plan}</div>
        </td>
        <td align="right" style="padding:18px 22px;font-family:Arial,Helvetica,sans-serif;vertical-align:top;border-left:1px solid #ece1ca;white-space:nowrap;">
          <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a98e4f;font-weight:bold;">Date &amp; Time</div>
          <div style="font-size:16px;color:#13211a;margin-top:5px;font-weight:bold;">{date_label}</div>
          <div style="font-size:16px;color:#c2922e;font-weight:bold;">{time_label} <span style="font-size:11px;color:#a98e4f;font-weight:normal;">IST</span></div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Detail rows -->
  <tr><td style="padding:16px 36px 4px 36px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #efece4;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9aa097;width:40%;">Name</td>
        <td align="right" style="padding:13px 0;border-bottom:1px solid #efece4;font-size:15px;color:#1c241e;">{name}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #efece4;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9aa097;">Email</td>
        <td align="right" style="padding:13px 0;border-bottom:1px solid #efece4;font-size:15px;"><a href="mailto:{email}" style="color:#c2922e;text-decoration:none;">{email}</a></td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #efece4;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9aa097;">Project ID</td>
        <td align="right" style="padding:13px 0;border-bottom:1px solid #efece4;font-size:14px;color:#6b7169;">{plan_id}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #efece4;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9aa097;">Booking ID</td>
        <td align="right" style="padding:13px 0;border-bottom:1px solid #efece4;font-size:12px;color:#8a8f86;font-family:'Courier New',Courier,monospace;">{booking_id}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9aa097;">Booked at</td>
        <td align="right" style="padding:13px 0;font-size:14px;color:#6b7169;">{created}</td>
      </tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:22px 36px 30px 36px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="border-radius:999px;background-color:#06180e;">
        <a href="mailto:{email}" style="display:inline-block;padding:13px 28px;font-size:13px;letter-spacing:0.5px;color:#e7c66a;text-decoration:none;font-weight:bold;">Reply to {name} &rarr;</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background-color:#f6f4ef;padding:20px 36px;border-top:1px solid #ece6da;font-family:Arial,Helvetica,sans-serif;">
    <p style="margin:0;font-size:12px;line-height:1.6;color:#9aa097;">Automated notification from the Nirvana Builders &amp; Developers website &middot; site-visit booking system.</p>
  </td></tr>

</table>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#b3ab9b;margin-top:16px;">Nirvana Builders &amp; Developers &middot; Hyderabad, India</div>
</td></tr>
</table>
</body>
</html>"""


def _render(booking: dict) -> EmailMessage:
    s = get_settings()
    msg = EmailMessage()
    msg["Subject"] = f"New site visit booking — {booking['plan_name']}"
    msg["From"] = s.email_from
    msg["To"] = s.admin_email or s.email_from
    msg.set_content(_plain_text(booking))               # text/plain fallback
    msg.add_alternative(_html_body(booking), subtype="html")  # branded HTML
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
            logger.debug("Unsent booking email (text):\n%s", _plain_text(booking))
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
