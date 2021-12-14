import { FC, useState } from "react";
import reactLogo from "../../assets/react-logo.png";
import angularLogo from "../../assets/angular-logo.png";
import vueLogo from "../../assets/vue-logo.png";

import "./atoms.css";

interface SelectProps {
  changeQuery: (str: string) => void;
}

interface objectItem {
  id: number;
  value: string;
  image: string;
}

const Select: FC<SelectProps> = ({ changeQuery }) => {
  const values = [
    { id: 1, value: "reactjs", image: reactLogo },
    { id: 2, value: "angular", image: angularLogo },
    { id: 3, value: "vuejs", image: vueLogo },
  ];

  const [showItems, setShowItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState<objectItem>(values[0]);

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const selectItem = (item: objectItem) => {
    setSelectedItem(item);
    changeQuery(item.value);
    setShowItems(false);
  };

  return (
    <>
      <div className="select-container">
        <div id="items-dropdown" className="select" onClick={dropDown}>
          <div className="item-container">
            <img className="item-image" src={selectedItem.image} alt="" />
            <span className="select-text">{selectedItem.value}</span>
            <div className={`${showItems ? "arrow up" : "arrow down"}`} />
          </div>
        </div>
        <div
          style={!showItems ? { display: "none" } : undefined}
          className={"items-container"}
        >
          {values.map((item, idx) => (
            <div
              key={idx}
              className="item-container"
              onClick={() => selectItem(item)}
            >
              <img className="item-image" src={item.image} alt="" />
              <span
                className={
                  selectedItem === item ? "select-text selected" : "select-text"
                }
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Select;
