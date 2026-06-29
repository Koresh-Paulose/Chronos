FROM python:3.11-slim

# Prevent writing pyc files and buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /backend

# Create a non-privileged user
RUN addgroup --system appgroup && adduser --system --group appuser

# Install system dependencies and uv
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir uv

# Copy only requirements to cache installation
COPY requirements.txt .

# Install dependencies using uv
RUN uv pip install --system --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# Change ownership to the non-privileged user
RUN chown -R appuser:appgroup /backend

# Switch to the non-privileged user
USER appuser

EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "2", "--worker-class", "uvicorn.workers.UvicornWorker", "--timeout", "120", "app.main:app"]
