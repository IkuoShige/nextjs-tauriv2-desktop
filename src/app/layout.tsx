import "@/styles/globals.css";
import "@/styles/modern-ui.css";
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

// モダンなフォントの設定
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: 'Next.js + Tauri v2 + shadcn/ui Demo',
  description: 'デスクトップアプリケーションのデモ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <ThemeProviderWrapper>
          {children}
          <Toaster />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
