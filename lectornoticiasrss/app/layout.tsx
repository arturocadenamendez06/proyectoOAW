import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Lector de noticias RSS",
  description: "Lector de noticias RSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={outfit.className}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
