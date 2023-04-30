import React from "react";
import "./InputBox.css";

function InputBox({ onChange, value, onAddClick }) {
  return (
    <div className="inputContainer">
      <input
        type="text"
        placeholder="Enter todo..."
        onChange={onChange}
        className="inputBox"
        value={value}
      />

      <button className="addBtn" onClick={onAddClick}>
        Add Todo
      </button>
    </div>
  );
}

export default InputBox;
