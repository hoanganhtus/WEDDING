

export default function CoverTextItem({
  text,
  fontSize = "28px",
  fontFamily = "HoaTay1",
  fontWeight = 500,
  color = "rgb(97, 16, 16)",
}: {
  text: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  color?: string;
}) {
  return (
    <div
      style={{
        transition: "1.3s ease-out",
        transform: "none",
        opacity: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          padding: "0px",
          borderRadius: "0px",
          boxShadow: "none",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          opacity: 1,
          border: "0px solid",
        }}
      >
        <h1
          style={{
            height: "auto",
            width: "100%",
            minWidth: "20px",
            color,
            fontSize,
            textShadow: "rgba(0, 0, 0, 0) 0px 0px 2px",
            fontWeight,
            fontFamily,
            textAlign: "center",
            lineHeight: "normal",
            letterSpacing: "0px",
            textTransform: "none",
            textDecoration: "none",
            fontStyle: "normal",
            pointerEvents: "none",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {text}
        </h1>
      </div>
    </div>
  );
}
