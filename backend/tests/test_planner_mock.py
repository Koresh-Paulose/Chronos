from app.schemas import PlanRequest, TaskIn
from app.services.planner import generate_plan

def test_planner_break_injection_and_cap():
    tasks = [
        TaskIn(title="Task A", est_minutes=150, energy="High"),
        TaskIn(title="Task B", est_minutes=150, energy="Med"),
        TaskIn(title="Task C", est_minutes=100, energy="Low", url="https://example.com/target")
    ]
    request = PlanRequest(
        tasks=tasks,
        work_start="09:00",
        work_end="18:00",
        energy_peak="High"
    )
    
    plan = generate_plan(request)
    
    assert plan.total_planned_min <= 360
    assert len(plan.rejected_tasks) >= 1
    assert "Task C" in plan.rejected_tasks[0]
    
    # Break blocks should be injected
    break_blocks = [b for b in plan.blocks if b.task_title == "Break / Recharge"]
    assert len(break_blocks) >= 1
    for bb in break_blocks:
        assert bb.energy_required == "Low"
        assert len(bb.micro_steps) == 3
