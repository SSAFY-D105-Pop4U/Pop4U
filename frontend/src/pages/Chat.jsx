import React, { useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './Chat.css';

function Chat() {
  const [chatRoomId, setChatRoomId] = useState('1');
  const [userId, setUserId] = useState('1001');
  const [userName, setUserName] = useState('TestUser');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [summary, setSummary] = useState('');
  const stompClientRef = useRef(null);

  // 웹소켓 연결 함수
  const connect = () => {
    // 이미 연결되어 있다면 중복 연결 방지
    if (stompClientRef.current) {
      console.log('이미 연결됨');
      return;
    }

    // 실제 백엔드 주소 (포트나 도메인에 맞게 수정)
    const socket = new SockJS('http://localhost:8081/ws/chat');
    const stompClient = Stomp.over(socket);

    // 연결 시도
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);

      // 특정 채팅방에 대한 구독
      stompClient.subscribe(`/topic/chat/${chatRoomId}`, (response) => {
        const newMessage = JSON.parse(response.body);
        const sender = newMessage.userName || `User ${newMessage.userId}`;
        setMessages((prev) => [
          ...prev,
          { sender, text: newMessage.chattingMessage },
        ]);
      });

      // 채팅방 입장 시 기존 메시지 로드
      fetch(`http://localhost:8081/chat/${chatRoomId}`)
        .then((res) => res.json())
        .then((data) => {
          // data는 [{ chatRoomId, userId, userName, chattingMessage }, ...] 형태라고 가정
          const initialMessages = data.map((m) => ({
            sender: m.userName || `User ${m.userId}`,
            text: m.chattingMessage,
          }));
          setMessages(initialMessages);
        })
        .catch((err) => console.error('기존 메시지 로드 오류:', err));
    });

    // stompClient를 ref에 저장
    stompClientRef.current = stompClient;
  };

  // 메시지 전송 함수
  const sendMessage = () => {
    if (!stompClientRef.current) {
      alert('먼저 채팅방에 입장하세요.');
      return;
    }

    stompClientRef.current.send(
      `/app/chat/${chatRoomId}`,
      {},
      JSON.stringify({
        chatRoomId: parseInt(chatRoomId, 10),
        userId: parseInt(userId, 10),
        userName,
        chattingMessage: message,
      })
    );

    setMessage('');
  };

  // 채팅 요약 함수
  const summarizeChat = () => {
    if (!chatRoomId) {
      alert('먼저 채팅방에 입장하세요.');
      return;
    }

    // 실제 요약 API 주소 (포트/도메인 수정)
    fetch(`http://localhost:8080/chat-summary/${chatRoomId}`)
      .then((res) => res.text())
      .then((data) => {
        setSummary(data);
      })
      .catch((err) => {
        console.error('요약 요청 오류:', err);
      });
  };

  return (
    <div className="page-container">
      <div className="chat-container">
        <h2 className="title">WebSocket 채팅 테스트</h2>

        {/* 채팅방 ID */}
        <div className="form-group">
          <label className="label">채팅방 ID:</label>
          <div className="input-group">
            <input
              type="text"
              value={chatRoomId}
              onChange={(e) => setChatRoomId(e.target.value)}
              className="input"
            />
            <button onClick={connect} className="button button-blue">
              입장
            </button>
          </div>
        </div>

        {/* 유저 ID */}
        <div className="form-group">
          <label className="label">유저 ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input"
          />
        </div>

        {/* 유저 이름 */}
        <div className="form-group">
          <label className="label">유저 이름:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
          />
        </div>

        {/* 메시지 입력 */}
        <div className="form-group">
          <label className="label">메시지:</label>
          <div className="input-group">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
            />
            <button onClick={sendMessage} className="button button-green">
              보내기
            </button>
          </div>
        </div>

        {/* 요약 요청 버튼 */}
        <div className="form-group">
          <button onClick={summarizeChat} className="button button-purple">
            요약 요청
          </button>
        </div>

        {/* 채팅 내용 */}
        <h3 className="subtitle">채팅 내용</h3>
        <div className="chat-area">
          {messages.map((msg, idx) => (
            <p key={idx}>
              <b>{msg.sender}:</b> {msg.text}
            </p>
          ))}
        </div>

        {/* 채팅 요약 */}
        <h3 className="subtitle">채팅 요약</h3>
        <div className="summary-area">
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
