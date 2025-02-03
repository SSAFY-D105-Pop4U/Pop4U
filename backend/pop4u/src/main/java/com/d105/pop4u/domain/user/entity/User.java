package com.d105.pop4u.domain.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User implements UserDetails {

    @Id
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "user_status", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '0'")
    private String userStatus; // (0 = 일반, 1 = 관리자)

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    @Column(name = "user_email", nullable = false, unique = true) // jpa를 위한 unique 값? db에선 create 할 때 따로 걸어야함.
    private String userEmail;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_telephone", nullable = false)
    private String userTelephone;

    @Column(name = "user_img", nullable = false)
    private String userImg;

    @Column(name = "user_deleted", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '1'")
    private String userDeleted; // (0 = 비활성화(삭제), 1 = 활성화)

    @Column(name = "user_coupon")
    private String userCoupon;

    @Column(name = "user_checked_alarm", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '0'")
    private String userCheckedAlarm;

    @Column(name = "user_refresh_token")
    private String userRefreshToken; // 일반 회원 전용 (소셜 로그인)

    @Column(name = "user_created_at", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT NOW()")
    private String userCreatedAt;

    @Column(name = "user_updated_at", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT NOW()")
    private String userUpdatedAt;

    @Builder
    public User(String userId, String userStatus, String userName, String userNickname, String userEmail, String userPassword,
                String userTelephone, String userImg, String userDeleted, String userCoupon,
                String userCheckedAlarm, String userRefreshToken, String userCreatedAt, String userUpdatedAt) {
        this.userId = userId;
        this.userStatus = userStatus;
        this.userName = userName;
        this.userNickname = userNickname;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userTelephone = userTelephone;
        this.userImg = userImg;
        this.userDeleted = userDeleted;
        this.userCoupon = userCoupon;
        this.userCheckedAlarm = userCheckedAlarm;
        this.userRefreshToken = userRefreshToken;
        this.userCreatedAt = userCreatedAt;
        this.userUpdatedAt = userUpdatedAt;
    }

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
        return List.of(new SimpleGrantedAuthority(userStatus.equals("1") ? "brand" : "user"));
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }
}