import ImpactPieChart from "@/components/task4/ImpactPieChart";
import SimulationLineGraph from "@/components/task4/SimulationLineGraph";
import { TopVarBarChart } from "@/components/task4/TopVarBarChart";

function Task4() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">
                Task 4: Charts and Analytics
            </h1>
            <div className="flex gap-2 items-baseline">
                <ImpactPieChart className="" />
                <TopVarBarChart className="" />
            </div>
            <div className="mt-4">
                <SimulationLineGraph />
            </div>
        </div>
    );
}

export default Task4;
