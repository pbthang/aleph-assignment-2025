import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNodeStore } from "@/store/nodeStore.ts";
import { useEdgeStore } from "@/store/edgeStore";

function DeleteNodeBtn({ nodeId }: { nodeId: string }) {
  const removeNode = useNodeStore((state) => state.removeNode);
  const setEdges = useEdgeStore((state) => state.setEdges);

  const handleRemoveNode = () => {
    removeNode(nodeId);
    setEdges((edges) =>
      edges.filter((edge) => edge.from !== nodeId && edge.to !== nodeId)
    );
  };

  return (
    <Button variant={"ghost"} size="icon" onClick={handleRemoveNode}>
      <span className="sr-only">Delete node</span>
      <Trash2 className="text-red-500" />
    </Button>
  );
}

export default DeleteNodeBtn;
