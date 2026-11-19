import { useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import { DEF, scaleOpts, MN } from "./chart-utils"

interface MonthlyChartsProps {
  selY: number | null;
  activeYrs: number[];
  YEARS: number[];
  AM: Record<number, number[]>;
}

export default function MonthlyCharts({ selY, activeYrs, YEARS, AM }: MonthlyChartsProps) {
  const c3Data = useMemo(() => {
    let d;
    if (selY && AM[selY]) {
      d = AM[selY];
    } else {
      const ys = activeYrs.filter((y) => AM[y]);
      d = MN.map((_, mi) => ys.reduce((s, y) => s + (AM[y] ? AM[y][mi] : 0), 0));
    }
    return {
      labels: MN,
      datasets: [
        { label: "Lucro", data: d, backgroundColor: d.map((v) => (v >= 0 ? "rgba(23,212,138,.55)" : "rgba(255,63,85,.55)")), borderColor: d.map((v) => (v >= 0 ? "#17d48a" : "#ff3f55")), borderWidth: 1.5, borderRadius: 3 },
      ],
    };
  }, [selY, activeYrs, AM]);

  const c4Data = useMemo(() => {
    const y23 = YEARS.includes(2023) ? 2023 : YEARS[YEARS.length - 3] || YEARS[0];
    const y24 = YEARS.includes(2024) ? 2024 : YEARS[YEARS.length - 2] || YEARS[0];
    const y25 = YEARS.includes(2025) ? 2025 : YEARS[YEARS.length - 1] || YEARS[0];
    return {
      labels: MN,
      datasets: [
        { label: String(y23), data: AM[y23] || [], borderColor: "#9575f5", backgroundColor: "transparent", tension: 0.4, pointRadius: 2, borderWidth: 1.5, borderDash: [4, 3] },
        { label: String(y24), data: AM[y24] || [], borderColor: "#4b94ff", backgroundColor: "transparent", tension: 0.4, pointRadius: 2, borderWidth: 1.5 },
        { label: String(y25), data: AM[y25] || [], borderColor: "#17d48a", backgroundColor: "transparent", tension: 0.4, pointRadius: 2, borderWidth: 1.5 },
      ],
    };
  }, [YEARS, AM]);

  return (
    <>
      <p className="mb-[13px] mt-[24px] text-[12px] font-bold uppercase tracking-[1.5px] text-m2">
        Lucro mensal — <span>{selY ? selY.toString() : activeYrs[0] + "–" + activeYrs[activeYrs.length - 1]}</span>
      </p>
      <div className="mb-[14px] grid grid-cols-2 gap-[14px]">
        <div className="rounded-[13px] border border-b1 bg-card px-[20px] py-[18px]">
          <div className="mb-[3px] text-[15px] font-bold text-tx">{selY ? `Lucro mensal — ${selY}` : "Lucro mensal agregado"}</div>
          <div className="mb-[13px] text-[13px] leading-[1.5] text-m1">Barras em vermelho = saldo negativo</div>
          <div className="relative w-full h-[205px]">
            <Bar data={c3Data} options={{ ...DEF, scales: scaleOpts }} />
          </div>
        </div>
        <div className="rounded-[13px] border border-b1 bg-card px-[20px] py-[18px]">
          <div className="mb-[3px] text-[15px] font-bold text-tx">Comparativo de últimos anos</div>
          <div className="mb-[13px] text-[13px] leading-[1.5] text-m1">Análise sobreposta dos meses</div>
          <div className="mb-[10px] flex flex-wrap gap-[11px] text-[13px] text-m1">
            <span className="flex items-center gap-[5px]"><span className="h-2.5 w-2.5 rounded-sm bg-brand-purple" />{c4Data.datasets[0].label}</span>
            <span className="flex items-center gap-[5px]"><span className="h-2.5 w-2.5 rounded-sm bg-brand-blue" />{c4Data.datasets[1].label}</span>
            <span className="flex items-center gap-[5px]"><span className="h-2.5 w-2.5 rounded-sm bg-brand-green" />{c4Data.datasets[2].label}</span>
          </div>
          <div className="relative w-full h-[205px]">
            <Line data={c4Data} options={{ ...DEF, scales: scaleOpts }} />
          </div>
        </div>
      </div>
    </>
  );
}
