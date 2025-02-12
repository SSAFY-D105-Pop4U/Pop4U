package com.d105.pop4u.domain.user.service;

import com.d105.pop4u.domain.user.dto.UserInfo;
import com.d105.pop4u.domain.user.dto.UserResponse;
import com.d105.pop4u.domain.user.dto.EditUserRequest;
import com.d105.pop4u.domain.user.dto.AddUserRequest;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.jose.shaded.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod; // 추가


import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId; // 클라이언트 ID

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret; // 클라이언트 비밀키

    // 브랜드 회원 가입 (폼로그인)
    public Long brandJoin(AddUserRequest dto) {
        LocalDateTime now = LocalDateTime.now();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        return userRepository.save(User.builder()
                .userStatus(1)
                .userName(dto.getUserName())
                .userNickname(dto.getUserName())
                .userEmail(dto.getUserEmail())
                .userPassword(encoder.encode(dto.getUserPassword()))
                .userTelephone(dto.getUserTelephone())
                .userImg("")
                .userDeleted(1)
                .userCoupon(0)
                .userUncheckedAlarm(0)
                .userRefreshToken("")
                .userCreatedAt(now)
                .userUpdatedAt(now)
                .build()
        ).getUserId();
    }

    // 이것도 전리품. 지우지 말기 화나기!
//    // Google에서 받은 code로 액세스 토큰을 요청하는 메서드
//    public String getAccessTokenFromGoogle(String code) {
//        String tokenEndpoint = "https://oauth2.googleapis.com/token";
//
//        // 요청 본문 구성
//        String body = "code=" + code +
//                "&client_id=" + clientId + // 클라이언트 ID
//                "&client_secret=" + clientSecret + // 클라이언트 비밀키
//                "&redirect_uri=http://localhost:8080/login/oauth2/code/google" + // 리디렉션 URI
//                "&grant_type=authorization_code";
//
//        // 요청 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        // 요청 엔티티 생성
//        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);
//
//        // RestTemplate을 사용하여 POST 요청
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> response = restTemplate.exchange(tokenEndpoint, HttpMethod.POST, requestEntity, String.class);
//
//        // 응답에서 액세스 토큰 추출
//        return extractAccessToken(response.getBody());
//    }
//
//    // JSON 응답에서 액세스 토큰을 추출하는 메서드
//    private String extractAccessToken(String responseBody) {
//        // JSON 파싱
//        JsonObject jsonObject = JsonParser.parseString(responseBody).getAsJsonObject();
//        // access_token 필드에서 값을 추출
//        return jsonObject.get("access_token").getAsString();
//    }
//
//    // 액세스 토큰을 사용하여 사용자 정보를 요청하는 메서드
//    public UserInfo getUserInfoFromGoogle(String accessToken) {
//        String userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
//
//        // 요청 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(accessToken); // Bearer 토큰 설정
//
//        // 요청 엔티티 생성
//        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
//
//        // RestTemplate을 사용하여 GET 요청
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> response = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, requestEntity, String.class);
//
//        // 응답에서 사용자 정보 추출
//        return extractUserInfo(response.getBody());
//    }
//
//    // JSON 응답에서 사용자 정보를 추출하는 메서드
//    private UserInfo extractUserInfo(String responseBody) {
//        // JSON 파싱하여 UserInfo 객체로 변환
//        JsonObject jsonObject = JsonParser.parseString(responseBody).getAsJsonObject();
//
//        UserInfo userInfo = new UserInfo();
//        userInfo.setSub(jsonObject.get("sub").getAsString());
//        userInfo.setEmail(jsonObject.get("email").getAsString());
//        userInfo.setName(jsonObject.get("name").getAsString());
//        userInfo.setPicture(jsonObject.get("picture").getAsString());
//
//        return userInfo;
//    }

    public User findByUserId(Long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    public User findByUserEmail(String email) {
        return userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    // 일반 회원 정보 조회
    public UserResponse getUserInfo(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return new UserResponse(user.getUserId(), user.getUserNickname(), user.getUserNickname(),
                user.getUserEmail(), user.getUserTelephone(), user.getUserImg());
    }

    // 일반 회원 정보 수정
    public void editUserInfo(String email, EditUserRequest request) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 수정할 정보 업데이트
        if (request.getUserNickname() != null) {
            user.setUserNickname(request.getUserNickname());
        }
        if (request.getUserTelephone() != null) {
            user.setUserTelephone(request.getUserTelephone());
        }
        if (request.getUserImg() != null) {
            user.setUserImg(request.getUserImg());
        }
        userRepository.save(user); // 수정된 사용자 정보 저장
    }

    // 일반 회원 탈퇴 (비활성화)
    public void deactivateUser(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 사용자 비활성화 처리
        user.setUserDeleted(0); // 비활성화 상태로 변경 (예: 0이 비활성화 상태)
        userRepository.save(user); // 상태 변경 저장
    }

    // 브랜드 회원 정보 조회
    public UserResponse getBrandInfo(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("브랜드 회원을 찾을 수 없습니다."));
        return new UserResponse(user.getUserId(), user.getUserNickname(), user.getUserNickname(),
                user.getUserEmail(), user.getUserTelephone(), user.getUserImg());
    }

    // 브랜드 회원 정보 수정
    public void editBrandInfo(String email, EditUserRequest request) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("브랜드 회원을 찾을 수 없습니다."));

        // 수정할 정보 업데이트
        if (request.getUserNickname() != null) {
            user.setUserNickname(request.getUserNickname());
        }
        if (request.getUserTelephone() != null) {
            user.setUserTelephone(request.getUserTelephone());
        }
        if (request.getUserImg() != null) {
            user.setUserImg(request.getUserImg());
        }
        userRepository.save(user); // 수정된 브랜드 회원 정보 저장
    }

    // 브랜드 회원 탈퇴 (비활성화)
    public void deactivateBrand(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("브랜드 회원을 찾을 수 없습니다."));

        // 브랜드 회원 비활성화 처리
        user.setUserDeleted(0); // 비활성화 상태로 변경 (예: 0이 비활성화 상태)
        userRepository.save(user); // 상태 변경 저장
    }
}
