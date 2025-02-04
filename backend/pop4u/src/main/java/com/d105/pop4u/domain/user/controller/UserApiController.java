package com.d105.pop4u.domain.user.controller;

import com.d105.pop4u.domain.user.dto.AddUserRequest;
import com.d105.pop4u.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserApiController {

    private final UserService userService;

    @PostMapping("/user/join")
    public String signup(@RequestBody AddUserRequest request) {
        userService.save(request);  // 회원 가입 메서드 호출
        return "성공";   // 회원 가입이 완료된 이후에 로그인 페이지로 이동
    }
}
