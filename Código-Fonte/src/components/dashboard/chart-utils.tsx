import { fBR } from "@/lib/utils";

export const MN = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
export const VC = ["#4b94ff", "#17d48a", "#ff8626", "#9575f5", "#14b8a6", "#eab308", "#ef4444", "#a78bfa"];

export const DEF = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1a1a28",
      borderColor: "rgba(255,255,255,0.09)",
      borderWidth: 1,
      titleColor: "#e8e8f4",
      bodyColor: "#7878a0",
      titleFont: { family: "'DM Sans', sans-serif", size: 14 },
      bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
      padding: 11,
      cornerRadius: 6,
    },
  },
  animation: { duration: 420 },
};

export const scaleOpts = {
  x: {
    ticks: { color: "#585870", font: { size: 12, family: "'DM Mono', monospace" } },
    grid: { color: "rgba(255,255,255,.025)" },
  },
  y: {
    ticks: {
      color: "#585870",
      font: { size: 12, family: "'DM Mono', monospace" },
      callback: function (v: any) { return fBR(v); },
    },
    grid: { color: "rgba(255,255,255,0.04)" },
  },
};
