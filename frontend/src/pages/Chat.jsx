import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../styles/pages/Chat.css";
import Header from "../components/basic/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import send from "../assets/icons/send.png";
import present_button from "../assets/images/present.png";

const SOCKET_URL = "https://i12d105.p.ssafy.io/ws/chat";

const ChatRoom = ({ popName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sessionValue = sessionStorage.getItem("userId");
  const stompClientRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null); // ✅ 채팅창을 참조할 useRef 추가

  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId");
  const popupName = searchParams.get("popName");

  const nav = useNavigate();

  const handleCreateGame = () => {
    nav(`/creategame?popupId=${popupId}`);
  };

  // ✅ 스크롤을 최하단으로 이동하는 함수 추가
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // 부드러운 스크롤
      });
    }
  };

  // 채팅방 ID가 바뀔 때 기존 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [popupId]);

  // ✅ 기존 채팅 기록 가져온 후, 스크롤 이동
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
        setTimeout(scrollToBottom, 100); // ✅ 데이터를 받은 후, 스크롤 이동
      })
      .catch((error) => console.error("채팅 기록 요청 오류:", error));
  }, [popupId]);

  // ✅ WebSocket 연결 후 스크롤 이동
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
        stompClient.subscribe(`/topic/chat/${popupId}`, (response) => {
          const receivedMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          setTimeout(scrollToBottom, 100); // ✅ 새로운 메시지가 올 때마다 스크롤 이동
        });
      },
      onStompError: (e) => {
        console.error("[STOMP] 연결 실패:", e);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [popupId]);

  // ✅ 메시지 전송 후 스크롤 이동
  const sendMessage = () => {
    if (!message.trim() || !stompClientRef.current || !stompClientRef.current.connected) return;

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
    setTimeout(scrollToBottom, 100); // ✅ 메시지 전송 후 스크롤 이동
  };

  // UTC -> 한국 시간 변환
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

  // UTC -> 한국 날짜 변환
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

  const groupedMessages = messages.reduce((groups, msg) => {
    const dateKey = convertUTCToKoreanDate(msg.chattingCreatedAt);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title={popupName} />
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat-messages">
          {sortedDates.map((dateKey) => (
            <div key={dateKey}>
              <div><span className="chat-date">{dateKey}</span></div>
              {groupedMessages[dateKey].map((msg, index) => (
                <div key={index}>
                  {sessionValue !== msg.userId && <div>{msg.userNickName || `User ${msg.userId}`}</div>}
                  <div className={sessionValue === msg.userId ? "chat-message-my" : "chat-message"}>
                    <span>{msg.chattingMessage}</span>
                  </div>
                  <span className="chat-time" style={{ fontSize: "13px" }}>
                    {convertUTCToKoreanTime(msg.chattingCreatedAt)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="input-group">
        <div className="input-row">
          <input ref={inputRef} type="text" placeholder="메세지를 입력해주세요." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="chat-input" />
          <button className="game-button" onClick={handleCreateGame}>
            <img src={present_button} alt="present_button" className="present_button" />
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
