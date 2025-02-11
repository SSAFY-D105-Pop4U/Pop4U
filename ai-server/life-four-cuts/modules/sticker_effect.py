# modules/sticker_effect.py
from PIL import Image, ImageChops, ImageFilter
import numpy as np

def apply_sticker_effect(pil_image: Image.Image) -> Image.Image:
    """ 스티커 효과 (테두리 & 그림자) 적용 """
    alpha = pil_image.split()[-1]
    np_alpha = np.array(alpha)

    # ✅ 테두리 생성
    expanded_alpha = Image.fromarray(np_alpha).filter(ImageFilter.MaxFilter(11))
    outline_img = Image.new('RGBA', pil_image.size, color=(255,255,255,255))
    outline_img.putalpha(expanded_alpha)
    outline_only = ImageChops.difference(outline_img, pil_image)
    with_outline = Image.alpha_composite(outline_only, pil_image)

    # ✅ 그림자 생성
    shadow_offset = (5,5)
    blur_radius = 5
    shadow_color = (0,0,0,128)

    width, height = with_outline.size
    background = Image.new('RGBA', (width+20, height+20), (0,0,0,0))
    shadow = Image.new('RGBA', (width, height), color=shadow_color)
    shadow.putalpha(with_outline.split()[-1])

    x, y = 10 + shadow_offset[0], 10 + shadow_offset[1]
    background.paste(shadow, (x,y))
    background = background.filter(ImageFilter.GaussianBlur(blur_radius))
    background.paste(with_outline, (10,10), with_outline)

    return background
