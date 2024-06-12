import React, { useEffect, useState } from "react";
import GetURL from "../../../utils/getURL";
import axios from "axios";

function FoodBoxes() {
  const [userInfo, setUserInfo] = useState(null); // Initially null to handle the loading state
  const [foodConsumed, setFoodConsumed] = useState([]);
  const [initKcalForBoxes, setInitKcalForBoxes] = useState({
    breakfast: 0,
    lunch: 0,
    diner: 0,
    snacks: 0,
  });
  const [kcalForBoxes, setKcalForBoxes] = useState({
    breakfast: 0,
    lunch: 0,
    diner: 0,
    snacks: 0,
  });

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
    if (userInfo) {
      // Ensure userInfo is defined before using it
      const distributeCalories = () => {
        setKcalForBoxes((prevState) => ({
          ...prevState,
          breakfast: Math.floor(userInfo.kcal * 0.2),
          lunch: Math.floor(userInfo.kcal * 0.3),
          diner: Math.floor(userInfo.kcal * 0.4),
          snacks: Math.floor(userInfo.kcal * 0.1),
        }));
      };
      distributeCalories();
    }
  }, [userInfo]);

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
    const calculateInitialKcal = () => {
      const initialKcal = foodConsumed.reduce(
        (acc, food) => {
          if (food.mealType === "breakfast") {
            acc.breakfast += food.kcal;
          } else if (food.mealType === "lunch") {
            acc.lunch += food.kcal;
          } else if (food.mealType === "diner") {
            acc.diner += food.kcal;
          } else if (food.mealType === "snacks") {
            acc.snacks += food.kcal;
          }
          return acc;
        },
        { breakfast: 0, lunch: 0, diner: 0, snacks: 0 }
      );
      setInitKcalForBoxes(initialKcal);
    };

    calculateInitialKcal();
  }, [foodConsumed]);

  // Optionally, you can add a loading state while fetching userInfo
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="food-values-content">
        <div className="breakfast">
          <div className="food-values-row1">
            <p className="food-values-image">🍳</p>
            <div className="food-values-row2">
              <p className="food-values-title">Breakfast</p>
              <p className="food-values-kcal">
                {initKcalForBoxes.breakfast}/{kcalForBoxes.breakfast}
              </p>
            </div>
          </div>
          <a className="food-values-button" href="/food?box=breakfast">
            +
          </a>
        </div>
      </div>
      <div className="food-values-content">
        <div className="breakfast">
          <div className="food-values-row1">
            <p className="food-values-image">🌯</p>
            <div className="food-values-row2">
              <p className="food-values-title">Lunch</p>
              <p className="food-values-kcal">
                {initKcalForBoxes.lunch}/{kcalForBoxes.lunch}
              </p>
            </div>
          </div>
          <a className="food-values-button" href="/food?box=lunch">
            +
          </a>
        </div>
      </div>
      <div className="food-values-content">
        <div className="breakfast">
          <div className="food-values-row1">
            <p className="food-values-image">🍛</p>
            <div className="food-values-row2">
              <p className="food-values-title">Diner</p>
              <p className="food-values-kcal">
                {initKcalForBoxes.diner}/{kcalForBoxes.diner}
              </p>
            </div>
          </div>
          <a className="food-values-button" href="/food?box=diner">
            +
          </a>
        </div>
      </div>
      <div className="food-values-content">
        <div className="breakfast-last">
          <div className="food-values-row1">
            <p className="food-values-image">🍪</p>
            <div className="food-values-row2">
              <p className="food-values-title">Snacks</p>
              <p className="food-values-kcal">
                {initKcalForBoxes.snacks}/{kcalForBoxes.snacks}
              </p>
            </div>
          </div>
          <a className="food-values-button" href="/food?box=snacks">
            +
          </a>
        </div>
      </div>
    </div>
  );
}

export default FoodBoxes;
