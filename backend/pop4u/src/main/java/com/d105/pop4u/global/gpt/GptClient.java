//package com.d105.pop4u.global.gpt;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.Data;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.Map;
//
//@Component
//@RequiredArgsConstructor
//public class GptClient {
//
//    private final RestTemplate restTemplate;
//    private final ObjectMapper objectMapper;
//
//    @Value("${openai.api-key}")
//    private String apiKey;
//
//    @Value("${openai.api-url}")
//    private String apiUrl;
//
//    @Value("${openai.model}")
//    private String model;
//
//    /**
//     * 주어진 프롬프트에 대해 GPT API를 호출하여 요약 결과를 반환합니다.
//     *
//     * @param prompt 프롬프트 문자열
//     * @return GPT가 생성한 요약 결과 텍스트
//     */
//    public String getSummary(String prompt) {
//        // GPT API 호출을 위한 요청 바디 구성 (예시: ChatCompletion 방식)
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("model", model);
//        // messages 배열 구성 (시스템 프롬프트, 유저 프롬프트 등 필요에 따라 추가)
//        Map<String, String> userMessage = new HashMap<>();
//        userMessage.put("role", "user");
//        userMessage.put("content", prompt);
//        requestBody.put("messages", Collections.singletonList(userMessage));
//        requestBody.put("temperature", 0.7);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(apiKey);
//
//        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(requestBody, headers);
//
//        ResponseEntity<GptResponse> responseEntity = restTemplate.postForEntity(apiUrl, httpEntity, GptResponse.class);
//        if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
//            // GPT API의 응답에서 요약된 내용을 추출 (응답 구조는 API 문서를 참고)
//            return responseEntity.getBody().getSummary();
//        } else {
//            throw new RuntimeException("GPT API 호출 실패: " + responseEntity.getStatusCode());
//        }
//    }
//
//    // 응답 DTO (응답 구조에 따라 아래 클래스는 수정이 필요)
//    @Data
//    public static class GptResponse {
//        @JsonProperty("choices")
//        private Choice[] choices;
//
//        public String getSummary() {
//            if (choices != null && choices.length > 0) {
//                // 예시: choices[0].message.content에 요약 내용이 있다고 가정
//                return choices[0].getMessage().getContent();
//            }
//            return "";
//        }
//
//        @Data
//        public static class Choice {
//            private Message message;
//        }
//
//        @Data
//        public static class Message {
//            private String role;
//            private String content;
//        }
//    }
//}
