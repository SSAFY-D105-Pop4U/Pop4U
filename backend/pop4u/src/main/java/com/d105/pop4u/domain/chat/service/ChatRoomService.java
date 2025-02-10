package com.d105.pop4u.domain.chat.service;

import com.d105.pop4u.domain.chat.entity.ChatRoom;
import com.d105.pop4u.domain.chat.repository.ChatRoomRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final PopupStoreRepository popupStoreRepository;

    // ✅ 팝업스토어 생성 시 자동으로 채팅방 생성
    @Transactional
    public void createChatRoomForPopup(PopupStore popupStore) {
        // 이미 존재하는 채팅방이 있으면 생성하지 않음
        Optional<ChatRoom> existingChatRoom = chatRoomRepository.findByPopupStore(popupStore);
        if (existingChatRoom.isEmpty()) {
            ChatRoom chatRoom = ChatRoom.builder().popupStore(popupStore).build();
            chatRoomRepository.save(chatRoom);
        }
    }

    // ✅ 팝업스토어 삭제 시 채팅방도 자동 삭제
    @Transactional
    public void deleteChatRoomByPopup(PopupStore popupStore) {
        chatRoomRepository.findByPopupStore(popupStore).ifPresent(chatRoomRepository::delete);
    }
}
