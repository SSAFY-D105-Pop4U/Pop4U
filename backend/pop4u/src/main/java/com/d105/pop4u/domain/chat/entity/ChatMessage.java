package com.d105.pop4u.domain.chat.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "chatting")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatting_id")
    private Long chattingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id", nullable = false)
    private ChatRoom chatRoom; // 채팅방 정보

    @Column(name = "user_id", nullable = false)
    private Long userId; // 보낸 유저 ID

    @Column(name = "chatting_message", nullable = false, columnDefinition = "TEXT")
    private String chattingMessage;

    @Column(name = "chatting_send_time", nullable = false)
    private LocalTime chattingSendTime = LocalTime.now();

    @Column(name = "chatting_created_at", nullable = false)
    private LocalDateTime chattingCreatedAt = LocalDateTime.now();
}
