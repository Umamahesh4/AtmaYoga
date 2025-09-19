import torch
import cv2
import numpy as np
from skimage.metrics import peak_signal_noise_ratio as sk_psnr
from skimage.metrics import structural_similarity as sk_ssim
from PIL import Image
import torch.nn as nn
import torch.nn.functional as F
MODEL_PATH_DCE=''

# ============================================
# Load the model
# ============================================
class ZeroDCE(nn.Module):
    # Define your ZeroDCE class here, same as you did in training
    # (Use the same class code from your training script)
    def __init__(self, scale_factor=1, number_f=32):
        super(ZeroDCE, self).__init__()
        self.scale_factor = scale_factor
        self.relu = nn.ReLU(inplace=True)
        self.e_conv1 = nn.Conv2d(3, number_f, 3, 1, 1, bias=True) 
        self.e_conv2 = nn.Conv2d(number_f, number_f, 3, 1, 1, bias=True) 
        self.e_conv3 = nn.Conv2d(number_f, number_f, 3, 1, 1, bias=True) 
        self.e_conv4 = nn.Conv2d(number_f, number_f, 3, 1, 1, bias=True) 
        self.e_conv5 = nn.Conv2d(number_f * 2, number_f, 3, 1, 1, bias=True) 
        self.e_conv6 = nn.Conv2d(number_f * 2, number_f, 3, 1, 1, bias=True) 
        self.e_conv7 = nn.Conv2d(number_f * 2, 24, 3, 1, 1, bias=True) 

    def enhance(self, x, x_r):
        r_list = torch.split(x_r, 3, dim=1)
        for i in range(8):
            x = x + r_list[i] * (torch.pow(x, 2) - x)
        return x

    def forward(self, x):
        if self.scale_factor != 1:
            x_down = F.interpolate(x, scale_factor=1/self.scale_factor, mode='bilinear', align_corners=False)
        else:
            x_down = x

        x1 = self.relu(self.e_conv1(x_down))
        x2 = self.relu(self.e_conv2(x1))
        x3 = self.relu(self.e_conv3(x2))
        x4 = self.relu(self.e_conv4(x3))
        x5 = self.relu(self.e_conv5(torch.cat([x3, x4], 1)))
        x6 = self.relu(self.e_conv6(torch.cat([x2, x5], 1)))
        x_r = torch.tanh(self.e_conv7(torch.cat([x1, x6], 1)))

        if self.scale_factor != 1:
            x_r = F.interpolate(x_r, size=x.shape[2:], mode='bilinear', align_corners=False)

        enhanced_image = self.enhance(x, x_r)
        return enhanced_image, x_r

# Load the trained model
def load_model(model_path, num_filters=32):
    model = ZeroDCE(number_f=num_filters)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model

def preprocess_image(image_path, img_size=(256, 256)):
    # Read and preprocess the input image
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB
    img = cv2.resize(img, img_size)  # Resize to the target size
    img_tensor = torch.tensor(img.astype(np.float32) / 255.0).permute(2, 0, 1).unsqueeze(0)  # Convert to tensor
    return img_tensor

# def show_images(input_img, enhanced_img):
#     input_img = input_img.squeeze(0).permute(1, 2, 0).numpy()
#     enhanced_img = enhanced_img.squeeze(0).permute(1, 2, 0).detach().numpy()

#     # Plot the input and enhanced image
#     plt.figure(figsize=(10, 5))
#     plt.subplot(1, 2, 1)
#     plt.imshow(input_img)
#     plt.title("Input Image")
#     plt.axis('off')

#     plt.subplot(1, 2, 2)
#     plt.imshow(enhanced_img)
#     plt.title("Enhanced Image")
#     plt.axis('off')

#     plt.show()


def run_inference(image_path):
    # Load the model
    model = load_model(MODEL_PATH_DCE)

    # Preprocess the image
    input_image = preprocess_image(image_path)

    # Run the model on the input image
    with torch.no_grad():
        enhanced_image, _ = model(input_image)

    enhanced_image = enhanced_image.squeeze(0)  # Remove batch dimension
    enhanced_image = enhanced_image.permute(1, 2, 0).numpy()  # Convert to (H, W, C)

    # Convert to PIL image (if needed for saving or displaying)
    enhanced_image_pil = Image.fromarray(np.uint8(enhanced_image * 255))  # Assuming it's in [0, 1] range

    return enhanced_image_pil

    # Display the results
    #show_images(input_image, enhanced_image)
