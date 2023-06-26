import Navbar from "./(shared)/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Providers } from "./providers";
import { GlobalContextProvider } from "./Context/store";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Fitness Tracker",
  description: "General fitness tracker",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} flex`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <GlobalContextProvider>{children}</GlobalContextProvider>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
