import React, { useEffect, useState } from "react";

function GetSession() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("consumedFoods");
    if (data) {
      const parsedData = JSON.parse(data);
      const aggregatedData = aggregateFoods(parsedData);
      setFoods(aggregatedData);
    }
  }, []);

  const aggregateFoods = (foodArray) => {
    const foodMap = new Map();

    foodArray.forEach((food) => {
      if (foodMap.has(food.foodID)) {
        const existingFood = foodMap.get(food.foodID);
        existingFood.kcal += food.kcal;
        existingFood.protein += food.protein;
      } else {
        foodMap.set(food.foodID, { ...food });
      }
    });

    return Array.from(foodMap.values());
  };

  return (
    <div>
      {foods.length > 0 &&
        foods.map((food) => (
          <div key={food.foodID}>
            <p>
              <b>{food.title}</b>
            </p>
            <p>{food.kcal} kcal</p>
            <p>{food.protein} gram protein</p>
          </div>
        ))}
    </div>
  );
}

export default GetSession;
