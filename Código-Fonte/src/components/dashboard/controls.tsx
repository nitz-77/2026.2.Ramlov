import { cn } from "@/lib/utils";

interface ControlsProps {
  YEARS: number[];
  selY: number | null;
  setSelY: (y: number | null) => void;
  selP: string;
  setSelP: (p: string) => void;
}

export default function Controls({ YEARS, selY, setSelY, selP, setSelP }: ControlsProps) {
  return (
    <div className="border-b border-b1 bg-surf px-8">
      <div className="flex flex-wrap items-center gap-2 border-b border-b1 py-2.5">
        <span className="min-w-[78px] shrink-0 text-[12px] font-bold uppercase tracking-[1.1px] text-m2">Período</span>
        {["all", "10y", "5y", "3y"].map((p, i) => {
          const lbl = ["Histórico completo", "Últimos 10 anos", "Últimos 5 anos", "Últimos 3 anos"][i];
          return (
            <button
              key={p}
              onClick={() => { setSelP(p); setSelY(null); }}
              className={cn(
                "whitespace-nowrap rounded-[20px] border px-[14px] py-[5px] text-[13px] font-semibold transition-all",
                selP === p && !selY ? "border-brand-orange bg-brand-orange/10 text-brand-orange" : "border-b1 bg-transparent text-m1 hover:border-b2 hover:text-tx"
              )}
            >
              {lbl}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2 py-2.5">
        <span className="min-w-[78px] shrink-0 text-[12px] font-bold uppercase tracking-[1.1px] text-m2">Ano</span>
        <div className="flex flex-wrap gap-[5px]">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setSelY(selY === y ? null : y)}
              className={cn(
                "whitespace-nowrap rounded-[20px] border px-[14px] py-[5px] text-[13px] font-semibold transition-all",
                selY === y ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-b1 bg-transparent text-m1 hover:border-b2 hover:text-tx"
              )}
            >
              {y}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSelY(null)}
          className="whitespace-nowrap rounded-[20px] border border-brand-red/25 bg-transparent px-[12px] py-[5px] text-[13px] font-semibold text-brand-red opacity-65 transition-all hover:bg-brand-red/10 hover:opacity-100"
        >
          ✕ limpar
        </button>
      </div>
    </div>
  );
}
