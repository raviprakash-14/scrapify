'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Droplets, Leaf, Recycle, Award } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const chartData = [
  { month: 'January', recycled: 186 },
  { month: 'February', recycled: 305 },
  { month: 'March', recycled: 237 },
  { month: 'April', recycled: 173 },
  { month: 'May', recycled: 209 },
  { month: 'June', recycled: 214 },
];

const chartConfig = {
  recycled: {
    label: 'Recycled (kg)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const recentActivity = [
  {
    id: '1',
    item: 'Aluminum Cans',
    weight: '5 kg',
    points: '+50',
    date: '2 days ago',
    status: 'Completed',
  },
  {
    id: '2',
    item: 'Old Laptop',
    weight: '2.5 kg',
    points: '+125',
    date: '1 week ago',
    status: 'Completed',
  },
  {
    id: '3',
    item: 'Mixed Plastic',
    weight: '10 kg',
    points: '+70',
    date: '2 weeks ago',
    status: 'Completed',
  },
  {
    id: '4',
    item: 'Copper Wires',
    weight: '1.2 kg',
    points: '+80',
    date: '3 weeks ago',
    status: 'Completed',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recycled
            </CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 kg</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456 kg</div>
            <p className="text-xs text-muted-foreground">
              Equivalent to planting 50 trees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,000 L</div>
            <p className="text-xs text-muted-foreground">
              Enough for 130 people for a day
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,520</div>
            <p className="text-xs text-muted-foreground">
              +325 this month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recycling History</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                   <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="recycled" fill="var(--color-recycled)" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of your recent recycling pickups.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="font-medium">{activity.item}</div>
                      <div className="text-sm text-muted-foreground">{activity.weight}</div>
                    </TableCell>
                    <TableCell className="text-right text-primary font-semibold">{activity.points}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-muted-foreground">{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
