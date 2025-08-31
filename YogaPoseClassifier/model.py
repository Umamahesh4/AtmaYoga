import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms
from PIL import Image

# your class names list
class_names = ['Adho Mukha Svanasana', 'Adho Mukha Vrksasana', 'Alanasana', 'Anjaneyasana', 
               'Ardha Chandrasana', 'Ardha Matsyendrasana', 'Ardha Navasana', 
               'Ardha Pincha Mayurasana', 'Ashta Chandrasana', 'Baddha Konasana', 
               'Bakasana', 'Balasana', 'Bitilasana', 'Camatkarasana', 'Dhanurasana', 
               'Eka Pada Rajakapotasana', 'Garudasana', 'Halasana', 'Hanumanasana', 
               'Malasana', 'Marjaryasana', 'Navasana', 'Padmasana', 
               'Parsva Virabhadrasana', 'Parsvottanasana', 'Paschimottanasana', 
               'Phalakasana', 'Pincha Mayurasana', 'Salamba Bhujangasana', 
               'Salamba Sarvangasana', 'Setu Bandha Sarvangasana', 'Sivasana', 
               'Supta Kapotasana', 'Trikonasana', 'Upavistha Konasana', 
               'Urdhva Dhanurasana', 'Urdhva Mukha Svanasana', 'Ustrasana', 
               'Utkatasana', 'Uttanasana', 'Utthita Hasta Padangusthasana', 
               'Utthita Parsvakonasana', 'Vasisthasana', 'Virabhadrasana One', 
               'Virabhadrasana Three', 'Virabhadrasana Two', 'Vrksasana']

model_path = "best_yoga_resnet50.pth"

def load_model():
    # Load pretrained ResNet50
    model = models.resnet50(weights=None)  # no pretrained weights, we’ll load ours
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(class_names))

    # Load checkpoint
    checkpoint = torch.load(model_path, map_location=torch.device("cpu"))
    model.load_state_dict(checkpoint["model_state_dict"])
    
    model.eval()
    return model

model = load_model()

# Preprocessing for input image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

def predict_image(image_path):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = outputs.max(1)
        return class_names[predicted.item()]
