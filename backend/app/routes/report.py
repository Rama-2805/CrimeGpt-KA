from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

from app.database.database import get_db
from app.database.models import FIR, Investigation

router = APIRouter(
    prefix="/report",
    tags=["Investigation Report"],
)


@router.get("/{fir_id}")
def generate_report(
    fir_id: int,
    db: Session = Depends(get_db),
):

    fir = db.query(FIR).filter(FIR.id == fir_id).first()

    if not fir:
        raise HTTPException(status_code=404, detail="FIR not found")

    investigation = (
        db.query(Investigation)
        .filter(Investigation.fir_id == fir_id)
        .first()
    )

    filename = f"report_{fir_id}.pdf"

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(filename)

    elements = []

    elements.append(Paragraph("<b>CrimeGPT-KA</b>", styles["Title"]))
    elements.append(
        Paragraph("Investigation Report", styles["Heading1"])
    )

    elements.append(Paragraph("<br/>", styles["BodyText"]))

    elements.append(
        Paragraph(f"<b>FIR Number:</b> {fir.fir}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Crime:</b> {fir.crime}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>District:</b> {fir.district}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Police Station:</b> {fir.police_station}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Priority:</b> {fir.priority}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Status:</b> {fir.status}", styles["BodyText"])
    )

    if investigation:

        elements.append(Paragraph("<br/>", styles["BodyText"]))

        elements.append(
            Paragraph("<b>Investigation Details</b>", styles["Heading2"])
        )

        elements.append(
            Paragraph(
                f"<b>Officer:</b> {investigation.officer}",
                styles["BodyText"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Progress:</b> {investigation.progress}%",
                styles["BodyText"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Status:</b> {investigation.status}",
                styles["BodyText"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Notes:</b><br/>{investigation.notes}",
                styles["BodyText"],
            )
        )

    doc.build(elements)

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename,
    )