package com.d105.pop4u.domain.chat.entity;

import com.d105.pop4u.domain.store.entity.PopupStore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "chat_room")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "popup_id", nullable = false, unique = true)
    private PopupStore popupStore;  // 채팅방 1개 : 팝업 1개
}
