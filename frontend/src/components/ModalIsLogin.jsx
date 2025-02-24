import React from "react";
import "../styles/components/NextButtons.css";

const ModalIsLogin = () => {
  return (
    <div >
     
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>로그인이 필요해요.</h2>

            {/* ✅ URL을 복사할 수 있도록 버튼 추가 */}
            <div style={styles.copyContainer}>
              
            </div>
            <br />
            <button onClick={() => setIsModalOpen(false)} style={styles.modalCloseBtn}>
              닫기
            </button>
            <button onClick={() => setIsModalOpen(false)} style={styles.modalCloseBtn}>
              닫기
            </button>
          </div>
        </div>
     
    </div>
  );

  


};

const styles = {
    container: {
      width: "350px",
      margin: "auto",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    /* ✅ 직접 입력하는 시간 입력창 스타일 */
    timeInput: {
      fontSize: "18px",
      padding: "8px",
      margin: "10px 0",
      textAlign: "center",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "150px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "10px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    /* ✅ 모달 스타일 */
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: "white",
      padding: "20px",
      width: "350px",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    modalCloseBtn: {
      padding: "10px 20px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    copyContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "15px",
    },
    copyInput: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      textAlign: "center",
    },
    copyButton: {
      padding: "8px 15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "14px",
    },
  };



export default ModalIsLogin;
