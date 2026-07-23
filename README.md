# AEAH — Associação dos Engenheiros e Agrônomos de Hortolândia

Site institucional em **React 18 + TypeScript + Vite**, estilizado com
**CSS Modules** e um sistema de variáveis globais em `src/global.css`.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
npm run lint     # checagem de tipos (tsc --noEmit)
```

## Sistema de tema

Todas as cores, fontes, raios e sombras vêm de variáveis CSS declaradas em
`:root` (`src/global.css`), no mesmo padrão de escalas numeradas:

| Grupo      | Variáveis                                                             |
| ---------- | --------------------------------------------------------------------- |
| Neutros    | `--white`, `--gray-100/300/400/600/700/800/900`                        |
| Azul       | `--blue-100/300/500/600/700/900` (institucional AEAH)                  |
| Vermelho   | `--red-300/500/600` (ações e alertas)                                  |
| Semânticos | `--bg`, `--bg-elevated`, `--border`, `--text`, `--accent`, `--action`  |
| Tipografia | `--font-sans`, `--font-display`, `--font-mono`                         |
| Layout     | `--radius*`, `--shadow*`, `--container`                                |

Para trocar a identidade visual inteira, basta editar o bloco `:root`.
Nenhum componente usa cor hardcoded — todos referenciam `var(--…)`.

## Estrutura

```
src/
  global.css              variáveis de tema + reset + keyframes
  main.tsx
  types.ts
  App.tsx / App.module.css
  vite-env.d.ts           tipagem dos CSS Modules
  components/
    section.module.css    estilos compartilhados de seção (container, header)
    Navbar.tsx      + Navbar.module.css
    Hero.tsx        + Hero.module.css
    About.tsx       + About.module.css
    Benefits.tsx    + Benefits.module.css
    Events.tsx      + Events.module.css
    JoinForm.tsx    + JoinForm.module.css
    Contact.tsx     + Contact.module.css
    Footer.tsx      + Footer.module.css
```

## Notas da conversão

- Tailwind CSS v4 removido — toda a estilização agora é CSS Modules.
- Tema convertido para **dark**, mantendo o azul/vermelho institucional.
- Chatbot (Gemini) e `server.ts` (Express) removidos.
- `lucide-react` mantido para os ícones; `motion` removido (animações em CSS).
- Formulários de contato e adesão agora são simulados no cliente (sem backend).
  Para reconectar a uma API, substitua os `setTimeout` por `fetch` em
  `Contact.tsx` e `JoinForm.tsx`.
- Inscrição em eventos persiste em `localStorage`, como no original.
- O download da carteirinha agora gera um JSON real (antes era só um `alert`).
