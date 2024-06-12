import React, { useEffect, useState } from "react";
import axios from "axios";
import Measurements from "./subComponents/Measurements";
import FoodFilter from "./subComponents/filter";
import blob from "../../images/blob1.png";
import blob2 from "../../images/blob2.png";
import Footer from "../../protected/components/Footer";

function GetAddFood() {
  const [title, setTitle] = useState("");
  const [kcal, setKcal] = useState(0);
  const [protein, setProtein] = useState(0);
  const [category, setCategory] = useState("");

  const [ingredientList, setIngredientList] = useState([]);
  const [portion, setPortion] = useState("");
  const [ingredient, setIngredient] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (ingredient) {
      setKcal((prevKcal) => prevKcal + Number(ingredient.ingredientCalories));
      setProtein(
        (prevProtein) => prevProtein + Number(ingredient.ingredientProtein)
      );
    }
  }, [ingredient]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title.trim() !== "") {
        const ingredients = ingredientList.map((item) => ({
          title: item.title,
          kcal: item.kcal,
          protein: item.protein,
        }));
        const foodData = {
          title,
          kcal,
          protein,
          portion,
          category,
          ingredients,
        };

        await axios.post("http://localhost:4000/food", foodData);
        console.log("Successfully stored new food entry");
        setTitle("");
        setKcal(0);
        setProtein(0);
        setCategory("");
        setIngredientList([]);
        setPortion("");
        setIngredient(null);
        window.location.href = "/food";
      }
    } catch (err) {
      console.log("Error storing new food entry:", err);
    }
  };

  return (
    <div>
      <img src={blob} alt="Blob" className="home-blob1" />
      <img src={blob2} alt="Blob2" className="home-blob2" />

      <div className="add-food-main">
        <div className="addfood-container">
          <h1>Add a new food/recipe</h1>
          <form>
            <p>Title</p>
            <input
              className="addfood-text"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <div className="small-inputs">
              <div className="small-input-col">
                <p>Kcal</p>
                <input
                  type="text"
                  name="kcal"
                  value={kcal}
                  onChange={(e) => setKcal(Number(e.target.value))}
                />
              </div>
              <br />
              <div className="small-input-col">
                <p>Protein</p>
                <input
                  type="text"
                  name="protein"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                />
              </div>
            </div>
            <br />
            <p>Category</p>
            <input
              className="addfood-text"
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <p className="mes">Measurements</p>
            <Measurements setPortion={setPortion} />
            <br />
          </form>
          <FoodFilter
            setIngredientList={setIngredientList}
            ingredientList={ingredientList}
            setIngredient={setIngredient}
          />
          <button type="button" onClick={(e) => handleFormSubmit(e)}>
            Add new food
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GetAddFood;
