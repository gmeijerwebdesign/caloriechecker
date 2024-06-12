import React, { useState, useEffect } from "react";
import GetURL from "../../../utils/getURL";
import axios from "axios";

function MakeNote({ setNewNote, fetchNotes }) {
  const [userInfo, setUserInfo] = useState(null);
  const [txt, setTxt] = useState("");
  const [dateTimeString, setDateTimeString] = useState("");

  useEffect(() => {
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

    fetchUserInfo();
  }, []);

  const handleBack = () => {
    setNewNote(false);
  };

  const handleNewNote = async () => {
    try {
      console.log(txt);
      const newNote = {
        txt: txt,
        dateTimeString: dateTimeString,
        userID: userInfo.userID,
      };

      await axios.post(`${GetURL()}/notes`, newNote);
      setNewNote(false);
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${
      weekdays[currentDate.getDay()]
    } ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;

    setDateTimeString(`${formattedDate} ${formattedTime}`);
  }, []);

  return (
    <div className="make-note-box">
      <div className="make-note-header">
        <p className="make-note-title">What's on your thoughts</p>
        <p onClick={handleBack}>x</p>
      </div>
      <textarea
        cols={15}
        rows={9}
        placeholder="the sun is sunny.."
        onChange={(e) => setTxt(e.target.value)}
      ></textarea>
      <button onClick={handleNewNote}>Submit note</button>
    </div>
  );
}

export default MakeNote;
