import os
from flask import Flask, request, jsonify
from model import predict_image   # your model.py with predict_image()
from flask_cors import CORS

app = Flask(__name__)

# Allow React frontend to call the API
CORS(app, origins=["http://localhost:5173"])

# Folder to save uploaded images
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        prediction = predict_image(filepath)
        return jsonify({"success": True, "prediction": prediction})
    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
