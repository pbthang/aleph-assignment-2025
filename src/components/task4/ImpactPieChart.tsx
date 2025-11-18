import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import json from "@/mock_results.json";

export const description = "A pie chart with a legend";

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "var(--chart-1)",
//   },
//   safari: {
//     label: "Safari",
//     color: "var(--chart-2)",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "var(--chart-3)",
//   },
//   edge: {
//     label: "Edge",
//     color: "var(--chart-4)",
//   },
//   other: {
//     label: "Other",
//     color: "var(--chart-5)",
//   },
// } satisfies ChartConfig;

// "setpoint_impact_summary": [
//   {
//     "equipment": "HEX-100",
//     "setpoint": "cold_fluid_temperature",
//     "weightage": 24.244,
//     "unit": "K"
//   },
//   {
//     "equipment": "Fuel",
//     "setpoint": "temperature",
//     "weightage": 27.853,
//     "unit": "K"
//   },
//   {
//     "equipment": "Air",
//     "setpoint": "temperature",
//     "weightage": 47.903,
//     "unit": "K"
//   }
// ],

const chartColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

export default function ImpactPieChart({ className }: { className?: string }) {
    const data = json?.data?.setpoint_impact_summary || [];
    const chartData = data.map((item, idx) => ({
        name: `${item.equipment} - ${item.setpoint}`,
        value: item.weightage,
        fill: chartColors[idx % chartColors.length],
    }));

    const chartConfig: ChartConfig = {
        value: {
            label: "Weightage",
        },
        ...data.reduce((acc, item, index) => {
            acc[`${item.equipment} - ${item.setpoint}`] = {
                label: `${item.equipment} - ${item.setpoint}`,
                color: chartColors[index % chartColors.length],
            };
            return acc;
        }, {} as Record<string, { label: string; color: string }>),
    };

    console.log("chartData", chartData);
    console.log("chartConfig", chartConfig);

    return (
        <Card className={cn("flex flex-col min-w-2xs", className)}>
            <CardHeader className="items-center pb-0">
                <CardTitle>Setpoint Impact Summary</CardTitle>
                <CardDescription>
                    Weightages of top N variables that contributed to the most
                    gain in KPI
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="value" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
