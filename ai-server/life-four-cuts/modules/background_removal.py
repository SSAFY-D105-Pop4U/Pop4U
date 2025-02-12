# modules/background_removal.py
from rembg import remove
from PIL import Image
import io

def remove_background(image_bytes: bytes) -> Image.Image:
    """
    배경 제거 후 RGBA 이미지 반환.
    만약 입력 이미지가 이미 투명한 배경(RGBA)이라면 그대로 반환하여 불필요한 처리를 피합니다.
    """
    input_image = Image.open(io.BytesIO(image_bytes))
    
    # 이미지가 RGBA이고, 알파 채널이 완전 불투명(255)만 아니라면(즉, 일부 투명하다면)
    # 이미 배경이 제거된 것으로 판단하여 그대로 반환
    if input_image.mode == "RGBA":
        alpha = input_image.split()[-1]
        if alpha.getextrema() != (255, 255):
            return input_image.convert("RGBA")
    
    # rembg로 배경제거 (필요시 rembg 옵션 추가 조정 가능)
    processed = remove(image_bytes)
    img_no_bg = Image.open(io.BytesIO(processed)).convert("RGBA")
    
    # (옵션) 후처리: 흰색이 많이 남을 경우 알파 채널 threshold 처리 등을 추가할 수 있음.
    return img_no_bg
