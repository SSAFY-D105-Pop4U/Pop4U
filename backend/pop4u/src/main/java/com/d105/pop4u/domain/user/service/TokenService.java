package com.d105.pop4u.domain.user.service;

import com.d105.pop4u.domain.user.dto.TokenResponse;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import com.d105.pop4u.global.config.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder; // 비밀번호 암호화를 위한 인코더 추가

    public String createNewAccessToken(String refreshToken) {
        if (!tokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected token");
        }

        Long userId = refreshTokenService.findByUserRefreshToken(refreshToken).getUserId();
        User user = userService.findByUserId(userId);

        return tokenProvider.generateToken(user, Duration.ofHours(2));
    }

    public TokenResponse login(String email, String password) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 비밀번호 검증
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 액세스 토큰과 리프레시 토큰 생성
        String accessToken = tokenProvider.generateToken(user, Duration.ofHours(480)); // 나중에 시간 바꿀 것. (1~2시간)
        String refreshToken = refreshTokenService.createRefreshToken(user.getUserId());

        TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);

        // 리프레시 토큰 데이터베이스에 저장
        refreshTokenService.saveRefreshToken(user.getUserId(), refreshToken);

        return tokenResponse; // 액세스 토큰 반환
    }
}
