import React from "react";

function MadeNote({ note, onClick }) {
  return (
    <div className="made-note" onClick={onClick}>
      <p className="made-note-text">{note.txt}</p>
    </div>
  );
}

export default MadeNote;
