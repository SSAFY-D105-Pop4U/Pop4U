package com.d105.pop4u.domain.user.repository;

import com.d105.pop4u.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String email);   // email로 사용자 정보를 가져옴
    Optional<User> findByUserId(Long userId);
    Optional<User> findByUserRefreshToken(String userRefreshToken);
}
