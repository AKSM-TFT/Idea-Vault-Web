# Idea Vault

A full-stack personal idea management app. Capture, browse, and manage your project ideas — each stored with a title, summary, and full markdown content — backed by a REST API and a clean React UI. The ideas are generated via MCP server that can be connected to LLM such as Claude, Gemini, etc.

---

## Features

- Create and store ideas with a title, brief summary, and full content
- Browse all saved ideas in a searchable list
- Update idea content and summaries in-place
- Delete ideas you no longer need
- Auto-generated URL slugs for each idea
- Persistent storage via PostgreSQL

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Language | Python 3.12 |
| Framework | FastAPI |
| Server | Uvicorn |
| Database Driver | psycopg2-binary |
| Validation | Pydantic v2 |
| Database | PostgreSQL (hosted on Railway) |

### Frontend
| Layer | Technology |
|---|---|
| Language | JavaScript (ES2022+) |
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP Client | Axios |

### Infrastructure
| Concern | Tool |
|---|---|
| Containerization | Docker |
| Orchestration | Docker Compose |
| Frontend server | Nginx (Alpine) |

---

## Project Structure

```
Idea-Vault/
├── docker-compose.yml
├── idea-vault-backend/
│   ├── Dockerfile
│   ├── main.py               # FastAPI app — all routes
│   ├── requirements.txt
│   └── .env                  # DATABASE_URL (not committed)
└── idea-vault-frontend/
    ├── Dockerfile
    ├── nginx.conf             # SPA routing + asset caching
    ├── vite.config.js
    ├── src/
    └── .env                  # VITE_API_URL (not committed)
```

---

## Running with Docker

This is the recommended way to run the full stack locally.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### 1. Configure environment variables

Create `idea-vault-backend/.env`:

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
```

> The app connects to an external PostgreSQL instance (e.g. Railway, Supabase, Neon). No local Postgres container is needed.

### 2. Build and start

```bash
docker compose up --build
```

Or run in the background:

```bash
docker compose up --build -d
```

### 3. Open the app

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |

### Stopping

```bash
docker compose down
```

---

## Running Locally (without Docker)

### Backend

```bash
cd idea-vault-backend

# Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate       # Windows
source .venv/bin/activate    # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Set your DATABASE_URL in .env, then:
python main.py
```

### Frontend

```bash
cd idea-vault-frontend

# Set VITE_API_URL in .env
echo "VITE_API_URL=http://localhost:8000" > .env

npm install
npm run dev
```

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/ideas` | List all ideas |
| `GET` | `/ideas/{id}` | Get a single idea by ID |
| `POST` | `/ideas` | Create a new idea |
| `PATCH` | `/ideas/{id}` | Update idea content or summary |
| `DELETE` | `/ideas/{id}` | Delete an idea |

Full interactive docs available at **`/docs`** when the backend is running.

---

## Environment Variables

### Backend (`idea-vault-backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Port to run the API on (default: `8000`) |

### Frontend (`idea-vault-frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Full URL of the backend API |

> Never commit `.env` files. They are listed in `.gitignore`.
