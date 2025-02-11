package com.d105.pop4u.domain.chat.controller;

import com.d105.pop4u.domain.chat.entity.ChatRoom;
import com.d105.pop4u.domain.chat.repository.ChatRoomRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomRepository chatRoomRepository;
    private final PopupStoreRepository popupStoreRepository;

    // ✅ 특정 팝업스토어의 채팅방 조회
    @GetMapping("/{popupId}")
    public ResponseEntity<ChatRoom> getChatRoomByPopup(@PathVariable Long popupId) {
        PopupStore popupStore = popupStoreRepository.findById(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
        Optional<ChatRoom> chatRoom = chatRoomRepository.findByPopupStore(popupStore);
        return chatRoom.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
