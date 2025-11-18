import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

import json from "@/mock_results.json";
import { cn } from "@/lib/utils";

export const description = "A multiple bar chart";

const data = json?.data?.top_variables || [];

const chartData = data.map((item) => ({
    equipment: item.equipment,
    variable: item.name,
    label: `${item.equipment} - ${item.name}`,
    temperature: item.value,
}));

const chartConfig = {
    temperature: {
        label: "Temp (K)",
    },
} satisfies ChartConfig;

export function TopVarBarChart({ className }: { className?: string }) {
    return (
        <Card className={cn("min-w-2xs", className)}>
            <CardHeader>
                <CardTitle>Top Variables</CardTitle>
                <CardDescription>
                    Breakdown of top N variables showing their values and units
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.split(" ")[0]}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="temperature"
                            fill="var(--chart-1)"
                            radius={[4, 4, 0, 0]}
                            barSize={32}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    );
}
