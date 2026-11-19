import { useMemo } from "react";
import { cn, fBR, fPct } from "@/lib/utils";
import { MN } from "./chart-utils";

interface KpiGridProps {
  selY: number | null;
  activeYrs: number[];
  YEARS: number[];
  LUCRO: number[];
  REC: number[];
  MARG: number[];
  ACUM: number[];
  AM: Record<number, number[]>;
}

const BadgePct = ({ pct, fallback }: { pct: number | null; fallback: string }) => {
  if (pct === null) return <span className="rounded-[7px] border border-b1 bg-m1/10 px-[7px] py-[2px] font-mono text-[12px] font-bold text-m1">{fallback}</span>;
  return (
    <span className={cn("rounded-[7px] px-[7px] py-[2px] font-mono text-[12px] font-bold", pct >= 0 ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red")}>
      {pct >= 0 ? "▲ " : "▼ "}
      {Math.abs(pct * 100).toFixed(1)}% vs ant.
    </span>
  );
};

export default function KpiGrid({ selY, activeYrs, YEARS, LUCRO, REC, MARG, ACUM, AM }: KpiGridProps) {
  const kpis = useMemo(() => {
    const ii = activeYrs.map((y) => YEARS.indexOf(y)).filter((i) => i >= 0);
    if (selY) {
      const i = YEARS.indexOf(selY);
      const m = AM[selY] || [];
      const mx = Math.max(...m);
      const mn = Math.min(...m);
      return {
        lbl: selY.toString(), lu: LUCRO[i], re: REC[i], ma: MARG[i], ac: ACUM[i],
        best: MN[m.indexOf(mx)] + " " + fBR(mx), worst: MN[m.indexOf(mn)] + " " + fBR(mn),
        bestLbl: "melhor mês", worstLbl: mn < 0 ? "prejuízo" : "menor mês",
        bestUp: true, worstUp: mn >= 0, worstDn: mn < 0,
        pctLu: i > 0 ? (LUCRO[i] - LUCRO[i - 1]) / Math.abs(LUCRO[i - 1]) : null,
        pctRe: i > 0 ? (REC[i] - REC[i - 1]) / Math.abs(REC[i - 1]) : null,
        pctMa: i > 0 ? (MARG[i] - MARG[i - 1]) / Math.abs(MARG[i - 1]) : null,
      };
    }
    const lu = ii.reduce((s, i) => s + LUCRO[i], 0);
    const re = ii.reduce((s, i) => s + REC[i], 0);
    const ma = ii.reduce((s, i) => s + MARG[i], 0) / (ii.length || 1);
    const ac = ACUM[ACUM.length - 1];
    const ls = ii.map((i) => LUCRO[i]);
    const mx = Math.max(...ls);
    const mn = Math.min(...ls);
    return {
      lbl: activeYrs[0] + " – " + activeYrs[activeYrs.length - 1], lu, re, ma, ac,
      best: activeYrs[ls.indexOf(mx)] + " " + fBR(mx), worst: activeYrs[ls.indexOf(mn)] + " " + fBR(mn),
      bestLbl: "melhor ano", worstLbl: "menor ano",
      bestUp: true, worstUp: false, worstDn: true,
      pctLu: null, pctRe: null, pctMa: null,
    };
  }, [activeYrs, selY, YEARS, LUCRO, REC, MARG, ACUM, AM]);

  return (
    <>
      <p className="mb-[13px] mt-0 text-[12px] font-bold uppercase tracking-[1.5px] text-m2">
        KPIs — <span>{kpis.lbl}</span>
      </p>
      <div className="grid grid-cols-6 gap-[11px]">
        <div className="relative overflow-hidden rounded-[13px] border border-b1 bg-card px-[18px] py-[16px] transition-all hover:-translate-y-0.5 hover:border-b2 hover:bg-card2">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand-green to-transparent" />
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.8px] text-m1">Lucro do período</div>
          <div className="mb-[5px] font-mono text-[20px] font-medium leading-[1.2] tracking-[-0.2px] text-brand-green">{fBR(kpis.lu)}</div>
          <BadgePct pct={kpis.pctLu} fallback="período selecionado" />
        </div>
        <div className="relative overflow-hidden rounded-[13px] border border-b1 bg-card px-[18px] py-[16px] transition-all hover:-translate-y-0.5 hover:border-b2 hover:bg-card2">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand-blue to-transparent" />
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.8px] text-m1">Receita estimada</div>
          <div className="mb-[5px] font-mono text-[20px] font-medium leading-[1.2] tracking-[-0.2px] text-brand-blue">{fBR(kpis.re)}</div>
          <BadgePct pct={kpis.pctRe} fallback="estimada via margem" />
        </div>
        <div className="relative overflow-hidden rounded-[13px] border border-b1 bg-card px-[18px] py-[16px] transition-all hover:-translate-y-0.5 hover:border-b2 hover:bg-card2">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand-orange to-transparent" />
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.8px] text-m1">Margem média</div>
          <div className="mb-[5px] font-mono text-[20px] font-medium leading-[1.2] tracking-[-0.2px] text-brand-orange">{fPct(kpis.ma)}</div>
          <BadgePct pct={kpis.pctMa} fallback="média do período" />
        </div>
        <div className="relative overflow-hidden rounded-[13px] border border-b1 bg-card px-[18px] py-[16px] transition-all hover:-translate-y-0.5 hover:border-b2 hover:bg-card2">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand-purple to-transparent" />
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.8px] text-m1">Lucro acumulado</div>
          <div className="mb-[5px] font-mono text-[20px] font-medium leading-[1.2] tracking-[-0.2px] text-brand-purple">{fBR(kpis.ac)}</div>
          <span className="rounded-[7px] border border-b1 bg-m1/10 px-[7px] py-[2px] font-mono text-[12px] font-bold text-m1">total geral</span>
        </div>
        <div className="relative overflow-hidden rounded-[13px] border border-b1 bg-card px-[18px] py-[16px] transition-all hover:-translate-y-0.5 hover:border-b2 hover:bg-card2">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand-teal to-transparent" />
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.8px] text-m1">Melhor resultado</div>
          <div className="mb-[5px] font-mono text-[15px] font-medium leading-[1.2] tracking-[-0.2px] text-brand-teal">{kpis.best}</div>
          <span className="rounded-[7px] bg-brand-green/10 px-[7px] py-[2px] font-mono text-[12px] font-bold text-brand-green">{kpis.bestLbl}</span>
        </div>
        <div className="relative overflow-hidden rounded-[13px] border border-b1 bg-card px-[18px] py-[16px] transition-all hover:-translate-y-0.5 hover:border-b2 hover:bg-card2">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand-yellow to-transparent" />
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.8px] text-m1">Pior resultado</div>
          <div className="mb-[5px] font-mono text-[15px] font-medium leading-[1.2] tracking-[-0.2px] text-brand-yellow">{kpis.worst}</div>
          <span className={cn("rounded-[7px] px-[7px] py-[2px] font-mono text-[12px] font-bold", kpis.worstDn ? "bg-brand-red/10 text-brand-red" : "border border-b1 bg-m1/10 text-m1")}>
            {kpis.worstLbl}
          </span>
        </div>
      </div>
    </>
  );
}
