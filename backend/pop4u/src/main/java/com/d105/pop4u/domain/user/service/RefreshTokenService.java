package com.d105.pop4u.domain.user.service;

import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final UserRepository userRepository; // UserRepository로 변경

    public User findByUserRefreshToken(String refreshToken) {
        return userRepository.findByUserRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));
    }

    public String createRefreshToken(Long userId) {
        // 리프레시 토큰 생성 (UUID 사용)
        String refreshToken = UUID.randomUUID().toString();

        // 사용자와 리프레시 토큰 연결 (여기서는 User 엔티티에 리프레시 토큰을 저장하는 로직이 필요)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setUserRefreshToken(refreshToken); // User 엔티티에 리프레시 토큰 설정
        userRepository.save(user); // 변경 사항 저장

        return refreshToken; // 생성된 리프레시 토큰 반환
    }

    public void saveRefreshToken(Long userId, String refreshToken) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setUserRefreshToken(refreshToken); // User 엔티티에 리프레시 토큰 설정
        userRepository.save(user); // 변경 사항 저장
    }
}
