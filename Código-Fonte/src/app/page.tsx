import { getDashboardData } from "@/lib/data";
import Dashboard from "@/components/dashboard";

export default async function Page() {
  const data = await getDashboardData();
  return <Dashboard data={data} />;
}