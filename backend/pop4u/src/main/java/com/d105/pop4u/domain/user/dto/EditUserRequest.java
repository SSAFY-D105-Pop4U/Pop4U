package com.d105.pop4u.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditUserRequest {
    private String userNickname;  // 수정할 닉네임
    private String userTelephone;  // 수정할 전화번호
    private String userImg;       // 수정할 이미지 URL
}
