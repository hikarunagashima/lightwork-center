import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "LIGHTWORK CENTER";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          padding: "60px 80px",
        }}
      >
        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            display: "flex",
            fontSize: "16px",
            letterSpacing: "0.35em",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          LIGHTWORK CENTER
        </div>

        {/* Center title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 15 ? "52px" : "64px",
            fontWeight: 300,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            display: "flex",
            fontSize: "18px",
            letterSpacing: "0.25em",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          Write × Light
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
