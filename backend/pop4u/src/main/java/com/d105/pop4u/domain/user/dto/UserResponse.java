package com.d105.pop4u.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {
    private Long userId;          // 사용자 ID
    private String userName;      // 사용자 이름
    private String userNickname;  // 사용자 닉네임
    private String userEmail;     // 사용자 이메일
    private String userTelephone;  // 사용자 전화번호
    private String userImg;       // 사용자 이미지 URL
}
