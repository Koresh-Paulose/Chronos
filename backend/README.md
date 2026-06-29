# Chronos Backend API Service

FastAPI service deploying to GCP Cloud Run with Vertex AI Gemini 1.5 Flash planning integration and Firestore persistence.

## Development Setup

1. Setup environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and supply your GCP PROJECT_ID
   ```

2. Authenticate Google Cloud locally:
   ```bash
   gcloud auth application-default login
   ```

3. Run locally using Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Deploying to GCP Cloud Run

Run the following command to deploy the service:
```bash
gcloud run deploy chronos-api \
    --source . \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars="PROJECT_ID=your-project-id,LOCATION=us-central1,GEMINI_MODEL=gemini-1.5-flash-001,FRONTEND_ORIGIN=https://your-frontend.web.app"
```

## Firestore Composite Index

A composite index is required for querying logs:
- Collection: `logs` (nested under users) or queries checking logs.
- Fields:
  - `user_id` (Ascending)
  - `completed_at` (Descending)

Create the index using this gcloud command:
```bash
gcloud firestore indexes composite create \
    --collection-group=logs \
    --field-config field-path=user_id,order=ascending \
    --field-config field-path=completed_at,order=descending
```
