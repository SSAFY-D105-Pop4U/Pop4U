package com.d105.pop4u.domain.chat.service;

import com.d105.pop4u.domain.chat.dto.ChatMessageDto;
import com.d105.pop4u.domain.chat.entity.ChatMessage;
import com.d105.pop4u.domain.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // ✅ 특정 채팅방 메시지 조회
    public List<ChatMessageDto> getMessagesByChatRoomId(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomId(chatRoomId)
                .stream()
                .map(ChatMessageDto::fromEntity)
                .toList();
    }

    // ✅ 메시지 저장 및 전송
    @Transactional
    public ChatMessageDto sendMessage(ChatMessageDto chatMessageDto) {
        // ✅ 채팅 메시지 저장
        ChatMessage chatMessage = chatMessageRepository.save(ChatMessage.fromDto(chatMessageDto));

//        // ✅ WebSocket으로 메시지 전송
//        messagingTemplate.convertAndSend("/topic/chat/" + chatMessage.getChatRoomId(), ChatMessageDto.fromEntity(chatMessage));

        return ChatMessageDto.fromEntity(chatMessage);
    }

//    // 이전 메시지 조회
//    public List<ChatMessageDto> getChatHistory(Long chatRoomId) {
//        List<ChatMessage> messages = chatMessageRepository.findByChatRoomId(chatRoomId);
//        return messages.stream().map(ChatMessageDto::fromEntity).collect(Collectors.toList());
//    }
}
