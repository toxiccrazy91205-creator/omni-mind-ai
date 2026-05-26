# OmniMind AI OS

An "AI Operating System" dashboard built with Django, React, and LangGraph, following a minimalist, dark-themed UI.

## Features
- AI Chat Assistant with multiple model support (Groq, Ollama, OpenRouter).
- Agent System (Research, Coding, Content, Automation, RAG) powered by LangGraph.
- RAG System using ChromaDB.
- Minimalist, dark-themed UI matching the custom design specs.

## Prerequisites
- Docker & Docker Compose
- Node.js (for local frontend dev)
- Python 3.11+ (for local backend dev)
- API Keys for Groq/OpenRouter, or local Ollama installation.

## Quick Start (Docker)
1. Copy `.env.example` to `.env` and fill in your API keys.
2. Run `docker-compose up --build`.
3. The frontend will be available at `http://localhost:5173`.
4. The backend API will be available at `http://localhost:8000`.

## Local Development
### Backend
1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate` (or `.\venv\Scripts\activate` on Windows)
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py runserver`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
