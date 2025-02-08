package com.d105.pop4u.domain.store.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "popup_store_img")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopupStoreImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "popup_img_id", nullable = false)
    private Long popupImgId;

    @ManyToOne
    @JoinColumn(name = "popup_id", nullable = false)
    private PopupStore popupStore; // ✅ 팝업과 N:1 관계

    @Column(name = "popup_img", nullable = false, length = 255)
    private String popupImg; // ✅ 이미지 URL 또는 경로 저장
}
