package com.d105.pop4u.domain.chat.service;

import com.d105.pop4u.domain.chat.dto.ChatRoomDto;
import com.d105.pop4u.domain.chat.entity.ChatRoom;
import com.d105.pop4u.domain.chat.repository.ChatRoomRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final PopupStoreRepository popupStoreRepository; // ✅ PopupStore 조회를 위해 추가

    @Transactional
    public ChatRoomDto createChatRoom(Long popupId) {
        // ✅ PopupStore 존재 여부 확인
        PopupStore popupStore = popupStoreRepository.findById(popupId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 팝업스토어 ID: " + popupId));

        // ✅ ChatRoom 생성 및 저장
        ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.builder().popupStore(popupStore).build());

        return ChatRoomDto.fromEntity(chatRoom);
    }
}
