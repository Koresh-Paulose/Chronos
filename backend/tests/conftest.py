import pytest
from fastapi.testclient import TestClient
from app.config import settings

# Force setting config overrides to trigger fallbacks during tests
settings.PROJECT_ID = "your-gcp-project-id"
settings.LOCATION = "us-central1"
settings.FIRESTORE_DB = "(default)"

from app.main import app

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture(scope="module")
def mock_headers():
    return {
        "Authorization": "Bearer mock-token-abc",
        "X-Request-ID": "test-request-id"
    }
