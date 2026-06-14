"""Application settings, loaded from environment / .env via pydantic-settings.

Every secret comes from the environment — nothing is hard-coded. Copy
``.env.example`` to ``.env`` (gitignored) and fill in real values.
"""
from __future__ import annotations

from functools import lru_cache

from pydantic import SecretStr, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ---- MongoDB ----
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db: str = "nirvana"

    # ---- Seeding ----
    seed_on_startup: bool = False

    # ---- CORS (comma-separated in env; use cors_origins_list for the parsed value) ----
    cors_origins: str = "http://localhost:3000,http://localhost:3100"

    # ---- Slot grid (Asia/Kolkata is authoritative; India has no DST) ----
    booking_timezone: str = "Asia/Kolkata"
    slot_open_hour: int = 10        # first slot starts 10:00 IST
    slot_close_hour: int = 18       # exclusive — last slot starts 17:00, ends 18:00
    slot_days_ahead: int = 14

    # ---- Email (admin booking notification) ----
    smtp_host: str = ""             # empty => dev fallback: log instead of send
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: SecretStr = SecretStr("")
    smtp_use_tls: bool = True       # True => STARTTLS on smtp_port
    email_from: str = "Nirvana Bookings <no-reply@nirvana.local>"
    admin_email: str = ""           # company inbox that receives notifications

    # ---- Uvicorn bind ----
    api_host: str = "0.0.0.0"
    api_port: int = 8000

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @model_validator(mode="after")
    def _require_admin_email_when_smtp_enabled(self) -> "Settings":
        # Fail fast: if real mail sending is enabled, an admin recipient is
        # mandatory — otherwise notifications would be silently misrouted to the
        # no-reply placeholder and swallowed.
        if self.smtp_host and not self.admin_email:
            raise ValueError("ADMIN_EMAIL is required when SMTP_HOST is set.")
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()
