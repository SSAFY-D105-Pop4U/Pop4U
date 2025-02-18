import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/pages/Chat.css";
import Header from "../components/basic/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import send from "../assets/icons/send.png";
import present from "../assets/images/present.png"


const SOCKET_URL = "https://i12d105.p.ssafy.io/ws/chat"; // 📌 WebSocket 서버 주소

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sessionValue = sessionStorage.getItem("userId"); // 📌 현재 로그인한 유저 ID
  const stompClientRef = useRef(null);
  const chatContainerRef = useRef(null); // 📌 채팅창 내부 스크롤을 제어할 ref
  const inputRef = useRef(null);

  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId");
  const popupName = searchParams.get("popName");

  const nav = useNavigate();

  // ✅ "게임 만들기" 버튼 클릭 시 이동
  const handleCreateGame = () => {
    nav(`/creategame?popupId=${popupId}`);
  };

  // ✅ 채팅방이 변경되면 기존 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [popupId]);

  // ✅ 채팅 기록 불러오기 (채팅방 변경 시마다 실행)
  useEffect(() => {
    if (!popupId) return;

    fetch(`https://i12d105.p.ssafy.io/api/chat/${popupId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("채팅 기록 요청 실패");
        return response.json();
      })
      .then((chatHistory) => {
        setMessages(chatHistory);

        // 📌 기존 메시지 로딩 후 채팅창 스크롤을 맨 아래로 이동
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      })
      .catch((error) => console.error("채팅 기록 요청 오류:", error));
  }, [popupId]);

  // ✅ WebSocket 연결 및 메시지 구독
  useEffect(() => {
    if (!popupId) return;

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      console.warn("토큰이 없어 WebSocket 연결 불가");
      return;
    }

    const socket = new SockJS(SOCKET_URL, null, { transports: ["websocket"] });
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
      debug: (msg) => console.log("[STOMP]:", msg),
      onConnect: () => {
        console.log("[STOMP] 연결 성공!");
        stompClient.subscribe(`/topic/chat/${popupId}`, (response) => {
          const receivedMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);

          // 📌 새 메시지가 추가될 때 채팅창 스크롤을 맨 아래로 이동
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        });
      },
      onStompError: (e) => console.error("[STOMP] 연결 실패:", e),
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) stompClientRef.current.deactivate();
    };
  }, [popupId]);

  // ✅ 메시지 전송 함수 (버튼 클릭 시 실행)
  const sendMessage = () => {
    if (!message.trim() || !stompClientRef.current?.connected) return;

    const chatMessage = {
      chatRoomId: parseInt(popupId, 10),
      chattingMessage: message,
    };

    stompClientRef.current.publish({
      destination: `/app/chat/${popupId}`,
      body: JSON.stringify(chatMessage),
    });

    setMessage("");
    inputRef.current?.focus();

    // 📌 메시지를 보낸 후 `chat-container` 내부에서 스크롤을 맨 아래로 이동
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="chat-room-container">
      <Header title={popupName}  />

      {/* 📌 채팅 메시지 영역 (스크롤 가능) */}
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index}>
              {/* 다른 유저의 메시지 */}
              {sessionValue !== msg.userId && (
                <>
                  <div>{msg.userNickName || `User ${msg.userId}`}</div>
                  <div className="chat-message">{msg.chattingMessage}</div>
                </>
              )}

              {/* 내 메시지 */}
              {sessionValue === msg.userId && (
                <div className="chat-my">
                  <div className="chat-message-my">{msg.chattingMessage}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 📌 메시지 입력창 (하단 고정) */}
      <div className="input-group fixed-bottom">
        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="메세지를 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button className="game-button" onClick={handleCreateGame}>
            <img src={present} alt="present" className="present_button" />
          </button>
          <button onClick={sendMessage} className="send_button">
            <img src={send} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
