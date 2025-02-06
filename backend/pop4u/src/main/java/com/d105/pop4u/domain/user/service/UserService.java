package com.d105.pop4u.domain.user.service;

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
}
