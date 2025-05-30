package com.d105.pop4u.global.config.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.d105.pop4u.global.config.stomp.AuthChannelInterceptor;

@Configuration
@EnableWebSocketMessageBroker // STOMP 사용 선언
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private AuthChannelInterceptor authChannelInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/chat") // 웹소켓 연결 엔드포인트
                .setAllowedOriginPatterns("*")  // allowedOrigins 대신 사용
                .withSockJS(); // SockJS 지원
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // 구독 경로
        registry.setApplicationDestinationPrefixes("/app"); // 메시지 전송 경로
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // 기존 인터셉터 대신, 위에서 만든 인증 인터셉터 등록
        registration.interceptors(authChannelInterceptor);
    }
}
