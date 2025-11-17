import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import type { NodeType } from "@/types";
import { getNodeTypeColorClass } from "@/common";

interface CustomNodeData {
  label: string;
  type: NodeType;
}

export function CustomNode({ data }: NodeProps) {
  const nodeData = data as unknown as CustomNodeData;

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-300 min-w-[150px]">
      <Handle type="target" position={Position.Left} className="w-2 h-2" />

      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-gray-800">
          {nodeData.label}
        </div>
        <Badge
          variant={"outline"}
          className={getNodeTypeColorClass(nodeData.type)}
        >
          {nodeData.type}
        </Badge>
      </div>

      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
}
