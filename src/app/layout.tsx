import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "@/component/Header";
import { ToastContainer, Bounce } from "react-toastify";
import TanstackProvider from "@/helpers/TanstackProvider";
import { CloudinaryProvider } from "@/component/CloudinaryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruby Glow",
  description: "Our most-loved products, handpicked by beauty enthusiasts like you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <TanstackProvider>
          <MantineProvider>
            <CloudinaryProvider>
              <main className="">
                <ToastContainer
                  position="top-right"
                  autoClose={4000}
                  hideProgressBar={true}
                  transition={Bounce}
                />

                {children}
              </main>
            </CloudinaryProvider>
          </MantineProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
