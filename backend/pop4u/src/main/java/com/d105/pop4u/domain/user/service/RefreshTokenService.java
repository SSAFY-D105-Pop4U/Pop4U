package com.d105.pop4u.domain.user.service;

import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final UserRepository refreshTokenRepository;
    public User findByUserRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByUserRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));
    }
}