# Arquitetura e indicadores da solução

O estudo utiliza duas planilhas Excel: `media-total.xlsx` (histórico financeiro e resultados por período) e `totais-vendedores.xlsx` (resultados por vendedor). A biblioteca XLSX realiza a leitura dos arquivos, o módulo `src/lib/data.ts` normaliza as informações e os componentes React / Chart.js exibem KPIs, gráficos e tabelas.

Fluxo: **Excel → leitura XLSX → tratamento e consolidação → dados tipados → Next.js/React → dashboard gerencial → consulta pelos gestores**.

Indicadores destacados no trabalho: lucro do período, receita estimada, margem média, lucro acumulado, melhor e pior resultado, desempenho mensal e vendedores.

A receita é **estimada** a partir do lucro e da margem. O projeto não inclui banco de dados corporativo, ERP ou análise preditiva.

Fonte: Capítulo 3 do TCC (repositório: `TCC_Murilo_Ramlov.pdf`).
