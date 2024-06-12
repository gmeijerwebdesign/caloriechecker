import React, { useEffect } from "react";
import GetStorage from "./components/GetStorage";
import GetUserInformation from "./components/getUserInformation";
import blob from "../images/blob1.png";
import "../css/protected/home.css";
import HomeHeader from "./components/HomeHeader";
import Samenvatting from "./components/Samenvatting";
import VoedingsWaardes from "./components/VoedingsWaardes";
import Notes from "./components/Notes";
import AddFoodBtn from "./components/subComponents/addFoodBtn";
import Footer from "./components/Footer";
function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);


  return (
    <div className="home-box">
      <img src={blob} alt="Blob" className="home-blob" />
      <div className="home-content">
        <HomeHeader />
        <Samenvatting />
        <VoedingsWaardes />
        <Notes />
        <AddFoodBtn />
        <Footer />
        {/* <GetUserInformation /> */}
        {/* <button onClick={handleLogout}>Logout</button>
        <br />
        <a href="/food">go to all foods page</a>
        <br />
        <a href="/addfood">Add new food product here</a>
        <GetStorage /> */}
      </div>
    </div>
  );
}

export default Home;
