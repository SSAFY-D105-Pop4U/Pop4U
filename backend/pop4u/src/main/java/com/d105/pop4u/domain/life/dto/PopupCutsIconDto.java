package com.d105.pop4u.domain.life.dto;

import com.d105.pop4u.domain.life.entity.PopupCutsIcon;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopupCutsIconDto {

    private Long id;
    private Long popupId;
    private String popupIconImg;

    public static PopupCutsIconDto fromEntity(PopupCutsIcon icon) {
        return PopupCutsIconDto.builder()
                .id(icon.getId())
                .popupId(icon.getPopupStore().getPopupId())
                .popupIconImg(icon.getPopupIconImg())
                .build();
    }
}
