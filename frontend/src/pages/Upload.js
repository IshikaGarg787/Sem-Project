import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [storageHours, setStorageHours] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("temperature", temperature);
    formData.append("humidity", humidity);
    formData.append("storage_hours", storageHours); // ✅ fixed name

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
      setLoading(false);
    }
  };

  const containerStyle = {
    padding: "40px",
    textAlign: "center",
  };

  const inputStyle = {
    margin: "10px",
    padding: "8px",
    width: "250px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const resultBoxStyle = {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "inline-block",
    minWidth: "300px",
  };

  return (
    <div style={containerStyle}>
      <h2>Upload Food Image</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={inputStyle}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Temperature (°C)"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Humidity (%)"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Storage Hours"
            value={storageHours}
            onChange={(e) => setStorageHours(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Predict
        </button>
      </form>

      {loading && <p>Analyzing image...</p>}

      {result && !result.error && (
        <div style={resultBoxStyle}>
          <h3>Result: {result.result}</h3>

          <p>
            Visual Confidence:{" "}
            {(result.visual_confidence * 100).toFixed(2)}%
          </p>

          <p>
            Adjusted Confidence:{" "}
            {(result.adjusted_confidence * 100).toFixed(2)}%
          </p>

          <p>Explanation: {result.explanation}</p>

          <p>Latency: {result.latency_ms} ms</p>
        </div>
      )}

      {result && result.error && (
        <p style={{ color: "red" }}>Error: {result.error}</p>
      )}
    </div>
  );
}

export default Upload;