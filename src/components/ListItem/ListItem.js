import React from "react";
import deleteIcon from "../../assets/images/delete.svg";
import editIcon from "../../assets/images/edit-white.svg";
import "./ListItem.css";

export default function ListItem({ item, onDeleteClick, onEditClick }) {
  return (
    <div className="container">
      <div className="textContainer">
        <h2 className="itemText">{item?.content}</h2>
      </div>

      <div className="iconsContainer">
        <div className="editIconBtn" onClick={onEditClick}>
          <img src={editIcon} className="icon" />
        </div>

        <div className="iconBtn" onClick={onDeleteClick}>
          <img src={deleteIcon} className="icon" />
        </div>
      </div>
    </div>
  );
}
