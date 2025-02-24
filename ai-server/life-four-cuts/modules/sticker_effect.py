# modules/sticker_effect.py
from PIL import Image, ImageChops, ImageFilter

def apply_sticker_effect(
    pil_image: Image.Image, 
    outline_width: int = 5,  # 얇은 검은 테두리를 위해 기본값을 2로 설정
    shadow_offset: tuple = (5, 5), 
    blur_radius: int = 5, 
    margin: int = 20
) -> Image.Image:
    """
    스티커 효과: 얇은 검은 테두리와 그림자 효과 적용.
    (하얀 테두리는 제거됨)
    
    매개변수:
      - outline_width: 테두리 두께 (팽창 크기)
      - shadow_offset: 그림자 오프셋 (x, y)
      - blur_radius: 그림자 블러 반경
      - margin: 원본 이미지 주위에 추가할 여백 
    """
    # 1. 원본 이미지에 margin(여백) 추가
    width, height = pil_image.size
    padded = Image.new('RGBA', (width + 2 * margin, height + 2 * margin), (0, 0, 0, 0))
    padded.paste(pil_image, (margin, margin))
    
    # 2. 알파 채널을 이용하여 확장된 알파 채널(팽창) 생성 – 객체 경계 확장
    alpha = padded.split()[-1]
    expanded_alpha = alpha.filter(ImageFilter.MaxFilter(outline_width * 2 + 1))
    
    # 3. 원본 알파와 확장된 알파의 차이를 계산하여 테두리 영역 마스크 생성
    outline_mask = ImageChops.subtract(expanded_alpha, alpha)
    
    # 4. 테두리 레이어 생성 (검은색 테두리)
    outline_layer = Image.new('RGBA', padded.size, (0, 0, 0, 255))
    outline_layer.putalpha(outline_mask)
    
    # 5. 테두리 레이어와 원본(padded) 합성 → 검은 테두리 적용
    with_outline = Image.alpha_composite(outline_layer, padded)
    
    # 6. 그림자 효과를 위해 원본보다 약간 더 큰 캔버스 생성
    canvas_size = (with_outline.width + margin, with_outline.height + margin)
    canvas = Image.new('RGBA', canvas_size, (0, 0, 0, 0))
    
    # 7. 그림자 생성: with_outline의 알파 채널을 이용하여 그림자 레이어 생성
    shadow = Image.new('RGBA', with_outline.size, (0, 0, 0, 128))
    shadow.putalpha(with_outline.split()[-1])
    
    # 8. 그림자를 캔버스에 오프셋 위치에 붙여넣고, 블러 처리
    canvas.paste(shadow, (margin + shadow_offset[0], margin + shadow_offset[1]))
    canvas = canvas.filter(ImageFilter.GaussianBlur(blur_radius))
    
    # 9. 테두리 적용된 원본 이미지를 그림자 위에 붙여넣기
    canvas.paste(with_outline, (margin, margin), with_outline)
    
    return canvas
