import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/protected/home.css";
import GetURL from "../../utils/getURL";
function Samenvatting() {
  const [progress, setProgress] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [foodConsumed, setFoodConsumed] = useState([]);
  const [eiwitProgress, setEiwitProgress] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(`${GetURL()}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo(response.data.user[0]);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          console.log("Error fetching user info:", err);
        }
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const sessionArr = localStorage.getItem("consumedFoods");
    try {
      const parsedArray = sessionArr ? JSON.parse(sessionArr) : [];
      setFoodConsumed(parsedArray);
    } catch (error) {
      console.log("Error parsing consumedFoods:", error);
    }
  }, []);

  useEffect(() => {
    console.log("UserInfo:", userInfo);
    console.log("FoodConsumed:", foodConsumed);
  }, [userInfo, foodConsumed]);

  // Calculations
  let remainingCalories = 0;
  let remainingProtein = 0;

  if (userInfo) {
    const userKcal = userInfo.kcal || 0;
    const userProtein = userInfo.protein || 0;

    const totalKcal = foodConsumed.reduce(
      (total, food) => total + (food.kcal || 0),
      0
    );
    remainingCalories = Math.max(userKcal - totalKcal, 0);

    const totalProtein = foodConsumed.reduce(
      (total, food) => total + (food.protein || 0),
      0
    );
    remainingProtein = Math.max(userProtein - totalProtein, 0);
  }

  const radius = 40; // Increase the radius to make the circle bigger
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (userInfo) {
      const progressPercentage = (remainingCalories / userInfo.kcal) * 100;
      setProgress(progressPercentage);
    }
  }, [remainingCalories, userInfo]);

  return (
    <div className="samenvatting-box">
      {userInfo && (
        <>
          <p className="samenvatting-header">Samenvatting</p>
          <div className="samenvatting-container">
            <div className="samenvatting-content">
              <div className="samenvatting-holder">
                <p>
                  24 <br /> vet
                </p>
                <input type="progress" className="progress-bar-holder" />
              </div>
              <div className="progressbar-box">
                <svg width="100" height="100" className="progress-bar">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#FF4C4C"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#e0e0e0"
                    strokeWidth="11"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference - (progress / 100) * circumference
                    }
                    strokeLinecap="square"
                  />
                </svg>
                <div className="progress-text">
                  <p>{remainingCalories}</p>
                  <p>kcal</p>
                </div>
              </div>
              <div className="samenvatting-holder">
                <p>
                  {remainingProtein} <br /> eiwit
                </p>
                <progress
                  className="progress-bar-holder"
                  value={remainingProtein}
                  max={userInfo.protein}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Samenvatting;
