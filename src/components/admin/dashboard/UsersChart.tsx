import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Jan", total: 12 },
  { name: "Fev", total: 15 },
  { name: "Mar", total: 23 },
  { name: "Abr", total: 35 },
  { name: "Mai", total: 38 },
  { name: "Jun", total: 45 },
];

export function UsersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crescimento de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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