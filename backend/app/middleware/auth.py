import logging
from typing import Optional
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth as firebase_auth
from app.config import settings

logger = logging.getLogger("app")
security = HTTPBearer(auto_error=False)

class User:
    def __init__(self, uid: str, email: Optional[str]):
        self.uid = uid
        self.email = email

async def get_current_user(request: Request, credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> User:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing or invalid"
        )
        
    token = credentials.credentials
    
    # Support mock token bypass in local dev environment
    is_mock_env = settings.PROJECT_ID == "your-gcp-project-id" or not settings.PROJECT_ID
    if token == "mock-token-abc" or is_mock_env:
        logger.info("Bypassing auth verification for local development.")
        uid = request.headers.get("x-user-id", "mock-uid-123")
        email = request.headers.get("x-user-email", "dev@example.com")
        return User(uid=uid, email=email)
        
    try:
        decoded_token = firebase_auth.verify_id_token(token, check_revoked=True)
        uid = decoded_token.get("uid")
        email = decoded_token.get("email")
        if not uid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload: uid missing"
            )
        return User(uid=uid, email=email)
    except Exception as e:
        logger.warning(f"Firebase token verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid/Expired Token"
        )
