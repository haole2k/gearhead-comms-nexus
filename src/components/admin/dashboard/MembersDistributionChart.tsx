import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export function MembersDistributionChart() {
  const { data: memberDistribution } = useQuery({
    queryKey: ['member-distribution'],
    queryFn: async () => {
      const response = await fetch('/api/stats/member-distribution');
      if (!response.ok) throw new Error('Failed to fetch member distribution');
      return response.json();
    }
  });

  const COLORS = ["#00FF00", "#1A1A1A"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Membros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={memberDistribution || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {(memberDistribution || []).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}