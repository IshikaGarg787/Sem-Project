from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import time

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = load_model("C:\\Users\\HP\\Desktop\\projects\\Food-Freshness-Detection\\ml\\model\\freshness_model.h5")

class_labels = ["Fresh", "Spoiled"]

@app.get("/")
def root():
    return {"message": "Food Freshness API is running"}

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    storage_hours: float = Form(...)
):
    start_time = time.time()

    try:
        # -------- IMAGE PROCESSING --------
        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((224, 224))

        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)[0]
        predicted_index = int(np.argmax(prediction))
        result = class_labels[predicted_index]
        confidence = float(prediction[predicted_index])

        # -------- SENSOR RISK CALCULATION --------
        risk_score = 0

        if temperature > 25:
            risk_score += 0.15
        if humidity > 70:
            risk_score += 0.15
        if storage_hours > 48:
            risk_score += 0.25

        adjusted_confidence = confidence - risk_score

        # -------- FINAL DECISION LOGIC --------
        if result == "Fresh":
            if adjusted_confidence < 0.5:
                final_result = "At Risk"
                explanation = (
                    "Visually appears fresh, but environmental conditions "
                    "increase spoilage risk."
                )
            else:
                final_result = "Fresh"
                explanation = (
                    "Visual and environmental analysis indicate safe freshness."
                )
        else:
            final_result = "Spoiled"
            explanation = (
                "Visual spoilage detected. Item is not recommended for consumption."
            )

        latency = round((time.time() - start_time) * 1000, 2)

        return {
            "result": final_result,
            "visual_confidence": confidence,
            "adjusted_confidence": round(adjusted_confidence, 3),
            "temperature": temperature,
            "humidity": humidity,
            "storage_hours": storage_hours,
            "latency_ms": latency,
            "model_used": "MobileNetV2 + Environmental Risk Adjustment",
            "explanation": explanation
        }

    except Exception as e:
        return {"error": str(e)}