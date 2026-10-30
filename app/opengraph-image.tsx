import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { course } from "@/lib/content";

export const alt = `${course.name}, ${course.dateLong}, ${course.fee} | ${course.academy}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/assets/vls/brand/vls-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#111315",
          color: "#ffffff",
          padding: "56px 64px",
          gap: 56,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <img src={logoSrc} width={190} height={190} alt="" style={{ background: "#ffffff", padding: 8 }} />
          <div style={{ display: "flex", width: 120, height: 6, background: "#AE1015" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, fontWeight: 700, color: "#C8A46B" }}>
            VLS LAW ACADEMY  ·  PRACTICAL LEGAL TRAINING
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Constitutional Law</div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#C8A46B" }}>
              & Practice Boot Camp
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 32, gap: 6 }}>
            <div style={{ display: "flex", fontWeight: 700 }}>{course.dateLong}</div>
            <div style={{ display: "flex", color: "#e8e2d6" }}>
              {course.time}  ·  {course.duration}  ·  {course.fee}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
