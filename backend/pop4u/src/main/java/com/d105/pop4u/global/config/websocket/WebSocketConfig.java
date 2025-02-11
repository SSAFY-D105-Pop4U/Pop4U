package com.d105.pop4u.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // ✅ STOMP 사용 선언
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/chat") // ✅ 웹소켓 연결 엔드포인트
                .setAllowedOriginPatterns("*")  // ✅ `allowedOrigins("*")` 대신 사용
                .withSockJS(); // ✅ SockJS 지원
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // ✅ 구독 경로 (클라이언트가 메시지를 받을 경로)
        registry.setApplicationDestinationPrefixes("/app"); // ✅ 메시지 전송 경로 (클라이언트 → 서버)
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new com.d105.pop4u.global.config.StompHandler()); // ✅ STOMP 핸들러 적용 (존재하는 경우)
    }
}
