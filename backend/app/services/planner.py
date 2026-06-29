import json
import logging
from uuid import uuid4
from datetime import datetime, timezone
try:
    from vertexai.generative_models import GenerativeModel, GenerationConfig
except ImportError:
    GenerativeModel, GenerationConfig = None, None
import google.generativeai as genai
from app.config import settings
from app.schemas import DayPlan, PlanRequest, TimeBlock, MicroStep

logger = logging.getLogger("app")

SYSTEM_INSTRUCTION = """
You are a "Ruthless Productivity Coach" AI. Your job is to transform a list of user tasks into an optimized daily battle plan (DayPlan).
Rules:
1. Max total planned minutes is 360 (6 hours). Hard cap. If tasks exceed 360 min, reject the lower ROI/priority tasks.
2. Break Injection: You must schedule a 15-minute break every ~90 minutes of work. Title break blocks exactly: "Break / Recharge" (energy: "Low"). Micro-steps: "Stand up", "Hydrate", "Look 20ft away".
3. Reject low ROI/importance tasks ruthlessly. Place rejected tasks with brief explanations inside "rejected_tasks".
4. Task Decomposition: Decompose each accepted task into concrete physical micro-actions (1 to 60 minutes each, ideally 5-15 mins). Example: "Open X", "Write Y", "Click Z".
5. Target URL Propagation: If a task has an input URL, propagate it to the micro-steps under target_url.
6. Energy peaks matching: Schedule "High" energy tasks during high energy periods.
7. Advice: Include a custom coach's advice paragraph (1-2 sentences) advising the user on how to attack today's plan under the "advice" key.
8. Return ONLY a JSON object matching the following structure:
{
  "blocks": [
    {
      "start": "HH:MM",
      "end": "HH:MM",
      "task_title": "string",
      "energy_required": "High" | "Med" | "Low",
      "micro_steps": [
        {
          "step": "string",
          "target_url": "string" or null,
          "duration_min": int,
          "reason": "string"
        }
      ]
    }
  ],
  "rejected_tasks": ["string"],
  "advice": "string"
}
Do not include any markdown fences like ```json. Output raw JSON string only.
"""

def generate_mock_plan(request: PlanRequest) -> DayPlan:
    logger.info("Generating mock DayPlan locally.")
    blocks = []
    rejected_tasks = []
    
    total_min = 0
    current_time_min = 9 * 60  # Start at 09:00
    
    for i, task in enumerate(request.tasks):
        if total_min + task.est_minutes > 360:
            rejected_tasks.append(f"{task.title} (Rejected: Daily Cognitive Load Cap of 360 minutes Exceeded)")
            continue
            
        start_str = f"{current_time_min // 60:02d}:{current_time_min % 60:02d}"
        end_time_min = current_time_min + task.est_minutes
        end_str = f"{end_time_min // 60:02d}:{end_time_min % 60:02d}"
        
        remaining_minutes = task.est_minutes
        steps = []
        
        setup_dur = min(15, remaining_minutes)
        steps.append(MicroStep(
            step=f"Setup and initialize working environment for {task.title}",
            target_url=str(task.url) if task.url else None,
            duration_min=setup_dur,
            reason="Establishing workspace tools avoids context switching delay."
        ))
        remaining_minutes -= setup_dur
        
        step_idx = 1
        while remaining_minutes > 0:
            exec_dur = min(60, remaining_minutes)
            steps.append(MicroStep(
                step=f"Execute core implementation phase {step_idx} of {task.title}",
                target_url=str(task.url) if task.url else None,
                duration_min=exec_dur,
                reason="Dedicated focus block builds momentum."
            ))
            remaining_minutes -= exec_dur
            step_idx += 1
        
        blocks.append(TimeBlock(
            block_id=uuid4().hex[:8],
            start=start_str,
            end=end_str,
            task_title=task.title,
            energy_required=task.energy,
            micro_steps=steps
        ))
        
        total_min += task.est_minutes
        current_time_min = end_time_min
        
        # Inject breaks every block (roughly 90 mins depending on task lengths)
        if total_min < 360 and i < len(request.tasks) - 1:
            break_start = f"{current_time_min // 60:02d}:{current_time_min % 60:02d}"
            current_time_min += 15
            break_end = f"{current_time_min // 60:02d}:{current_time_min % 60:02d}"
            
            blocks.append(TimeBlock(
                block_id=uuid4().hex[:8],
                start=break_start,
                end=break_end,
                task_title="Break / Recharge",
                energy_required="Low",
                micro_steps=[
                    MicroStep(step="Stand up and stretch", duration_min=5, reason="Reduces physical fatigue."),
                    MicroStep(step="Hydrate", duration_min=5, reason="Maintains cognitive function."),
                    MicroStep(step="Look 20ft away into distance", duration_min=5, reason="Prevents visual strain.")
                ]
            ))
            
    return DayPlan(
        plan_id=uuid4().hex[:8],
        date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        blocks=blocks,
        rejected_tasks=rejected_tasks,
        total_planned_min=total_min,
        created_at=datetime.now(timezone.utc),
        advice="Focus on the initial setup sprints first. Establishing a fast rhythm early prevents visual fatigue and avoids procrastination."
    )

def generate_plan(request: PlanRequest) -> DayPlan:
    is_unconfigured = settings.PROJECT_ID == "your-gcp-project-id" or not settings.PROJECT_ID
    is_unconfigured = is_unconfigured and not settings.GEMINI_API_KEY
    if is_unconfigured:
        return generate_mock_plan(request)
        
    try:
        tasks_details = []
        for t in request.tasks:
            tasks_details.append(f"- Title: {t.title}, Duration: {t.est_minutes}min, Energy: {t.energy}, URL: {t.url}")
        tasks_str = "\n".join(tasks_details)
        user_prompt = f"""
        Ingest Tasks:
        {tasks_str}
        
        Preferences:
        Work Start Time: {request.work_start}
        Work End Time: {request.work_end}
        Energy Peak: {request.energy_peak}
        Current Time: {datetime.now().strftime("%H:%M")}
        
        Generate the battle plan in strict JSON.
        """
        
        if settings.GEMINI_API_KEY:
            logger.info("Using google-generativeai with API Key.")
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model_name = settings.GEMINI_MODEL
            if "gemini-1.5-flash" in model_name:
                model_name = "gemini-1.5-flash"
                
            model = genai.GenerativeModel(
                model_name=model_name,
                system_instruction=SYSTEM_INSTRUCTION
            )
            config = genai.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.1,
                max_output_tokens=4096
            )
            response = model.generate_content(
                user_prompt,
                generation_config=config
            )
        else:
            logger.info("Using Vertex AI GenerativeModel.")
            if not GenerativeModel:
                raise ImportError("Vertex AI packages not available")
            model = GenerativeModel(
                settings.GEMINI_MODEL,
                system_instruction=SYSTEM_INSTRUCTION
            )
            config = GenerationConfig(
                response_mime_type="application/json",
                temperature=0.1,
                max_output_tokens=4096
            )
            response = model.generate_content(
                user_prompt,
                generation_config=config
            )
            
        plan_data = json.loads(response.text)
        
        blocks = []
        total_planned_min = 0
        rejected_tasks = plan_data.get("rejected_tasks", [])
        
        for b in plan_data.get("blocks", []):
            micro_steps = []
            block_min = 0
            for ms in b.get("micro_steps", []):
                micro_steps.append(MicroStep(
                    step=ms.get("step"),
                    target_url=ms.get("target_url"),
                    duration_min=ms.get("duration_min", 15),
                    reason=ms.get("reason", "Action details")
                ))
                block_min += ms.get("duration_min", 15)
                
            total_planned_min += block_min
            
            blocks.append(TimeBlock(
                block_id=uuid4().hex[:8],
                start=b.get("start"),
                end=b.get("end"),
                task_title=b.get("task_title"),
                energy_required=b.get("energy_required", "Med"),
                micro_steps=micro_steps
            ))
            
        if total_planned_min > 360:
            logger.warning(f"Plan exceeded 360min ({total_planned_min}min). Truncating lowest priority blocks.")
            truncated_blocks = []
            allowed_min = 0
            for b in blocks:
                b_dur = sum(ms.duration_min for ms in b.micro_steps)
                if allowed_min + b_dur <= 360:
                    truncated_blocks.append(b)
                    allowed_min += b_dur
                else:
                    rejected_tasks.append(f"{b.task_title} (Auto-rejected: Daily Cognitive Load Cap of 360 minutes Exceeded)")
            blocks = truncated_blocks
            total_planned_min = allowed_min
            
        return DayPlan(
            plan_id=uuid4().hex[:8],
            date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            blocks=blocks,
            rejected_tasks=rejected_tasks,
            total_planned_min=total_planned_min,
            created_at=datetime.now(timezone.utc),
            advice=plan_data.get("advice", "Attack the setup sprints first. Momentum follows physical action.")
        )
        
    except Exception as e:
        logger.error(f"Failed to generate plan using AI: {e}. Falling back to mock generator.", exc_info=True)
        return generate_mock_plan(request)
