import HeroUiProvider from "@/context/heroUi-provider";
import QueryProvider from "@/context/query-provider";
import ReduxProvider from "@/context/redux-provider";
import { ThemeProvider } from "@/context/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "react-quill/dist/quill.snow.css";
import "./globals.css";

// const vazirFont = Vazirmatn({
//   variable: "--font-Vazir",
//   subsets: ["arabic"],
// });

const interFont = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "minimal shop ",
  description: "best shop ever exist",
};

const bonFont = localFont({
  src: [
    {
      path: "./assets/fonts/Woff/bon-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/Woff/bon-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/Woff/bon-light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/Woff/bon-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/fonts/Woff/bon-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./assets/fonts/Woff/bon-Thin.woff",
      weight: "100",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${bonFont.className} ${interFont.variable}   antialiased`}
      >
        <ReduxProvider>
        <QueryProvider>
          <ThemeProvider>
            <HeroUiProvider>{children}</HeroUiProvider>
          </ThemeProvider>
        </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
