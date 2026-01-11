import { TreeNode } from "./tree.types";

export const fetchChildren = (parentId: string): Promise<TreeNode[]> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: parentId + "-1", name: "Lazy Child 1" },
        { id: parentId + "-2", name: "Lazy Child 2" },
      ]);
    }, 700)
  );
