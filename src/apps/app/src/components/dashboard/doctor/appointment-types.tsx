'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@helsa/ui/components/chart';
import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

export const description = 'A donut chart with text';

const chartData = [
  { browser: 'Initial appointment', visitors: 30, fill: 'var(--color-chrome)' },
  { browser: 'Review', visitors: 27, fill: 'var(--color-safari)' },
  { browser: 'Emergency', visitors: 53, fill: 'var(--color-firefox)' },
  { browser: 'Control', visitors: 76, fill: 'var(--color-edge)' },
  { browser: 'Surgery', visitors: 5, fill: 'var(--color-other)' },
];

const chartConfig = {
  visitors: {
    label: 'Appointments',
  },
  chrome: {
    label: 'Initial appointment',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Review',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Emergency',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Control',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Surgery',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export function AppointmentTypes() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col lg:col-span-1 rounded-lg  bg-secondary shadow-none">
      <CardHeader className="pb-0 text-left">
        <CardTitle>Types of consultation</CardTitle>
        <CardDescription>January - October 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="activity" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Appointments
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
          Showing the total visitors for the last 10 months
        </div>
      </CardFooter>
    </Card>
  );
}
