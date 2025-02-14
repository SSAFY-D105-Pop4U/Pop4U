package com.d105.pop4u.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfo {
    private String sub; // 사용자 ID
    private String email; // 이메일
    private String name; // 이름
    private String picture; // 프로필 사진 URL

}
