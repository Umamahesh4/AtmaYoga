import os
from flask import Flask, request, jsonify,send_file
from model import predict_image   # your model.py with predict_image()
from flask_cors import CORS
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import cv2

# --- CONFIG: CHANGE THIS TO YOUR IMAGE PATH ---
YOUR_IMAGE_PATH = 'testImages/2.png'
MODEL_PATH = 'final_model.keras'

# Model input dimensions
IMG_HEIGHT = 256
IMG_WIDTH = 256


app = Flask(__name__)

# Allow React frontend to call the API
CORS(app, origins=["http://localhost:5173"])

# Folder to save uploaded images
UPLOAD_FOLDER = "uploads"
RESULT_FOLDER = "results"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

# # adding custom files for human segmentation part : -----------

class CustomMeanIoU(tf.keras.metrics.MeanIoU):
    def __init__(self, num_classes, name=None, dtype=None, **kwargs):
        super(CustomMeanIoU, self).__init__(num_classes=num_classes, name=name, dtype=dtype)
    def update_state(self, y_true, y_pred, sample_weight=None):
        y_pred = tf.argmax(y_pred, axis=-1)
        return super(CustomMeanIoU, self).update_state(y_true, y_pred, sample_weight)
    
def preprocess_single_image(image_path):
    print(f"[*] Preprocessing image: {image_path}")
    image_string = tf.io.read_file(image_path)
    image = tf.image.decode_image(image_string, channels=3)
    image = tf.image.resize(image, [IMG_HEIGHT, IMG_WIDTH])
    image = tf.keras.applications.resnet50.preprocess_input(image)
    image = tf.expand_dims(image, axis=0)
    return image

# human segmentation end ---------------------------------------

@app.route("api/human_segmentation",method=["POST"])
def humanSegment():
    if "file" not in request.files:
        return jsonify({"error":"no file uploaded"}),400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    filepath = os.path.join(UPLOAD_FOLDER,file.filename)
    file.save(filepath)
    try:
        # -----------------------------
        # Run your full pipeline here
        # -----------------------------
        print("--- SCRIPT START ---")

        # Load model
        loaded_model = keras.models.load_model(
            MODEL_PATH,
            custom_objects={"CustomMeanIoU": CustomMeanIoU}
        )
        print("[SUCCESS] Model loaded successfully.")

        # Preprocess image
        input_image_tensor = preprocess_single_image(filepath)

        # Predict
        pred_logits = loaded_model.predict(input_image_tensor)
        pred_mask = tf.argmax(pred_logits, axis=-1)[0].numpy().astype(np.uint8)

        # Load low-res image
        original_image_cv2 = cv2.imread(filepath)
        resized_image_cv2 = cv2.resize(original_image_cv2, (IMG_WIDTH, IMG_HEIGHT))

        # GrabCut refinement
        grabcut_mask = np.full(pred_mask.shape, cv2.GC_PR_BGD, dtype=np.uint8)
        grabcut_mask[pred_mask == 1] = cv2.GC_PR_FGD
        kernel = np.ones((5, 5), np.uint8)
        eroded_mask = cv2.erode(pred_mask, kernel, iterations=3)
        grabcut_mask[eroded_mask == 1] = cv2.GC_FGD
        bgdModel = np.zeros((1, 65), np.float64)
        fgdModel = np.zeros((1, 65), np.float64)
        cv2.grabCut(resized_image_cv2, grabcut_mask, None, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_MASK)

        refined_mask = np.where(
            (grabcut_mask == cv2.GC_FGD) | (grabcut_mask == cv2.GC_PR_FGD), 1, 0
        ).astype('uint8')

        # Morphological opening (cleanup)
        opening_kernel = np.ones((3, 3), np.uint8)
        final_low_res_mask = cv2.morphologyEx(refined_mask, cv2.MORPH_OPEN, opening_kernel, iterations=2)

        # Upscale to original resolution
        h, w, _ = original_image_cv2.shape
        upscaled_mask = cv2.resize(final_low_res_mask, (w, h), interpolation=cv2.INTER_CUBIC)
        feathered_mask = cv2.GaussianBlur(upscaled_mask, (15, 15), 0)

        # Apply mask to original
        final_mask_3d = feathered_mask[:, :, np.newaxis]
        high_res_result = original_image_cv2.astype(float) * final_mask_3d
        high_res_result = high_res_result.astype(np.uint8)

        # Save RGBA output
        alpha_channel = (feathered_mask * 255).astype(np.uint8)
        high_res_result_rgba = cv2.cvtColor(high_res_result, cv2.COLOR_BGR2BGRA)
        high_res_result_rgba[:, :, 3] = alpha_channel

        output_path = os.path.join(RESULT_FOLDER, "final_result.png")
        cv2.imwrite(output_path, high_res_result_rgba)

        print("[SUCCESS] Image saved to", output_path)

        # -----------------------------
        # Instead of returning JSON, send image file
        # -----------------------------
        return send_file(output_path, mimetype="image/png")

    except Exception as e:
        print("Error during processing:", str(e))
        return jsonify({"success": False, "error": str(e)}), 500
    
# ------ ---- ------------------------------------



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
