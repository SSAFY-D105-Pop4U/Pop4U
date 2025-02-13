package com.d105.pop4u.domain.user.service;

import com.d105.pop4u.domain.user.dto.UserResponse;
import com.d105.pop4u.domain.user.dto.EditUserRequest;
import com.d105.pop4u.domain.user.dto.AddUserRequest;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;

    // 회원 가입 (폼로그인)
    public Long userJoin(AddUserRequest dto) {
        LocalDateTime now = LocalDateTime.now();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // 사용자 저장
        User user = User.builder()
                .userStatus(dto.getRole()) // 0: 일반회원, 1: 관리자
                .userName(dto.getUserName())
                .userNickname(dto.getUserName())
                .userEmail(dto.getUserEmail())
                .userPassword(encoder.encode(dto.getUserPassword()))
                .userTelephone(dto.getUserTelephone())
                .userImg("")
                .userDeleted(1)
                .userCoupon(0)
                .userUncheckedAlarm(0)
                .userRefreshToken("") // 초기 리프레시 토큰은 비워두기
                .userCreatedAt(now)
                .userUpdatedAt(now)
                .build();

        // 사용자 저장
        User savedUser = userRepository.save(user);

        // 리프레시 토큰 생성 및 저장
        String refreshToken = refreshTokenService.createRefreshToken(savedUser.getUserId());

        // 생성된 리프레시 토큰을 사용자에 저장
        savedUser.setUserRefreshToken(refreshToken);
        userRepository.save(savedUser); // 변경 사항 저장

        return savedUser.getUserId(); // 생성된 사용자 ID 반환
    }

    // 사용자 조회
    public UserResponse getUserInfo(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return new UserResponse(user.getUserId(), user.getUserNickname(), user.getUserNickname(),
                user.getUserEmail(), user.getUserTelephone(), user.getUserImg());
    }

    // 사용자 정보 수정
    public void editUserInfo(String email, EditUserRequest request) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 수정할 정보 업데이트
        if (request.getUserNickname() != null) {
            user.setUserNickname(request.getUserNickname());
        }
        if (request.getUserTelephone() != null) {
            user.setUserTelephone(request.getUserTelephone());
        }
        if (request.getUserImg() != null) {
            user.setUserImg(request.getUserImg());
        }
        userRepository.save(user); // 수정된 사용자 정보 저장
    }

    // 사용자 탈퇴 (비활성화)
    public void deactivateUser(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 사용자 비활성화 처리
        user.setUserDeleted(0); // 비활성화 상태로 변경 (예: 0이 비활성화 상태)
        userRepository.save(user); // 상태 변경 저장
    }

    public User findByUserId(Long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    public User findByUserEmail(String email) {
        return userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }


}
