import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/pages/Chat.css"

const SOCKET_URL = "https://i12d105.p.ssafy.io/ws/chat"; // 백엔드 WebSocket 주소

const ChatRoom = () => {
  const [chatRoomId, setChatRoomId] = useState("1");
  const [userId, setUserId] = useState("1001");
  const [userName, setUserName] = useState("TestUser");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const stompClientRef = useRef(null);
  const inputRef = useRef(null);

  // WebSocket 연결 및 메시지 구독
  useEffect(() => {
    if (!chatRoomId) return;

    const socket = new SockJS(SOCKET_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log("[STOMP]:", msg),
      onConnect: () => {
        console.log("[STOMP] 연결 성공!");

        // 채팅방 구독
        stompClient.subscribe(`/topic/chat/${chatRoomId}`, (response) => {
          const receivedMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        // 기존 채팅 기록 불러오기
        fetch(`https://i12d105.p.ssafy.io/api/chat/${chatRoomId}`)
          .then((response) => response.json())
          .then((chatHistory) => {
            setMessages(chatHistory);
          })
          .catch((error) => console.error("채팅 기록 요청 오류:", error));
      },
      onStompError: (e) => {
        console.error("[STOMP] 연결 실패:", e);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [chatRoomId]);

  // 메시지 전송
  const sendMessage = () => {
    if (!message.trim() || !stompClientRef.current || !stompClientRef.current.connected) return;

    const chatMessage = {
      chatRoomId: parseInt(chatRoomId, 10),
      userId: parseInt(userId, 10),
      userName: userName,
      chattingMessage: message,
    };

    stompClientRef.current.publish({
      destination: `/app/chat/${chatRoomId}`,
      body: JSON.stringify(chatMessage),
    });

    setMessage("");
    inputRef.current?.focus();
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">WebSocket 채팅 테스트</h2>

      {/* 채팅방 ID 입력 */}
      <div className="input-group">
        <label>채팅방 ID:</label>
        <div className="input-row">
          <input type="text" value={chatRoomId} onChange={(e) => setChatRoomId(e.target.value)} className="chat-input" />
        </div>
      </div>

      {/* 유저 ID 입력 */}
      <div className="input-group">
        <label>유저 ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="chat-input" />
      </div>

      {/* 유저 이름 입력 */}
      <div className="input-group">
        <label>유저 이름:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="chat-input" />
      </div>

      {/* 메시지 입력창 */}
      <div className="input-group">
        <label>메시지:</label>
        <div className="input-row">
          <input ref={inputRef} type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="chat-input" />
          <button onClick={sendMessage} className="chat-button">보내기</button>
        </div>
      </div>

      {/* 채팅 내용 표시 */}
      <h3 className="chat-title">채팅 내용</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <b>{msg.userName || `User ${msg.userId}`}:</b> {msg.chattingMessage}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
