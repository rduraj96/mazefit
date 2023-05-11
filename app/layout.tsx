import Navbar from "./(shared)/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${nunito.className} flex h-100vh relative`}>
        <Providers>
          {session?.user && <Navbar />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
