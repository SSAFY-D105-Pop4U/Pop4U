import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/pages/Chat.css";

const SOCKET_URL = "http://localhost:8080/ws/chat"; // ✅ 백엔드 웹소켓 URL

const Chat = () => {
  const [chatRoomId, setChatRoomId] = useState("1"); // ✅ 기본 채팅방 ID
  const [userId, setUserId] = useState("1001"); // ✅ 기본 유저 ID
  const [message, setMessage] = useState(""); // 내가 보내는 메세지
  const [messages, setMessages] = useState([]); // ✅ 기존 메세지
  const stompClientRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!chatRoomId) return;

    // ✅ 웹소켓 연결 설정
    const socket = new SockJS(SOCKET_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log("[STOMP] 연결 성공:", msg),
      onConnect: () => {
        console.log("[STOMP] 연결 성공");

        // ✅ 채팅방 구독
        stompClient.subscribe(`/topic/chat/${chatRoomId}`, (response) => {
          const newMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // ✅ 채팅방 입장 시 기존 메시지 불러오기
        fetchChatHistory();
      },
      onStompError: (e) => {
        console.error("[STOMP] 연결 실패:", e);
        stompClient.deactivate();
      },
      onDisconnect: () => console.log("[STOMP] 연결 해제"),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [chatRoomId]);

  // ✅ 기존 채팅 내역 불러오기
  const fetchChatHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chat/${chatRoomId}`
      );
      const data = await response.json();

      console.log("📌 불러온 채팅 내역:", data); // ✅ 콘솔에서 데이터 확인

      // ✅ 응답이 배열이 아니면 빈 배열로 설정
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("채팅 내역 불러오기 실패:", error);
      setMessages([]); // ❗ API 호출 실패 시에도 빈 배열로 설정 (에러 방지)
    }
  };

  // ✅ 메시지 전송 함수
  const sendMessage = () => {
    if (
      !message.trim() ||
      !stompClientRef.current ||
      !stompClientRef.current.connected
    )
      return;

    const chatMessage = {
      chatRoomId: parseInt(chatRoomId, 10),
      userId: parseInt(userId, 10),
      chattingMessage: message,
    };

    stompClientRef.current.publish({
      destination: `/app/chat/${chatRoomId}`,
      body: JSON.stringify(chatMessage),
    });

    setMessage("");
    inputRef.current?.focus();
  };

  // ✅ Enter 키 입력 시 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* ✅ 채팅방 설정 */}
      <div className="chat-header">
        <h2>WebSocket 채팅 테스트</h2>
      </div>

      {/* ✅ 채팅방 및 유저 ID 설정 */}
      <div className="chat-settings">
        <div className="chat-input">
          <label>채팅방 ID:</label>
          <input
            type="text"
            value={chatRoomId}
            onChange={(e) => setChatRoomId(e.target.value)}
          />
        </div>
        <div className="chat-input">
          <label>유저 ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ 채팅 메시지 출력 */}
      <div className="chat-messages">
        {Array.isArray(messages) ? (
          messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <b>User {msg.userId}:</b> {msg.chattingMessage}
            </div>
          ))
        ) : (
          <p>채팅 내역을 불러오는 중...</p> // 데이터가 없을 때 안전한 UI 출력
        )}
      </div>

      {/* ✅ 메시지 입력 & 전송 */}
      <div className="chat-footer">
        <input
          ref={inputRef}
          type="text"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>보내기</button>
      </div>
    </div>
  );
};

export default Chat;
