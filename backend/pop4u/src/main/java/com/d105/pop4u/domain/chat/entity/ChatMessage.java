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
    private String chattingId;  // ✅ MongoDB의 ObjectId (자동 생성됨)

    private Long chatRoomId;  // ✅ 숫자로 유지해야 함
    private Long userId;
    private String chattingMessage;
    private LocalDateTime chattingCreatedAt = LocalDateTime.now();

    public static ChatMessage fromDto(ChatMessageDto dto) {
        return ChatMessage.builder()
                .chatRoomId(dto.getChatRoomId())
                .userId(dto.getUserId())
                .chattingMessage(dto.getChattingMessage())
                .chattingCreatedAt(LocalDateTime.now())
                .build();
    }
}
