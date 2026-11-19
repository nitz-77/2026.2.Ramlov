import { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { DEF, VC } from "./chart-utils";
import { fBR } from "@/lib/utils";

interface VendorChartsProps {
  selY: number | null;
  YEARS: number[];
  YV: Record<number, Record<string, number>>;
}

export default function VendorCharts({ selY, YEARS, YV }: VendorChartsProps) {
  const venData = useMemo(() => {
    let yr = selY;
    if (!yr) {
      const availableYears = Object.keys(YV).map(Number).sort((a, b) => b - a);
      yr = availableYears.length > 0 ? availableYears[0] : (YEARS[YEARS.length - 1] || new Date().getFullYear());
    }
    const yvd = YV[yr] || {};
    const sorted = Object.entries(yvd)
      .filter(([, v]) => v > 0)
      .sort(([, a], [, b]) => b - a);
    const names = sorted.map(([n]) => n);
    const vals = sorted.map(([, v]) => v);
    const tot = vals.reduce((a, b) => a + b, 0);
    const bgC = names.map((_, i) => VC[i % VC.length]);
    return { yr, sorted, names, vals, tot, bgC };
  }, [selY, YV, YEARS]);

  const venBarData = useMemo(() => ({
    labels: venData.names,
    datasets: [{ label: "Receita", data: venData.vals, backgroundColor: venData.bgC.map((c) => c + "99"), borderColor: venData.bgC, borderWidth: 1.5, borderRadius: 4 }],
  }), [venData]);

  const venBarOptions = useMemo(() => ({
    ...DEF,
    indexAxis: "y" as const,
    scales: {
      x: { ticks: { color: "#585870", font: { size: 12, family: "'DM Mono', monospace" }, callback: function(v: any) { return fBR(v); } }, grid: { color: "rgba(255,255,255,0.04)" } },
      y: { ticks: { color: "#585870", font: { size: 13, family: "'DM Sans', sans-serif" } }, grid: { color: "rgba(255,255,255,.025)" } },
    },
  }), []);

  const venDoughnutData = useMemo(() => ({
    labels: venData.names,
    datasets: [{ data: venData.vals, backgroundColor: venData.bgC, borderColor: "rgba(255,255,255,0.06)", borderWidth: 1.5 }],
  }), [venData]);

  const venDoughnutOptions = useMemo(() => ({
    ...DEF,
    cutout: "62%",
    plugins: {
      legend: { display: false },
      tooltip: { ...DEF.plugins.tooltip, callbacks: { label: (c: any) => ` ${c.label}: ${fBR(c.raw)} (${((c.raw / (venData.tot || 1)) * 100).toFixed(1)}%)` } },
    },
  }), [venData.tot]);

  console.log(venData);

  return (
    <>
      <p className="mb-[13px] mt-[24px] text-[12px] font-bold uppercase tracking-[1.5px] text-m2">
        Ranking de vendedores — <span>{venData.yr}</span>
      </p>
      <div className="mb-[14px] grid grid-cols-[2fr_1fr] gap-[14px]">
        <div className="rounded-[13px] border border-b1 bg-card px-[20px] py-[18px]">
          <div className="mb-[3px] text-[15px] font-bold text-tx">Receita bruta por vendedor</div>
          <div className="mb-[13px] text-[13px] leading-[1.5] text-m1">
            {venData.names.length > 0
              ? `${venData.names[0]} lidera com ${fBR(venData.vals[0])} (${((venData.vals[0] / venData.tot) * 100).toFixed(1)}%) · ${venData.names.length} vendedores ativos`
              : "Sem dados para este ano."}
          </div>
          <div className="relative w-full" style={{ height: Math.max(venData.names.length * 44 + 60, 160) + "px" }}>
            {venData.names.length > 0 ? (
              <Bar data={venBarData} options={venBarOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-[13px] text-m2">Gráfico indisponível para este período</div>
            )}
          </div>
        </div>
        <div className="rounded-[13px] border border-b1 bg-card px-[20px] py-[18px]">
          <div className="mb-[3px] text-[15px] font-bold text-tx">Participação % por vendedor</div>
          <div className="mb-[13px] text-[13px] leading-[1.5] text-m1">Distribuição no ano</div>
          <div className="relative w-full h-[185px]">
            {venData.names.length > 0 ? (
              <Doughnut data={venDoughnutData} options={venDoughnutOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-[13px] text-m2">Indisponível</div>
            )}
          </div>
          <div className="mt-[11px] flex flex-wrap justify-center gap-[11px] text-[16px] text-m1">
            {venData.names.map((n, i) => (
              <span key={n} className="flex items-center gap-[4px]">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: venData.bgC[i] }} />
                {n} {((venData.vals[i] / venData.tot) * 100).toFixed(0)}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
