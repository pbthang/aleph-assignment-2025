export const NODE_TYPES = ["type1", "type2", "type3"] as const;

export type NodeType = (typeof NODE_TYPES)[number];

export interface NodeData {
  id: string;
  name: string;
  type: NodeType;
  position?: { x: number; y: number };
}

export interface EdgeData {
  from: string;
  to: string;
}
