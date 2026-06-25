from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
import shutil
import uuid

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("")
async def upload_file(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"

    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return JSONResponse({
        "url": f"/uploads/{filename}"
    })