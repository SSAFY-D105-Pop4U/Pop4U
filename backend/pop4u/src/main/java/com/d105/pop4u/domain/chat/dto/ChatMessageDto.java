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
    private String chattingId;  // ✅ 몽고DB 사용 시, ID 타입을 `String`으로 변경
    private Long chatRoomId;  // ✅ 채팅방 ID도 `String`으로 변경 (몽고DB 연동 고려)
    private Long userId;
    private String chattingMessage;
    private LocalDateTime chattingCreatedAt;  // ✅ 채팅 생성시간 통합

    // ✅ 엔티티 → DTO 변환 메서드
    public static ChatMessageDto fromEntity(ChatMessage message) {
        return ChatMessageDto.builder()
                .chattingId(message.getChattingId())  // ✅ 몽고DB ObjectId 변환 고려
                .chatRoomId(message.getChatRoomId())
                .userId(message.getUserId())
                .chattingMessage(message.getChattingMessage())
                .chattingCreatedAt(message.getChattingCreatedAt())  // ✅ 통일된 시간 필드
                .build();
    }
}
