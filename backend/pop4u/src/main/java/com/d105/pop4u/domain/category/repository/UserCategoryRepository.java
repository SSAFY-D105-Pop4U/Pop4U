package com.d105.pop4u.domain.category.repository;

import com.d105.pop4u.domain.category.entity.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

    // 특정 회원의 관심 카테고리 목록 조회 (User 엔티티의 userId 필드를 기준으로)
    List<UserCategory> findByUser_UserId(Long userId);

    // 특정 회원의 기존 매핑 삭제
    void deleteByUser_UserId(Long userId);

}
