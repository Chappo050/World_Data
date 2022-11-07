import { AnimatePresence, motion, usePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

//COMPONENETS
import Databox from "./databox";
import Hamburger from "./hamburger";
import { AiFillInfoCircle } from "react-icons/ai";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DATA,
  GET_COUNTRY_YEAR_DATA,
  GET_COUNTRY_ALL_YEAR_DATA,
} from "../queries/countryQueries";

const CountryPage = () => {
  const [countryInfo, setCountryInfo] = useState();

  const [flag, setFlag] = useState("");

  let { countryName, code } = useParams();

  useEffect(() => {
    setFlag(`https://flagcdn.com/${code?.toLocaleLowerCase()}.svg`);
    console.log(code);
  }, []);

  return (
    <div>
      <Hamburger />

      <div className="flex flex-col">
        <span className="text-center text-6xl">{countryName}</span>
        <span className="justify-center flex m-10">
          <img className="w-1/6 " src={flag} alt={countryName}></img>
        </span>
        <div className=" grid grid-cols-3">
          <span className="flex justify-center col-start-2">
            <DisplayCountries country={countryName} />
          </span>
        </div>
      </div>
    </div>
  );
};

//Use like this to get data
const DisplayCountries = ({ country }: any) => {
  const { loading, error, data } = useQuery(GET_COUNTRY_ALL_YEAR_DATA, {
    variables: { countryName: country },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const returnedData = data.getCountryAllYearData;

  console.log(returnedData);

  if (returnedData === null) {
    return <p>No Data Available</p>;
  }

  return (
    <table className=" text-center ">
      <tbody className="">
        <DataTooltips />
        {returnedData.map((ele: any) => (
          <tr key={ele.Year} className=" border-2 m-10 p-10 ">
            <td>{ele.Year}</td>
            <td> {ele.Happiness_Rank}</td>
            <td>{ele.Freedom.toFixed(2)}</td>
            <td> {ele.Trust_Government_Corruption.toFixed(2)}</td>
            <td> {ele.Health_Life_Expectancy.toFixed(2)}</td>
            <td> {ele.Economy_GDP_per_Capita.toFixed(2)}</td>
            <td> {ele.Generosity.toFixed(2)}</td>
            <td> {ele.Family.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
    console.log(col);
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
        text = "We have the best family ever. Even though on of our kids is addicted to drugs";
        break;
      default:
        text = "No data.";
    }
    setTooltipInfo(text)
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

export default CountryPage;
