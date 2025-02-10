package com.d105.pop4u.domain.chat.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "chatting") // ✅ MongoDB 컬렉션 설정
public class ChatMessage {

    @Id
    private String chattingId;  // MongoDB는 String 타입 ID 사용

    private Long chatRoomId; // 연결된 채팅방 ID
    private Long userId; // 보낸 사용자 ID
    private String chattingMessage; // 메시지 내용
    private LocalDateTime chattingCreatedAt; // 생성 시간

    public static ChatMessage create(Long chatRoomId, Long userId, String message) {
        return ChatMessage.builder()
                .chatRoomId(chatRoomId)
                .userId(userId)
                .chattingMessage(message)
                .chattingCreatedAt(LocalDateTime.now())
                .build();
    }
}
