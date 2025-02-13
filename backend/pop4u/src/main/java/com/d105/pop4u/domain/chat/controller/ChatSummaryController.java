//package com.d105.pop4u.domain.chat.controller;
//
//import com.d105.pop4u.domain.chat.service.ChatSummaryService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/chat-summary")
//@RequiredArgsConstructor
//public class ChatSummaryController {
//
//    private final ChatSummaryService chatSummaryService;
//
//    /**
//     * 특정 채팅방의 요약문을 생성하여 반환합니다.
//     *
//     * @param chatRoomId 채팅방 ID
//     * @return 요약 텍스트
//     */
//    @GetMapping("/{chatRoomId}")
//    public ResponseEntity<String> getChatSummary(@PathVariable Long chatRoomId) {
//        String summary = chatSummaryService.summarizeChat(chatRoomId);
//        return ResponseEntity.ok(summary);
//    }
//}
