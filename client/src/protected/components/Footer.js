import React from "react";
import { IoHome } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";

function Footer() {
  const handleClick = (e) => {
    const val = e.currentTarget.dataset.value;
    console.log(val);
    if (val === "home") {
      window.location.href = "/";
    }
    if (val === "profile") {
      window.location.href = "/profile";
    }
    if (val === "recipes") {
      window.location.href = "/food";
    }
    if (val === "notes") {
      window.location.href = "/";
    }
  };
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div
          className="footer-col"
          data-value="home"
          onClick={(e) => handleClick(e)}
        >
          <IoHome />
          <p>Home</p>
        </div>
        <div
          className="footer-col"
          data-value="profile"
          onClick={(e) => handleClick(e)}
        >
          <IoMdContact />
          <p>Profile</p>
        </div>
        <div
          className="footer-col"
          data-value="recipes"
          onClick={(e) => handleClick(e)}
        >
          <BiSolidFoodMenu />
          <p>Recipes</p>
        </div>
        <div
          className="footer-col"
          data-value="notes"
          onClick={(e) => handleClick(e)}
        >
          <IoIosAddCircle />
          <p>notes</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
