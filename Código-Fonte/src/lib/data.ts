import fs from "fs";
import path from "path";
import * as xlsx from "xlsx";

export interface DashboardData {
  YEARS: number[];
  LUCRO: number[];
  MARG: number[];
  REC: number[];
  ACUM: number[];
  AM: Record<number, number[]>;
  YV: Record<number, Record<string, number>>;
}

export async function getDashboardData(): Promise<DashboardData> {
  const path1 = path.join(process.cwd(), "data", "media-total.xlsx");
  const path2 = path.join(process.cwd(), "data", "totais-vendedores.xlsx");

  // --- EXTRAÇÃO PLANILHA 1 (Geral) ---
  const file1Buffer = fs.readFileSync(path1);
  const wb1 = xlsx.read(file1Buffer, { type: "buffer" });
  const sheet1 = wb1.Sheets[wb1.SheetNames[0]];
  const data1 = xlsx.utils.sheet_to_json<any[]>(sheet1, { header: 1 });

  const YEARS: number[] = [];
  const LUCRO: number[] = [];
  const MARG: number[] = [];
  const REC: number[] = [];
  const ACUM: number[] = [];
  const AM: Record<number, number[]> = {};

  const headers = data1[0] || [];
  for (let c = 1; c < headers.length; c++) {
    const y = Number(headers[c]);
    if (!isNaN(y) && y >= 2000) {
      YEARS.push(y);
      const l = Number((data1[14] || [])[c] || 0);
      LUCRO.push(l);

      let m = Number((data1[18] || [])[c] || 0);
      if (Math.abs(m) > 0 && Math.abs(m) < 2) {
        m = m * 100;
      }
      MARG.push(m);
      REC.push(m > 0 ? l / (m / 100) : 0);

      const months = [];
      for (let mth = 1; mth <= 12; mth++) {
        months.push(Number((data1[mth] || [])[c] || 0));
      }
      AM[y] = months;
    }
  }

  let acc = 0;
  for (const l of LUCRO) {
    acc += l;
    ACUM.push(acc);
  }

  // --- EXTRAÇÃO PLANILHA 2 (Vendedores Padronizada) ---
  const file2Buffer = fs.readFileSync(path2);
  const wb2 = xlsx.read(file2Buffer, { type: "buffer" });
  const sheet2 = wb2.Sheets[wb2.SheetNames[0]];
  const data2 = xlsx.utils.sheet_to_json<any>(sheet2);

  const YV: Record<number, Record<string, number>> = {};

  for (const row of data2) {
    let vendor: string | null = null;
    let mesAnoRaw: any = null;
    let vendaRaw: any = null;

    // Varredura flexível (ignora case e espaços nas colunas)
    for (const key of Object.keys(row)) {
      const k = key.toLowerCase().trim();
      if (k.includes("vendedor")) vendor = String(row[key]).trim();
      else if (k.includes("mes") || k.includes("mês") || k.includes("ano") || k.includes("data")) mesAnoRaw = row[key];
      else if (k.includes("venda") || k.includes("valor") || k.includes("total")) vendaRaw = row[key];
    }

    // Tratamento robusto para números e moedas
    let venda = 0;
    if (typeof vendaRaw === "number") {
      venda = vendaRaw;
    } else if (vendaRaw) {
      let str = String(vendaRaw).replace(/R\$\s*/gi, "").trim();
      if (str.includes(".") && str.includes(",")) {
        str = str.replace(/\./g, "").replace(",", ".");
      } else if (str.includes(",")) {
        str = str.replace(",", ".");
      }
      venda = parseFloat(str) || 0;
    }

    if (vendor && mesAnoRaw && venda > 0) {
      let year: number | null = null;

      // Se o Excel transformou a data num número invisível
      if (typeof mesAnoRaw === "number") {
        if (mesAnoRaw > 30000) {
          // Converte serial number do Excel para Date JS
          year = new Date(Math.round((mesAnoRaw - 25569) * 86400 * 1000)).getUTCFullYear();
        } else {
          year = mesAnoRaw;
        }
      } 
      // Se continuou como string (ex: "09/2009" ou "2009")
      else {
        const str = String(mesAnoRaw).trim();
        // Tenta achar 4 dígitos juntos que representem o ano (ex: 2024)
        const match = str.match(/\b(20\d{2})\b/);
        if (match) {
          year = parseInt(match[1], 10);
        } else {
          const yrStr = str.split("/").pop();
          year = yrStr ? parseInt(yrStr, 10) : null;
        }
      }

      // Popula o YV
      if (year && year >= 2000 && year <= 2100) {
        if (!YV[year]) YV[year] = {};
        YV[year][vendor] = (YV[year][vendor] || 0) + venda;
      }
    }
  }

  return { YEARS, LUCRO, MARG, REC, ACUM, AM, YV };
}