# Biblioteca Comunitária — Next.js



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
