import { Users, UserCheck, Activity } from "lucide-react";
import { StatCard } from "./StatCard";
import { UsersChart } from "./UsersChart";
import { MembersDistributionChart } from "./MembersDistributionChart";

export function Dashboard() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total de Usuários"
          value="27"
          description="+20.1% em relação ao mês anterior"
          icon={<Users className="h-4 w-4 text-racing-green" />}
        />
        <StatCard
          title="Membros Ativos"
          value="16"
          description="92% dos membros ativos hoje"
          icon={<UserCheck className="h-4 w-4 text-racing-green" />}
        />
        <StatCard
          title="Taxa de Engajamento"
          value="89%"
          description="12% maior que a média"
          icon={<Activity className="h-4 w-4 text-racing-green" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <UsersChart />
        </div>
        <div className="col-span-3">
          <MembersDistributionChart />
        </div>
      </div>
    </div>
  );
}