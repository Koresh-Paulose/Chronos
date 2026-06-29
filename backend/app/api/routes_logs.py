import logging
from uuid import uuid4
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, Query
from app.middleware.auth import User, get_current_user
from app.schemas import LogEntry, StepComplete
from app.services import firestore

logger = logging.getLogger("app")
router = APIRouter(prefix="/api")

@router.post("/step/complete", response_model=LogEntry)
def complete_step(payload: StepComplete, user: User = Depends(get_current_user)):
    logger.info(f"Logging step completion for user {user.uid}, block {payload.block_id}, step index {payload.step_idx}")
    log_entry = LogEntry(
        log_id=uuid4().hex[:8],
        user_id=user.uid,
        block_id=payload.block_id,
        step_idx=payload.step_idx,
        completed_at=datetime.now(timezone.utc)
    )
    firestore.firestore_service.log_step(user.uid, log_entry)
    return log_entry

@router.get("/logs", response_model=List[LogEntry])
def get_logs(
    limit: int = Query(default=50, ge=1, le=100),
    user: User = Depends(get_current_user)
):
    logger.info(f"Fetching logs for user {user.uid} with limit {limit}")
    return firestore.firestore_service.get_logs(user.uid, limit=limit)
