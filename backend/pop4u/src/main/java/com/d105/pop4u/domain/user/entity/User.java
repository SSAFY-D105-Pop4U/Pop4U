package com.d105.pop4u.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "user_status", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '0'")
    private int userStatus; // (0 = 일반, 1 = 브랜드)

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_telephone", nullable = false)
    private String userTelephone;

    @Column(name = "user_img", nullable = false)
    private String userImg;

    @Column(name = "user_deleted", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '1'")
    private int userDeleted; // (0 = 비활성화(삭제), 1 = 활성화)

    @Column(name = "user_coupon")
    private int userCoupon;

    @Column(name = "user_unchecked_alarm", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '0'")
    private int userUncheckedAlarm;

    @Column(name = "user_refresh_token")
    private String userRefreshToken; // 일반 회원 전용 (소셜 로그인)

    @Column(name = "user_created_at", nullable = false)
    private LocalDateTime userCreatedAt;

    @Column(name = "user_updated_at", nullable = false)
    private LocalDateTime userUpdatedAt;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userStatus == 1 ? "brand" : "user"));
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    // 사용자 이름 변경
    public User updateUserNickname(String nickname) {
        this.userNickname = nickname;
        return this;
    }

    public User updateUserRefreshToken(String refreshtoken) {
        this.userRefreshToken = refreshtoken;
        return this;
    }

    // 리프레시 토큰 설정 메서드 추가
    public void setUserRefreshToken(String refreshToken) {
        this.userRefreshToken = refreshToken;
    }
}
