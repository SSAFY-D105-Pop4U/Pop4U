package com.d105.pop4u.domain.category.service;

import com.d105.pop4u.domain.category.dto.CategoryDTO;
import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.entity.UserCategory;
import com.d105.pop4u.domain.category.repository.CategoryRepository;
import com.d105.pop4u.domain.category.repository.UserCategoryRepository;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserCategoryService {

    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    /**
     * 특정 유저의 관심 카테고리 목록 조회
     * @param userId 회원 고유번호
     * @return 회원이 선택한 카테고리 목록 (DTO 형태)
     */
    public List<CategoryDTO> getUserCategories(Long userId) {
        List<UserCategory> userCategories = userCategoryRepository.findByUser_UserId(userId);
        return userCategories.stream()
                .map(uc -> new CategoryDTO(uc.getCategory().getCategoryId(), uc.getCategory().getCategoryName()))
                .collect(Collectors.toList());
    }

    /**
     * 특정 유저의 관심 카테고리 수정
     * 기존 매핑을 모두 삭제한 후, 새로운 카테고리 id 목록으로 매핑을 생성
     * @param userId 회원 고유번호
     * @param categoryIds 새롭게 선택한 카테고리 id 목록
     */
    @Transactional
    public void updateUserCategories(Long userId, List<Long> categoryIds) {
        // 회원 엔티티 조회 (회원이 존재하지 않으면 예외 발생)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // 기존 매핑 삭제
        userCategoryRepository.deleteByUser_UserId(userId);

        // 새 매핑 생성
        List<Category> categories = categoryRepository.findAllById(categoryIds);
        List<UserCategory> userCategoryList = categories.stream()
                .map(category -> UserCategory.builder()
                        .user(user)
                        .category(category)
                        .build())
                .collect(Collectors.toList());
        userCategoryRepository.saveAll(userCategoryList);
    }
}
