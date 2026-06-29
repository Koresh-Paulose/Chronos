import time
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.middleware.request_id import request_id_ctx

logger = logging.getLogger("app")

class RequestIDFilter(logging.Filter):
    def filter(self, record):
        record.request_id = request_id_ctx.get()
        return True

# Register the request ID filter globally on the root logger
logging.getLogger().addFilter(RequestIDFilter())

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()
        
        logger.info({
            "event": "request_started",
            "method": request.method,
            "path": request.url.path,
        })
        
        try:
            response = await call_next(request)
            duration = time.perf_counter() - start_time
            
            logger.info({
                "event": "request_finished",
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration_s": duration
            })
            return response
        except Exception as e:
            duration = time.perf_counter() - start_time
            logger.error({
                "event": "request_failed",
                "method": request.method,
                "path": request.url.path,
                "error": str(e),
                "duration_s": duration
            }, exc_info=True)
            raise e
