package com.d105.pop4u.domain.category.service;

import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    // ✅ 기본 카테고리 데이터 자동 삽입
    @PostConstruct
    public void initCategories() {
        List<String> defaultCategories = Arrays.asList(
                "이벤트", "체험", "전시", "굿즈", "패션", "뷰티", "푸드/카페",
                "쇼핑", "라이프스타일", "테크/가전", "스포츠/레저", "음악/공연",
                "여행/아웃도어", "캐릭터/IP", "도서/출판", "플리마켓",
                "아트/디자인", "컬래버레이션", "리미티드 에디션", "커뮤니티/모임"
        );

        for (String name : defaultCategories) {
            if (!categoryRepository.existsByCategoryName(name)) {
                categoryRepository.save(Category.builder().categoryName(name).build());
            }
        }
    }

    // ✅ 모든 카테고리 조회
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // ✅ 새 카테고리 추가
    @Transactional
    public Category addCategory(String categoryName) {
        if (categoryRepository.existsByCategoryName(categoryName)) {
            throw new IllegalArgumentException("이미 존재하는 카테고리입니다.");
        }
        return categoryRepository.save(Category.builder().categoryName(categoryName).build());
    }

    // ✅ 카테고리 삭제
    @Transactional
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
