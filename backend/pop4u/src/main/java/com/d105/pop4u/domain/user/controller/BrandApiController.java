package com.d105.pop4u.domain.user.controller;

import com.d105.pop4u.domain.user.dto.AddUserRequest;
import com.d105.pop4u.domain.user.dto.LoginRequest;
import com.d105.pop4u.domain.user.dto.TokenResponse;
import com.d105.pop4u.domain.user.service.TokenService;
import com.d105.pop4u.domain.user.service.UserService;
import com.d105.pop4u.global.config.BaseResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/brand")
@RequiredArgsConstructor
@RestController
public class BrandApiController {

    private final UserService userService;
    private final TokenService tokenService;

    @PostMapping("/join")
    public ResponseEntity<BaseResponse<Void>> join(@RequestBody AddUserRequest request) {
        Long userId = userService.brandJoin(request);  // 회원 가입 메서드 호출
//        return "성공";   // 회원 가입이 완료된 이후에 로그인 페이지로 이동
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "브랜드 회원가입이 완료되었습니다."));
    }

    @PostMapping("/login")
    public ResponseEntity<BaseResponse<TokenResponse>> login(@RequestBody LoginRequest request) {
        // 로그인 처리 로직
        TokenResponse tokens = tokenService.login(request.getEmail(), request.getPassword()); // 로그인 메서드 호출
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "브랜드 로그인이 완료되었습니다.", tokens)); // 액세스 + 리프레쉬 토큰 반환
    }

    @PostMapping("/logout")
    public ResponseEntity<BaseResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        // DB에서 refreshToken 빈 문자열로 업데이트
        // FE에서 accessToken, refreshToken 저장한거 삭제하기
        
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "브랜드 로그아웃이 완료되었습니다."));
    }
}
