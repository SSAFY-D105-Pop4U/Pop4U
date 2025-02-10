# modules/utils.py
from PIL import Image
import io

def resize_image(pil_image: Image.Image, width: int, height: int) -> Image.Image:
    """ 이미지 리사이즈 """
    return pil_image.resize((width, height), Image.LANCZOS)

def pil_to_bytes(pil_image: Image.Image, fmt='PNG') -> bytes:
    """ PIL 이미지를 PNG 바이트로 변환 """
    buffer = io.BytesIO()
    pil_image.save(buffer, format=fmt)
    return buffer.getvalue()
