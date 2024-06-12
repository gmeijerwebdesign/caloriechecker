import React, { useEffect, useState } from "react";
import "../../css/protected/notes.css";
import MakeNote from "./subComponents/MakeNote";
import MadeNote from "./subComponents/MadeNote";
import ViewNote from "./subComponents/ViewNote";
import axios from "axios";
import GetURL from "../../utils/getURL";
function Notes() {
  const [newNote, setNewNote] = useState(false);
  const [madeNotes, setMadeNotes] = useState([]);
  const [viewNote, setViewNote] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);

  const handleMadeNoteClick = (note) => {
    setViewNote(true);
    setCurrentNote(note);
    console.log(viewNote);
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserInfo(response.data.user[0]);
    } catch (err) {
      console.log("Error fetching user info:", err);
    }
  };

  const fetchNotes = async () => {
    try {
      if (!userInfo) return;
      const userID = userInfo.userID;
      const notes = await axios.get(`${GetURL()}/notes?userID=${userID}`);
      setMadeNotes(notes.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [userInfo, madeNotes]);

  return (
    <div className="notes-main">
      <div className="notes-container">
        <p className="notes-header">Notes</p>
        <div className="notes-box">
          {madeNotes.length !== 0 &&
            madeNotes.map((note, index) => (
              <MadeNote
                key={index}
                note={note}
                onClick={() => handleMadeNoteClick(note)}
              />
            ))}

          <div className="add-note">
            <p onClick={() => setNewNote(true)}>+</p>
          </div>
        </div>
      </div>
      <div className={`make-note-container ${newNote ? "active" : ""}`}>
        {newNote && (
          <MakeNote
            setNewNote={setNewNote}
            setMadeNotes={setMadeNotes}
            madeNotes={madeNotes}
            fetchNotes={fetchNotes}
          />
        )}
      </div>
      <div className={`view-note-container ${viewNote ? "active" : ""}`}>
        {viewNote && <ViewNote setViewNote={setViewNote} note={currentNote} />}
      </div>
    </div>
  );
}

export default Notes;
