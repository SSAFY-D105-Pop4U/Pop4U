package com.d105.pop4u.domain.store.dto;

import com.d105.pop4u.domain.store.entity.PopupStore;
import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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
    private LocalDate popupStartDate; // ✅ `Date` -> `LocalDate` 변경

    @NotNull(message = "팝업 종료일은 필수입니다.")
    private LocalDate popupEndDate; // ✅ `Date` -> `LocalDate` 변경

    @NotNull(message = "팝업 오픈 시간은 필수입니다.")
    private LocalTime popupOpenTime;

    @NotNull(message = "팝업 마감 시간은 필수입니다.")
    private LocalTime popupClosedTime;

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

    // ✅ 엔티티 -> DTO 변환 메서드 (카테고리 포함)
    public static PopupStoreDTO fromEntity(PopupStore store, List<Long> categoryIds) {
        return PopupStoreDTO.builder()
                .popupId(store.getPopupId()) // ✅ 팝업 ID 추가
                .userId(store.getUserId()) // 유저 ID 변환
                .popupName(store.getPopupName())
                .popupRegion(store.getPopupRegion())
                .popupAddress(store.getPopupAddress())
                .popupStartDate(store.getPopupStartDate())
                .popupEndDate(store.getPopupEndDate())
                .popupOpenTime(store.getPopupOpenTime())
                .popupClosedTime(store.getPopupClosedTime())
                .popupDescription(store.getPopupDescription())
                .popupUrl(store.getPopupUrl())
                .popupMaximumCapacity(store.getPopupMaximumCapacity())
                .popupMaximumPeople(store.getPopupMaximumPeople())
                .categoryIds(categoryIds) // ✅ 카테고리 리스트 추가
                .build();
    }
}
