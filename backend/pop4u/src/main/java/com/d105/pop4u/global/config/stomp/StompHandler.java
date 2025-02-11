package com.d105.pop4u.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class StompHandler implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        switch (accessor.getCommand()) {
            case CONNECT:
                log.info("WebSocket 연결 요청: {}", accessor.getSessionId());
                break;
            case SUBSCRIBE:
                log.info("채팅방 입장: {}", accessor.getDestination());
                break;
            case DISCONNECT:
                log.info("WebSocket 연결 종료: {}", accessor.getSessionId());
                break;
            default:
                break;
        }
        return message;
    }
}
