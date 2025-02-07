package com.d105.pop4u.domain.store.dto;

import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.entity.PopupStoreImg;

import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopupStoreDTO {

    private Long popupId; // ✅ 팝업 ID 추가 (조회할 때 필요)

    @NotNull(message = "사용자 ID는 필수입니다.")
    private Long userId;

    @NotBlank(message = "팝업스토어 이름은 필수입니다.")
    @Size(max = 50, message = "팝업스토어 이름은 최대 50자까지 가능합니다.")
    private String popupName;

    @NotBlank(message = "지역 정보는 필수입니다.")
    @Size(max = 50, message = "지역 이름은 최대 50자까지 가능합니다.")
    private String popupRegion;

    @NotBlank(message = "주소는 필수입니다.")
    @Size(max = 255, message = "주소는 최대 255자까지 가능합니다.")
    private String popupAddress;

    @NotNull(message = "팝업 시작일은 필수입니다.")
    private LocalDate popupStartDate;

    @NotNull(message = "팝업 종료일은 필수입니다.")
    private LocalDate popupEndDate;

    @NotBlank(message = "운영 시간은 필수입니다.")
    @Size(max = 50, message = "운영 시간은 최대 50자까지 가능합니다.")
    private String popupOperationTime;

    @NotNull(message = "입장료 정보는 필수입니다.")
    @Min(value = 0, message = "입장료 정보는 0 이상이어야 합니다.")
    @Max(value = 127, message = "입장료 정보가 너무 큽니다.")
    private Integer popupFee;

    @NotNull(message = "주차 정보는 필수입니다.")
    @Min(value = 0, message = "주차 정보는 0 이상이어야 합니다.")
    @Max(value = 127, message = "주차 정보가 너무 큽니다.")
    private Integer popupParking;

    @NotBlank(message = "설명은 필수입니다.")
    @Size(max = 500, message = "설명은 최대 500자까지 가능합니다.")
    private String popupDescription;

    @Size(max = 255, message = "브랜드 링크는 최대 255자까지 가능합니다.")
    private String popupUrl;

    @NotNull(message = "최대 수용 인원은 필수입니다.")
    @Min(value = 1, message = "최대 수용 인원은 최소 1명 이상이어야 합니다.")
    private Integer popupMaximumCapacity;

    @NotNull(message = "최대 예약 인원은 필수입니다.")
    @Min(value = 1, message = "최대 예약 인원은 최소 1명 이상이어야 합니다.")
    private Integer popupMaximumPeople;

    private List<Long> categoryIds; // ✅ 선택된 카테고리 ID 리스트 추가

    private List<String> popupImages; // ✅ 이미지 URL 리스트 추가

    // ✅ 엔티티 -> DTO 변환 메서드 (카테고리 및 이미지 포함)
    public static PopupStoreDTO fromEntity(PopupStore store, List<Long> categoryIds, List<String> popupImages) {
        return PopupStoreDTO.builder()
                .popupId(store.getPopupId())
                .userId(store.getUserId())
                .popupName(store.getPopupName())
                .popupRegion(store.getPopupRegion())
                .popupAddress(store.getPopupAddress())
                .popupStartDate(store.getPopupStartDate())
                .popupEndDate(store.getPopupEndDate())
                .popupOperationTime(store.getPopupOperationTime())
                .popupDescription(store.getPopupDescription())
                .popupUrl(store.getPopupUrl())
                .popupMaximumCapacity(store.getPopupMaximumCapacity())
                .popupMaximumPeople(store.getPopupMaximumPeople())
                .popupFee(store.getPopupFee())
                .popupParking(store.getPopupParking())
                .categoryIds(Optional.ofNullable(categoryIds).orElse(Collections.emptyList()))
                .popupImages(Optional.ofNullable(popupImages).orElse(Collections.emptyList()))
                .build();
    }

    public PopupStore toEntity() {
        return PopupStore.builder()
                .popupId(this.popupId)
                .userId(this.userId)
                .popupName(this.popupName)
                .popupRegion(this.popupRegion)
                .popupAddress(this.popupAddress)
                .popupStartDate(this.popupStartDate)
                .popupEndDate(this.popupEndDate)
                .popupOperationTime(this.popupOperationTime)
                .popupDescription(this.popupDescription)
                .popupUrl(this.popupUrl)
                .popupMaximumCapacity(this.popupMaximumCapacity)
                .popupMaximumPeople(this.popupMaximumPeople)
                .popupFee(this.popupFee)
                .popupParking(this.popupParking)
                .build();
    }

    public PopupStoreDTO(PopupStore store) {
        this.popupId = store.getPopupId();
        this.userId = store.getUserId();
        this.popupName = store.getPopupName();
        this.popupRegion = store.getPopupRegion();
        this.popupAddress = store.getPopupAddress();
        this.popupStartDate = store.getPopupStartDate();
        this.popupEndDate = store.getPopupEndDate();
        this.popupOperationTime = store.getPopupOperationTime();
        this.popupDescription = store.getPopupDescription();
        this.popupUrl = store.getPopupUrl();
        this.popupMaximumCapacity = store.getPopupMaximumCapacity();
        this.popupMaximumPeople = store.getPopupMaximumPeople();
        this.popupFee = store.getPopupFee();
        this.popupParking = store.getPopupParking();
        this.categoryIds = Collections.emptyList();
        this.popupImages = Collections.emptyList();
    }

}
