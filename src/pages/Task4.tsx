import React from "react";
import data from "@/mock_results.json";
import ImpactPieChart from "@/components/task4/ImpactPieChart";
import SimulationLineGraph from "@/components/task4/SimulationLineGraph";

function Task4() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task 4: Charts and Analytics</h1>
      <div className="w-80 h-80">
        <ImpactPieChart data={data?.data?.setpoint_impact_summary} />
      </div>
      <div className="mt-24">
        <SimulationLineGraph />
      </div>
    </div>
  );
}

export default Task4;
