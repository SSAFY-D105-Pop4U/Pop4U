package com.d105.pop4u.global.config.stomp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.d105.pop4u.global.config.jwt.TokenProvider; // 토큰 검증 로직을 가진 클래스

@Component
public class AuthChannelInterceptor implements ChannelInterceptor {

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // CONNECT 메시지일 때만 처리
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7); // "Bearer " 제거
                try {
                    // 토큰 검증 및 Authentication 객체 생성
                    var authentication = tokenProvider.getAuthentication(token);
                    // 유효한 토큰이라면 StompHeaderAccessor에 사용자 정보 설정
                    accessor.setUser(authentication);
                } catch (Exception e) {
                    // 토큰 검증 실패 시 로깅 처리
                    System.err.println("WebSocket 인증 실패: " + e.getMessage());
                }
            }
        }
        return message;
    }
}
