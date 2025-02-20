import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/pages/Chat.css";
import Header from "../components/basic/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import send from "../assets/icons/send.png";
import present_button from "../assets/images/present.png";

const SOCKET_URL = "https://i12d105.p.ssafy.io/ws/chat"; // 백엔드 WebSocket 주소

const ChatRoom = ({ popName }) => {
  const [chatRoomId, setChatRoomId] = useState("1");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sessionValue = sessionStorage.getItem("userId");
  const stompClientRef = useRef(null);
  const inputRef = useRef(null);

  // ↓↓↓ 추가: 채팅 스크롤 관리를 위한 ref
  const chatMessagesRef = useRef(null);

  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId");
  const popupName = searchParams.get("popName");
  const userStatus = sessionStorage.getItem('userStatus')

  const nav = useNavigate();

  const handleCreateGame = () => {
    nav(`/creategame?popupId=${popupId}`);
  };

  // 채팅방 ID가 바뀔 때마다 기존 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [popupId]);

  // 기존 채팅 기록 fetch (채팅방 변경 시마다 호출)
  useEffect(() => {
    if (!popupId) return;

    fetch(`https://i12d105.p.ssafy.io/api/chat/${popupId}`, {
      headers: {
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
  }, [popupId]);

  // WebSocket 연결 및 메시지 구독
  useEffect(() => {
    if (!popupId) return;

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
        stompClient.subscribe(`/topic/chat/${popupId}`, (response) => {
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

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [popupId]);

  // ↓↓↓ 추가: messages가 바뀔 때마다 스크롤을 가장 아래로 이동
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 전송
  const sendMessage = () => {
    if (
      !message.trim() ||
      !stompClientRef.current ||
      !stompClientRef.current.connected
    )
      return;

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
    // ↓↓↓ 추가: 메시지 전송 버튼 누른 직후에도 스크롤을 아래로 이동
    if (chatMessagesRef.current) {
      setTimeout(() => {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }, 0);
    }
  };

  // 시간/날짜 변환 함수들
  const convertUTCToKoreanTime = (utcTime) => {
    if (!utcTime) return "";
    const timeString = utcTime.endsWith("Z") ? utcTime : utcTime + "Z";
    const date = new Date(timeString);
    return new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

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

  // 날짜별로 메시지 그룹화
  const groupedMessages = messages.reduce((groups, msg) => {
    const dateKey = convertUTCToKoreanDate(msg.chattingCreatedAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(msg);
    return groups;
  }, {});

  // 날짜 순서를 정렬
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a) - new Date(b)
  );

 const formatMessage = (message) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return message.split(urlRegex).map((part, index) =>
    part.match(urlRegex) ? (
      <a key={index} href={part} rel="noopener noreferrer" className="chat-link">
        {part}
      </a>
    ) : (
      part
    )
  );
};


  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header title={popupName} />
      <div className="chat-container">
        {/* 채팅 내용 표시 */}
        <div className="chat-messages" ref={chatMessagesRef}>
          {sortedDates.map((dateKey) => (
            <div key={dateKey}>
              <div>
                <span className="chat-date">{dateKey}</span>
              </div>
              {groupedMessages[dateKey].map((msg, index) => (
                <div key={index}>
                  {sessionValue != msg.userId && (
                    <div>{msg.userNickName || `User ${msg.userId}`}</div>
                  )}
                  {sessionValue != msg.userId && (
                    <div className="chat-message">
                      {formatMessage(msg.chattingMessage)}
                      {/* <span>{msg.chattingMessage} </span> */}
                    </div>
                  )}
                  {sessionValue == msg.userId && (
                    <div className="chat-my">
                      <span className="chat-time" style={{ fontSize: "13px" }}>
                        {convertUTCToKoreanTime(msg.chattingCreatedAt)}
                      </span>
                      <div className="chat-message-my">
                      {formatMessage(msg.chattingMessage)}
                        {/* <span>{msg.chattingMessage} </span> */}
                      </div>
                    </div>
                  )}
                  {sessionValue != msg.userId && (
                    <span className="chat-time" style={{ fontSize: "13px" }}>
                      {convertUTCToKoreanTime(msg.chattingCreatedAt)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 메시지 입력창 */}
      <div className="input-group">
        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="메세지를 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="chat-input"
          />
          {(userStatus=="1")&&(<button className="game-button" onClick={handleCreateGame}>
            <img
              src={present_button}
              alt="present_button"
              className="present_button"
            />
          </button>)}
          
          <button onClick={sendMessage} className="send_button">
            <img src={send} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
