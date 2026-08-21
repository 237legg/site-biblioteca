# Biblioteca Comunitária — Next.js

Conversão do design "Design PTEC Document" (Figma Make) para **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

O app original era um bundle Vite/React de página única, sem uso real dos componentes shadcn/ui incluídos no export do Figma — todo o layout, o site institucional (landing page), o login e o painel administrativo (CRUD de livros, filmes, clientes e empréstimos) estavam em um único arquivo `App.tsx`. Essa lógica foi portada 1:1 para cá, mantendo cores, tipografia, espaçamentos e comportamento idênticos.

## Estrutura

```
app/
  layout.tsx      # layout raiz (fontes, metadata)
  page.tsx        # renderiza o LibraryApp
  globals.css     # tema (mesmas variáveis de cor do Figma) + Tailwind v4
components/
  library-app.tsx # todo o app: landing page, login e painel admin
```

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

Login do painel admin (mock, sem backend real):
- **E-mail:** admin@biblioteca.com
- **Senha:** admin123

## Build de produção

```bash
npm run build
npm start
```

Já testei o `npm run build` e o `npm start` aqui antes de te entregar — compila limpo e a página renderiza corretamente (landing page, tema de cores e o botão "Área Admin" todos ok).

## O que mudei em relação ao export do Figma

1. **Vite → Next.js App Router**: `main.tsx`/`index.html` viraram `app/layout.tsx` + `app/page.tsx`.
2. **`"use client"`** adicionado no topo do `library-app.tsx`, já que o componente usa `useState`/`useEffect` (interatividade do lado do cliente — obrigatório no App Router).
3. **Tailwind v4** configurado via `postcss.config.mjs` + `@tailwindcss/postcss`, com o mesmo arquivo de tema (`--primary`, `--background`, `--sidebar`, etc.) que estava em `theme.css`.
4. Removi a pasta `components/ui` (shadcn) e as dependências Radix/MUI do `package.json` original — elas não eram importadas em nenhum lugar do `App.tsx`, então eram peso morto. Se você quiser adicionar componentes shadcn/ui depois, dá pra rodar `npx shadcn@latest init` normalmente nesse projeto.
5. Imagens continuam como `<img>` simples (Unsplash + iframe do Google Maps), fiel ao original. Se quiser, dá pra migrar para `next/image` depois (já deixei `images.remotePatterns` configurado no `next.config.ts` para `images.unsplash.com` como primeiro passo).

## Observação sobre o link do Figma

Não consigo abrir o link do Figma Make diretamente (é uma página logada, não um arquivo público), então trabalhei a partir do `.zip` que você enviou, que já é o "code export" desse mesmo design.
