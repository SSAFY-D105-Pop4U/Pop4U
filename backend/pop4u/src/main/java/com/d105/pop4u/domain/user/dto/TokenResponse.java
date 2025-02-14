package com.d105.pop4u.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
    private Long userId; // 로그인 시 사용자 ID도 같이 줌.

    // 액세스 토큰을 Bearer 형식으로 반환하는 메서드 추가
    public String getBearerAccessToken() {
        return accessToken;
    }
}
