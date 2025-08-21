import { JSX } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export function StatCard({
  title,
  value,
  icon,
  note,
}: {
  title: string;
  value: any;
  icon: JSX.Element;
  note?: string;
}) {
  return (
    <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {note && <p className="text-xs text-gray-300">{note}</p>}
      </CardContent>
    </Card>
  );
}