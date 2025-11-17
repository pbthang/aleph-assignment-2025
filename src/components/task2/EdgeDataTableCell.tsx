import { useNodeStore } from "@/store/nodeStore";

function EdgeDataTableCell({ nodeId }: { nodeId: string }) {
  const node = useNodeStore((state) =>
    state.nodes.find((n) => n.id === nodeId)
  );

  return <span>{node?.name || ""}</span>;
}

export default EdgeDataTableCell;
