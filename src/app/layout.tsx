import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "ThreeJs",
  description: "Exemple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="PT-BR">
      <body
      >
        {children}
      </body>
    </html>
  );
}
