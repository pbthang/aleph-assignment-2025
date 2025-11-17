import type { NodeData } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type NodeStore = {
  nodes: NodeData[];
  addNode: (node: NodeData) => void;
  updateNode: (node: NodeData) => void;
  removeNode: (nodeName: string) => void;
  setNodes: (updater: (nodes: NodeData[]) => NodeData[]) => void;
};

export const useNodeStore = create<NodeStore>()(
  persist(
    (set) => ({
      nodes: [
        {
          id: "nodea",
          name: "Node A",
          type: "type1",
          position: { x: -150, y: 0 },
        },
        {
          id: "nodeb",
          name: "Node B",
          type: "type2",
          position: { x: 150, y: 100 },
        },
        {
          id: "nodec",
          name: "Node C",
          type: "type3",
          position: { x: 150, y: -100 },
        },
      ],
      addNode: (node: NodeData) =>
        set((state) => ({ nodes: [...state.nodes, node] })),
      updateNode: (updatedNode: NodeData) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === updatedNode.id ? updatedNode : node
          ),
        })),
      removeNode: (id: string) =>
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== id),
        })),
      setNodes: (updater: (nodes: NodeData[]) => NodeData[]) =>
        set((state) => ({ nodes: updater(state.nodes) })),
    }),
    {
      name: "node-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
