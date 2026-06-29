from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/investigation",
    tags=["AI Investigation"],
)


class InvestigationRequest(BaseModel):
    crime: str
    district: str
    priority: str


@router.post("/insights")
def investigation_insights(data: InvestigationRequest):

    crime = data.crime.lower()

    if crime == "robbery":
        ipc = ["IPC 392", "IPC 394"]
        units = ["Local Police", "Crime Branch"]
        steps = [
            "Collect CCTV footage",
            "Interview nearby witnesses",
            "Check nearby shops",
            "Search previous robbery FIRs",
        ]

    elif crime == "theft":
        ipc = ["IPC 379"]
        units = ["Local Police"]
        steps = [
            "Collect fingerprints",
            "Check CCTV footage",
            "Verify stolen property details",
        ]

    elif crime == "murder":
        ipc = ["IPC 302"]
        units = ["Crime Branch", "Forensic Team"]
        steps = [
            "Secure crime scene",
            "Collect forensic evidence",
            "Conduct postmortem",
            "Identify suspects",
        ]

    elif crime == "cyber crime":
        ipc = ["IT Act", "IPC 420"]
        units = ["Cyber Crime Cell"]
        steps = [
            "Freeze suspicious accounts",
            "Collect digital evidence",
            "Trace IP addresses",
        ]

    else:
        ipc = ["Applicable IPC"]
        units = ["Local Police"]
        steps = [
            "Collect evidence",
            "Interview witnesses",
        ]

    if data.priority.lower() == "critical":
        response_time = "Immediate (Within 30 minutes)"
        forensic = True

    elif data.priority.lower() == "high":
        response_time = "Within 2 Hours"
        forensic = True

    elif data.priority.lower() == "medium":
        response_time = "Within 6 Hours"
        forensic = False

    else:
        response_time = "Within 24 Hours"
        forensic = False

    return {
        "risk": data.priority,
        "ipc": ipc,
        "units": units,
        "steps": steps,
        "response_time": response_time,
        "forensic_required": forensic,
        "evidence_checklist": [
            "Photographs",
            "Fingerprints",
            "Witness Statements",
            "CCTV Footage",
        ],
    }