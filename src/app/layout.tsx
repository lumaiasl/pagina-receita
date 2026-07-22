import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Receitas",
  description: "Site de receitas simples e saborosas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen", "flex", "flex-col", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
      
    </html>
  );
}
