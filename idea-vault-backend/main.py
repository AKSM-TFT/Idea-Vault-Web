import os
import re
import logging
import sys
import psycopg2
import uvicorn
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO, handlers=[logging.StreamHandler(sys.stderr)])
logger = logging.getLogger("IdeasAPI")

PORT = int(os.environ.get("PORT", 8000))
DATABASE_URL = os.environ.get("DATABASE_URL")

app = FastAPI(title="Idea Vault API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production e.g. ["https://yourapp.com"]
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn


def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS ideas (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL UNIQUE,
            slug TEXT NOT NULL UNIQUE,
            content TEXT NOT NULL,
            brief_summary TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    """)
    conn.commit()
    cur.close()
    conn.close()
    logger.info("Database initialized.")


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    return re.sub(r'[-\s]+', '-', text)


class IdeaCreate(BaseModel):
    title: str
    content: str
    brief_summary: str


class IdeaUpdate(BaseModel):
    content: Optional[str] = None
    brief_summary: Optional[str] = None


@app.get("/")
def root():
    return {"message": "Idea Vault API is running"}


@app.get("/ideas")
def list_ideas():
    """List all saved ideas."""
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, title, slug, brief_summary, created_at FROM ideas ORDER BY created_at DESC")
        rows = cur.fetchall()
        return rows
    finally:
        cur.close()
        conn.close()

@app.get("/ideas/{id}")
def read_idea(id: int):
    """Get a single idea by id."""
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM ideas WHERE id = %s", (id,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail=f"No idea found with id '{id}'.")
        return row
    finally:
        cur.close()
        conn.close()


@app.patch("/ideas/{id}")
def update_idea(id: int, updates: IdeaUpdate):
    """Update an existing idea's content or summary."""
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM ideas WHERE id = %s", (id,))
        existing = cur.fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail=f"No idea found with id '{id}'.")

        new_content = updates.content or existing["content"]
        new_summary = updates.brief_summary or existing["brief_summary"]

        cur.execute("""
            UPDATE ideas
            SET content = %s, brief_summary = %s, updated_at = NOW()
            WHERE id = %s
            RETURNING *
        """, (new_content, new_summary, id))
        row = cur.fetchone()
        conn.commit()
        return row
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()


@app.delete("/ideas/{id}")
def delete_idea(id: int):
    """Delete an idea by id."""
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM ideas WHERE id = %s RETURNING title", (id,))
        row = cur.fetchone()
        conn.commit()
        if not row:
            raise HTTPException(status_code=404, detail=f"No idea found with id '{id}'.")
        return {"message": f"Idea '{row['title']}' deleted successfully."}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()

@app.on_event("startup")
def on_startup():
    init_db()
    logger.info(f"API running on port {PORT}")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)