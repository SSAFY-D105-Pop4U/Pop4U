package com.d105.pop4u.global.config.oauth;

import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class OAuth2UserCustomService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
        saveOrUpdate(user);

        return user;
    }

    private User saveOrUpdate(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        LocalDateTime now = LocalDateTime.now();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = userRepository.findByUserEmail(email)
                .map(entity -> entity.updateUserNickname(name))
                .orElse(User.builder()
                        .userEmail(email)
                        .userNickname(name)
                        .userStatus(0)
                        .userName(name)
                        .userNickname(name)
                        .userEmail(email)
                        .userPassword(encoder.encode(""))
                        .userTelephone("")
                        .userImg("")
                        .userDeleted(1)
                        .userCoupon(0)
                        .userUncheckedAlarm(0)
                        .userRefreshToken("")
                        .userCreatedAt(now)
                        .userUpdatedAt(now)
                        .build());

        return userRepository.save(user);
    }
}
