from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes.investigations import router as investigations_router
from app.database.database import Base, engine
import app.database.models
from app.routes.investigation import router as investigation_router
from app.routes.firs import router as fir_router
from app.routes.dashboard import router as dashboard_router
from app.routes.hotspots import router as hotspots_router
from app.routes.assistant import router as assistant_router
from app.routes.intelligence import router as intelligence_router
from app.routes.upload import router as upload_router
from app.routes.ai import router as ai_router
from app.routes.report import router as report_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CrimeGPT API",
    version="1.0.0",
)

# Serve uploaded files
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(dashboard_router)
app.include_router(hotspots_router)
app.include_router(assistant_router)
app.include_router(fir_router)
app.include_router(intelligence_router)
app.include_router(upload_router)
app.include_router(ai_router)
app.include_router(investigation_router)
app.include_router(investigations_router)
app.include_router(report_router)

@app.get("/")
def root():
    return {
        "status": "running",
        "project": "CrimeGPT-KA",
    }


from fastapi.routing import APIRoute

print("\n===== REGISTERED ROUTES =====")
for route in app.routes:
    if isinstance(route, APIRoute):
        print(route.path)
print("=============================")