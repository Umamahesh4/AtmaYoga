import { useState } from "react";
import axios from "axios";
import "./AsanaLens.css";

const YogaIdentifier = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");

  const handleFileChangeAndPredict = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);

    // Prepare form data
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/predict", // make sure Flask backend URL is correct
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setResult(res.data.prediction);
      } else {
        setResult("Prediction failed");
      }
    } catch (err) {
      console.error(err);
      setResult("Error connecting to server");
    }
  };

  return (
    <div className="asana-container">
      <header className="asana-header">
        <h1>AsanaLens</h1>
        <p>Upload an image to identify the yoga pose instantly</p>
      </header>

      <main className="asana-main">
        <div className="asana-file-upload">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChangeAndPredict}
          />
          <label htmlFor="fileInput" className="asana-upload-label">
            Choose Image
          </label>
        </div>

        <div className="preview-card">
          {preview && <img src={preview} alt="Preview" />}
          <h3>{result}</h3>
        </div>
      </main>
    </div>
  );
};

export default YogaIdentifier;
