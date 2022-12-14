import React, { Component } from "react";
import "./Square.css";

export const Square = ({ onClick, value }) => {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
};

export default Square;