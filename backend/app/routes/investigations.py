from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.investigation_model import Investigation
from app.schemas.investigation import (
    InvestigationCreate,
    InvestigationOut,
)

router = APIRouter(
    prefix="/investigations",
    tags=["Investigations"],
)


@router.get("", response_model=List[InvestigationOut])
def get_investigations(db: Session = Depends(get_db)):
    return db.query(Investigation).all()


@router.get("/{investigation_id}", response_model=InvestigationOut)
def get_investigation(
    investigation_id: int,
    db: Session = Depends(get_db),
):
    investigation = (
        db.query(Investigation)
        .filter(Investigation.id == investigation_id)
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found",
        )

    return investigation


@router.post("", response_model=InvestigationOut)
def create_investigation(
    data: InvestigationCreate,
    db: Session = Depends(get_db),
):
    investigation = Investigation(**data.model_dump())

    db.add(investigation)
    db.commit()
    db.refresh(investigation)

    return investigation


@router.put("/{investigation_id}", response_model=InvestigationOut)
def update_investigation(
    investigation_id: int,
    data: InvestigationCreate,
    db: Session = Depends(get_db),
):
    investigation = (
        db.query(Investigation)
        .filter(Investigation.id == investigation_id)
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found",
        )

    investigation.fir_id = data.fir_id
    investigation.officer = data.officer
    investigation.notes = data.notes
    investigation.progress = data.progress
    investigation.status = data.status

    db.commit()
    db.refresh(investigation)

    return investigation


@router.delete("/{investigation_id}")
def delete_investigation(
    investigation_id: int,
    db: Session = Depends(get_db),
):
    investigation = (
        db.query(Investigation)
        .filter(Investigation.id == investigation_id)
        .first()
    )

    if not investigation:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found",
        )

    db.delete(investigation)
    db.commit()

    return {
        "message": "Investigation deleted successfully"
    }