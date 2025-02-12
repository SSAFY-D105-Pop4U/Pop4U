# modules/utils.py
from PIL import Image
import io

def resize_image(pil_image: Image.Image, width: int, height: int) -> Image.Image:
    """ 이미지 리사이즈 """
    orig_width, orig_height = pil_image.size

    # ✅ 가로 크기 비율 계산 (세로는 고정)
    ratio = height / orig_height
    new_width = int(orig_width * ratio)
    new_height = height  # 세로는 고정

    # ✅ 리사이즈 후 반환
    return pil_image.resize((new_width, new_height), Image.LANCZOS)

def pil_to_bytes(pil_image: Image.Image, fmt='PNG') -> bytes:
    """ PIL 이미지를 PNG 바이트로 변환 """
    buffer = io.BytesIO()
    pil_image.save(buffer, format=fmt)
    return buffer.getvalue()
