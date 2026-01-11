import { useState } from "react";
import TreeNodeItem from "./TreeNode";
import { TreeNode } from "./tree.types";
import { fetchChildren } from "./tree.mock";
import "./TreeView.css"
import { updateNode, deleteNode, reorder, findNode } from "./tree.utils";

const initialTree: TreeNode[] = [
  { id: "1", name: "Root 1", children: [] },
  { id: "2", name: "Root 2", children: [] },
];

const TreeView = () => {
  const [tree, setTree] = useState<TreeNode[]>(initialTree);

  const toggle = async (id: string) => {
    const node = findNode(tree, id);
    if (!node) return;

    if (!node.expanded && node.children?.length === 0) {
      setTree((t) => updateNode(t, id, (n) => ({ ...n, loading: true })));
      const children = await fetchChildren(id);
      setTree((t) =>
        updateNode(t, id, (n) => ({
          ...n,
          expanded: true,
          loading: false,
          children,
        }))
      );
    } else {
      setTree((t) =>
        updateNode(t, id, (n) => ({ ...n, expanded: !n.expanded }))
      );
    }
  };

 return (
  <div className="tree-container">
    <h3>Tree View</h3>
    {tree.map((node, index) => (
      <TreeNodeItem
        key={node.id}
        node={node}
        index={index}
        onToggle={toggle}
        onAdd={(id) => {
          const name = prompt("Node name");
          if (!name) return;
          setTree((t) =>
            updateNode(t, id, (n) => ({
              ...n,
              expanded: true,
              children: [
  ...(n.children || []),
  { id: Date.now().toString(), name, children: [] },
],
            }))
          );
        }}
        onDelete={(id) => {
          const ok = window.confirm("Delete node?");
          if (ok) {
            setTree((t) => deleteNode(t, id));
          }
        }}
        onEdit={(id, name) =>
          setTree((t) => updateNode(t, id, (n) => ({ ...n, name })))
        }
        onDrop={(to, from) =>
          setTree((t) => reorder(t, from, to))
        }
      />
    ))}
  </div>
);

};

export default TreeView;
