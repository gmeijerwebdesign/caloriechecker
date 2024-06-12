import React, { useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io";
function HomeHeader() {
  const [datum, setDatum] = useState("");

  const handleGoToProfile = () => {
    window.location.href = "/profile";
  };

  useEffect(() => {
    const date = new Date();
    const monthIndex = date.getMonth();
    const day = date.getDay();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[monthIndex];
    const dat = day + " " + month;
    setDatum(dat);
  }, []);

  return (
    <div className="header">
      <h1>
        <i>{datum}</i>
      </h1>
      <IoMdContact onClick={handleGoToProfile} />
    </div>
  );
}

export default HomeHeader;
