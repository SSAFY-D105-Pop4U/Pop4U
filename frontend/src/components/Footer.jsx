import React from "react";
import largeLogo from "../assets/images/large_logo.png";

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer {
            background-color: #222;
            color: #fff;
            padding: 20px 10px;
            text-align: center;
            position: relative;
          }
          .footer-logo {
            width: 80px;
            height: auto;
            margin-bottom: 10px;
          }
          .footer-text {
            font-size: 14px;
            line-height: 1.6;
          }
          @media (max-width: 400px) {
            .footer-logo {
              width: 60px;
            }
            .footer-text {
              font-size: 12px;
            }
          }
        `}
      </style>
      <div className="footer">
        <img src={largeLogo} alt="Large Logo" className="footer-logo" />
        <div className="footer-text">
          고객센터 문의전화
          <br />
          <br />
          D105 팀장 나용성으로 MM 주세요!
          <br />
          <br />
          &copy; {new Date().getFullYear()} Pop4U. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
