import type { EdgeData, NodeData, NodeType } from "@/types";
import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNodeStore } from "@/store/nodeStore";
import { useEdgeStore } from "@/store/edgeStore";
import { useShallow } from "zustand/shallow";
import { CustomNode } from "./CustomNode";

// const initialNodes: Node[] = [
//   {
//     id: "n1",
//     position: { x: 0, y: 0 },
//     data: { label: "Node 1", type: "type1" },
//   },
//   {
//     id: "n2",
//     position: { x: 0, y: 100 },
//     data: { label: "Node 2", type: "type2" },
//   },
// ];
// const initialEdges: Edge[] = [
//   {
//     id: "n1-n2",
//     source: "n1",
//     target: "n2",
//     type: "smoothstep",
//     markerEnd: { type: "arrow" },
//   },
// ];

// Define node types for ReactFlow
const nodeTypes = {
  custom: CustomNode,
};

function GraphCanvas() {
  // Select raw data from stores with shallow comparison
  const nodes = useNodeStore(useShallow((state) => state.nodes));
  const edges = useEdgeStore(useShallow((state) => state.edges));

  // Transform to view format with useMemo to prevent recreating on every render
  const viewNodes = useMemo(
    () =>
      nodes.map(
        (node) =>
          ({
            id: node.id,
            type: "custom", // Use custom node type
            position: node.position || { x: 0, y: 0 },
            data: { label: node.name, type: node.type }, // Include type in data
          } as Node)
      ),
    // eslint-disable-next-line react-hooks/use-memo
    [JSON.stringify(nodes)]
  );

  const viewEdges = useMemo(
    () =>
      edges.map(
        (edge) =>
          ({
            id: `${edge.from}-${edge.to}`,
            source: edge.from,
            target: edge.to,
            type: "smoothstep",
            markerEnd: { type: "arrow" },
          } as Edge)
      ),
    // eslint-disable-next-line react-hooks/use-memo
    [JSON.stringify(edges)]
  );

  // Get setters directly from store without causing re-renders
  const setNodes = useCallback(
    (updater: (nodes: NodeData[]) => NodeData[]) =>
      useNodeStore.getState().setNodes(updater),
    []
  );

  const setEdges = useCallback(
    (updater: (edges: EdgeData[]) => EdgeData[]) =>
      useEdgeStore.getState().setEdges(updater),
    []
  );

  // setNodes: (nodes: NodeData[]) => void;
  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nodesSnapshot) => {
        const viewNodesSnapshot = nodesSnapshot.map((node) => ({
          id: node.id,
          position: node.position || { x: 0, y: 0 },
          data: { label: node.name, type: node.type },
        }));
        const updatedViewNodes = applyNodeChanges(changes, viewNodesSnapshot);
        const updatedNodesData: NodeData[] = updatedViewNodes.map((vn) => ({
          id: vn.id as string,
          name: vn.data.label as string,
          type: (vn.data?.type as NodeType) || "type1",
          position: vn.position,
        }));
        return updatedNodesData;
      }),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((edgesSnapshot) => {
        const viewEdgesSnapshot = edgesSnapshot.map(
          (edge) =>
            ({
              id: `${edge.from}-${edge.to}`,
              source: edge.from,
              target: edge.to,
              type: "smoothstep",
              markerEnd: { type: "arrow" },
            } as Edge)
        );
        const updatedViewEdges = applyEdgeChanges(changes, viewEdgesSnapshot);
        const updatedEdgesData: EdgeData[] = updatedViewEdges.map((ve) => {
          const [from, to] = ve.id.split("-");
          return { from, to };
        });
        return updatedEdgesData;
      }),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((edgesSnapshot) => {
        const newEdge: EdgeData = {
          from: connection.source as string,
          to: connection.target as string,
        };
        return [...edgesSnapshot, newEdge];
      }),
    [setEdges]
  );

  return (
    <div className=" w-full h-[480px] border border-gray-300 rounded-md mb-6">
      <ReactFlow
        nodes={viewNodes}
        edges={viewEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
}

export default GraphCanvas;
