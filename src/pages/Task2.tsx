import { useNodeStore } from "@/store/nodeStore.ts";
import { DataTable } from "@/components/data-table";
import CreateNodeDialog from "@/components/task2/CreateNodeDialog";
import { getNodeTypeColorClass } from "@/common";
import { DataTableColumnHeader } from "@/components/data-table-col-header";
import type { EdgeData, NodeData } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import EditNodeDialog from "@/components/task2/EditNodeDialog";
import DeleteNodeBtn from "@/components/task2/DeleteNodeBtn";
import CreateEdgeDialog from "@/components/task2/CreateEdgeDialog";
import { useEdgeStore } from "@/store/edgeStore";
import EdgeDataTableCell from "@/components/task2/EdgeDataTableCell";
import DeleteEdgeBtn from "@/components/task2/DeleteEdgeBtn";
import GraphCanvas from "@/components/task2/GraphCanvas";

const nodeCols: ColumnDef<NodeData>[] = [
  {
    id: "edit",
    cell: ({ row }) => <EditNodeDialog nodeId={row.original.id} />,
  },
  {
    id: "delete",
    cell: ({ row }) => <DeleteNodeBtn nodeId={row.original.id} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ getValue }) => (
      <Badge
        variant={"outline"}
        className={getNodeTypeColorClass(getValue<string>())}
      >
        {getValue<string>()}
      </Badge>
    ),
  },
];

const edgeCols: ColumnDef<EdgeData>[] = [
  {
    id: "delete",
    cell: ({ row }) => (
      <DeleteEdgeBtn fromId={row.original.from} toId={row.original.to} />
    ),
  },
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upstream Node" />
    ),
    cell: ({ getValue }) => <EdgeDataTableCell nodeId={getValue<string>()} />,
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Downstream Node" />
    ),
    cell: ({ getValue }) => <EdgeDataTableCell nodeId={getValue<string>()} />,
  },
];

function Task2() {
  const nodes = useNodeStore((state) => state.nodes);
  const edges = useEdgeStore((state) => state.edges);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Task 2: Dynamic Node List</h1>
      <GraphCanvas />
      <div className="flex gap-2">
        <div className="min-w-sm">
          <h2 className="text-lg font-semibold mb-2">All Nodes</h2>
          <CreateNodeDialog />
          <DataTable columns={nodeCols} data={nodes} />
        </div>
        <div className="min-w-sm">
          <h2 className="text-lg font-semibold mb-2">All Edges</h2>
          <CreateEdgeDialog />
          <DataTable columns={edgeCols} data={edges} />
        </div>
      </div>
    </div>
  );
}

export default Task2;
