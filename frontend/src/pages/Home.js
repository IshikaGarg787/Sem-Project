import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const containerStyle = {
    textAlign: "center",
    padding: "60px 20px",
  };

  const headingStyle = {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const subTextStyle = {
    fontSize: "18px",
    color: "#555",
    marginBottom: "40px",
  };

  const buttonStyle = {
    padding: "12px 25px",
    margin: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>AI Food Freshness Detection</h1>

      <p style={subTextStyle}>
        Detect whether fruits and vegetables are Fresh or Spoiled using
        Artificial Intelligence and sensor-based prediction.
      </p>

      <button
        style={{ ...buttonStyle, backgroundColor: "#10b981", color: "white" }}
        onClick={() => navigate("/scanner")}
      >
        📷 Start Live Scan
      </button>

      <button
        style={{ ...buttonStyle, backgroundColor: "#3b82f6", color: "white" }}
        onClick={() => navigate("/upload")}
      >
        📤 Upload Image
      </button>
    </div>
  );
}

export default Home;   