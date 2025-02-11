package com.d105.pop4u.domain.chat.controller;

import com.d105.pop4u.domain.chat.dto.ChatMessageDto;
import com.d105.pop4u.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    // ✅ 특정 채팅방의 메시지 목록 조회 (REST API)
    @GetMapping("/chat/{chatRoomId}")
    @ResponseBody
    public List<ChatMessageDto> getChatMessages(@PathVariable Long chatRoomId) {
        return chatService.getMessagesByChatRoomId(chatRoomId);
    }

    // ✅ WebSocket 메시지 전송 (STOMP)
    @MessageMapping("/chat/{chatRoomId}")
    @SendTo("/topic/chat/{chatRoomId}")
    public ChatMessageDto sendMessage(@Payload ChatMessageDto chatMessageDto) {
        log.info("채팅 메시지 수신: {}", chatMessageDto);

        return chatService.sendMessage(chatMessageDto);
    }

    // ✅ 특정 채팅방의 기존 메시지 불러오기
    @GetMapping("/{chatRoomId}/history")
    public ResponseEntity<List<ChatMessageDto>> getChatHistory(@PathVariable Long chatRoomId) {
        List<ChatMessageDto> chatHistory = chatService.getChatHistory(chatRoomId);
        return ResponseEntity.ok(chatHistory);
    }


}
