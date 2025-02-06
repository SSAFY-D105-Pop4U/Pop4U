package com.d105.pop4u.domain.category.controller;

import com.d105.pop4u.domain.category.dto.CategoryDTO;
import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    // ✅ 모든 카테고리 조회
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

//    // ✅ 새 카테고리 추가
//    @PostMapping
//    public ResponseEntity<Category> addCategory(@RequestParam String categoryName) {
//        return ResponseEntity.ok(categoryService.addCategory(categoryName));
//    }
//
//    // ✅ 카테고리 삭제
//    @DeleteMapping("/{categoryId}")
//    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
//        categoryService.deleteCategory(categoryId);
//        return ResponseEntity.ok("카테고리가 삭제되었습니다.");
//    }
}
