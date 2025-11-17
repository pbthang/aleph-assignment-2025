import CustomTable from "@/components/task1/CustomTable";
import { type ColDef } from "ag-grid-community";
import rowData from "@/data/cars.json";

const colDefs: ColDef<(typeof rowData)[0]>[] = [
  { field: "make" },
  { field: "model" },
  { field: "year", width: 100 },
  {
    field: "price",
    valueFormatter: (p) => (p.value ? `$${p.value.toLocaleString()}` : ""),
  },
  { field: "range", headerName: "Range (mi)", width: 120 },
  { field: "color" },
  { field: "electric" },
  { field: "inStock", headerName: "In Stock" },
];

function Task1() {
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">
        Task 1: Reusable Table Component
      </h1>
      <CustomTable rowData={rowData} colDefs={colDefs} />
    </div>
  );
}

export default Task1;
