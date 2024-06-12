import React, { useEffect, useState } from "react";
import axios from "axios";
import IngredientListHandler from "./ingredientListHandler";
import { FaSearch } from "react-icons/fa";
import GetURL from "../../../utils/getURL";

function FoodFilter({ setIngredientList, ingredientList, setIngredient }) {
  const [searchVal, setSearchVal] = useState("");
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredFood = async () => {
      try {
        if (searchVal) {
          const response = await axios.get(
            `${GetURL()}/food/filter?search=${searchVal}`
          );
          setFoods(response.data.foods);
          setError(null);
        } else {
          setFoods([]);
        }
      } catch (err) {
        console.error("Error fetching filtered food:", err);
        setError("Failed to fetch foods. Please try again later.");
      }
    };
    fetchFilteredFood();
  }, [searchVal]);

  return (
    <div>
      <div className="foods-searchbar-box">
        <input
          className="foods-searchbar"
          type="search"
          name="search"
          placeholder="Search ingredients.."
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </div>
      {error && <p>{error}</p>}
      <IngredientListHandler
        setIngredientList={setIngredientList}
        foods={foods}
        ingredientList={ingredientList}
        setIngredient={setIngredient}
      />
    </div>
  );
}

export default FoodFilter;
