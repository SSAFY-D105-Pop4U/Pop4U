package com.d105.pop4u.domain.category.service;

import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    // ✅ 기본 키(category_id) 기준으로 정렬하여 모든 카테고리 조회
    public List<Category> getAllCategories() {
        return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "categoryId"));
    }

    // ✅ 애플리케이션 실행 시 기본 카테고리 데이터 삽입
    @PostConstruct
    public void initCategories() {
        if (categoryRepository.count() == 0) { // ✅ 기존 데이터가 없을 때만 삽입
            List<String> categories = Arrays.asList(
                    "이벤트", "체험", "전시", "굿즈", "패션", "뷰티", "푸드/카페",
                    "쇼핑", "라이프스타일", "테크/가전", "스포츠/레저", "음악/공연",
                    "여행/아웃도어", "캐릭터/IP", "도서/출판", "플리마켓", "아트/디자인",
                    "컬래버레이션", "리미티드 에디션", "커뮤니티/모임"
            );
            for (String name : categories) {
                categoryRepository.save(Category.builder().categoryName(name).build());
            }
        }
    }
}
