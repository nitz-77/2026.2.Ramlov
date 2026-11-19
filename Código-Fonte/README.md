# Código-fonte — Dashboard executivo de Business Intelligence

## Tecnologias

- Next.js 16.2.6 e React 19.2.4
- TypeScript, JavaScript e Node.js
- XLSX 0.18.5 para leitura das planilhas
- Chart.js 4 e `react-chartjs-2` para visualização
- Tailwind CSS 4 para estilização

As versões acima são baseadas no arquivo `package.json` disponibilizado.

## Estrutura

```text
Código-Fonte/
├── data/
│   ├── media-total.xlsx
│   └── totais-vendedores.xlsx
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── lib/
│   │   ├── data.ts
│   │   └── utils.ts
│   └── components/
│       ├── dashboard.tsx
│       └── dashboard/
│           ├── annual-charts.tsx
│           ├── chart-utils.tsx
│           ├── controls.tsx
│           ├── footer.tsx
│           ├── header.tsx
│           ├── history-table.tsx
│           ├── kpi-grid.tsx
│           ├── monthly-charts.tsx
│           ├── vendor-charts.tsx
│           └── year-banner.tsx
├── public/
├── package.json
├── package-lock.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── tsconfig.json
```

## Executar localmente

É necessário instalar uma versão do Node.js compatível com o Next.js 16. A partir desta pasta, execute:

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` no navegador. Para gerar a versão de produção:

```bash
npm run build
npm run start
```

## Funcionamento dos dados

O `src/lib/data.ts` usa a biblioteca XLSX para ler `data/media-total.xlsx` e `data/totais-vendedores.xlsx` e montar o objeto tipado `DashboardData`, que contém anos, lucro, margem, receita estimada, lucro acumulado, dados mensais e vendas por vendedor. Em `src/app/page.tsx`, a função `getDashboardData()` prepara os dados e os entrega ao componente principal `Dashboard`.

## Aplicação online

https://tcc-murilo-ramlov2.vercel.app/
---

Contato: **muriloramlov17@gmail.com**
