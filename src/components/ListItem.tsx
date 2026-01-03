import React from "react";
import { LeetCodeList } from "../types";

interface ListItemProps {
  list: LeetCodeList;
  onUpdate: (id: string, field: "name" | "questions", value: string) => void;
  onRemove: (id: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  list,
  onUpdate: _onUpdate,
  onRemove,
}) => {
  return (
    <div className="list-item">
      <div className="list-header">
        <input
          type="text"
          className="list-name-input"
          value={list.name}
          placeholder="List name (e.g., NeetCode 150)"
          readOnly
        />
        <button className="remove-list-btn" onClick={() => onRemove(list.id)}>
          Remove
        </button>
      </div>
      <textarea
        className="questions-textarea"
        placeholder="Enter question names or IDs, one per line (e.g., Two Sum, Best Time to Buy and Sell Stock, ...)"
        value={list.questions}
        readOnly
      />
    </div>
  );
};
