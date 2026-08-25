import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { dbconnect } from "@/lib/mongo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MedSimAI",
  description: "AI-powered clinical simulation platform for medical students to practice patient consultations, clinical reasoning, and diagnosis.",
};

export default async function RootLayout({ children }) {
  await dbconnect();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
