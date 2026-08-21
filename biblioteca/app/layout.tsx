import type { Metadata } from "next";
import { Outfit } from "next/font/google"
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
 
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biblioteca Comunitária",
  description:
    "Acervo com livros e filmes disponíveis para a comunidade. Visite-nos, faça um empréstimo e explore novos mundos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-[Outfit,sans-serif] antialiased">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}