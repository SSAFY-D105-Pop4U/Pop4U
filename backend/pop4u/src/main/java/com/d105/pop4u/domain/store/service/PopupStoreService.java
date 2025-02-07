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
        PopupStore popupStore = popupStoreRepository.findById(popupId)
                .orElseThrow(() -> new RuntimeException("팝업스토어를 찾을 수 없습니다."));

        System.out.println("✅ getPopupStoreById() 최신 데이터 조회: " + popupStore);

        return convertToDTO(popupStore);
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
        // 1. 팝업스토어 기본 정보 저장
        PopupStore popupStore = popupStoreRepository.save(dto.toEntity());

        // 2. 이미지 처리
        if (images != null && !images.isEmpty()) {
            String dirPath = UPLOAD_DIR + popupStore.getPopupId() + "/";
            File directory = new File(dirPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 순차적인 번호 부여
            int imageCount = 1;
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    String originalFilename = file.getOriginalFilename();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String fileName = imageCount + extension;  // 1.jpg, 2.jpg, 3.jpg 형식
                    
                    File destinationFile = new File(dirPath + fileName);
                    file.transferTo(destinationFile);

                    PopupStoreImg newImage = PopupStoreImg.builder()
                            .popupStore(popupStore)
                            .popupImg("/uploads/popup/" + popupStore.getPopupId() + "/" + fileName)
                            .build();
                    
                    popupStoreImgRepository.save(newImage);
                    imageCount++;
                }
            }
        }

        // 3. 카테고리 처리
        if (dto.getCategoryIds() != null) {
            handleCategories(popupStore, dto.getCategoryIds());
        }

        return getPopupStoreById(popupStore.getPopupId());
    }

    @Transactional
    public PopupStoreDTO updatePopupStore(Long popupId, PopupStoreDTO dto,
                                          List<MultipartFile> newImages, List<String> deleteImages) throws IOException {
        // 1. 기존 팝업스토어 조회
        PopupStore popupStore = popupStoreRepository.findById(popupId)
                .orElseThrow(() -> new RuntimeException("팝업스토어를 찾을 수 없습니다."));

        // 2. 기본 정보 업데이트
        popupStore.updateInfo(dto);

        // 3. 이미지 관련 처리는 실제 이미지 작업이 있을 때만 실행
        boolean hasImageChanges = (deleteImages != null && !deleteImages.isEmpty()) || 
                                (newImages != null && !newImages.isEmpty());

        if (hasImageChanges) {
            // 3-1. 이미지 삭제 처리
            if (deleteImages != null && !deleteImages.isEmpty()) {
                for (String imageUrl : deleteImages) {
                    String fullImageUrl;
                    if (!imageUrl.startsWith("/uploads")) {
                        fullImageUrl = "/uploads/popup/" + popupId + "/" + imageUrl;
                    } else {
                        fullImageUrl = imageUrl;
                    }

                    PopupStoreImg imageEntity = popupStoreImgRepository.findByPopupStoreAndPopupImg(popupStore, fullImageUrl)
                            .orElseThrow(() -> new RuntimeException("이미지를 찾을 수 없습니다. 검색한 경로: " + fullImageUrl));
                    
                    popupStoreImgRepository.delete(imageEntity);
                    
                    String fileName = imageUrl;
                    if (imageUrl.contains("/")) {
                        fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                    }
                    File file = new File(UPLOAD_DIR + popupId + "/" + fileName);
                    if (file.exists()) {
                        if (!file.delete()) {
                            throw new IOException("파일 삭제 실패: " + fileName);
                        }
                    }
                }
            }

            // 3-2. 새 이미지 추가
            if (newImages != null && !newImages.isEmpty()) {
                String dirPath = UPLOAD_DIR + popupId + "/";
                File directory = new File(dirPath);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // 현재 저장된 이미지들의 번호 중 가장 큰 번호 찾기
                List<PopupStoreImg> existingImages = popupStoreImgRepository.findByPopupStore_PopupId(popupId);
                int maxNumber = existingImages.stream()
                    .map(img -> {
                        String fileName = img.getPopupImg().substring(img.getPopupImg().lastIndexOf("/") + 1);
                        try {
                            return Integer.parseInt(fileName.substring(0, fileName.lastIndexOf(".")));
                        } catch (Exception e) {
                            return 0;
                        }
                    })
                    .max(Integer::compareTo)
                    .orElse(0);

                // 다음 번호부터 순차적으로 저장
                int imageCount = maxNumber + 1;
                for (MultipartFile file : newImages) {
                    if (!file.isEmpty()) {
                        String originalFilename = file.getOriginalFilename();
                        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                        String fileName = imageCount + extension;
                        String imagePath = "/uploads/popup/" + popupId + "/" + fileName;
                        
                        // 이미 동일한 이미지 URL이 있는지 확인
                        boolean imageExists = popupStoreImgRepository.findByPopupStoreAndPopupImg(popupStore, imagePath).isPresent();
                        
                        // 이미지가 존재하지 않는 경우에만 저장
                        if (!imageExists) {
                            File destinationFile = new File(dirPath + fileName);
                            
                            // 파일이 이미 존재하면 다른 이름으로 저장
                            while (destinationFile.exists()) {
                                imageCount++;
                                fileName = imageCount + extension;
                                destinationFile = new File(dirPath + fileName);
                                imagePath = "/uploads/popup/" + popupId + "/" + fileName;
                            }
                            
                            file.transferTo(destinationFile);

                            PopupStoreImg newImage = PopupStoreImg.builder()
                                    .popupStore(popupStore)
                                    .popupImg(imagePath)
                                    .build();
                            
                            popupStoreImgRepository.save(newImage);
                            imageCount++;
                        }
                    }
                }
            }
        }

        // 4. 카테고리 처리
        if (dto.getCategoryIds() != null) {
            handleCategories(popupStore, dto.getCategoryIds());
        }

        // 5. 변경사항 저장 및 반환
        popupStoreRepository.flush();
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
                    String originalFilename = file.getOriginalFilename();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String fileName = System.currentTimeMillis() + extension;
                    
                    File destinationFile = new File(dirPath + fileName);
                    file.transferTo(destinationFile);

                    PopupStoreImg newImage = PopupStoreImg.builder()
                            .popupStore(store)
                            .popupImg("/uploads/popup/" + store.getPopupId() + "/" + fileName)
                            .build();
                    
                    popupStoreImgRepository.save(newImage);
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

