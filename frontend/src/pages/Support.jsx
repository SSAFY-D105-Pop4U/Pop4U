import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer"; // Footer 분리 컴포넌트
import largeLogo from "../assets/images/large_logo.png";

const Support = () => {
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    // 예시 FAQ 데이터 (실제 데이터나 API로 교체 가능)
    const faqs = [
      {
        question: "팝업스토어 이용 관련 문의는 어디로 하나요?",
        answer: "팝업스토어 이용 관련 문의는 고객센터를 통해 문의해 주세요.",
      },
      {
        question: "팝업스토어 예약은 어떻게 하나요?",
        answer: "예약은 예약 기능을 통해 진행됩니다.",
      },
      {
        question: "리뷰 작성은 어떻게 하나요?",
        answer: "상세 페이지 내 리뷰 탭에서 작성하실 수 있습니다.",
      },
      {
        question: "문의 답변은 언제 받을 수 있나요?",
        answer: "문의하신 내용은 최대 24시간 이내에 답변드리도록 노력하고 있습니다.",
      },
      {
        question: "회원가입은 어떻게 하나요?",
        answer: "회원가입은 웹사이트의 '회원가입' 버튼을 통해 진행할 수 있습니다.",
      },
    ];
    setFaqList(faqs);
  }, []);

  return (
    <>
      <style>
        {`
          /* 전체 화면에 큰 로고 배경 */
          .background-logo {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${largeLogo});
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            opacity: 0.1;
            z-index: -1;
          }

          /* 상단 고정 헤더 */
          .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 10;
          }
          .back-button {
            position: absolute;
            left: 15px;
            top: 10px;
          }
          .header-title {
            font-size: 20px;
            font-weight: bold;
            color: #005f99;
          }

          /* 메인 컨텐츠: 헤더 밑부터 시작 (마진 상향 조정) */
          .content-container {
            margin-top: 70px; /* 헤더 높이(60px)보다 충분히 크게 설정 */
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: transparent;
            position: relative;
            z-index: 1;
          }
          .support-intro {
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.5;
            text-align: center;
            color: #333;
          }
          .faq-list {
            margin-top: 10px;
          }
          .faq-item {
            margin-bottom: 15px;
            padding: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            background-color: rgba(255, 255, 255, 0.9);
            transition: background-color 0.3s;
          }
          .faq-item:hover {
            background-color: rgba(240, 240, 240, 0.9);
          }
          .faq-question {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #005f99;
          }
          .faq-answer {
            font-size: 15px;
            line-height: 1.4;
            color: #444;
          }

          @media (max-width: 400px) {
            .header-title {
              font-size: 18px;
            }
            .faq-question {
              font-size: 15px;
            }
            .faq-answer {
              font-size: 14px;
            }
          }
        `}
      </style>

      {/* 배경 로고 */}
      <div className="background-logo" />

      {/* 상단 헤더 */}
      <div className="header">
        <div className="back-button">
          <BackButton />
        </div>
        <div className="header-title">고객지원</div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="content-container">
        <div className="support-intro">Pop4U 고객센터에 오신 것을 환영합니다. 자주 묻는 질문을 확인하시거나, 궁금하신 사항이 있으시면 문의해 주세요.</div>
        <div className="faq-list">
          {faqList.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer 영역 */}
      <Footer />
    </>
  );
};

export default Support;
