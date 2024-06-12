import React, { useEffect, useState } from "react";
import axios from "axios";

function GetUserInformation() {
  const [userInfo, setUserInfo] = useState(null);
  const [foodConsumed, setFoodConsumed] = useState([]);

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

  return (
    <div>
      {userInfo !== null && (
        <h1>
          Welcome {userInfo.username}, you have {remainingCalories} calories and{" "}
          {remainingProtein} grams of protein remaining today.
        </h1>
      )}
    </div>
  );
}

export default GetUserInformation;
