package com.d105.pop4u.domain.user.controller;

import com.d105.pop4u.domain.user.dto.UserResponse;
import com.d105.pop4u.domain.user.dto.EditUserRequest;
import com.d105.pop4u.domain.user.service.UserService;
import com.d105.pop4u.global.config.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("/user")
@RequiredArgsConstructor
@Controller
public class UserViewController {

    private final UserService userService;

    @GetMapping("/login")
    public String login() {
        return "oauthLogin";
    }

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
