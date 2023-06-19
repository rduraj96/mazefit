import Navbar from "./(shared)/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Providers } from "./providers";
import { GlobalContextProvider } from "./Context/store";
import { Toaster } from "@/components/ui/toaster";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Fitness Tracker",
  description: "General fitness tracker",
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
          <Navbar />
          <GlobalContextProvider>{children}</GlobalContextProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
