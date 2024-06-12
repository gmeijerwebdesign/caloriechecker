import React, { useEffect, useState } from "react";
import Measurements from "./subComponents/Measurements";
import axios from "axios";

function GetEditForm() {
  const [title, setTitle] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [category, setCategory] = useState("");
  const [portion, setPortion] = useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");

  useEffect(() => {
    const fetchFoodById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/food/${id}`);
        const data = response.data.data[0];
        setTitle(data.title);
        setKcal(data.kcal);
        setProtein(data.protein);
        setCategory(data.category);
        setPortion(data.portion);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFoodById();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/food/${id}`, {
        title,
        kcal,
        protein,
        category,
        portion,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <a href="/food">back</a>

      <form>
        <input
          type="text"
          name="title"
          placeholder="title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br></br>
        <Measurements setPortion={setPortion} />
        <input
          type="text"
          name="kcal"
          value={kcal}
          placeholder="calories.."
          onChange={(e) => setKcal(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          name="protein"
          value={protein}
          placeholder="protein.."
          onChange={(e) => setProtein(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          name="category"
          value={category}
          placeholder="category.."
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit" onClick={handleFormSubmit}>
          submit
        </button>
      </form>
    </div>
  );
}

export default GetEditForm;
