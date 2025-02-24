package com.d105.pop4u.domain.chat.entity;

import com.d105.pop4u.domain.chat.dto.ChatMessageDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "chat_messages")
public class ChatMessage {

    @Id
    private String chattingId;       // MongoDB ObjectId

    private Long chatRoomId;         // 채팅방 ID
    private Long userId;             // 발신자 ID
    private String userNickName;         // 발신자 이름 (추가)
    private String chattingMessage;  // 채팅 메시지
    private LocalDateTime chattingCreatedAt = LocalDateTime.now();

    // DTO → 엔티티 변환 메서드
    public static ChatMessage fromDto(ChatMessageDto dto) {
        return ChatMessage.builder()
                .chatRoomId(dto.getChatRoomId())
                .userId(dto.getUserId())
                .userNickName(dto.getUserNickName())  // DTO에서 받은 userName 값 사용
                .chattingMessage(dto.getChattingMessage())
                .chattingCreatedAt(LocalDateTime.now())
                .build();
    }
}
