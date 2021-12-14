import { FC } from "react";
import "./atoms.css";

interface ButtonProps {
  news: string;

  changeSetNews: (str: string) => void;
}

const Button: FC<ButtonProps> = ({ news, changeSetNews }) => {
  return (
    <>
      <div className="menu-buttons-container">
        <button
          className={`menu-buttons ${
            news === "All" ? "menu-button-active" : ""
          }`}
          onClick={() => changeSetNews("All")}
        >
          All
        </button>
        <button
          className={`menu-buttons ${
            news === "Favs" ? "menu-button-active" : ""
          }`}
          onClick={() => changeSetNews("Favs")}
        >
          My Faves
        </button>
      </div>
    </>
  );
};

export default Button;
