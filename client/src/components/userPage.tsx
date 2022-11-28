import { forwardRef, Key, useEffect, useRef, useState } from "react";
import axios from "axios";

//COMPONENETS
import Hamburger from "./hamburger";

//GRAPHQL
import { GET_USER_INFO } from "../queries/userQueries";
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

const array = [1, 2, 3];
const UserPage = () => {
  const [countryNews, setCountryNews] = useState<any>();
  const { loading, error, data } = useQuery(GET_USER_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const userData = data;
  console.log(userData.getUserInfo.subscribedCountries);

  const getAllNews = () => {
    userData.getUserInfo.subscribedCountries.forEach((element: String) => {
      console.log(element);

      const newsFromOneCountry = getNews(element);
      setCountryNews(newsFromOneCountry);
    });
    console.log(countryNews);
  };

  const getNews = (code: String) => {
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
        setCountryNews(data);
      })
      .catch((res) =>
        console.error("Failed to fetch data with category, retying" + res)
      );
  };

  return (
    <div className="text-white flex justify-center">
      <div className="absolute left-0">
        <Hamburger />
      </div>

      <div className="grid  grid-flow-row w-full text-center">
        <span className="text-5xl p-2">{userData.getUserInfo.username}</span>
        <div className="grid grid-cols-2 p-5 text-4xl">
          <div>
            Subscribes Countries News
            <div>
              {Object.keys(userData.getUserInfo.subscribedCountries).map((item, i) => (
                <div key={i}>
                  <span>{userData.getUserInfo.subscribedCountriess[item.toString()]}</span>
                </div>
              ))}
            </div>
          </div>
          <div>Subscribes Countries Data .....DATA.....</div>
        </div>
      </div>
    </div>
  );
};

const DisplayNews = ({
  article,
  userData,
  getAllNews,
}: {
  article: Article;
  userData: any;
  getAllNews: Function;
}) => {
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

export default UserPage;
