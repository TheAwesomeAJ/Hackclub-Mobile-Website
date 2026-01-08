import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import { Banner } from "fumadocs-ui/components/banner";
import HeaderVis from "@/components/navbar/header-vis";
import { ThemeProvider } from "@/components/theme-provider";
import { FrameworkProvider } from "fumadocs-core/framework";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head />
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>
            <HeaderVis />
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
