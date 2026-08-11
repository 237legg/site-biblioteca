import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-[Outfit,sans-serif] antialiased">{children}</body>
    </html>
  );
}
