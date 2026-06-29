from contextlib import asynccontextmanager
import logging
import sys
from fastapi import FastAPI
import firebase_admin
import vertexai
from pythonjsonlogger import jsonlogger
from app.config import settings

logger = logging.getLogger("app")

def setup_logging():
    # Setup structured JSON logging
    handler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter(
        "%(asctime)s %(levelname)s %(name)s %(message)s %(request_id)s",
        rename_fields={"levelname": "severity", "asctime": "timestamp"},
    )
    handler.setFormatter(formatter)
    
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(settings.LOG_LEVEL)
    # Remove existing handlers to avoid duplicate logs
    for h in root_logger.handlers[:]:
        root_logger.removeHandler(h)
    root_logger.addHandler(handler)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup logging on startup
    setup_logging()
    logger.info("Starting up Chronos backend service...")

    # Initialize Firebase Admin
    try:
        firebase_admin.initialize_app()
        logger.info("Firebase Admin SDK initialized successfully.")
    except ValueError:
        # App already initialized
        logger.info("Firebase Admin SDK was already initialized.")
    except Exception as e:
        logger.error(f"Error initializing Firebase Admin SDK: {e}", exc_info=True)

    # Initialize Vertex AI
    try:
        if settings.PROJECT_ID and settings.PROJECT_ID != "your-gcp-project-id":
            vertexai.init(project=settings.PROJECT_ID, location=settings.LOCATION)
            logger.info(f"Vertex AI initialized with project={settings.PROJECT_ID}, location={settings.LOCATION}")
        else:
            logger.warning("Vertex AI not initialized: PROJECT_ID is unset or using placeholder.")
    except Exception as e:
        logger.error(f"Error initializing Vertex AI: {e}", exc_info=True)

    yield

    logger.info("Shutting down Chronos backend service...")
