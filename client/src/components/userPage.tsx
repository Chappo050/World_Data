import { forwardRef, Key, useEffect, useRef, useState } from "react";
import axios from "axios";

//COMPONENETS
import Hamburger from "./hamburger";
import  DataTooltips  from "./dataTooltips";
//GRAPHQL
import { GET_USER_INFO } from "../queries/userQueries";
import { GET_COUNTRY_ALL_YEAR_DATA} from "../queries/countryQueries";

import { useQuery } from "@apollo/client";
const newsAPI = axios.create({
  baseURL: "https://bing-news-search1.p.rapidapi.com/news",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "57f149e787mshb35c21467fa240ap1eb47ajsn400c1a713f2b",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
});

const { DateTime } = require("luxon");

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

const UserPage = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const userData = data;
  console.log(userData.getUserInfo.subscribedCountriesCode);
  console.log(userData.getUserInfo.subscribedCountriesName);
  return (
    <div className="text-white flex justify-center">
      <div className="">
        <Hamburger />
      </div>

      <div className="grid  grid-flow-row w-full text-center">

        <span className="text-5xl p-2">{userData.username}</span>

        <div className=" p-5 text-4xl">
          <h2 className="py-10 underline">Subscribes Countries News</h2>
          <div className="grid grid-cols-3 border-2 p-5">
            {Object.values(userData.getUserInfo.subscribedCountriesCode).map(
              (item: any, i) => (
                
                <div>

                <p className="relative text-3xl"> {userData.getUserInfo.subscribedCountriesName[i]}</p>  
                <div key={i} className=" h-96 overflow-y-auto scrollbar">
              
                  <DisplayNews countryCode={item} />
                </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className=" p-5 text-4xl">
          <h2 className="py-10 underline">Subscribes Countries Data</h2>
          <div className="grid grid-cols-3 border-2 p-5 text-base gap-10">
            {Object.values(userData.getUserInfo.subscribedCountriesName).map(
              (item: any, i) => (
                <div>

                <p className="relative text-3xl"> {item}</p>  
                <div key={i} className=" h-96 overflow-y-auto scrollbar">
              
                  <DisplayCountryData country={item} />
                </div>
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const DisplayNews = ({ countryCode }: { countryCode: string }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [countryNews, setCountryNews] = useState<News>();
  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    newsAPI
      .get("", {
        params: {
          cc: countryCode,
          setLang: "EN",
          safeSearch: "Off",
          textFormat: "Raw",
        },
      })
      .then((res) => {
        const data = res.data;
        setCountryNews(data);
        setLoading(false)
      })
      .catch((res) =>
        console.error("Failed to fetch data with category, retying" + res)
      );
  }, [countryCode]);

  return (
    <div className="text-base">
      {countryNews && !loading ? (
        countryNews.value.map((article: Article, key: Key) => {
          //clean values
          const timePublished = DateTime.fromISO(
            article.datePublished
          ).toFormat("ff");
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
                <div>
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
                </div>
              ) : (
                <button
                  className="rounded-full bg-osmo-500 col-start-2 w-auto"
                  onClick={() => {
                    setShowMore(true);
                  }}
                >
                  Continue Reading
                </button>
              )}{" "}
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

//Use like this to get data
const DisplayCountryData = ({ country }: any) => {
  const { loading, error, data } = useQuery(GET_COUNTRY_ALL_YEAR_DATA, {
    variables: { countryName: country },
  });
  console.log(country);
  

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



export default UserPage;
