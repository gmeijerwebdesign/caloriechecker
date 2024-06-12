import React, { useEffect } from "react";

function IngredientListHandler({
  setIngredientList,
  foods,
  ingredientList,
  setIngredient,
}) {
  const handleButtonClick = (food) => {
    setIngredientList((prevIngredientList) => {
      const existingFoodIndex = prevIngredientList.findIndex(
        (item) => item.foodID === food.foodID
      );
      if (existingFoodIndex === -1) {
        return [...prevIngredientList, { ...food, amount: 1 }];
      }
      const updatedList = [...prevIngredientList];
      updatedList[existingFoodIndex] = {
        ...updatedList[existingFoodIndex],
        amount: updatedList[existingFoodIndex].amount + 1,
      };
      return updatedList;
    });
  };

  useEffect(() => {
    console.log("list:", ingredientList);

    const ingredientCalories = ingredientList.reduce((acc, item) => {
      return acc + item.kcal * item.amount;
    }, 0);

    const ingredientProtein = ingredientList.reduce((acc, item) => {
      return acc + item.protein * item.amount;
    }, 0);

    setIngredient({ ingredientCalories, ingredientProtein });
  }, [ingredientList, setIngredient]);

  return (
    <div className="ingredientList-container">
      {foods.length > 0 && (
        <div className="ingredientList-box">
          {foods.map((food) => (
            <div key={food.foodID} className="ingredientList-content">
              <p>{food.title}</p>
              <p>{food.kcal}kc</p>
              <p>{food.protein}gr</p>
              <button onClick={() => handleButtonClick(food)}>+</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IngredientListHandler;
