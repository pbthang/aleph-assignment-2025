import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, type ColDef } from "ag-grid-community";
import type React from "react";

interface CustomTableProps<T> {
  rowData: T[];
  colDefs: ColDef<T>[];
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  height?: number;
  className?: React.ComponentProps<"div">["className"];
}

function CustomTable<T>({
  rowData = [],
  colDefs = [],
  paginationPageSize = 20,
  paginationPageSizeSelector = [20, 50, 100],
  height = 500,
  className = "",
}: CustomTableProps<T>) {
  return (
    <div style={{ height: height }} className={className}>
      <AgGridReact
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        rowData={rowData}
        columnDefs={colDefs}
        modules={[AllCommunityModule]}
      />
    </div>
  );
}

export default CustomTable;
