package com.d105.pop4u.domain.category.repository;

import com.d105.pop4u.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryName(String categoryName); // ✅ 중복 방지
}
