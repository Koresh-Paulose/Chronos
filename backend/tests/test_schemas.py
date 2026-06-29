from datetime import datetime, timezone
from app.schemas import TaskIn, DayPlan, TimeBlock, MicroStep

def test_camel_case_alias_serialization():
    task = TaskIn(
        title="Test Task",
        est_minutes=30,
        energy="High"
    )
    dumped = task.model_dump(by_alias=True)
    assert "estMinutes" in dumped
    assert dumped["estMinutes"] == 30

def test_camel_case_alias_deserialization():
    raw_payload = {
        "title": "Design Plan",
        "estMinutes": 45,
        "energy": "Med"
    }
    task = TaskIn.model_validate(raw_payload)
    assert task.est_minutes == 45
    assert task.energy == "Med"
