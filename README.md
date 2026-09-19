# EcoVerso 🌱

Plataforma de **educação ambiental interativa** — aprenda sobre sustentabilidade através de jogos, quizzes e atividades práticas para escolas e comunidades.

## Funcionalidades

- **Quizzes temáticos** — 6 quizzes (Mudanças Climáticas, Biodiversidade, Energia Renovável, Oceanos, 8 Rs, Cidades Sustentáveis) com pontuação.
- **Jogos interativos**:
  - *Cidade Sustentável* — gerencie uma cidade por 10 anos equilibrando economia, ambiente e sociedade.
  - *Separação de Resíduos* — jogo contra o tempo de triagem de resíduos.
  - *Ecossistema Equilibrado* — organize os níveis tróficos da cadeia alimentar.
- **Desafio Semanal** — perguntas com explicações educativas.
- **Sistema de pontos e medalhas** — progresso persistido localmente (localStorage).
- **Recursos educacionais** — vídeos e infográficos curados.
- **Gincanas ecológicas** — atividades práticas passo a passo para escolas.
- **Tema claro/escuro** — suporte completo a dark mode.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix)
- [Framer Motion](https://motion.dev) para animações
- TypeScript

## Estrutura

```
src/
  app/            # Páginas (App Router)
  components/     # Componentes React (jogos, cards, UI)
    ui/           # Componentes shadcn/ui
  data/           # Conteúdo do site (artigos, quizzes, gincanas, FAQs...)
  hooks/          # Hooks customizados
  lib/            # Utilitários
```

> **Nota:** todo o conteúdo editorial vive em `src/data/`. Para adicionar um artigo, quiz ou gincana, edite o ficheiro correspondente — sem tocar no JSX das páginas.

## Como executar

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando       | Ação                    |
| ------------- | ----------------------- |
| `pnpm dev`    | Servidor de desenvolvimento (Turbopack) |
| `pnpm build`  | Build de produção       |
| `pnpm start`  | Servir build de produção |
| `pnpm lint`   | Linting (ESLint)        |

## Deploy

O deploy mais simples é na [Vercel](https://vercel.com/new). Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
