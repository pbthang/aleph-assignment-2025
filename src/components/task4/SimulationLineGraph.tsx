import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import json from "@/mock_results.json";

const data = json?.data?.simulated_summary?.simulated_data || [];

const chartData = data.map((item) => ({
    scenario: item.scenario,
    hexCoeff:
        item.equipment_specification.filter(
            (spec) =>
                spec?.equipment.toUpperCase() === "HEX-100" &&
                spec?.variables[0]?.name.toUpperCase() ===
                    "GLOBAL_HEAT_TRANSFER_COEFFICIENT"
        )[0]?.variables[0]?.value || 0,
    hexTemp:
        item.equipment_specification.filter(
            (spec) =>
                spec?.equipment.toUpperCase() === "HEX-100" &&
                spec?.variables[0]?.name.toUpperCase() ===
                    "COLD_FLUID_TEMPERATURE"
        )[0]?.variables[0]?.value || 0,
    fuelTemp:
        item.equipment_specification.filter(
            (spec) =>
                spec?.equipment.toUpperCase() === "FUEL" &&
                spec?.variables[0]?.name.toUpperCase() === "FUEL - TEMPERATURE"
        )[0]?.variables[0]?.value || 0,
    airTemp:
        item.equipment_specification.filter(
            (spec) =>
                spec?.equipment.toUpperCase() === "AIR" &&
                spec?.variables[0]?.name.toUpperCase() === "TEMPERATURE"
        )[0]?.variables[0]?.value || 0,
    kpi: item.kpi_value || 0,
}));

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "var(--chart-1)",
//     },
//     mobile: {
//         label: "Mobile",
//         color: "var(--chart-2)",
//     },
// } satisfies ChartConfig;

const chartConfig = {
    hexCoeff: {
        label: "HEX-100 global_heat_transfer_coefficient",
        color: "#2563eb",
    },
    hexTemp: {
        label: "HEX-100 cold_fluid_temperature",
        color: "#dc2626",
    },
    fuelTemp: {
        label: "Fuel temperature",
        color: "#16a34a",
    },
    airTemp: {
        label: "Air temperature",
        color: "#f59e0b",
    },
    kpi: {
        label: "KPI - Heater Outlet Temperature",
        color: "#9333ea",
    },
} satisfies ChartConfig;

export default function SimulationLineGraph({
    className,
}: {
    className?: string;
}) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Simulated Data</CardTitle>
                <CardDescription>
                    Breakdown of the list of equipment and variables for each
                    experiment/scenario
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="scenario"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            // tickFormatter={(value) => value.split(" ")[1]}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            type="monotone"
                            dataKey="hexCoeff"
                            stroke={chartConfig.hexCoeff.color}
                            strokeWidth={2}
                            dot={false}
                            unit={"K"}
                        />
                        <Line
                            type="monotone"
                            dataKey="hexTemp"
                            stroke={chartConfig.hexTemp.color}
                            strokeWidth={2}
                            dot={false}
                            unit={"K"}
                        />
                        <Line
                            type="monotone"
                            dataKey="fuelTemp"
                            stroke={chartConfig.fuelTemp.color}
                            strokeWidth={2}
                            dot={false}
                            unit={"K"}
                        />
                        <Line
                            type="monotone"
                            dataKey="airTemp"
                            stroke={chartConfig.airTemp.color}
                            strokeWidth={2}
                            dot={false}
                            unit={"K"}
                        />
                        <Line
                            type="monotone"
                            dataKey="kpi"
                            stroke={chartConfig.kpi.color}
                            strokeWidth={2}
                            dot={true}
                            // strokeDasharray={"4 1 2"}
                            unit={"K"}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Showing total visitors for the last 6 months
                        </div>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    );
}
