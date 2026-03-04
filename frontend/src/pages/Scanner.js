import { useRef, useEffect, useState } from "react";

function Scanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded environmental values (for demo)
  const temperature = 25;
  const humidity = 60;
  const storage_hours = 10;

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied");
    }
  };

  const captureAndPredict = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);

    setLoading(true);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "scan.jpg");
      formData.append("temperature", temperature);
      formData.append("humidity", humidity);
      formData.append("storage_hours", storage_hours);

      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setResult(data);
      } catch (error) {
        alert("Error connecting to backend");
      }

      setLoading(false);
    }, "image/jpeg");
  };

  const containerStyle = {
    textAlign: "center",
    padding: "30px",
  };

  const videoStyle = {
    width: "400px",
    borderRadius: "10px",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const resultBox = {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "inline-block",
  };

  return (
    <div style={containerStyle}>
      <h2>Live Food Scanner</h2>

      <video ref={videoRef} autoPlay playsInline style={videoStyle}></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div>
        <button onClick={captureAndPredict} style={buttonStyle}>
          Scan Now
        </button>
      </div>

      {loading && <p>Analyzing...</p>}

      {result && !result.error && (
        <div style={resultBox}>
          <h3>Result: {result.result}</h3>
          <p>
            Adjusted Confidence:{" "}
            {(result.adjusted_confidence * 100).toFixed(2)}%
          </p>
          <p>{result.explanation}</p>
        </div>
      )}

      {result && result.error && (
        <p style={{ color: "red" }}>Error: {result.error}</p>
      )}
    </div>
  );
}

export default Scanner;