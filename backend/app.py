from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io

app = FastAPI()

# allow React later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# load trained model ONCE
model = load_model("C:\\Users\\HP\\Desktop\\projects\\Food-Freshness-Detection\\ml\\model\\freshness_model.h5")

@app.get("/")
def root():
    return {"message": "Food Freshness API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)[0]
    fresh_prob = float(prediction[0])

    if fresh_prob >= 0.8:
        result = "Fresh"
    elif fresh_prob >= 0.5:
        result = "Moderately Fresh"
    else:
        result = "Spoiled"

    return {
        "fresh_probability": fresh_prob,
        "result": result
    }
