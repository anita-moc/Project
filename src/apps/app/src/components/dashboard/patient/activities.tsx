'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

export const description = 'A donut chart with text';

const chartData = [
  { activity: 'Cardio', activities: 30, fill: 'hsl(var(--chart-1))' },
  { activity: 'Strength', activities: 27, fill: 'hsl(var(--chart-2))' },
  { activity: 'Meditation', activities: 53, fill: 'hsl(var(--chart-3))' },
];

const chartConfig = {
  activities: {
    label: 'Activities',
  },
  chrome: {
    label: 'Cardio',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Strength',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Meditation',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function Activities() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.activities, 0);
  }, []);

  return (
    <Card className="flex flex-col rounded-none md:col-span-1">
      <CardHeader className="pb-0 text-left">
        <CardTitle>Activity</CardTitle>
        <CardDescription>January - October 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="activities" nameKey="activity" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Activities
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex text-left w-full gap-2 font-medium leading-none">
          Uptrend of 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-left w-full leading-none text-muted-foreground">
          Showing the total types of activities performed this month
        </div>
      </CardFooter>
    </Card>
  );
}
