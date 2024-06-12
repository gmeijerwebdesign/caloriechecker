import React, { useEffect, useState } from "react";
import blob from "../images/blob1.png";
import { IoMdContact } from "react-icons/io";
import Footer from "../protected/components/Footer";
import GetURL from "../utils/getURL";
import axios from "axios";

function Profile() {
  const [username, setUsername] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setToken(authToken);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get(`${GetURL()}/protected`, config);
          setUserInfo(response.data.user[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [token]);

  console.log(userInfo);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("consumedFoods");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.log(err, "Error logging out user");
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="magicpattern">
      <img src={blob} alt="Blob" className="blob-profile" />
      <div className="form">
        <form method="POST" className="auth-form-profile">
          <div className="icon-holder">
            <IoMdContact />
          </div>
          <p className="username-profile">Username</p>
          <input
            type="text"
            name="username"
            value={username || userInfo.username}
            className="auth-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="numbers">
            <div className="numb">
              <p>Calories (kcal)</p>
              <input
                type="number"
                name="kcal"
                value={kcal || userInfo.kcal}
                onChange={(e) => setKcal(e.target.value)}
              />
            </div>
            <div className="numb">
              <p>Protein (g)</p>
              <input
                type="number"
                name="protein"
                value={protein || userInfo.protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
          </div>
            <button onClick={handleLogout}>Logout</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
