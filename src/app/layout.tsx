import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
        className={`${openSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
