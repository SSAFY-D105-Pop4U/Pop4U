package com.d105.pop4u.domain.category.repository;

import com.d105.pop4u.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // ✅ 모든 카테고리 조회
    List<Category> findAll();

    // ✅ 특정 이름의 카테고리 조회
    Category findByCategoryName(String categoryName);
}
