package com.d105.pop4u.global.service;

import com.d105.pop4u.global.config.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FastApiService {
    private final String FASTAPI_URL = "http://i12d105.p.ssafy.io:8000/process_image";  // FastAPI 배경제거 + 스티커 엔드포인트
    private final S3Service s3Service;  // ✅ S3 업로드 서비스 추가
    private final RestTemplate restTemplate; // ✅ RestTemplate 의존성 주입

    public String processImageAndUpload(MultipartFile file, String popupId) throws IOException {
        // ✅ FastAPI에 multipart/form-data 요청 구성
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());
        body.add("popup_id", popupId);
        body.add("remove_bg", true);  // 배경제거 옵션
        body.add("sticker", true);  // 스티커 효과 옵션
        body.add("width", 256);  // 리사이즈 옵션
        body.add("height", 256);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // ✅ FastAPI 요청 후 응답 받기
        ResponseEntity<Map> response = restTemplate.postForEntity(FASTAPI_URL, requestEntity, Map.class);

        if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null) {
            throw new IOException("FastAPI 서버로부터 유효한 응답을 받지 못했습니다.");
        }

        // ✅ FastAPI에서 반환한 S3 업로드된 파일 URL 반환
        return response.getBody().get("s3_url").toString();
    }
}
