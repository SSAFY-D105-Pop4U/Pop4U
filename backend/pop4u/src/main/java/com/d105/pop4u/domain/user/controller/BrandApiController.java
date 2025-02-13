package com.d105.pop4u.domain.user.controller;

import com.d105.pop4u.domain.user.dto.*;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/brand")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
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


    // 브랜드 회원 정보 조회 (GET /brand)
    @GetMapping
    public ResponseEntity<BaseResponse<UserResponse>> getBrandInfo() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        UserResponse userResponse = userService.getBrandInfo(email); // 브랜드 회원 정보 조회
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "브랜드 회원 정보 조회 성공", userResponse));
    }

    // 브랜드 회원 정보 수정 (PATCH /brand/edit)
    @PatchMapping("/edit")
    public ResponseEntity<BaseResponse<Void>> editBrandInfo(@RequestBody EditUserRequest request) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        userService.editBrandInfo(email, request); // 브랜드 회원 정보 수정
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "브랜드 회원 정보 수정이 완료되었습니다."));
    }

    // 브랜드 회원 탈퇴 (DELETE /brand)
    @DeleteMapping
    public ResponseEntity<BaseResponse<Void>> deactivateBrand() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        userService.deactivateBrand(email); // 브랜드 회원 비활성화
        return ResponseEntity.ok(BaseResponse.create(HttpStatus.OK.value(), "브랜드 회원 탈퇴가 완료되었습니다."));
    }
}
