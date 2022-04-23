import React from "react";
import "./Viewnotes.css";

function Viewnotes({note, closemode }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closemode(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Title</h3>
          <div>{note.title}</div>
        </div>
        <div className="body">
          <h3>Description</h3>
          <div>{note.description}</div>
        </div>
        <div className="footer">
          <h4>Additional Information</h4>
          <div>{note.tag}</div>
        </div>
      </div>
    </div>
  );
}

export default Viewnotes;