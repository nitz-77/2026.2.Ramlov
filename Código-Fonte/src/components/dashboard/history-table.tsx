import { fFull, cn } from "@/lib/utils";

interface HistoryTableProps {
  YEARS: number[];
  LUCRO: number[];
  REC: number[];
  MARG: number[];
  ACUM: number[];
}

export default function HistoryTable({ YEARS, LUCRO, REC, MARG, ACUM }: HistoryTableProps) {
  return (
    <>
      <p className="mb-[13px] mt-[24px] text-[12px] font-bold uppercase tracking-[1.5px] text-m2">Resumo histórico</p>
      <div className="rounded-[13px] border border-b1 bg-card px-[20px] py-[18px]">
        <div className="mb-[3px] text-[15px] font-bold text-tx">Tabela anual — lucro, receita estimada e margem</div>
        <div className="mb-[13px] text-[13px] leading-[1.5] text-m1">Receita estimada = lucro ÷ % lucratividade · custo = receita − lucro</div>
        <div className="mt-[14px] overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="whitespace-nowrap px-[11px] py-[7px] text-left text-[12px] font-bold uppercase tracking-[0.8px] text-m2">Ano</th>
                <th className="whitespace-nowrap px-[11px] py-[7px] text-right text-[12px] font-bold uppercase tracking-[0.8px] text-m2">Receita est.</th>
                <th className="whitespace-nowrap px-[11px] py-[7px] text-right text-[12px] font-bold uppercase tracking-[0.8px] text-m2">Custo est.</th>
                <th className="whitespace-nowrap px-[11px] py-[7px] text-right text-[12px] font-bold uppercase tracking-[0.8px] text-m2">Lucro</th>
                <th className="whitespace-nowrap px-[11px] py-[7px] text-right text-[12px] font-bold uppercase tracking-[0.8px] text-m2">Margem</th>
                <th className="whitespace-nowrap px-[11px] py-[7px] text-right text-[12px] font-bold uppercase tracking-[0.8px] text-m2">Lucro acum.</th>
              </tr>
            </thead>
            <tbody>
              {[...YEARS].reverse().map((y) => {
                const i = YEARS.indexOf(y);
                const l = LUCRO[i];
                const r = REC[i];
                const m = MARG[i];
                const c = r - l;
                const a = ACUM[i];
                const mc = m >= 10 ? "bg-brand-green/12 text-brand-green" : m >= 7 ? "bg-brand-yellow/12 text-brand-yellow" : "bg-brand-red/12 text-brand-red";
                return (
                  <tr key={y} className="hover:bg-white/[0.015]">
                    <td className="border-b border-b1 px-[11px] py-[8px] text-left font-sans text-[14px] font-semibold text-tx">{y}</td>
                    <td className="border-b border-b1 px-[11px] py-[8px] text-right font-mono text-[13px] text-brand-blue">{fFull(r)}</td>
                    <td className="border-b border-b1 px-[11px] py-[8px] text-right font-mono text-[13px] text-brand-red">{fFull(c)}</td>
                    <td className="border-b border-b1 px-[11px] py-[8px] text-right font-mono text-[13px] text-brand-green">{fFull(l)}</td>
                    <td className="border-b border-b1 px-[11px] py-[8px] text-right font-mono text-[13px]">
                      <span className={cn("inline-block rounded-[5px] px-[8px] py-[2px] font-mono text-[12px] font-bold", mc)}>{m.toFixed(2).replace(".", ",")}%</span>
                    </td>
                    <td className="border-b border-b1 px-[11px] py-[8px] text-right font-mono text-[13px] text-brand-purple">{fFull(a)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
