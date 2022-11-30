import { AiFillInfoCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
const DataTooltips = () => {
    const [isTooltip, setIsTooltip] = useState(false);
    const [tooltipInfo, setTooltipInfo] = useState("No info");
  
    const titles: String[] = [
      "Year",
      "Rank",
      "Freedom",
      "Trust",
      "Health",
      "Economy",
      "Generosity",
      "Family",
    ];
  
    const handleTooltip = (col: String) => {
      let text = "";
  
      switch (col) {
        case "Year":
          text = "The year in which the data represents.";
          break;
        case "Rank":
          text = "The countries happiness rank.";
          break;
        case "Freedom":
          text = "Freedom info";
          break;
        case "Trust":
          text = "Trust info";
          break;
        case "Health":
          text = "Health info";
          break;
        case "Economy":
          text = "Economy info";
          break;
        case "Generosity":
          text = "Sisi is this, cos she is amazing.";
          break;
        case "Family":
          text =
            "We have the best family ever. Even though on of our kids is addicted to drugs";
          break;
        default:
          text = "No data.";
      }
      setTooltipInfo(text);
    };
  
    return (
      <>
        {titles.map((col: String) => (
          <>
            <th
              className="p-4 text-center "
              title={tooltipInfo}
              onMouseEnter={() => handleTooltip(col)}
            >
              <AiFillInfoCircle size={14} /> {col}{" "}
            </th>
          </>
        ))}
      </>
    );
  };

  export default DataTooltips;
