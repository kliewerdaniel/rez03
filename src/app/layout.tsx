import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Kliewer - AI Developer & Full-Stack Technologist",
  description: "Portfolio of Daniel Kliewer, AI Developer and Full-Stack Technologist specializing in local-first AI systems, open-source infrastructure, and intelligent applications.",
  keywords: ["AI Developer", "Full-Stack Developer", "TypeScript", "React", "Next.js", "Machine Learning", "Local-First AI"],
  authors: [{ name: "Daniel Kliewer" }],
  creator: "Daniel Kliewer",
  publisher: "Daniel Kliewer",
  openGraph: {
    title: "Daniel Kliewer - AI Developer & Full-Stack Technologist",
    description: "Portfolio of Daniel Kliewer, AI Developer and Full-Stack Technologist specializing in local-first AI systems.",
    url: "https://danielkliewer.com",
    siteName: "Daniel Kliewer Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Kliewer - AI Developer & Full-Stack Technologist",
    description: "Portfolio of Daniel Kliewer, AI Developer and Full-Stack Technologist specializing in local-first AI systems.",
    creator: "@kliewerdaniel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  if (window.location.pathname === '/') {
                    document.body.classList.add('home-page');
                  }
                  console.log('Body className:', document.body.className);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}
      >
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
