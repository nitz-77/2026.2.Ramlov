export default function Header({ startYear, endYear }: { startYear: number; endYear: number }) {
  return (
    <header className="relative overflow-hidden border-b border-b1 bg-gradient-to-br from-[#0c0c1e] via-[#111128] to-[#080812] px-8 pb-5 pt-6">
      <div className="pointer-events-none absolute -right-[60px] -top-[80px] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(75,148,255,.09),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-[50px] left-[180px] h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(23,212,138,.06),transparent_70%)]" />
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#ff8626] to-[#c75200] text-[16px] font-bold tracking-tight text-white shadow-[0_0_22px_rgba(255,134,38,.22)]">
            DJ
          </div>
          <div>
            <h1 className="text-[23px] font-bold tracking-tight text-tx">
              <em className="not-italic text-brand-orange">xxxxx</em> — Dashboard Executivo
            </h1>
            <p className="mt-[2px] text-sm text-m1">
              {startYear}–{endYear}
            </p>
          </div>
        </div>
        <span className="whitespace-nowrap rounded-[20px] border border-brand-green/20 bg-brand-green/10 px-[14px] py-[5px] font-mono text-[13px] font-bold text-brand-green">
        </span>
      </div>
    </header>
  );
}