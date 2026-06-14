"""Pydantic v2 request/response models.

Plan output keeps the exact camelCase shape of the frontend ``Project``
interface (``mainImage`` etc.) by naming fields identically — no aliases
needed — so the wire contract matches the existing TypeScript type 1:1.
"""
from __future__ import annotations

from typing import Annotated

from pydantic import BaseModel, EmailStr, Field, StringConstraints


class SpecOut(BaseModel):
    label: str
    value: str


class PlanOut(BaseModel):
    id: str
    name: str
    location: str
    area: str
    type: str
    category: str
    year: str
    status: str
    mainImage: str
    images: list[str]
    description: str
    features: list[str]
    specs: list[SpecOut]


class SlotOut(BaseModel):
    slot_id: str
    start: str
    end: str
    label: str
    date_label: str
    available: bool = True


class PlansListOut(BaseModel):
    plans: list[PlanOut]


class PlanDetailOut(BaseModel):
    plan: PlanOut
    slots: list[SlotOut]


class BookingCreate(BaseModel):
    plan_id: str = Field(min_length=1, max_length=80)
    slot_id: str = Field(min_length=1, max_length=40)
    # strip_whitespace runs BEFORE min_length, so a whitespace-only name is
    # rejected with a 422 rather than persisted as an empty string.
    customer_name: Annotated[
        str, StringConstraints(strip_whitespace=True, min_length=1, max_length=120)
    ]
    customer_email: EmailStr


class BookingOut(BaseModel):
    booking_id: str
    plan_id: str
    plan_name: str
    slot_id: str
    start: str
    end: str
    label: str
    date_label: str
    customer_name: str
    customer_email: str
    created_at: str


class ErrorDetail(BaseModel):
    code: str
    message: str


class ErrorOut(BaseModel):
    detail: ErrorDetail
