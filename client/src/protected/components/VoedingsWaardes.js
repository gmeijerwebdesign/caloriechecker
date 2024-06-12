import React from "react";
import FoodBoxes from "./subComponents/FoodBoxes";

function VoedingsWaardes() {
  return (
    <div className="food-values-container">
      <p className="voedingswaardes-header">Voeding</p>
      <div className="food-values-box">
        <FoodBoxes />
      </div>
    </div>
  );
}

export default VoedingsWaardes;
