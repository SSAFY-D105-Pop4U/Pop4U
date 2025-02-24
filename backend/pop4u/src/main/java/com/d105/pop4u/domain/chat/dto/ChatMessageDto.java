package com.d105.pop4u.domain.chat.dto;

import com.d105.pop4u.domain.chat.entity.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDto {
    private String chattingId;         // MongoDB의 ObjectId (문자열)
    private Long chatRoomId;           // 채팅방 ID
    private Long userId;             // 발신자 ID
    private String userNickName;         // 발신자 이름 (추가)
    private String chattingMessage;  // 채팅 내용
    private LocalDateTime chattingCreatedAt;  // 채팅 생성 시간

    // 엔티티 → DTO 변환 메서드
    public static ChatMessageDto fromEntity(ChatMessage message) {
        return ChatMessageDto.builder()
                .chattingId(message.getChattingId())
                .chatRoomId(message.getChatRoomId())
                .userId(message.getUserId())
                .userNickName(message.getUserNickName())  // 추가된 필드
                .chattingMessage(message.getChattingMessage())
                .chattingCreatedAt(message.getChattingCreatedAt())
                .build();
    }
}
