'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'A bar chart';

const chartData = [
  { month: 'January', rate: 186 },
  { month: 'February', rate: 305 },
  { month: 'March', rate: 237 },
  { month: 'April', rate: 73 },
  { month: 'May', rate: 209 },
  { month: 'June', rate: 214 },
  { month: 'July', rate: 128 },
  { month: 'August', rate: 345 },
  { month: 'September', rate: 64 },
  { month: 'October', rate: 186 },
];

const chartConfig = {
  rate: {
    label: 'Average',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function HealthAverage() {
  return (
    <Card className="rounded-none col-span-1">
      <CardHeader>
        <CardTitle>Health Average per Month</CardTitle>
        <CardDescription>January - October 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="rate" fill="var(--color-brand-primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Upward trend of 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing the average of your health progress</div>
      </CardFooter>
    </Card>
  );
}
