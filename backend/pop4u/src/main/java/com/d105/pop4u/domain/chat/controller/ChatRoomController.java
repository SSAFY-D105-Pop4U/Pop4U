package com.d105.pop4u.domain.chat.controller;

import com.d105.pop4u.domain.chat.dto.ChatRoomDto;
import com.d105.pop4u.domain.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat-room")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    // ✅ 채팅방 목록 조회
    @GetMapping
    public ResponseEntity<List<ChatRoomDto>> getAllChatRooms() {
        return ResponseEntity.ok(chatRoomService.getAllChatRooms());
    }

    // ✅ 특정 채팅방 조회
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<ChatRoomDto> getChatRoomById(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(chatRoomService.getChatRoomById(chatRoomId));
    }

    // ✅ 채팅방 생성 (팝업 ID 연결)
    @PostMapping("/create/{popupId}")
    public ResponseEntity<ChatRoomDto> createChatRoom(@PathVariable Long popupId) {
        return ResponseEntity.ok(chatRoomService.createChatRoom(popupId));
    }
}
