package com.d105.pop4u.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CouponResponse {
    private List<String> coupons; // 쿠폰 리스트
}
