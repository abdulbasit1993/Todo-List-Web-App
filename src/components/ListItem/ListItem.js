import React from "react";
import deleteIcon from "../../assets/images/delete.svg";
import "./ListItem.css";

export default function ListItem({ item, onDeleteClick }) {
  return (
    <div className="container">
      <h2 className="itemText">{item?.content}</h2>

      <div className="iconBtn" onClick={onDeleteClick}>
        <img src={deleteIcon} className="icon" />
      </div>
    </div>
  );
}
