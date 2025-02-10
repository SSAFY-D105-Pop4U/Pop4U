package com.d105.pop4u.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            log.info("WebSocket 연결 요청: {}", accessor.getUser());
        } else if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            log.info("채팅방 입장: {}", accessor.getDestination());
        } else if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
            log.info("WebSocket 연결 종료: {}", accessor.getUser());
        }
        return message;
    }
}
