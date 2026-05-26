# Stage 1: Build the React application
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# Stage 2: Build the Django application and serve both
FROM python:3.11-slim
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend project files
COPY backend/ .

# Copy built frontend assets from the previous stage to Django's static/template directory
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Collect static files (Whitenoise will pick up the frontend assets if configured correctly)
RUN python manage.py collectstatic --noinput

# Expose the port (Render defaults to looking for port 8000 or reading the PORT env var)
EXPOSE 8000

# Start Gunicorn (running migrations first)
CMD ["sh", "-c", "python manage.py migrate && gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
