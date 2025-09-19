import torch
import cv2
import matplotlib.pyplot as plt
import os
from torchvision import transforms
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import matplotlib.pyplot as plt


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class CSDN_Tem(nn.Module):
    def __init__(self, in_ch, out_ch):
        super(CSDN_Tem, self).__init__()
        self.depth_conv = nn.Conv2d(
            in_channels=in_ch,
            out_channels=in_ch,
            kernel_size=3,
            stride=1,
            padding=1,
            groups=in_ch
        )
        self.point_conv = nn.Conv2d(
            in_channels=in_ch,
            out_channels=out_ch,
            kernel_size=1,
            stride=1,
            padding=0,
            groups=1
        )

    def forward(self, x):
        x = self.depth_conv(x)
        x = self.point_conv(x)
        return x


class ZeroDCE(nn.Module):
    def __init__(self, scale_factor=1):
        super(ZeroDCE, self).__init__()
        self.scale_factor = scale_factor
        self.relu = nn.ReLU(inplace=True)
        self.upsample = nn.UpsamplingBilinear2d(scale_factor=self.scale_factor)
        number_f = 32

        self.e_conv1 = CSDN_Tem(3, number_f)
        self.e_conv2 = CSDN_Tem(number_f, number_f)
        self.e_conv3 = CSDN_Tem(number_f, number_f)
        self.e_conv4 = CSDN_Tem(number_f, number_f)
        self.e_conv5 = CSDN_Tem(number_f * 2, number_f)
        self.e_conv6 = CSDN_Tem(number_f * 2, number_f)
        self.e_conv7 = CSDN_Tem(number_f * 2, 3)

    def enhance(self, x, x_r):
        for _ in range(4):
            x = x + x_r * (x ** 2 - x)
        return x

    def forward(self, x):
        if self.scale_factor == 1:
            x_down = x
        else:
            x_down = F.interpolate(x, scale_factor=1/self.scale_factor, mode='bilinear', align_corners=False)

        x1 = self.relu(self.e_conv1(x_down))
        x2 = self.relu(self.e_conv2(x1))
        x3 = self.relu(self.e_conv3(x2))
        x4 = self.relu(self.e_conv4(x3))
        x5 = self.relu(self.e_conv5(torch.cat([x3, x4], 1)))
        x6 = self.relu(self.e_conv6(torch.cat([x2, x5], 1)))
        x_r = torch.tanh(self.e_conv7(torch.cat([x1, x6], 1)))

        if self.scale_factor != 1:
            x_r = self.upsample(x_r)

        enhanced = self.enhance(x, x_r)
        return enhanced, x_r



# load trained model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# from your_model_file import ZeroDCE  # Replace with your actual file if separate
def zerodcePredict(img_path):
    model = ZeroDCE().to(device)
    model.load_state_dict(torch.load("fine_tuned_zero_dce.pth", map_location=device))
    model.eval()  # Set to evaluation mode

    # Load and preprocess the image
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_input = cv2.resize(img, (256, 256))  # Resize the image to 256x256
    img_tensor = torch.tensor(img_input / 255.0, dtype=torch.float32).permute(2, 0, 1).unsqueeze(0).to(device)

    with torch.no_grad():
        enhanced, _ = model(img_tensor)

    # Post-process enhanced image
    enhanced_img = enhanced.squeeze(0).permute(1, 2, 0).cpu().numpy()
    enhanced_img = (enhanced_img * 255).clip(0, 255).astype('uint8')
    return enhanced_img

