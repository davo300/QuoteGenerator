from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Quote
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuoteCreate(BaseModel):
    text: str
    author: str | None = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/quotes")
def get_quotes(db: Session = Depends(get_db)):
    return db.query(Quote).all()

@app.get("/quotes/random")
def get_random_quote(db: Session = Depends(get_db)):
    quotes = db.query(Quote).all()
    if not quotes:
        raise HTTPException(status_code=404, detail="No quotes found")
    return random.choice(quotes)

@app.post("/quotes")
def add_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    print("Received:", quote)  # 👈 check what data arrives
    new_quote = Quote(text=quote.text, author=quote.author)
    db.add(new_quote)
    db.commit()
    db.refresh(new_quote)
    return new_quote

