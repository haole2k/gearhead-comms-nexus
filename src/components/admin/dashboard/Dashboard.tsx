import { Users, UserCheck, Activity } from "lucide-react";
import { StatCard } from "./StatCard";
import { UsersChart } from "./UsersChart";
import { MembersDistributionChart } from "./MembersDistributionChart";
import { useQuery } from "@tanstack/react-query";
import prisma from "@/lib/prisma";

export function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    }
  });

  return (
    <div className="space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total de Usuários"
          value={stats?.totalUsers || '0'}
          description={stats?.userGrowth || 'Carregando...'}
          icon={<Users className="h-4 w-4 text-racing-green" />}
        />
        <StatCard
          title="Membros Ativos"
          value={stats?.activeMembers || '0'}
          description={stats?.activeMembersPercentage || 'Carregando...'}
          icon={<UserCheck className="h-4 w-4 text-racing-green" />}
        />
        <StatCard
          title="Taxa de Engajamento"
          value={stats?.engagementRate || '0%'}
          description={stats?.engagementComparison || 'Carregando...'}
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