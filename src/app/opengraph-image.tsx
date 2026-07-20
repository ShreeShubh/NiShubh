import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const alt = `${siteConfig.name} - ${siteConfig.tagline}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f8fafc",
          color: "#0f172a",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            height: "100%",
            justifyContent: "space-between",
            padding: "56px",
            width: "100%",
          }}
        >
          <div style={{ color: "#1d4ed8", fontSize: 30, fontWeight: 700 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: 0 }}>
              {siteConfig.name}
            </div>
            <div style={{ color: "#475569", display: "flex", fontSize: 38, lineHeight: 1.25, maxWidth: 900 }}>
              Modern website development and digital experiences by the NiShubh team.
            </div>
          </div>
          <div style={{ color: "#0f766e", display: "flex", fontSize: 28, fontWeight: 700 }}>
            Next.js • MERN • Responsive websites
          </div>
        </div>
      </div>
    ),
    size,
  )
}
