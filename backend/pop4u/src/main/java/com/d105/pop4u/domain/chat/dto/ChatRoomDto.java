package com.d105.pop4u.domain.chat.dto;

import com.d105.pop4u.domain.chat.entity.ChatRoom;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDto {
    private Long chatRoomId;
    private Long popupId; // ✅ PopupStore의 ID

    // ✅ 엔티티 → DTO 변환 메서드
    public static ChatRoomDto fromEntity(ChatRoom chatRoom) {
        if (chatRoom == null) {
            throw new IllegalArgumentException("ChatRoom 엔티티가 null입니다.");
        }

        return ChatRoomDto.builder()
                .chatRoomId(chatRoom.getChatRoomId())
                .popupId(chatRoom.getPopupStore() != null ? chatRoom.getPopupStore().getPopupId() : null)  // ✅ PopupStore가 null인지 체크
                .build();
    }
}
