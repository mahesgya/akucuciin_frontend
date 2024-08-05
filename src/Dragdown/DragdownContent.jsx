import React from "react";
import { Link } from "react-router-dom";
import "./Dragdown.css";

function DragdownContent() {
  return (
    <div className="divContent">
      <Link to="/babakanraya">
        <p>Babakan Raya</p>
      </Link>
      <Link to="/babakantengah">
        <p>Babakan Tengah</p>
      </Link>
      <Link to="/babakanlio">
        <p>Babakan Lio</p>
      </Link>
      <Link to="/babakanlebak">
        <p>Babakan Lebak</p>
      </Link>
      <Link to="/perwira">
        <p>Perwira</p>
      </Link>
      <Link to="/cibanteng">
        <p>Cibanteng</p>
      </Link>
    </div>
  );
}

export default DragdownContent;
