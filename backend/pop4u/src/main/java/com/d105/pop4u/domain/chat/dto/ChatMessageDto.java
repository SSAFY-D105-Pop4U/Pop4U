package com.d105.pop4u.domain.chat.dto;

import com.d105.pop4u.domain.chat.entity.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDto {
    private Long chattingId;
    private Long chatRoomId;
    private Long userId;
    private String chattingMessage;
    private LocalTime chattingSendTime;
    private LocalDateTime chattingCreatedAt;

    public static ChatMessageDto fromEntity(ChatMessage message) {
        return ChatMessageDto.builder()
                .chattingId(message.getChattingId())
                .chatRoomId(message.getChatRoom().getChatRoomId())
                .userId(message.getUserId())
                .chattingMessage(message.getChattingMessage())
                .chattingSendTime(message.getChattingSendTime())
                .chattingCreatedAt(message.getChattingCreatedAt())
                .build();
    }
}
