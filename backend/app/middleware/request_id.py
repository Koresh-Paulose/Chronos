import uuid
import contextvars
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

request_id_ctx = contextvars.ContextVar("request_id", default="")

class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
        token = request_id_ctx.set(request_id)
        
        request.state.request_id = request_id
        
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        
        request_id_ctx.reset(token)
        return response
