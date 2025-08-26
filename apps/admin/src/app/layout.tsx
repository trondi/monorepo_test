import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "관리자 대시보드",
  description: "Turborepo 모노레포 - 관리자 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
