"use client";

import { useState, useMemo } from "react";
import type { DashboardData } from "@/lib/data";
import { Chart as ChartJS, registerables } from "chart.js";

import Header from "./dashboard/header";
import Controls from "./dashboard/controls";
import YearBanner from "./dashboard/year-banner";
import KpiGrid from "./dashboard/kpi-grid";
import AnnualCharts from "./dashboard/annual-charts";
import MonthlyCharts from "./dashboard/monthly-charts";
import VendorCharts from "./dashboard/vendor-charts";
import HistoryTable from "./dashboard/history-table";
import Footer from "./dashboard/footer";

// Registra todos os módulos do Chart.js de forma global para a aplicação
ChartJS.register(...registerables);

export default function Dashboard({ data }: { data: DashboardData }) {
  const { YEARS, LUCRO, MARG, REC, ACUM, AM, YV } = data;
  
  const [selY, setSelY] = useState<number | null>(null);
  const [selP, setSelP] = useState<string>("all");

  const activeYrs = useMemo(() => {
    if (selY) return [selY];
    if (selP === "5y") return YEARS.slice(-5);
    if (selP === "3y") return YEARS.slice(-3);
    if (selP === "10y") return YEARS.slice(-10);
    return YEARS;
  }, [selY, selP, YEARS]);

  return (
    <>
      <Header startYear={YEARS[0]} endYear={YEARS[YEARS.length - 1]} />

      <Controls 
        YEARS={YEARS} 
        selY={selY} setSelY={setSelY} 
        selP={selP} setSelP={setSelP} 
      />

      <YearBanner 
        selY={selY} 
        YEARS={YEARS} LUCRO={LUCRO} REC={REC} MARG={MARG} 
      />

      <main className="px-8 pt-5 pb-8">
        <KpiGrid 
          selY={selY} activeYrs={activeYrs} 
          YEARS={YEARS} LUCRO={LUCRO} REC={REC} MARG={MARG} ACUM={ACUM} AM={AM} 
        />
        
        <MonthlyCharts 
          selY={selY} activeYrs={activeYrs} 
          YEARS={YEARS} AM={AM} 
        />

        <VendorCharts 
          selY={selY} YEARS={YEARS} YV={YV} 
        />

        <AnnualCharts 
          selY={selY} activeYrs={activeYrs} 
          YEARS={YEARS} REC={REC} LUCRO={LUCRO} MARG={MARG} 
        />

        <HistoryTable 
          YEARS={YEARS} LUCRO={LUCRO} REC={REC} MARG={MARG} ACUM={ACUM} 
        />
      </main>

      <Footer />
    </>
  );
}
