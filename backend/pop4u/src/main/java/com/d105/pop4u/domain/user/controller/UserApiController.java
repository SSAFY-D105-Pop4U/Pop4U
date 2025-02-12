package com.d105.pop4u.domain.user.controller;

import com.d105.pop4u.domain.user.dto.UserInfo;
import com.d105.pop4u.domain.user.dto.UserResponse;
import com.d105.pop4u.domain.user.dto.EditUserRequest;
import com.d105.pop4u.domain.user.service.UserService;
import com.d105.pop4u.global.config.BaseResponse;
import com.d105.pop4u.global.config.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

import java.io.IOException;

@RequestMapping("/user")
@RequiredArgsConstructor
@Controller
public class UserApiController {

    private final UserService userService;
    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId; // application.yml에서 클라이언트 ID를 가져옵니다.

    @GetMapping("/login")
    public ResponseEntity<Void> login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 요청에서 쿠키를 가져옵니다.
        Cookie[] cookies = request.getCookies();
        boolean hasAuthCookie = false;

        // 쿠키 확인
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("oauth2_auth_request".equals(cookie.getName())) {
                    hasAuthCookie = true;
                    break;
                }
            }
        }

        if (!hasAuthCookie) {
            // 새로운 OAuth2AuthorizationRequest 생성
            OAuth2AuthorizationRequest authorizationRequest = OAuth2AuthorizationRequest
                    .authorizationCode()
                    .clientId(clientId) // 클라이언트 ID를 가져옵니다.
                    .redirectUri("http://localhost:8080/login/oauth2/code/google") // 리디렉션 URI
                    .scope("email", "profile") // 요청할 스코프
                    .authorizationUri("https://accounts.google.com/o/oauth2/auth") // 구글의 인증 URI
                    .build();

            // 쿠키에 저장
            authorizationRequestRepository.saveAuthorizationRequest(authorizationRequest, request, response);
        }

        // 구글 인증 엔드포인트로 리디렉션
        response.sendRedirect("http://localhost:5173/");
        return ResponseEntity.status(HttpStatus.FOUND).build(); // 302 FOUND 응답
    }

    // 이건 전리품으로 냅두자. 화가나요
//    @GetMapping("/login/oauth2/code/google")
//    public ResponseEntity<Void> googleCallback(@RequestParam String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
//        // Google OAuth2 클라이언트를 사용하여 토큰 요청
//        String accessToken = userService.getAccessTokenFromGoogle(code); // 토큰 요청 메소드
//        UserInfo userInfo = userService.getUserInfoFromGoogle(accessToken); // 사용자 정보 요청 메소드
//
//        // 사용자 정보를 세션에 저장
//        request.getSession().setAttribute("user", userInfo);
//
//        // 리액트 앱의 메인 페이지로 리디렉션
//        response.sendRedirect("http://localhost:5173/");
//        return ResponseEntity.status(HttpStatus.FOUND).build(); // 302 FOUND 응답
//    }

    @GetMapping("/join")
    public String join() {
        return "join";
    }

    // 회원 정보 조회 (GET /user)
    @GetMapping
    @ResponseBody
    public ResponseEntity<BaseResponse<UserResponse>> getUserInfo() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        UserResponse userResponse = userService.getUserInfo(email); // 사용자 정보 조회
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "회원 정보 조회 성공", userResponse));
    }

    // 로그아웃 (POST /user/logout)
    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<BaseResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "로그아웃이 완료되었습니다."));
    }

    // 내 정보 수정 (PATCH /user/edit)
    @PatchMapping("/edit")
    @ResponseBody
    public ResponseEntity<BaseResponse<Void>> editUserInfo(@RequestBody EditUserRequest request) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        userService.editUserInfo(email, request); // 사용자 정보 수정
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "회원 정보 수정이 완료되었습니다."));
    }

    // 회원 탈퇴 (DELETE /user)
    @DeleteMapping
    @ResponseBody
    public ResponseEntity<BaseResponse<Void>> deleteUser() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        userService.deactivateUser(email); // 사용자 비활성화
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "회원 탈퇴가 완료되었습니다."));
    }
}
