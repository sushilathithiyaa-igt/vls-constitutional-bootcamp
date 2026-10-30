import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { course } from "@/lib/content";
import { indexable, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const title = `${course.name} | ${course.dateShort} | ${course.academy}`;
const description = `A three-hour boot camp on writ petitions, PILs, special leave, review and curative petitions and other constitutional remedies before the Supreme Court and High Courts. ${course.dateLong}, ${course.time}. ${course.fee}. ${course.academy}, Chennai.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  robots: indexable ? undefined : { index: false, follow: false },
  openGraph: {
    title,
    description: `Understand the Constitution. Learn the Remedies. Explore Court Practice. ${course.dateLong}, ${course.time}. ${course.fee}.`,
    type: "website",
    url: "/",
    siteName: course.academy,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: `${course.dateLong}, ${course.time}. ${course.fee}. Understand the Constitution. Learn the Remedies. Explore Court Practice.`,
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F1E9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
