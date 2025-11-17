import type { EdgeData } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type EdgeStore = {
  edges: EdgeData[];
  addEdge: (edge: EdgeData) => void;
  removeEdge: (from: string, to: string) => void;
  setEdges: (updater: (edges: EdgeData[]) => EdgeData[]) => void;
};

export const useEdgeStore = create<EdgeStore>()(
  persist(
    (set) => ({
      edges: [
        { from: "nodea", to: "nodeb" },
        { from: "nodea", to: "nodec" },
      ],
      addEdge: (edge: EdgeData) =>
        set((state) => ({ edges: [...state.edges, edge] })),
      removeEdge: (from: string, to: string) =>
        set((state) => ({
          edges: state.edges.filter(
            (edge) => edge.from !== from || edge.to !== to
          ),
        })),
      setEdges: (updater: (edges: EdgeData[]) => EdgeData[]) =>
        set((state) => ({ edges: updater(state.edges) })),
    }),
    {
      name: "edge-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
