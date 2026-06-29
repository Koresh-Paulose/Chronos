import logging
from fastapi import APIRouter, Depends, HTTPException, status
from app.middleware.auth import User, get_current_user
from app.schemas import DayPlan, PlanRequest
from app.services import planner, firestore

logger = logging.getLogger("app")
router = APIRouter(prefix="/api")

@router.post("/plan", response_model=DayPlan)
def create_plan(request: PlanRequest, user: User = Depends(get_current_user)):
    logger.info(f"Generating plan for user {user.uid} with {len(request.tasks)} tasks.")
    plan = planner.generate_plan(request)
    firestore.firestore_service.save_plan(user.uid, plan)
    return plan

@router.get("/plan/today", response_model=DayPlan)
def get_today_plan(user: User = Depends(get_current_user)):
    logger.info(f"Retrieving today's plan for user {user.uid}")
    plan = firestore.firestore_service.get_today_plan(user.uid)
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No plan found for today"
        )
    return plan

@router.get("/plan/{date}", response_model=DayPlan)
def get_plan_by_date(date: str, user: User = Depends(get_current_user)):
    logger.info(f"Retrieving plan for date {date} for user {user.uid}")
    plan = firestore.firestore_service.get_plan_by_date(user.uid, date)
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No plan found for date {date}"
        )
    return plan
