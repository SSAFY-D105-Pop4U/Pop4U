package com.d105.pop4u.domain.category.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(name = "category_name", length = 50, nullable = false, unique = true)
    private String categoryName;

//    // ✅ 팝업스토어와의 관계 (N:M) - `popup_category`를 통해 연결 예정
//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
//    private List<PopupCategory> popupCategories;
}
