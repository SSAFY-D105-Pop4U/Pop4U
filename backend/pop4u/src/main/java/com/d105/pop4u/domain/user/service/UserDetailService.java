package com.d105.pop4u.domain.user.service;

import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
// 스프링 시큐리티에서 사용자 정보를 가져오는 인터페이스
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    // 사용자 이름(email)으로 사용자의 정보를 가져오는 메서드
    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUserEmail(username)
                .orElseThrow(() -> new IllegalArgumentException((username)));
    }
}
