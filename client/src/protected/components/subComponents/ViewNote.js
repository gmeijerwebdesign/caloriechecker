import axios from "axios";
import React from "react";
import GetURL from "../../../utils/getURL";

function ViewNote({ setViewNote, note }) {
  const handleBack = () => {
    setViewNote(false);
  };
  const handleDelete = async (noteID) => {
    try {
      await axios.delete(`${GetURL()}/notes/${noteID}`);
      setViewNote(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="make-note-box">
      <div className="make-note-header">
        <p className="make-note-title">{note.date}</p>
        <p onClick={handleBack}>x</p>
      </div>
      <textarea cols={15} rows={9} placeholder={note.txt} readOnly></textarea>
      <button onClick={() => handleDelete(note.noteID)}>Delete</button>
    </div>
  );
}

export default ViewNote;
