
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getUserGrowthApi } from "@/api/usersApi";

export function UsersChart() {
  const { data: userGrowth } = useQuery({
    queryKey: ['user-growth'],
    queryFn: getUserGrowthApi
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crescimento de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowth || []}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#00FF00"
                strokeWidth={2}
                dot={{ fill: "#00FF00" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
