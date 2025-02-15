import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/pages/Chat.css";

const SOCKET_URL = "https://i12d105.p.ssafy.io/ws/chat"; // 백엔드 WebSocket 주소

const ChatRoom = () => {
  const [chatRoomId, setChatRoomId] = useState("1");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const stompClientRef = useRef(null);
  const inputRef = useRef(null);

  // 채팅방 ID가 바뀔 때마다 기존 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [chatRoomId]);

  // 기존 채팅 기록 fetch (채팅방 변경 시마다 호출)
  useEffect(() => {
    if (!chatRoomId) return;

    fetch(`https://i12d105.p.ssafy.io/api/chat/${chatRoomId}`, {
      headers: {
        // sessionStorage에 저장된 토큰 사용 (instance.js와 동일한 방식)
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("채팅 기록 요청 실패");
        }
        return response.json();
      })
      .then((chatHistory) => {
        setMessages(chatHistory);
      })
      .catch((error) => console.error("채팅 기록 요청 오류:", error));
  }, [chatRoomId]);

  // WebSocket 연결 및 메시지 구독
  useEffect(() => {
    if (!chatRoomId) return;

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      console.warn("토큰이 없어서 WebSocket 연결을 할 수 없습니다.");
      return;
    }

    const socket = new SockJS(SOCKET_URL, null, { transports: ["websocket"] });
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (msg) => console.log("[STOMP]:", msg),
      onConnect: () => {
        console.log("[STOMP] 연결 성공!");
        // 채팅방 구독
        stompClient.subscribe(`/topic/chat/${chatRoomId}`, (response) => {
          const receivedMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onStompError: (e) => {
        console.error("[STOMP] 연결 실패:", e);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    // 컴포넌트 언마운트 또는 chatRoomId 변경 시 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [chatRoomId]);

  // 메시지 전송
  const sendMessage = () => {
    if (
      !message.trim() ||
      !stompClientRef.current ||
      !stompClientRef.current.connected
    )
      return;

    // 프론트엔드에서는 userId나 userName 정보를 전송하지 않아도,
    // 백엔드에서 토큰을 이용해 Principal을 채워줍니다.
    const chatMessage = {
      chatRoomId: parseInt(chatRoomId, 10),
      chattingMessage: message,
    };

    stompClientRef.current.publish({
      destination: `/app/chat/${chatRoomId}`,
      body: JSON.stringify(chatMessage),
    });

    setMessage("");
    inputRef.current?.focus();
  };

  // UTC를 한국 시간("오전/오후 hh시 mm분")으로 변환 (Intl.DateTimeFormat 사용)
  const convertUTCToKoreanTime = (utcTime) => {
    if (!utcTime) return "";
    // 만약 문자열에 "Z"가 없으면 추가해서 UTC로 인식하도록 함
    const timeString = utcTime.endsWith("Z") ? utcTime : utcTime + "Z";
    const date = new Date(timeString);
    return new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // UTC를 한국 날짜("YYYY. MM. DD")로 변환
  const convertUTCToKoreanDate = (utcTime) => {
    if (!utcTime) return "";
    const timeString = utcTime.endsWith("Z") ? utcTime : utcTime + "Z";
    const date = new Date(timeString);
    return new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  // messages를 날짜별로 그룹화 (날짜 문자열을 key로)
  const groupedMessages = messages.reduce((groups, msg) => {
    const dateKey = convertUTCToKoreanDate(msg.chattingCreatedAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(msg);
    return groups;
  }, {});

  // 그룹의 날짜 순서를 정렬 (오름차순)
  const sortedDates = Object.keys(groupedMessages).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return (
    <div className="chat-container">
      <h2 className="chat-header">WebSocket 채팅 테스트</h2>

      {/* 채팅방 ID 입력 */}
      <div className="input-group">
        <label>채팅방 ID:</label>
        <div className="input-row">
          <input
            type="text"
            value={chatRoomId}
            onChange={(e) => setChatRoomId(e.target.value)}
            className="chat-input"
          />
        </div>
      </div>

      {/* 메시지 입력창 */}
      <div className="input-group">
        <label>메시지:</label>
        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button onClick={sendMessage} className="chat-button">
            보내기
          </button>
        </div>
      </div>

      {/* 채팅 내용 표시 */}
      <h3 className="chat-title">채팅 내용</h3>
      <div className="chat-messages">
        {sortedDates.map((dateKey) => (
          <div key={dateKey}>
            {/* 날짜 헤더 */}
            <div className="chat-date">{dateKey}</div>
            {/* 해당 날짜의 메시지 목록 */}
            {groupedMessages[dateKey].map((msg, index) => (
              <div key={index} className="chat-message">
                <b>{msg.userName || `User ${msg.userId}`}:</b>{" "}
                {msg.chattingMessage}{" "}
                <span className="chat-time">
                  ({convertUTCToKoreanTime(msg.chattingCreatedAt)})
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
