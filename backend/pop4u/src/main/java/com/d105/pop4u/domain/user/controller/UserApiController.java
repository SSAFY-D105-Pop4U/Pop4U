package com.d105.pop4u.domain.user.controller;

import com.d105.pop4u.domain.user.dto.*;
import com.d105.pop4u.domain.user.service.TokenService;
import com.d105.pop4u.domain.user.service.UserService;
import com.d105.pop4u.global.config.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class UserApiController {

    private final UserService userService;
    private final TokenService tokenService;

    // 회원가입 (POST /user/join)
    @PostMapping("/join")
    public ResponseEntity<BaseResponse<Void>> join(@RequestBody AddUserRequest request) {
        Long userId = userService.userJoin(request); // 회원 가입 메서드 호출
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "회원가입이 완료되었습니다."));
    }

    // 로그인 (POST /user/login)
    @PostMapping("/login")
    public ResponseEntity<BaseResponse<TokenResponse>> login(@RequestBody LoginRequest request) {
        TokenResponse tokens = tokenService.login(request.getEmail(), request.getPassword()); // 로그인 메서드 호출

//        // 액세스 토큰을 세션에 저장
//        response.setHeader("Authorization", "Bearer " + tokens.getAccessToken());

        // 사용자 ID를 포함한 응답 생성
//        TokenResponse response = new TokenResponse(tokens.getAccessToken(), tokens.getRefreshToken(), userService.findByUserId();
        // Bearer 형식으로 액세스 토큰 설정
        tokens.setAccessToken(tokens.getBearerAccessToken());

        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "로그인이 완료되었습니다.", tokens)); // 액세스 + 리프레쉬 토큰 반환
    }

    // 로그아웃 (POST /user/logout)
    @PostMapping("/logout")
    public ResponseEntity<BaseResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "로그아웃이 완료되었습니다."));
    }

    // 회원 정보 조회 (GET /user)
    @GetMapping
    public ResponseEntity<BaseResponse<UserResponse>> getUserInfo() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        UserResponse userResponse = userService.getUserInfo(email); // 회원 정보 조회
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "회원 정보 조회 성공", userResponse));
    }

    // 회원 정보 수정 (PATCH /user/edit)
    @PatchMapping("/edit")
    public ResponseEntity<BaseResponse<Void>> editUserInfo(@RequestBody EditUserRequest request) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        userService.editUserInfo(email, request); // 회원 정보 수정
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "회원 정보 수정이 완료되었습니다."));
    }

    // 회원 탈퇴 (DELETE /user)
    @DeleteMapping
    public ResponseEntity<BaseResponse<Void>> deactivateUser() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        userService.deactivateUser(email); // 회원 비활성화
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "회원 탈퇴가 완료되었습니다."));
    }
}
