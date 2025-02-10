package com.d105.pop4u.domain.chat.service;

import com.d105.pop4u.domain.chat.entity.ChatMessage;
import com.d105.pop4u.domain.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // ✅ 특정 채팅방 메시지 조회
    public List<ChatMessage> getMessagesByChatRoomId(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomId(chatRoomId);
    }

    // ✅ 메시지 전송 (STOMP + MongoDB 저장)
    @Transactional
    public void sendMessage(Long chatRoomId, Long userId, String message) {
        ChatMessage chatMessage = ChatMessage.create(chatRoomId, userId, message);
        chatMessageRepository.save(chatMessage); // MongoDB 저장

        // STOMP 브로드캐스트 (구독 중인 클라이언트에 메시지 전송)
        messagingTemplate.convertAndSend("/topic/chat/" + chatRoomId, chatMessage);
    }

    // ✅ 특정 메시지 삭제
    @Transactional
    public void deleteMessage(String chattingId) {
        chatMessageRepository.deleteById(chattingId);
    }
}
