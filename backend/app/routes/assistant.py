from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.services.fir_search import search_firs
from app.database.database import get_db
from app.database.models import FIR
from app.services.ollama_service import chat_with_ai

router = APIRouter(
    prefix="/assistant",
    tags=["Assistant"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    try:

        question = request.message.strip()
        q = question.lower()

        # =========================
        # COUNT QUERIES
        # =========================

        if "how many fir" in q or "total fir" in q:

            total = db.query(FIR).count()

            return {
                "reply": f"There are {total} FIRs in the database."
            }

        if "how many open" in q:

            total = (
                db.query(FIR)
                .filter(FIR.status == "Open")
                .count()
            )

            return {
                "reply": f"There are {total} open FIRs."
            }

        if "how many closed" in q:

            total = (
                db.query(FIR)
                .filter(FIR.status == "Closed")
                .count()
            )

            return {
                "reply": f"There are {total} closed FIRs."
            }

        if "how many investigating" in q:

            total = (
                db.query(FIR)
                .filter(FIR.status == "Investigating")
                .count()
            )

            return {
                "reply": f"There are {total} investigating FIRs."
            }

        # =========================
        # SEARCH DATABASE
        # =========================

        firs = search_firs(question, db)

        if firs:

            context = ""

            for fir in firs:

                context += (
                    f"FIR: {fir.fir}\n"
                    f"Crime: {fir.crime}\n"
                    f"District: {fir.district}\n"
                    f"Status: {fir.status}\n"
                    f"Date: {fir.date}\n\n"
                )

            messages = [
                {
                    "role": "system",
                    "content": f"""
You are CrimeGPT.

You are an AI assistant for Karnataka Police.

Use ONLY the FIR records below.

{context}

If the answer is not contained in these records,
reply:
'No matching FIR was found.'

Keep answers short and professional.
""",
                },
                {
                    "role": "user",
                    "content": question,
                },
            ]

            reply = chat_with_ai(messages)

            return {
                "reply": reply
            }

        # =========================
        # GENERAL AI QUESTIONS
        # =========================

        messages = [
            {
                "role": "system",
                "content": """
You are CrimeGPT.

You are an expert assistant for Karnataka Police.

Answer crime-related questions professionally.

If the user asks about FIRs that are not in the database,
state that no matching FIR was found.
""",
            },
            {
                "role": "user",
                "content": question,
            },
        ]

        reply = chat_with_ai(messages)

        return {
            "reply": reply
        }

    except Exception as e:

        return {
            "reply": str(e)
        }