package com.d105.pop4u.domain.user.service;

import com.d105.pop4u.domain.user.dto.UserResponse;
import com.d105.pop4u.domain.user.dto.CouponResponse;
import com.d105.pop4u.domain.user.dto.EditUserRequest;
import com.d105.pop4u.domain.user.dto.AddUserRequest;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public Long brandJoin(AddUserRequest dto) {
        LocalDateTime now = LocalDateTime.now();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        return userRepository.save(User.builder()
                .userStatus(1)
                .userName(dto.getUserName())
                .userNickname(dto.getUserName())
                .userEmail(dto.getUserEmail())
                .userPassword(encoder.encode(dto.getUserPassword()))
                .userTelephone(dto.getUserTelephone())
                .userImg("")
                .userDeleted(1)
                .userCoupon(0)
                .userUncheckedAlarm(0)
                .userRefreshToken("")
                .userCreatedAt(now)
                .userUpdatedAt(now)
                .build()
        ).getUserId();
    }

    public User findByUserId(Long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    public User findByUserEmail(String email) {
        return userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    // 회원 정보 조회
    public UserResponse getUserInfo(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return new UserResponse(user.getUserId(), user.getUserNickname(), user.getUserNickname(),
                user.getUserEmail(), user.getUserTelephone(), user.getUserImg());
    }

    // 회원 쿠폰 조회
    public CouponResponse getUserCoupons(String email) {
        // 실제 쿠폰 조회 로직은 추가해야 합니다.
        // 예시로 쿠폰 리스트를 반환
        List<String> coupons = List.of("쿠폰1", "쿠폰2", "쿠폰3");
        return new CouponResponse(coupons);
    }

    // 내 정보 수정
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

    // 회원 탈퇴 (비활성화)
    public void deactivateUser(String email) {
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 사용자 비활성화 처리
        user.setUserDeleted(0); // 비활성화 상태로 변경 (예: 0이 비활성화 상태)
        userRepository.save(user); // 상태 변경 저장
    }
}
