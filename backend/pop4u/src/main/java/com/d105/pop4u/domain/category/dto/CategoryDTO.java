package com.d105.pop4u.domain.category.dto;

import com.d105.pop4u.domain.category.entity.Category;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {
    private Long categoryId;
    private String categoryName;

    // ✅ 엔티티 → DTO 변환
    public static CategoryDTO fromEntity(Category category) {
        return CategoryDTO.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .build();
    }
}
