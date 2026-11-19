# Trabalho de Conclusão de Curso (TCC) — Sistemas de Informação

## Desenvolvimento de Business Intelligence para Pequenos Negócios: Um Estudo de Caso em uma Distribuidora

**Autor:** Murilo Venâncio Ramlov  
**Curso:** Bacharelado em Sistemas de Informação  
**Instituição:** Centro Universitário Avantis — UNIAVAN, Balneário Camboriú/SC  
**Orientador:** Prof. Paulo de Miranda Junior  
**Ano / semestre:** 2026.2  
**Data indicada no TCC para a defesa:** 7 de dezembro de 2026 
**Contato:** [muriloramlov17@gmail.com]

## Sobre o trabalho

Este repositório reúne o Trabalho de Conclusão de Curso e os artefatos da implementação. O projeto desenvolve uma aplicação web de **Business Intelligence (BI)** voltada à análise gerencial de uma distribuidora de pequeno porte. A solução utiliza planilhas Excel como fonte de dados, automatiza a leitura e o tratamento das informações e disponibiliza indicadores e gráficos interativos para apoio à tomada de decisão.

**Objetivo geral:** centralizar, organizar e visualizar dados de planilhas eletrônicas por meio de uma aplicação web, disponibilizando indicadores gerenciais e dashboards analíticos.

O estudo adota análise **descritiva e histórica**, sem banco de dados externo, ERP ou modelos preditivos nesta versão.

## Aplicação e tecnologias

**Demonstração web indicada pelo autor:** https://tcc-murilo-ramlov2.vercel.app/ 
**Código-fonte:** [`Código-Fonte/`](./C%C3%B3digo-Fonte/)  
**Tecnologias principais:** Next.js, React, TypeScript, Node.js, XLSX, Chart.js, Tailwind CSS, GitHub e Vercel.

### Indicadores disponibilizados

- Lucro do período e lucro acumulado.
- Receita estimada e margem média.
- Melhor e pior desempenho no intervalo selecionado.
- Evolução anual e resultados mensais.
- Comparação entre períodos e desempenho dos vendedores.
- Tabela histórica e filtros por ano ou intervalo.

## Estrutura de entrega

```text
2026.2.Ramlov/
├── README.md
├── .gitignore
├── TCC_Murilo_Ramlov.pdf
├── Apresentação/
│   ├── Apresentacao_TCC_I_Murilo_Ramlov.pptx
│   ├── Apresentacao_TCC_II_Murilo_Ramlov.pptx
│   └── README.md
├── Código-Fonte/
│   ├── data/                 # duas planilhas originais
│   ├── src/                  # aplicação Next.js/React
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── Latex/                    # transposição auxiliar do trabalho
├── Material de Apoio/        # arquitetura e indicadores
├── Outros Arquivos/          # documento Word editável
└── Referencial Bibliográfico/ # referências
```

## Como executar a aplicação

Abra o terminal **dentro da pasta `Código-Fonte/`** e execute:

```bash
npm ci
npm run dev
```

Acesse `http://localhost:3000`. Para compilar e iniciar a versão de produção, use `npm run build` e `npm run start`. É necessário ter o Node.js instalado em versão compatível com o Next.js 16. Veja os detalhes em [`Código-Fonte/README.md`](./C%C3%B3digo-Fonte/README.md).

## Fontes dos dados

O código utiliza os arquivos reais `data/media-total.xlsx` e `data/totais-vendedores.xlsx`.

## Documentos e apresentação

- **TCC principal (PDF):** [`TCC_Murilo_Ramlov.pdf`](./TCC_Murilo_Ramlov.pdf)
- **Versão editável (Word):** `Outros Arquivos/TCC_Murilo_Ramlov.docx`
- **Apresentação I:** `Apresentação/Apresentacao_TCC_I_Murilo_Ramlov.pptx`
- **Apresentação II:** `Apresentação/Apresentacao_TCC_II_Murilo_Ramlov.pptx`
- **Código-fonte completo:** `Código-Fonte/`

## Referência sugerida

> RAMLOV, Murilo Venâncio. *Desenvolvimento de Business Intelligence para Pequenos Negócios: Um Estudo de Caso em uma Distribuidora*. 2026. Trabalho de Conclusão de Curso (Bacharelado em Sistemas de Informação) — Centro Universitário Avantis, Balneário Camboriú, 2026.

## Contato

Murilo Venâncio Ramlov — **muriloramlov17@gmail.com**
