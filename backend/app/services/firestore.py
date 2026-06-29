import logging
from typing import List, Optional
from datetime import datetime, timezone
from google.cloud import firestore
from app.config import settings
from app.schemas import DayPlan, LogEntry

logger = logging.getLogger("app")

_local_db_plans = {}
_local_db_logs = {}

class FirestoreService:
    def __init__(self):
        self.client = None
        is_mock_env = settings.PROJECT_ID == "your-gcp-project-id" or not settings.PROJECT_ID
        if not is_mock_env:
            try:
                self.client = firestore.Client(
                    project=settings.PROJECT_ID,
                    database=settings.FIRESTORE_DB
                )
                logger.info(f"Firestore Client initialized with project={settings.PROJECT_ID}, db={settings.FIRESTORE_DB}")
            except Exception as e:
                logger.warning(f"Failed to initialize Firestore client: {e}. Falling back to local store.")
        else:
            logger.info("Using local in-memory store for Firestore fallback.")

    def save_plan(self, uid: str, plan: DayPlan):
        if self.client:
            plan_ref = self.client.collection("users").document(uid).collection("plans").document(plan.plan_id)
            plan_ref.set(plan.model_dump(mode="json"))
            logger.info(f"Saved plan {plan.plan_id} to Firestore for user {uid}")
        else:
            if uid not in _local_db_plans:
                _local_db_plans[uid] = {}
            _local_db_plans[uid][plan.plan_id] = plan.model_dump(mode="json")
            logger.info(f"Saved plan {plan.plan_id} to local store for user {uid}")

    def get_today_plan(self, uid: str) -> Optional[DayPlan]:
        today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        if self.client:
            plans_ref = self.client.collection("users").document(uid).collection("plans")
            query = plans_ref.where(filter=firestore.FieldFilter("date", "==", today_str)).limit(1)
            docs = list(query.stream())
            if docs:
                return DayPlan.model_validate(docs[0].to_dict())
            return None
        else:
            user_plans = _local_db_plans.get(uid, {})
            for plan_dict in user_plans.values():
                if plan_dict.get("date") == today_str:
                    return DayPlan.model_validate(plan_dict)
            return None

    def get_plan_by_date(self, uid: str, date: str) -> Optional[DayPlan]:
        if self.client:
            plans_ref = self.client.collection("users").document(uid).collection("plans")
            query = plans_ref.where(filter=firestore.FieldFilter("date", "==", date)).limit(1)
            docs = list(query.stream())
            if docs:
                return DayPlan.model_validate(docs[0].to_dict())
            return None
        else:
            user_plans = _local_db_plans.get(uid, {})
            for plan_dict in user_plans.values():
                if plan_dict.get("date") == date:
                    return DayPlan.model_validate(plan_dict)
            return None

    def log_step(self, uid: str, log_entry: LogEntry):
        if self.client:
            log_ref = self.client.collection("users").document(uid).collection("logs").document(log_entry.log_id)
            log_ref.set(log_entry.model_dump(mode="json"))
            logger.info(f"Logged step completion {log_entry.log_id} to Firestore for user {uid}")
        else:
            if uid not in _local_db_logs:
                _local_db_logs[uid] = []
            _local_db_logs[uid].append(log_entry.model_dump(mode="json"))
            logger.info(f"Logged step completion {log_entry.log_id} to local store for user {uid}")

    def get_logs(self, uid: str, limit: int = 50) -> List[LogEntry]:
        if self.client:
            logs_ref = self.client.collection("users").document(uid).collection("logs")
            query = logs_ref.order_by("completed_at", direction=firestore.Query.DESCENDING).limit(limit)
            docs = list(query.stream())
            return [LogEntry.model_validate(doc.to_dict()) for doc in docs]
        else:
            user_logs = _local_db_logs.get(uid, [])
            sorted_logs = sorted(user_logs, key=lambda x: x.get("completed_at"), reverse=True)
            return [LogEntry.model_validate(log_dict) for log_dict in sorted_logs[:limit]]

firestore_service = FirestoreService()
