# app.py
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from typing import Optional
from PIL import Image
import io, uuid
import boto3
import os
from datetime import datetime
from dotenv import load_dotenv

from modules.background_removal import remove_background
from modules.sticker_effect import apply_sticker_effect
from modules.utils import resize_image, pil_to_bytes

# ✅ 환경 변수 로드
load_dotenv()

app = FastAPI()

# ✅ S3 클라이언트 설정
s3_client = boto3.client('s3')
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

@app.post("/process_image")
async def process_image(
    file: UploadFile = File(...),
    popup_id: str = Form(...),
    remove_bg: bool = Form(True),
    sticker: bool = Form(True),
    width: int = Form(256),
    height: int = Form(256)
):
    """ 1) 배경 제거 → 2) 스티커 효과 → 3) 리사이즈 → 4) S3 업로드 """
    
    # ✅ 파일 읽기
    raw_bytes = await file.read()
    pil_img = Image.open(io.BytesIO(raw_bytes)).convert("RGBA")

    # ✅ 배경 제거
    if remove_bg:
        pil_img = remove_background(raw_bytes)

    # ✅ 스티커 효과 적용
    if sticker:
        pil_img = apply_sticker_effect(pil_img)

    # ✅ 리사이즈
    pil_img = resize_image(pil_img, width, height)

    # ✅ PNG 바이트 변환
    out_bytes = pil_to_bytes(pil_img, fmt="PNG")

    # ✅ S3 업로드
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_key = f"icons/{popup_id}/{timestamp}.png"
    s3_client.upload_fileobj(io.BytesIO(out_bytes), S3_BUCKET_NAME, file_key, ExtraArgs={"ContentType": "image/png"})

    # ✅ S3 URL 생성
    s3_url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{file_key}"

    return JSONResponse({"s3_url": s3_url, "file_key": file_key})
