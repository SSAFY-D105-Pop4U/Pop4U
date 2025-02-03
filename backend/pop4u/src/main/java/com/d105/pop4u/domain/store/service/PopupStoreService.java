package com.d105.pop4u.domain.store.service;


import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PopupStoreService {
    private final PopupStoreRepository popupStoreRepository;

    // 모든 팝업스토어 조회
    public List<PopupStoreDTO> getAllPopupStores() {
        return popupStoreRepository.findAll()
                .stream()
                .map(PopupStoreDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // 특정 팝업스토어 조회
    public PopupStoreDTO getPopupStoreById(Long popupId) {
        return popupStoreRepository.findByPopupId(popupId)
                .map(PopupStoreDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("팝업스토어를 찾을 수 없습니다."));
    }

    // 지역별 팝업스토어 조회
    public List<PopupStoreDTO> getPopupStoresByRegion(String region) {
        return popupStoreRepository.findByPopupRegion(region)
                .stream()
                .map(PopupStoreDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // 특정 유저가 등록한 팝업스토어 조회
    public List<PopupStoreDTO> getPopupStoresByUser(Long userId) {
        return popupStoreRepository.findByUserId(userId)
                .stream()
                .map(PopupStoreDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // 팝업스토어 생성 (유저 ID를 직접 입력받음)
    public PopupStoreDTO createPopupStore(PopupStoreDTO dto) {
        PopupStore popupStore = PopupStore.builder()
                .userId(dto.getUserId()) // 유저 ID 직접 설정
                .popupName(dto.getPopupName())
                .popupRegion(dto.getPopupRegion())
                .popupAddress(dto.getPopupAddress())
                .popupStartDate(dto.getPopupStartDate())
                .popupEndDate(dto.getPopupEndDate())
                .popupOpenTime(dto.getPopupOpenTime())
                .popupClosedTime(dto.getPopupClosedTime())
                .popupDescription(dto.getPopupDescription())
                .popupUrl(dto.getPopupUrl())
                .popupMaximumCapacity(dto.getPopupMaximumCapacity())
                .popupMaximumPeople(dto.getPopupMaximumPeople())
                .build();

        popupStore = popupStoreRepository.save(popupStore);
        return PopupStoreDTO.fromEntity(popupStore);
    }

    
    // // 특정 브랜드 유저가 등록한 팝업스토어 조회
    // public List<PopupStoreDTO> getPopupStoresByUser(Long userId) {
    //     return popupStoreRepository.findByUser_UserId(userId)
    //             .stream()
    //             .map(PopupStoreDTO::fromEntity)
    //             .collect(Collectors.toList());
    // }

    // // 팝업스토어 생성
    // public PopupStoreDTO createPopupStore(PopupStoreDTO dto) {
    //     PopupStore popupStore = PopupStore.builder()
    //             .popupName(dto.getPopupName())
    //             .popupRegion(dto.getPopupRegion())
    //             .popupAddress(dto.getPopupAddress())
    //             .popupStartDate(dto.getPopupStartDate())
    //             .popupEndDate(dto.getPopupEndDate())
    //             .popupOpenTime(dto.getPopupOpenTime())
    //             .popupClosedTime(dto.getPopupClosedTime())
    //             .popupDescription(dto.getPopupDescription())
    //             .popupUrl(dto.getPopupUrl())
    //             .popupMaximumCapacity(dto.getPopupMaximumCapacity())
    //             .popupMaximumPeople(dto.getPopupMaximumPeople())
    //             .build();

    //     popupStore = popupStoreRepository.save(popupStore);
    //     return PopupStoreDTO.fromEntity(popupStore);
    // }

    // 팝업스토어 수정
    public PopupStoreDTO updatePopupStore(Long popupId, PopupStoreDTO dto) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new RuntimeException("팝업스토어를 찾을 수 없습니다."));

        popupStore.setPopupName(dto.getPopupName());
        popupStore.setPopupRegion(dto.getPopupRegion());
        popupStore.setPopupAddress(dto.getPopupAddress());
        popupStore.setPopupStartDate(dto.getPopupStartDate());
        popupStore.setPopupEndDate(dto.getPopupEndDate());
        popupStore.setPopupOpenTime(dto.getPopupOpenTime());
        popupStore.setPopupClosedTime(dto.getPopupClosedTime());
        popupStore.setPopupDescription(dto.getPopupDescription());
        popupStore.setPopupUrl(dto.getPopupUrl());
        popupStore.setPopupMaximumCapacity(dto.getPopupMaximumCapacity());
        popupStore.setPopupMaximumPeople(dto.getPopupMaximumPeople());

        popupStore = popupStoreRepository.save(popupStore);
        return PopupStoreDTO.fromEntity(popupStore);
    }

    // 팝업스토어 삭제
    public void deletePopupStore(Long popupId) {
        if (!popupStoreRepository.existsById(popupId)) {
            throw new RuntimeException("팝업스토어를 찾을 수 없습니다.");
        }
        popupStoreRepository.deleteById(popupId);
    }
}
