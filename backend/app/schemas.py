from datetime import datetime
from typing import List, Literal, Optional
from pydantic import BaseModel, ConfigDict, Field, HttpUrl
from pydantic.alias_generators import to_camel

class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
        json_encoders={datetime: lambda v: v.isoformat()},
    )

class TaskIn(CamelModel):
    title: str
    est_minutes: int = Field(ge=5, le=480)
    energy: Literal["High", "Med", "Low"]
    url: Optional[HttpUrl] = None

class PlanRequest(CamelModel):
    tasks: List[TaskIn]
    work_start: str = "09:00"
    work_end: str = "18:00"
    energy_peak: Literal["High", "Med", "Low"] = "High"

class MicroStep(CamelModel):
    step: str
    target_url: Optional[str] = None
    duration_min: int = Field(ge=1, le=60)
    reason: str

class TimeBlock(CamelModel):
    block_id: str
    start: str
    end: str
    task_title: str
    energy_required: Literal["High", "Med", "Low"]
    micro_steps: List[MicroStep]

class DayPlan(CamelModel):
    plan_id: str
    date: str
    blocks: List[TimeBlock]
    rejected_tasks: List[str]
    total_planned_min: int
    created_at: datetime
    advice: Optional[str] = None

class StepComplete(CamelModel):
    block_id: str
    step_idx: int

class LogEntry(CamelModel):
    log_id: str
    user_id: str
    block_id: str
    step_idx: int
    completed_at: datetime
