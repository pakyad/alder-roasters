import { ImageResponse } from "next/og";

export const alt = "ALDER ROASTERS — seasonal coffee from Petaling Jaya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f7f4ec",
        color: "#20302a",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 10 }}>ALDER ROASTERS</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05 }}>Coffee,</div>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05 }}>made clear.</div>
      </div>
      <div style={{ color: "#5a6b60", display: "flex", fontSize: 30 }}>
        Seasonal coffee · Petaling Jaya · Roasted weekly
      </div>
      <div
        style={{
          backgroundColor: "#c2410c",
          bottom: 0,
          height: 14,
          left: 0,
          position: "absolute",
          width: "100%",
        }}
      />
    </div>,
    size,
  );
}
