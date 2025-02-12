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
import java.security.Principal;
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

    @MessageMapping("/chat/{chatRoomId}")
    @SendTo("/topic/chat/{chatRoomId}")
    public ChatMessageDto sendMessage(@Payload ChatMessageDto chatMessageDto) {
        log.info("채팅 메시지 수신: {}", chatMessageDto);

        return chatService.sendMessage(chatMessageDto);
    }

//    // ✅ WebSocket 메시지 전송 (STOMP)
//    @MessageMapping("/chat/{chatRoomId}")
//    @SendTo("/topic/chat/{chatRoomId}")
//    public ChatMessageDto sendMessage(@Payload ChatMessageDto chatMessageDto, Principal principal) {
//        // 인증된 사용자 정보에서 이름(및 필요한 경우 ID)를 가져와 DTO에 설정합니다.
//        // 예를 들어, principal.getName()이 사용자 이름을 반환한다고 가정
//        chatMessageDto.setUserName(principal.getName());
//
//        // 만약 사용자 ID도 설정해야 한다면,
//        // 커스텀 UserDetails를 사용 중이라면, Principal을 해당 타입으로 캐스팅하여 userId를 얻을 수 있습니다.
//        // 예시: ((CustomUserDetails)principal).getUserId();
//        // 현재 예시에서는 단순히 이름만 처리합니다.
//
//        log.info("채팅 메시지 수신(수정됨): {}", chatMessageDto);
//        return chatService.sendMessage(chatMessageDto);
//    }
    


}
