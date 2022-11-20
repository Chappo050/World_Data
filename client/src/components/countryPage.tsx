import { AnimatePresence, motion, usePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

//COMPONENETS
import Hamburger from "./hamburger";
import { AiFillInfoCircle } from "react-icons/ai";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import DropdownList from "./dropdownList";

import axios from "axios";

import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DATA,
  GET_COUNTRY_YEAR_DATA,
  GET_COUNTRY_ALL_YEAR_DATA,
} from "../queries/countryQueries";

const { DateTime } = require("luxon");

const newsAPI = axios.create({
  baseURL: "https://bing-news-search1.p.rapidapi.com/news",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": process.env.REACT_APP_NEWS_API_KEY!,
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
});

const newsCatagories = [

  { id: 1, data: "Business" },
  { id: 2, data: "Entertainment" },
  { id: 3, data: "Politics" },
  { id: 4, data: "Sports" },
  { id: 5, data: "World" },
  { id: 6, data: "All" },
];
interface Providor {
  _type: String;
  name: String;
  image: Object;
}

interface Article {
  _type: String;
  name: String;
  url: String;
  image: Object;
  description: String;
  provider: Providor[];
  datePublished: String;
}

interface News {
  _type: String;
  webSearchUrl: String;
  value: Article[];
}

const CountryPage = () => {
  const [countryInfo, setCountryInfo] = useState<News>();
  const [pointer, setPointer] = useState<number>(3);
  const [flag, setFlag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(newsCatagories[3]);

  let { countryName, code } = useParams();

  useEffect(() => {
    newsAPI
      .get("", {
        params: {
          cc: code,
          setLang: "EN",
          safeSearch: "Off",
          textFormat: "Raw",
        },
      })
      .then((res) => {
        const data = res.data;
        setCountryInfo(data);
      })
      .catch((res) =>
        console.error("Failed to fetch data with category, retying" + res)
      );
  }, []);

  useEffect(() => {
    setFlag(`https://flagcdn.com/${code?.toLocaleLowerCase()}.svg`);
  }, []);

  useEffect(() => {
    fetchDataWithCat();
  }, [selectedCategory]);

  const fetchDataWithCat = () => {
    if (selectedCategory.data !== "All") {
      newsAPI
      .get("", {
        params: {
          category: selectedCategory.data,
          cc: code,
          setLang: "EN",
          safeSearch: "Off",
          textFormat: "Raw",
        },
      })
      .then((res) => {
        const data = res.data;
        setCountryInfo(data);
      })
      .catch((res) =>
        console.error("Failed to fetch data with category, retying" + res)
      );
    }
    else{
      newsAPI
      .get("", {
        params: {
          cc: code,
          setLang: "EN",
          safeSearch: "Off",
          textFormat: "Raw",
        },
      })
      .then((res) => {
        const data = res.data;
        setCountryInfo(data);
      })
      .catch((res) =>
        console.error("Failed to fetch data with category, retying" + res)
      );
    }
   
  };

  const HandlePointerIncrease = () => {
    if (countryInfo?.value.length) {
      if (countryInfo.value.length >= pointer + 3) {
        setPointer(pointer + 3);
      }
    }
  };

  const HandlePointerDecrease = () => {
    if (countryInfo?.value.length) {
      if (pointer - 3 >= 3) {
        setPointer(pointer - 3);
      }
    }
  };

  return (
    <div>
      <Hamburger />

      <div className="flex flex-col">
        <span className="text-center justify-center text-6xl">
          {countryName}
        </span>
        <span className="justify-center flex m-10">
          <img className="w-1/6 " src={flag} alt={countryName}></img>
        </span>
        <div className=" grid grid-cols-4">
          <span className=" col-span-2 pl-20">
            <div className="text-center">
              <button className="px-5" onClick={() => HandlePointerDecrease()}>
                <FcPrevious size={30} />
              </button>
              
              <div className="absolute top-72 left-[24.5%]  text-2xl font-extrabold">
                {code ===
                ("AU" || "CA" || "CN" || "IN" || "JP" || "GB" || "US") ? (
                  <DropdownList
                    selectedData={selectedCategory}
                    setSelectedData={setSelectedCategory}
                    data={newsCatagories}
                  />
                ) : (
                  <span>No categories available in this country.</span>
                )}
              </div>

              <button className="px-5" onClick={() => HandlePointerIncrease()}>
                <FcNext size={30} />
              </button>
            </div>

            {countryInfo ? (
              countryInfo.value
                .slice(pointer - 3, pointer)
                .map((article, key) => (
                  <DisplayNews key={key} article={article} />
                ))
            ) : (
              <></>
            )}
          </span>
          <div className=" text-center  w-auto h-auto col-span-2">
            <DisplayCountries country={countryName} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayNews = ({ article }: { article: Article }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const timePublished = DateTime.fromISO(article.datePublished).toFormat("ff");

  const link = article.url;

  return (
    <div className="border-2 border-black w-auto h-auto grid grid-cols-3 m-5 p-4">
      <span className="overflow-hidden">
        {article.provider[0].name
          ? article.provider[0].name
          : "No Author Found"}
      </span>
      <span className=" col-start-3 text-right">{timePublished}</span>
      <></>
      <span className="col-span-3 font-extrabold m-5 text-center">
        {article.name}
      </span>

      {showMore ? (
        <>
          {" "}
          <span className="col-span-3 m-2 overflow-hidden">
            {article.description}
          </span>
          <a
            href={link.toString()}
            className=" col-start-2 text-center w-auto m-2 hover:bg-osmo-300"
          >
            Read More...
          </a>
          <button
            className="rounded-full bg-osmo-500 col-start-2 w-auto"
            onClick={() => {
              setShowMore(false);
            }}
          >
            Show Less
          </button>
        </>
      ) : (
        <button
          className="rounded-full bg-osmo-500 col-start-2 w-auto"
          onClick={() => {
            setShowMore(true);
          }}
        >
          Continue Reading
        </button>
      )}
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

  if (returnedData === null) {
    return <p>No Data Available</p>;
  }

  return (
    <table>
      <tbody className=" w-auto h-auto">
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

export default CountryPage;
