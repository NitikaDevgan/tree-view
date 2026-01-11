import { TreeNode } from "./tree.types";

export const updateNode = (
  nodes: TreeNode[],
  id: string,
  cb: (n: TreeNode) => TreeNode
): TreeNode[] =>
  nodes.map((n) =>
    n.id === id
      ? cb(n)
      : n.children
      ? { ...n, children: updateNode(n.children, id, cb) }
      : n
  );

export const deleteNode = (nodes: TreeNode[], id: string): TreeNode[] =>
  nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? deleteNode(n.children, id) : [],
    }));

export const reorder = (
  arr: TreeNode[],
  from: number,
  to: number
): TreeNode[] => {
  const copy = [...arr];
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
};

export const findNode = (
  nodes: TreeNode[],
  id: string
): TreeNode | undefined => {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findNode(n.children, id);
      if (found) return found;
    }
  }
};
