package com.d105.pop4u.domain.life.entity;

import com.d105.pop4u.domain.store.entity.PopupStore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "popup_cuts_icon")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopupCutsIcon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "popup_icon_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "popup_id", nullable = false)
    private PopupStore popupStore;  // 팝업과 연결

    @Column(name = "popup_icon_img", nullable = false)
    private String popupIconImg;  // S3에 저장된 인생네컷 아이콘 URL
}
