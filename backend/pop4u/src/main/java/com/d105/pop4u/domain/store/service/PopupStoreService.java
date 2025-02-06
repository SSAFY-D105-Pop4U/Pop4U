package com.d105.pop4u.domain.store.service;

import com.d105.pop4u.domain.category.dto.CategoryDTO;
import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.repository.CategoryRepository;
import com.d105.pop4u.domain.category.entity.PopupCategory;
import com.d105.pop4u.domain.category.repository.PopupCategoryRepository;
import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.entity.PopupStoreImg;
import com.d105.pop4u.domain.store.repository.PopupStoreImgRepository;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.FileSystemUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PopupStoreService {
    private final PopupStoreRepository popupStoreRepository;
    private final CategoryRepository categoryRepository;
    private final PopupCategoryRepository popupCategoryRepository;
    private final PopupStoreImgRepository popupStoreImgRepository;
    private final String UPLOAD_DIR = System.getProperty("user.home") + "/uploads/popup/";

    // ✅ 조회 메서드들
    public List<PopupStoreDTO> getAllPopupStores() {
        return popupStoreRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PopupStoreDTO getPopupStoreById(Long popupId) {
        return convertToDTO(findPopupStore(popupId));
    }

    public List<PopupStoreDTO> getPopupStoresByRegion(String region) {
        return popupStoreRepository.findByPopupRegion(region).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PopupStoreDTO> getPopupStoresByUser(Long userId) {
        return popupStoreRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ✅ 생성/수정/삭제 메서드들
    @Transactional
    public PopupStoreDTO createPopupStore(PopupStoreDTO dto, List<MultipartFile> images) throws IOException {
        PopupStore popupStore = popupStoreRepository.save(dto.toEntity());
        handleImages(popupStore, images, null);
        handleCategories(popupStore, dto.getCategoryIds());
        return getPopupStoreById(popupStore.getPopupId());
    }

    @Transactional
    public PopupStoreDTO updatePopupStore(Long popupId, PopupStoreDTO dto, 
            List<MultipartFile> newImages, List<String> deleteImages) throws IOException {
        PopupStore popupStore = findPopupStore(popupId);
        popupStore.updateInfo(dto);
        handleImages(popupStore, newImages, deleteImages);
        handleCategories(popupStore, dto.getCategoryIds());
        return getPopupStoreById(popupId);
    }

    @Transactional
    public void deletePopupStore(Long popupId) {
        PopupStore popupStore = findPopupStore(popupId);
        deleteAllImages(popupStore);
        popupStoreRepository.delete(popupStore);
    }

    // ✅ 유틸리티 메서드들
    private PopupStore findPopupStore(Long popupId) {
        return popupStoreRepository.findById(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
    }

    private PopupStoreDTO convertToDTO(PopupStore store) {
        List<Long> categoryIds = popupCategoryRepository.findByPopupStore_PopupId(store.getPopupId())
                .stream()
                .map(pc -> pc.getCategory().getCategoryId())
                .collect(Collectors.toList());

        List<String> images = popupStoreImgRepository.findByPopupStore_PopupId(store.getPopupId())
                .stream()
                .map(PopupStoreImg::getPopupImg)
                .collect(Collectors.toList());

        return PopupStoreDTO.fromEntity(store, categoryIds, images);
    }

    private void handleCategories(PopupStore store, List<Long> categoryIds) {
        popupCategoryRepository.deleteByPopupStore(store);
        
        if (categoryIds != null && !categoryIds.isEmpty()) {
            List<PopupCategory> categories = categoryIds.stream()
                    .map(id -> categoryRepository.findById(id)
                            .map(category -> PopupCategory.builder()
                                    .popupStore(store)
                                    .category(category)
                                    .build())
                            .orElseThrow(() -> new IllegalArgumentException("카테고리를 찾을 수 없습니다: " + id)))
                    .collect(Collectors.toList());
            popupCategoryRepository.saveAll(categories);
        }
    }

    private void handleImages(PopupStore store, List<MultipartFile> newImages, List<String> deleteImages) throws IOException {
        if (deleteImages != null) {
            for (String imageUrl : deleteImages) {
                deleteImage(store.getPopupId(), imageUrl);
            }
        }

        if (newImages != null && !newImages.isEmpty()) {
            String dirPath = UPLOAD_DIR + store.getPopupId() + "/";
            File directory = new File(dirPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            for (int i = 0; i < newImages.size(); i++) {
                MultipartFile file = newImages.get(i);
                if (!file.isEmpty()) {
                    String fileName = (i + 1) + ".jpg";
                    File destinationFile = new File(dirPath + fileName);
                    
                    file.transferTo(destinationFile);
                    
                    popupStoreImgRepository.save(PopupStoreImg.builder()
                            .popupStore(store)
                            .popupImg("/uploads/popup/" + store.getPopupId() + "/" + fileName)
                            .build());
                }
            }
        }
    }

    private void deleteImage(Long popupId, String imageUrl) {
        popupStoreImgRepository.deleteByPopupImg(imageUrl);
        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        File file = new File(UPLOAD_DIR + popupId + "/" + fileName);
        if (file.exists()) {
            file.delete();
        }
    }

    private void deleteAllImages(PopupStore store) {
        popupStoreImgRepository.deleteByPopupStore(store);
        File directory = new File(UPLOAD_DIR + store.getPopupId());
        if (directory.exists()) {
            FileSystemUtils.deleteRecursively(directory);
        }
    }
}

