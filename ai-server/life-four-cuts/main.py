from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from typing import Optional
from PIL import Image
import io, uuid, logging
import boto3
import os
from datetime import datetime
from pathlib import Path

from modules.background_removal import remove_background
from modules.sticker_effect import apply_sticker_effect
from modules.utils import resize_image, pil_to_bytes

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 환경변수 확인 및 검증
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

if not all([S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY]):
    missing_vars = [var for var, val in {
        "S3_BUCKET_NAME": S3_BUCKET_NAME,
        "AWS_ACCESS_KEY_ID": AWS_ACCESS_KEY_ID,
        "AWS_SECRET_ACCESS_KEY": AWS_SECRET_ACCESS_KEY
    }.items() if not val]
    logger.error(f"Missing required environment variables: {', '.join(missing_vars)}")
    raise ValueError("Missing required environment variables")

logger.info(f"Initialized with bucket: {S3_BUCKET_NAME}")
logger.info("AWS credentials are properly set")

app = FastAPI()

# S3 클라이언트 설정
s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

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
    try:
        logger.info(f"Processing image for popup_id: {popup_id}")
        
        # 파일 읽기
        raw_bytes = await file.read()
        pil_img = Image.open(io.BytesIO(raw_bytes)).convert("RGBA")
        logger.debug("Successfully read input image")

        # 배경 제거
        if remove_bg:
            logger.debug("Removing background")
            pil_img = remove_background(raw_bytes)

        # 스티커 효과 적용
        if sticker:
            logger.debug("Applying sticker effect")
            pil_img = apply_sticker_effect(pil_img)

        # 리사이즈
        logger.debug(f"Resizing image to {width}x{height}")
        pil_img = resize_image(pil_img, width, height)

        # PNG 바이트 변환
        out_bytes = pil_to_bytes(pil_img, fmt="PNG")

        # S3 업로드
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_key = f"icons/{popup_id}/{timestamp}.png"
        
        logger.info(f"Uploading to S3: {file_key}")
        s3_client.upload_fileobj(
            io.BytesIO(out_bytes), 
            S3_BUCKET_NAME, 
            file_key, 
            ExtraArgs={"ContentType": "image/png"}
        )

        # S3 URL 생성
        s3_url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{file_key}"
        logger.info(f"Successfully uploaded to: {s3_url}")

        return JSONResponse({"s3_url": s3_url, "file_key": file_key})
        
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )