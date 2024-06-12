import axios from "axios";
import React, { useEffect, useState } from "react";
import GetURL from "../../utils/getURL";
function GetAllFoods({ currentFoodBox, titleFilter, filterType }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    console.log(filterType);
  }, [filterType]);

  useEffect(() => {
    const fetchAllFoods = async () => {
      try {
        const response = await axios.get(`${GetURL()}/food`, {
          params: { titleFilter, filterType },
        });
        const data = response.data.data;
        setFoods(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFoods();
  }, [foods, titleFilter]);

  const handleDelete = async (foodID) => {
    try {
      await axios.delete(`http://192.168.244.217:4000/food/${foodID}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleConsumeFood = async (foodID) => {
    try {
      const selectedFood = foods.find((food) => food.foodID === foodID);
      // Retrieve the existing array from session storage or initialize an empty array
      const consumedFoods =
        JSON.parse(localStorage.getItem("consumedFoods")) || [];

      consumedFoods.push({ ...selectedFood, mealType: currentFoodBox });

      localStorage.setItem("consumedFoods", JSON.stringify(consumedFoods));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {foods.length !== 0 ? (
        foods.map((food) => {
          return (
            <div key={food.foodID} className="food-row">
              <div className="food-row-col">
                <p className="food-row-col-title">{food.title}</p>
                <p className="food-portion">{food.portion}</p>
              </div>
              <div className="food-row2">
                <p>{food.kcal} kcal</p>
                {/* <a href={`/editfood?id=${food.foodID}`}>edit food</a>
              <button onClick={() => handleDelete(food.foodID)}>Delete</button> */}
                <button
                  onClick={() => handleConsumeFood(food.foodID)}
                  className="entry-button"
                >
                  +
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>no foods fetched</p>
      )}
    </div>
  );
}

export default GetAllFoods;
