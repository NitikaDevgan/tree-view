import { useState } from "react";
import { TreeNode } from "./tree.types";

interface Props {
  node: TreeNode;
  index: number;
  onToggle: (id: string) => void;
  onAdd: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onDrop: (to: number, from: number) => void;
}

const TreeNodeItem = ({
  node,
  index,
  onToggle,
  onAdd,
  onDelete,
  onEdit,
  onDrop,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(node.name);

  return (
  <div className="tree-item">
    <div className="tree-connector" />

    <div
      className="tree-node"
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData("index", index.toString())
      }
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) =>
        onDrop(index, Number(e.dataTransfer.getData("index")))
      }
    >
      <div className={`tree-circle ${index % 2 ? "green" : ""}`}>
        {node.name.charAt(0).toUpperCase()}
      </div>

      {edit ? (
        <input
          className="tree-input"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            onEdit(node.id, value);
            setEdit(false);
          }}
        />
      ) : (
        <span
          className="tree-label"
          onDoubleClick={() => setEdit(true)}
        >
          {node.name}
        </span>
      )}

     <div className="tree-actions">
  <button
    className="tree-btn"
    title="Add"
    onClick={() => onAdd(node.id)}
  >
    +
  </button>

  <button
    className="tree-btn danger"
    title="Delete"
    onClick={() => onDelete(node.id)}
  >
    ×
  </button>
</div>

    </div>

    {node.loading && (
      <div className="tree-loading">Loading...</div>
    )}

    {node.expanded &&
      node.children?.map((child, i) => (
        <TreeNodeItem
          key={child.id}
          node={child}
          index={i}
          onToggle={onToggle}
          onAdd={onAdd}
          onDelete={onDelete}
          onEdit={onEdit}
          onDrop={onDrop}
        />
      ))}
  </div>
);

};

export default TreeNodeItem;
