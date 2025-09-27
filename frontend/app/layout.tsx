import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "My Blog",
  description: "A modern blog website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
