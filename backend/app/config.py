from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_ID: str = "your-gcp-project-id"
    LOCATION: str = "us-central1"
    FIRESTORE_DB: str = "(default)"
    GEMINI_MODEL: str = "gemini-1.5-flash-001"
    GEMINI_API_KEY: Optional[str] = None
    FRONTEND_ORIGIN: str = "http://localhost:3000"
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
