const Divider = ({ height = "10px", top = "10px", bottom = "10px" }) => {
  const numericHeight = parseInt(height, 10);
  const numericTop = parseInt(top, 10);
  const numericBottom = parseInt(bottom, 10);
  const dynamicMargin = `${numericTop / 5}vw 0 ${numericBottom / 5}vw 0`;
  const dynamicHeight = `${numericHeight / 5}vw`;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: dynamicHeight, // 동적으로 설정
        backgroundColor: "#f6f7f7",
        margin: dynamicMargin,
      }}
    ></div>
  );
};

export default Divider;
