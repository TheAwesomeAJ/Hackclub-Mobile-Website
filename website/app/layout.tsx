import "./global.css";
import { Inter } from "next/font/google";
import HeaderVis from "@/components/navbar/header-vis";
import { ThemeProvider } from "@/components/theme-provider";

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
            <HeaderVis />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
