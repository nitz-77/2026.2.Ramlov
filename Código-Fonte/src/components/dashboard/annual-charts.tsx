import { useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import { DEF, scaleOpts } from "./chart-utils";

interface AnnualChartsProps {
  selY: number | null;
  activeYrs: number[];
  YEARS: number[];
  REC: number[];
  LUCRO: number[];
  MARG: number[];
}

export default function AnnualCharts({ selY, activeYrs, YEARS, REC, LUCRO, MARG }: AnnualChartsProps) {
  const c1Data = useMemo(() => {
    const yrs = selY ? YEARS : activeYrs;
    const ii = yrs.map((y) => YEARS.indexOf(y)).filter((i) => i >= 0);
    return {
      labels: yrs,
      datasets: [
        { label: "Receita", data: ii.map((i) => REC[i]), backgroundColor: "rgba(75,148,255,.18)", borderColor: "#4b94ff", borderWidth: 1.5, borderRadius: 3, order: 2 },
        { label: "Lucro", data: ii.map((i) => LUCRO[i]), backgroundColor: "rgba(23,212,138,.27)", borderColor: "#17d48a", borderWidth: 1.5, borderRadius: 3, order: 1 },
      ],
    };
  }, [selY, activeYrs, YEARS, REC, LUCRO]);

  const c2Data = useMemo(() => {
    const yrs = selY ? YEARS : activeYrs;
    const ii = yrs.map((y) => YEARS.indexOf(y)).filter((i) => i >= 0);
    return {
      labels: yrs,
      datasets: [
        { label: "Margem%", data: ii.map((i) => MARG[i]), borderColor: "#ff8626", backgroundColor: "rgba(255,134,38,.07)", fill: true, tension: 0.4, pointBackgroundColor: "#ff8626", pointRadius: 3, borderWidth: 2 },
      ],
    };
  }, [selY, activeYrs, YEARS, MARG]);

  return (
    <>
      <p className="mb-[13px] mt-[24px] text-[12px] font-bold uppercase tracking-[1.5px] text-m2">Evolução anual</p>
      <div className="mb-[14px] grid grid-cols-[2fr_1fr] gap-[14px]">
        <div className="rounded-[13px] border border-b1 bg-card px-[20px] py-[18px]">
          <div className="mb-[3px] text-[15px] font-bold text-tx">Receita estimada e lucro real por ano</div>
          <div className="mb-[13px] text-[13px] leading-[1.5] text-m1">Receita = Total de vendas</div>
          <div className="mb-[10px] flex flex-wrap gap-[11px] text-[13px] text-m1">
            <span className="flex items-center gap-[5px]"><span className="h-2.5 w-2.5 rounded-sm bg-brand-blue" />Receita</span>
            <span className="flex items-center gap-[5px]"><span className="h-2.5 w-2.5 rounded-sm bg-brand-green" />Lucro</span>
          </div>
          <div className="relative w-full h-[215px]">
            <Bar data={c1Data} options={{ ...DEF, scales: scaleOpts }} />
          </div>
        </div>
        <div className="rounded-[13px] border border-b1 bg-card px-[20px] py-[18px]">
          <div className="mb-[3px] text-[15px] font-bold text-tx">Margem de lucratividade (%)</div>
          <div className="mb-[13px] text-[13px] leading-[1.5] text-m1">Histórico da % de lucro</div>
          <div className="relative w-full h-[243px]">
            <Line
              data={c2Data}
              options={{
                ...DEF,
                scales: {
                  x: scaleOpts.x,
                  y: { ...scaleOpts.y, min: 0, ticks: { color: "#585870", font: { size: 12, family: "'DM Mono', monospace" }, callback: (v: any) => v.toFixed(1) + "%" } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
