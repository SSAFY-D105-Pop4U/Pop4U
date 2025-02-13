//package com.d105.pop4u.domain.chat.service;
//
//import com.d105.pop4u.domain.chat.entity.ChatMessage;
//import com.d105.pop4u.domain.chat.repository.ChatMessageRepository;
//import com.d105.pop4u.global.gpt.GptClient;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Comparator;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class ChatSummaryService {
//
//    private final ChatMessageRepository chatMessageRepository;
//    private final GptClient gptClient;
//
//    /**
//     * 특정 채팅방의 메시지를 취합하여 요약문을 생성합니다.
//     *
//     * @param chatRoomId 채팅방 ID
//     * @return 요약된 텍스트
//     */
//    @Transactional(readOnly = true)
//    public String summarizeChat(Long chatRoomId) {
//        // 1. 채팅 메시지 조회 및 시간순 정렬
//        List<ChatMessage> messages = chatMessageRepository.findByChatRoomId(chatRoomId)
//                .stream()
//                .sorted(Comparator.comparing(ChatMessage::getChattingCreatedAt))
//                .collect(Collectors.toList());
//
//        // 2. 메시지 필터링: 너무 짧은 메시지(예: 10자 미만) 또는 부적절한 메시지 제거
//        List<ChatMessage> filteredMessages = messages.stream()
//                .filter(msg -> {
//                    String content = msg.getChattingMessage();
//                    return content != null
//                            && content.trim().length() >= 10
//                            && !content.contains("클린봇이 부적절한 표현을 감지하였습니다.");
//                })
//                .collect(Collectors.toList());
//
//        // 3. 최신 메시지 10개 선택
//        int total = filteredMessages.size();
//        List<ChatMessage> selectedMessages;
//        if (total > 10) {
//            selectedMessages = filteredMessages.subList(total - 10, total);
//        } else {
//            selectedMessages = filteredMessages;
//        }
//
//        // 4. 메시지들을 하나의 문자열로 취합
//        StringBuilder conversation = new StringBuilder();
//        for (ChatMessage msg : selectedMessages) {
//            conversation.append("[").append(msg.getChattingCreatedAt()).append("] ");
//            conversation.append(msg.getUserName()).append(": ");
//            conversation.append(msg.getChattingMessage()).append("\n");
//        }
//
//        // 5. GPT 프롬프트 생성
//        String prompt = "이 대화 내용은 팝업스토어에서 채팅을 하는 경우입니다.\n" +
//                "팝업스토어와 관련된 대화내용만 가지고 요약을 수행해야 합니다.\n" +
//                "사용자에게 최대한 친절하고 가독성있게 채팅을 요약해 주세요.\n" +
//                "아래 대화 내용을 요약해 주세요:\n" +
//                "--------------------------\n" +
//                conversation.toString() +
//                "--------------------------\n" +
//                "요약:";
//
//        // 6. GPT API 호출 및 요약 결과 반환
//        return gptClient.getSummary(prompt);
//    }
//}
