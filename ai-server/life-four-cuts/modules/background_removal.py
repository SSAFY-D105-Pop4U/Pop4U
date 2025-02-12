# modules/background_removal.py
from rembg import remove
from PIL import Image
import io

def remove_background(image_bytes: bytes) -> Image.Image:
    """ 배경 제거 후 RGBA 이미지 반환 """
    processed = remove(image_bytes)
    img_no_bg = Image.open(io.BytesIO(processed)).convert("RGBA")
    return img_no_bg
