# Biblioteca Comunitária — Landing Page (Next.js)

Versão **só do site institucional** (sem login e sem área administrativa), extraída do projeto completo "Design PTEC Document" do Figma Make.

**Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.**

## Seções incluídas

- Navbar sticky com links: Início, Sobre, Doações, Localização, Contato
- Hero com imagem de biblioteca + stats (500+ livros, 120+ filmes, 1.2k+ usuários)
- Seção Sobre com grid assimétrico (texto + foto + mini-grid de ícones)
- Histórico em 3 cards no fundo escuro (2015 / 2018 / Hoje)
- Doações com passo a passo ("Como doar?")
- Horário de funcionamento (Seg-Sex / Sábado / Domingo)
- Localização com mapa embutido (iframe Google Maps) + endereço/telefone/e-mail + botão do WhatsApp
- Formulário de contato (nome, e-mail, mensagem)
- Footer com links de navegação, contato e crédito da byron.solutions

## O que foi removido em relação à versão completa

- Botão "Área Admin" no navbar (desktop e mobile) — não existe mais destino pra ele apontar
- Página de login e todo o painel administrativo (dashboard, CRUD de livros/filmes/clientes/empréstimos)

Se algum dia você quiser reativar a área admin, é só me pedir — o código dela já existe pronto na versão completa que te mandei antes, é só plugar de volta.

## Estrutura

```
app/
  layout.tsx      # layout raiz (fontes, metadata)
  page.tsx         # renderiza a LandingPage
  globals.css      # tema (mesmas variáveis de cor do Figma) + Tailwind v4
components/
  landing-page.tsx # navbar, hero, sobre, história, doações, horário, localização, contato, footer
```

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Build de produção

```bash
npm run build
npm start
```

Já rodei `npm install`, `npm run build` e `npm start` aqui antes de te entregar — compila limpo, sobe sem erro, e confirmei no HTML renderizado que todas as 9 seções (inclusive o crédito da byron.solutions e o link do WhatsApp) estão presentes e o botão de Área Admin realmente não aparece mais.
