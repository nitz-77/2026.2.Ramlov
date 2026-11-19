import { fFull } from "@/lib/utils";

interface YearBannerProps {
  selY: number | null;
  YEARS: number[];
  LUCRO: number[];
  REC: number[];
  MARG: number[];
}

export default function YearBanner({ selY, YEARS, LUCRO, REC, MARG }: YearBannerProps) {
  if (!selY) return null;
  const i = YEARS.indexOf(selY);
  
  return (
    <div className="mx-8 mt-4 rounded-[7px] border border-[#4b94ff]/15 bg-[#4b94ff]/10 px-[15px] py-[9px] font-mono text-sm text-[#82b0ff]">
      Ano {selY} selecionado · Lucro: {fFull(LUCRO[i])} · Receita est.: {fFull(REC[i])} · Margem:{" "}
      {MARG[i].toFixed(2).replace(".", ",")}%
    </div>
  );
}