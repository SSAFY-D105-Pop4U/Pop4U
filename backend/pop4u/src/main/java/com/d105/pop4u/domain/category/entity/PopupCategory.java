package com.d105.pop4u.domain.category.entity;

import com.d105.pop4u.domain.store.entity.PopupStore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "popup_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopupCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "popup_category_id")
    private Long id;

    // ✅ 팝업스토어 연결 (Many-to-One)
    @ManyToOne
    @JoinColumn(name = "popup_id", nullable = false)
    private PopupStore popupStore;

    // ✅ 카테고리 연결 (Many-to-One)
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
