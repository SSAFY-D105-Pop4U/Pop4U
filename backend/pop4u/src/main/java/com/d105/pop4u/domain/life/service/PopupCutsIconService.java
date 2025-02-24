package com.d105.pop4u.domain.life.service;

import com.d105.pop4u.domain.life.dto.PopupCutsIconDto;
import com.d105.pop4u.domain.life.entity.PopupCutsIcon;
import com.d105.pop4u.domain.life.repository.PopupCutsIconRepository;
import com.d105.pop4u.domain.review.repository.ReviewRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import com.d105.pop4u.global.config.s3.S3Service;
import com.d105.pop4u.global.service.FastApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PopupCutsIconService {

    private final PopupCutsIconRepository popupCutsIconRepository;
    private final PopupStoreRepository popupStoreRepository;
    private final ReviewRepository reviewRepository;
    private final S3Service s3Service;
    private final FastApiService fastApiService; // ✅ FastAPI 서비스 추가

    // ✅ 리뷰를 작성한 사람만 아이콘 조회 가능
    public List<PopupCutsIconDto> getIconsByPopupAndUser(Long popupId, User user) {
        // 팝업스토어 객체를 조회
        PopupStore popupStore = findPopupStore(popupId);

        // User 객체와 PopupStore 객체를 사용하여 리뷰 존재 여부 확인
        if (!reviewRepository.existsByUserAndPopup(user, popupStore)) {
            throw new IllegalArgumentException("이 팝업에 리뷰를 작성한 사용자만 인생네컷을 만들 수 있습니다.");
        }

        return popupCutsIconRepository.findByPopupStore(popupStore)
                .stream()
                .map(PopupCutsIconDto::fromEntity)
                .collect(Collectors.toList());
    }




    // ✅ FastAPI 호출하여 배경 제거 후 아이콘 추가 (관리자 전용)
    @Transactional
    public PopupCutsIconDto addIconToPopup(Long popupId, MultipartFile file) throws IOException {
        PopupStore popupStore = findPopupStore(popupId);

        // 1️⃣ FastAPI 호출하여 배경 제거 & S3 업로드
        String iconUrl = fastApiService.processImageAndUpload(file, String.valueOf(popupId));

        // 2️⃣ DB에 저장
        PopupCutsIcon popupCutsIcon = popupCutsIconRepository.save(
                PopupCutsIcon.builder()
                        .popupStore(popupStore)
                        .popupIconImg(iconUrl)
                        .build());

        return PopupCutsIconDto.fromEntity(popupCutsIcon);
    }

    // ✅ 아이콘 삭제 (관리자 전용)
    @Transactional
    public void deleteIcon(Long iconId) throws Exception {
        PopupCutsIcon icon = popupCutsIconRepository.findById(iconId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아이콘을 찾을 수 없습니다."));

        s3Service.deleteS3(icon.getPopupIconImg()); // S3에서 삭제
        popupCutsIconRepository.delete(icon);
    }

    private PopupStore findPopupStore(Long popupId) {
        return popupStoreRepository.findById(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
    }
}
