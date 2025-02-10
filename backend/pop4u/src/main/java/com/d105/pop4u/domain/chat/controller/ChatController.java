package com.d105.pop4u.domain.chat.controller;

import com.d105.pop4u.domain.chat.entity.ChatMessage;
import com.d105.pop4u.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    // ✅ 특정 채팅방의 메시지 목록 조회 (REST API)
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<List<ChatMessage>> getChatMessages(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(chatService.getMessagesByChatRoomId(chatRoomId));
    }

    // ✅ 메시지 전송 (STOMP 사용)
    @MessageMapping("/chat/{chatRoomId}") // ✅ 클라이언트에서 "/app/chat/{chatRoomId}"로 메시지 전송
    public void sendMessage(@PathVariable Long chatRoomId, @RequestBody ChatMessage message) {
        chatService.sendMessage(chatRoomId, message.getUserId(), message.getChattingMessage());
    }

    // ✅ 특정 메시지 삭제 (REST API)
    @DeleteMapping("/{chatRoomId}/{chattingId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String chattingId) {
        chatService.deleteMessage(chattingId);
        return ResponseEntity.noContent().build();
    }
}
