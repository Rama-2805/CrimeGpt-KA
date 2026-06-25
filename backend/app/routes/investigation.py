from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/investigation",
    tags=["AI Investigation"]
)


class InvestigationRequest(BaseModel):
    crime: str
    district: str
    priority: str


@router.post("/insights")
def investigation_insights(data: InvestigationRequest):

    if data.crime.lower() == "robbery":
        ipc = ["392 IPC", "394 IPC"]
        steps = [
            "Collect CCTV footage",
            "Interview witnesses",
            "Search nearby vehicles",
            "Check previous robbery FIRs"
        ]
    elif data.crime.lower() == "murder":
        ipc = ["302 IPC"]
        steps = [
            "Secure crime scene",
            "Collect forensic evidence",
            "Postmortem examination",
            "Interview suspects"
        ]
    else:
        ipc = ["Relevant IPC"]
        steps = [
            "Collect evidence",
            "Interview witnesses"
        ]

    return {
        "risk": data.priority,
        "ipc": ipc,
        "steps": steps
    }