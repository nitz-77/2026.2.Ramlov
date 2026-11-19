import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fBR(v: number) {
  const n = v < 0;
  const a = Math.abs(v);
  let r;
  if (a >= 1e6) {
    r = (a / 1e6).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M";
  } else if (a >= 1e3) {
    r = (a / 1e3).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "K";
  } else {
    r = Math.round(a).toLocaleString("pt-BR");
  }
  return (n ? "-" : "") + "R$ " + r;
}

export function fFull(v: number) {
  return (v < 0 ? "-" : "") + "R$ " + Math.abs(Math.round(v)).toLocaleString("pt-BR");
}

export function fPct(v: number) {
  return v.toFixed(2).replace(".", ",") + "%";
}