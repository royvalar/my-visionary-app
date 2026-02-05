import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "My Visionary | אוצרות של עיצוב למטבח",
  description: "רכז של מותגי יוקרה לקולקציות הרמוניות למטבח",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${openSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
