package com.d105.pop4u.domain.store.service;

import com.d105.pop4u.domain.category.dto.CategoryDTO;
import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.repository.CategoryRepository;
import com.d105.pop4u.domain.category.entity.PopupCategory;
import com.d105.pop4u.domain.category.repository.PopupCategoryRepository;
import com.d105.pop4u.domain.chat.service.ChatRoomService;
import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.entity.PopupStoreImg;
import com.d105.pop4u.domain.store.repository.PopupStoreImgRepository;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.global.config.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PopupStoreService {
    private final PopupStoreRepository popupStoreRepository;
    private final CategoryRepository categoryRepository;
    private final PopupCategoryRepository popupCategoryRepository;
    private final PopupStoreImgRepository popupStoreImgRepository;
    private final S3Service s3Service;
    private final ChatRoomService chatRoomService;
    // ===============================
    // 조회 메서드들
    // ===============================
    public Map<String, List<PopupStoreDTO>> getAllPopupStores(boolean fetchAll) {
        Map<String, List<PopupStoreDTO>> result = new HashMap<>();

        if (fetchAll) {
            // 전체 목록
            result.put("all", popupStoreRepository.findAll().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList()));

        } else {
            // Top 10 목록
            result.put("byStartDate", popupStoreRepository.findTop10ByOrderByPopupStartDateDesc().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList()));

            result.put("byEndDate", popupStoreRepository.findTop10ByOrderByPopupEndDateDesc().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList()));

            result.put("byViewCount", popupStoreRepository.findTop10ByOrderByPopupViewCountDesc().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList()));
        }

        return result;
    }

    @Transactional
    public PopupStoreDTO getPopupStoreById(Long popupId) {
        PopupStore popupStore = popupStoreRepository.findById(popupId)
                .orElseThrow(() -> new RuntimeException("팝업스토어를 찾을 수 없습니다."));

        // 조회수 증가
        popupStore.increaseViewCount();
        popupStoreRepository.save(popupStore);
        // 필요시 popupStoreRepository.flush();

        return convertToDTO(popupStore);
    }

    public List<PopupStoreDTO> getPopupStoresByRegion(String region) {
        return popupStoreRepository.findByPopupRegion(region).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PopupStoreDTO> getPopupStoresByUser(Long userId) {
        return popupStoreRepository.findByUser_UserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ===============================
    // 생성/수정/삭제 메서드들
    // ===============================
    @Transactional
    public PopupStoreDTO createPopupStore(PopupStoreDTO dto, List<MultipartFile> images) throws IOException {
        // 1. 팝업스토어 저장
        PopupStore popupStore = popupStoreRepository.save(dto.toEntity());

        // 채팅방 자동 생성 (팝업스토어당 1개)
        chatRoomService.createChatRoomForPopup(popupStore);

        // 2. 이미지 업로드
        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    // 원본 파일명은 그대로 유지하고, 폴더 경로만 전달합니다.
                    // 폴더 경로: "popup/{popupId}/"
                    String s3Url = s3Service.uploadS3(file, "popup/" + popupStore.getPopupId());

                    PopupStoreImg newImage = PopupStoreImg.builder()
                            .popupStore(popupStore)
                            .popupImg(s3Url)
                            .build();

                    popupStoreImgRepository.save(newImage);
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

        // 3. 이미지 관련 처리 (삭제 및 신규 추가)
        boolean hasImageChanges = (deleteImages != null && !deleteImages.isEmpty()) ||
                (newImages != null && !newImages.isEmpty());
        if (hasImageChanges) {
            // 3-1. 이미지 삭제
            if (deleteImages != null && !deleteImages.isEmpty()) {
                for (String imageUrl : deleteImages) {
                    deleteImage(popupStore.getPopupId(), imageUrl);
                }
            }
            // 3-2. 신규 이미지 추가
            // 신규 이미지도 원본 파일명 그대로 유지합니다.
            if (newImages != null && !newImages.isEmpty()) {
                handleImages(popupStore, newImages);
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
        chatRoomService.deleteChatRoomByPopup(popupStore); // ✅ 채팅방 자동 삭제
        popupStoreRepository.delete(popupStore);
    }

    // ===============================
    // 내부 유틸리티 메서드들
    // ===============================
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

    // 카테고리 처리: 기존 카테고리 삭제 후 새로 저장
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

    // 신규 이미지 추가 처리 (업데이트 시)
    @Transactional
    private void handleImages(PopupStore store, List<MultipartFile> newImages) throws IOException {
        // 원본 파일명은 그대로 유지하며, 폴더 경로만 전달합니다.
        for (MultipartFile file : newImages) {
            if (!file.isEmpty()) {
                String s3Url = s3Service.uploadS3(file, "popup/" + store.getPopupId());

                PopupStoreImg newImage = PopupStoreImg.builder()
                        .popupStore(store)
                        .popupImg(s3Url)
                        .build();

                popupStoreImgRepository.save(newImage);
            }
        }
    }

    // 이미지 삭제 처리 (재정렬 없이 단순 삭제)
    private void deleteImage(Long popupId, String imageUrl) {
        try {
            s3Service.deleteS3(imageUrl);
            popupStoreImgRepository.deleteByPopupImg(imageUrl);
        } catch (Exception e) {
            throw new RuntimeException("이미지 삭제 실패", e);
        }
    }

    // 해당 팝업스토어의 모든 이미지 삭제
    private void deleteAllImages(PopupStore store) {
        List<PopupStoreImg> images = popupStoreImgRepository.findByPopupStore_PopupId(store.getPopupId());
        for (PopupStoreImg image : images) {
            try {
                s3Service.deleteS3(image.getPopupImg());
            } catch (Exception e) {
                // 필요시 로그 처리
            }
        }
        popupStoreImgRepository.deleteByPopupStore(store);
    }
}




// 파일 이름 1,2,3 저장 버전
//package com.d105.pop4u.domain.store.service;
//
//import com.d105.pop4u.domain.category.dto.CategoryDTO;
//import com.d105.pop4u.domain.category.entity.Category;
//import com.d105.pop4u.domain.category.repository.CategoryRepository;
//import com.d105.pop4u.domain.category.entity.PopupCategory;
//import com.d105.pop4u.domain.category.repository.PopupCategoryRepository;
//import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
//import com.d105.pop4u.domain.store.entity.PopupStore;
//import com.d105.pop4u.domain.store.entity.PopupStoreImg;
//import com.d105.pop4u.domain.store.repository.PopupStoreImgRepository;
//import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
//import com.d105.pop4u.global.config.s3.S3Service;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Map;
//import java.util.HashMap;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//@Transactional(readOnly = true)
//public class PopupStoreService {
//    private final PopupStoreRepository popupStoreRepository;
//    private final CategoryRepository categoryRepository;
//    private final PopupCategoryRepository popupCategoryRepository;
//    private final PopupStoreImgRepository popupStoreImgRepository;
//    private final S3Service s3Service;
//    private final String UPLOAD_DIR = System.getProperty("user.home") + "/uploads/popup/";
//
//    // ===============================
//    // 조회 메서드들
//    // ===============================
//    public Map<String, List<PopupStoreDTO>> getAllPopupStores() {
//        Map<String, List<PopupStoreDTO>> result = new HashMap<>();
//
//        // 전체 목록
//        result.put("all", popupStoreRepository.findAll().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList()));
//
//        // 시작일 기준 정렬
//        result.put("byStartDate", popupStoreRepository.findAllByOrderByPopupStartDateDesc().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList()));
//
//        // 종료일 기준 정렬
//        result.put("byEndDate", popupStoreRepository.findAllByOrderByPopupEndDateDesc().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList()));
//
//        // 조회수 기준 정렬
//        result.put("byViewCount", popupStoreRepository.findAllByOrderByPopupViewCountDesc().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList()));
//
//        return result;
//    }
//
//    @Transactional
//    public PopupStoreDTO getPopupStoreById(Long popupId) {
//        PopupStore popupStore = popupStoreRepository.findById(popupId)
//                .orElseThrow(() -> new RuntimeException("팝업스토어를 찾을 수 없습니다."));
//
//        // 조회수 증가
//        popupStore.increaseViewCount();
//        popupStoreRepository.save(popupStore);
//        // 필요시 popupStoreRepository.flush();
//
//        return convertToDTO(popupStore);
//    }
//
//    public List<PopupStoreDTO> getPopupStoresByRegion(String region) {
//        return popupStoreRepository.findByPopupRegion(region).stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    public List<PopupStoreDTO> getPopupStoresByUser(Long userId) {
//        return popupStoreRepository.findByUserId(userId).stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    // ===============================
//    // 생성/수정/삭제 메서드들
//    // ===============================
//    @Transactional
//    public PopupStoreDTO createPopupStore(PopupStoreDTO dto, List<MultipartFile> images) throws IOException {
//        // 1. 팝업스토어 저장
//        PopupStore popupStore = popupStoreRepository.save(dto.toEntity());
//
//        // 2. 이미지 업로드 (파일명: 1.ext, 2.ext, 3.ext …)
//        if (images != null && !images.isEmpty()) {
//            int imageIndex = 1; // 신규 생성 시 번호는 1부터 시작
//            for (MultipartFile file : images) {
//                if (!file.isEmpty()) {
//                    String fileExtension = getFileExtension(file.getOriginalFilename());
//                    String fileName = imageIndex + "." + fileExtension;
//                    // S3 업로드 경로: popup/{popupId}/{fileName}
//                    String s3Url = s3Service.uploadS3(file, "popup/" + popupStore.getPopupId() + "/" + fileName);
//
//                    PopupStoreImg newImage = PopupStoreImg.builder()
//                            .popupStore(popupStore)
//                            .popupImg(s3Url)
//                            .build();
//
//                    popupStoreImgRepository.save(newImage);
//                    imageIndex++;
//                }
//            }
//        }
//
//        // 3. 카테고리 처리
//        if (dto.getCategoryIds() != null) {
//            handleCategories(popupStore, dto.getCategoryIds());
//        }
//
//        return getPopupStoreById(popupStore.getPopupId());
//    }
//
//    @Transactional
//    public PopupStoreDTO updatePopupStore(Long popupId, PopupStoreDTO dto,
//                                          List<MultipartFile> newImages, List<String> deleteImages) throws IOException {
//        // 1. 기존 팝업스토어 조회
//        PopupStore popupStore = popupStoreRepository.findById(popupId)
//                .orElseThrow(() -> new RuntimeException("팝업스토어를 찾을 수 없습니다."));
//
//        // 2. 기본 정보 업데이트
//        popupStore.updateInfo(dto);
//
//        // 3. 이미지 관련 처리 (삭제 및 신규 추가)
//        boolean hasImageChanges = (deleteImages != null && !deleteImages.isEmpty()) ||
//                (newImages != null && !newImages.isEmpty());
//        if (hasImageChanges) {
//            // 3-1. 이미지 삭제
//            if (deleteImages != null && !deleteImages.isEmpty()) {
//                for (String imageUrl : deleteImages) {
//                    deleteImage(popupStore.getPopupId(), imageUrl);
//                }
//            }
//            // 3-2. 신규 이미지 추가
//            // 신규 이미지는 DB에 존재하는 이미지들 중 가장 큰 번호 다음 번호를 사용
//            if (newImages != null && !newImages.isEmpty()) {
//                handleImages(popupStore, newImages);
//            }
//        }
//
//        // 4. 카테고리 처리
//        if (dto.getCategoryIds() != null) {
//            handleCategories(popupStore, dto.getCategoryIds());
//        }
//
//        // 5. 변경사항 저장 및 반환
//        popupStoreRepository.flush();
//        return getPopupStoreById(popupId);
//    }
//
//    @Transactional
//    public void deletePopupStore(Long popupId) {
//        PopupStore popupStore = findPopupStore(popupId);
//        deleteAllImages(popupStore);
//        popupStoreRepository.delete(popupStore);
//    }
//
//    // ===============================
//    // 내부 유틸리티 메서드들
//    // ===============================
//    private PopupStore findPopupStore(Long popupId) {
//        return popupStoreRepository.findById(popupId)
//                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
//    }
//
//    private PopupStoreDTO convertToDTO(PopupStore store) {
//        List<Long> categoryIds = popupCategoryRepository.findByPopupStore_PopupId(store.getPopupId())
//                .stream()
//                .map(pc -> pc.getCategory().getCategoryId())
//                .collect(Collectors.toList());
//
//        List<String> images = popupStoreImgRepository.findByPopupStore_PopupId(store.getPopupId())
//                .stream()
//                .map(PopupStoreImg::getPopupImg)
//                .collect(Collectors.toList());
//
//        return PopupStoreDTO.fromEntity(store, categoryIds, images);
//    }
//
//    // 카테고리 처리: 기존 카테고리 삭제 후 새로 저장
//    private void handleCategories(PopupStore store, List<Long> categoryIds) {
//        popupCategoryRepository.deleteByPopupStore(store);
//
//        if (categoryIds != null && !categoryIds.isEmpty()) {
//            List<PopupCategory> categories = categoryIds.stream()
//                    .map(id -> categoryRepository.findById(id)
//                            .map(category -> PopupCategory.builder()
//                                    .popupStore(store)
//                                    .category(category)
//                                    .build())
//                            .orElseThrow(() -> new IllegalArgumentException("카테고리를 찾을 수 없습니다: " + id)))
//                    .collect(Collectors.toList());
//            popupCategoryRepository.saveAll(categories);
//        }
//    }
//
//    // 신규 이미지 추가 처리 (업데이트 시)
//    @Transactional
//    private void handleImages(PopupStore store, List<MultipartFile> newImages) throws IOException {
//        // DB에 저장된 이미지들 중 가장 큰 번호 다음 번호를 사용
//        int imageIndex = getNextImageIndex(store.getPopupId());
//        for (MultipartFile file : newImages) {
//            if (!file.isEmpty()) {
//                String fileExtension = getFileExtension(file.getOriginalFilename());
//                String fileName = imageIndex + "." + fileExtension;
//                String s3Url = s3Service.uploadS3(file, "popup/" + store.getPopupId() + "/" + fileName);
//
//                PopupStoreImg newImage = PopupStoreImg.builder()
//                        .popupStore(store)
//                        .popupImg(s3Url)
//                        .build();
//
//                popupStoreImgRepository.save(newImage);
//                imageIndex++;
//            }
//        }
//    }
//
//    // 이미지 삭제 처리 (재정렬 없이 단순 삭제)
//    private void deleteImage(Long popupId, String imageUrl) {
//        try {
//            s3Service.deleteS3(imageUrl);
//            popupStoreImgRepository.deleteByPopupImg(imageUrl);
//        } catch (Exception e) {
//            throw new RuntimeException("이미지 삭제 실패", e);
//        }
//    }
//
//    // 해당 팝업스토어의 모든 이미지 삭제
//    private void deleteAllImages(PopupStore store) {
//        List<PopupStoreImg> images = popupStoreImgRepository.findByPopupStore_PopupId(store.getPopupId());
//        for (PopupStoreImg image : images) {
//            try {
//                s3Service.deleteS3(image.getPopupImg());
//            } catch (Exception e) {
//                // 필요시 로그 처리
//            }
//        }
//        popupStoreImgRepository.deleteByPopupStore(store);
//    }
//
//    // DB에 저장된 이미지들 중 가장 큰 번호를 찾아, 그 다음 번호를 반환 (없으면 1)
//    private int getNextImageIndex(Long popupId) {
//        List<PopupStoreImg> images = popupStoreImgRepository.findByPopupStore_PopupId(popupId);
//        int max = 0;
//        for (PopupStoreImg image : images) {
//            String url = image.getPopupImg();
//            // 파일명은 URL의 마지막 '/' 이후의 부분이라고 가정 (예: "1.jpg")
//            String fileName = url.substring(url.lastIndexOf("/") + 1);
//            try {
//                int number = Integer.parseInt(fileName.split("\\.")[0]);
//                if (number > max) {
//                    max = number;
//                }
//            } catch (Exception e) {
//                // 파싱 실패 시 건너뜁니다.
//            }
//        }
//        return max + 1;
//    }
//
//    // 파일 확장자 추출 (예: "image.png" → "png")
//    private String getFileExtension(String fileName) {
//        if (fileName != null && fileName.contains(".")) {
//            return fileName.substring(fileName.lastIndexOf(".") + 1);
//        }
//        return "";
//    }
//}
