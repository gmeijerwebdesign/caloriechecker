import React, { useEffect, useState } from "react";
import GetEditForm from "./components/GetEditForm";
import GetAllFoods from "./components/GetAllFoods";
import { FaEgg } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

import "../css/food/food.css";
import Footer from "../protected/components/Footer";

function FoodDisplayer() {
  const [currentFoodBox, setCurrentFoodBox] = useState("All foods");
  const [titleFilter, setTitleForFilter] = useState();
  const [filterType, setFilterType] = useState("recent");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const checkFoodBox = () => {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const box = params.get("box");
      if (box) {
        setCurrentFoodBox(box);
      } else {
        setCurrentFoodBox("All foods");
      }
    };
    checkFoodBox();
  }, [currentFoodBox]);

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  return (
    <div>
      <h1 className="allfoods-title">{currentFoodBox}</h1>
      <div className="foods-searchbar-box">
        <input
          type="search"
          className="foods-searchbar"
          onChange={(e) => setTitleForFilter(e.target.value)}
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </div>
      <div className="types">
        <div className="type-box">
          <FaEgg />
        </div>
        <div className="type-box">
          <GiHotMeal />
        </div>
      </div>

      <div className="filter-slider">
        <div className="filter-slider-content">
          <p
            className={filterType === "recent" ? "activeFilter" : ""}
            onClick={() => handleFilterChange("recent")}
          >
            Recent
          </p>
          <p
            className={filterType === "most" ? "activeFilter" : ""}
            onClick={() => handleFilterChange("most")}
          >
            Most kcal
          </p>
          <p
            className={filterType === "least" ? "activeFilter" : ""}
            onClick={() => handleFilterChange("least")}
          >
            Least kcal
          </p>
        </div>
      </div>

      <div className="allfoods-container">
        <GetAllFoods
          currentFoodBox={currentFoodBox}
          titleFilter={titleFilter}
          filterType={filterType}
        />
        <Footer />
      </div>
    </div>
  );
}

export default FoodDisplayer;
