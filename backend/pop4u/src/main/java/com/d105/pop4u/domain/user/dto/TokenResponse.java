package com.d105.pop4u.domain.user.dto;

import com.d105.pop4u.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
    private Long userId;
    private Integer userStatus;
    private String userName;
    private String userNickname;
    private String userEmail;
    private String userTelephone;
    private String userImg;
    private Integer userCoupon;
    private Integer userUncheckedAlarm;

    public TokenResponse(String accessToken, String refreshToken, Long userId, String userNickname) {
    }

    // 액세스 토큰을 Bearer 형식으로 반환하는 메서드
    public String getAccessToken() {
        return accessToken;
    }
}
