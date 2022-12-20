import { Key, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RadioGroup } from "@headlessui/react";

//COMPONENETS
import Hamburger from "./hamburger";

//GRAPHQL
import { GET_USER_INFO } from "../queries/userQueries";
import { GET_COUNTRY_ALL_YEAR_DATA } from "../queries/countryQueries";

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
  const [field, setField] = useState<String>("Happiness_Rank");
  let navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USER_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) navigate("/login");

  const userData = data;

  return (
    <div className="text-white flex justify-center">
      <div className="">
        <Hamburger />
      </div>

      <div className="grid grid-cols-1 lg:grid-flow-row w-full text-center">
        <span className="text-5xl p-2">{userData.username}</span>

        <div className=" p-5 text-4xl">
          <h2 className="py-10 underline">Subscribes Countries News</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:border-2 lg:p-5">
            {Object.values(userData.getUserInfo.subscribedCountriesCode).map(
              (item: any, i) => (
                <div>
                  <p className="relative text-3xl">
                    {" "}
                    {userData.getUserInfo.subscribedCountriesName[i]}
                  </p>
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
          <span className="text-base">
            <GraphRadioButtons field={field} setField={setField} />
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:border-2 lg:p-5 text-base gap-10">
            {Object.values(userData.getUserInfo.subscribedCountriesName).map(
              (item: any, i) => (
                <div>
                  <p className="relative text-3xl"> {item}</p>

                  <div className=" text-center place-self-center w-auto h-auto col-span-2">
                    <GraphData country={item} field={field} />
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
  const [loading, setLoading] = useState<Boolean>(true);

  //request the news from the API with random staggered times
  useEffect(() => {
    setTimeout(() => {
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
          setLoading(false);
        })
        .catch((res) =>
          console.error("Failed to fetch data with category, retying" + res)
        );
    }, Math.random() * 10000);
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

const GraphData = ({ country, field }: any) => {
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
    <ResponsiveContainer width={"99%"} height={200}>
      <LineChart
        data={returnedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 10" />
        <XAxis dataKey="Year" reversed={true} />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={field}
          stroke="	#8B4000"
          strokeWidth="3"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const GraphRadioButtons = ({ field, setField }: any) => {
  return (
    <RadioGroup
      value={field}
      onChange={setField}
      className="grid  grid-cols-1 lg:grid-cols-2 text-white "
    >
      <RadioGroup.Option value="Happiness_Rank">
        {({ checked }) => (
          <span
            className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}
          >
            Happiness_Rank
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Freedom">
        {({ checked }) => (
          <span
            className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}
          >
            Freedom
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Economy_GDP_per_Capita">
        {({ checked }) => (
          <span
            className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}
          >
            Economy_GDP_per_Capita
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Family">
        {({ checked }) => (
          <span
            className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}
          >
            Family
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Health_Life_Expectancy">
        {({ checked }) => (
          <span
            className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}
          >
            Health_Life_Expectancy
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Generosity">
        {({ checked }) => (
          <span
            className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}
          >
            Generosity
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Trust_Government_Corruption">
        {({ checked }) => (
          <span
            className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}
          >
            Trust_Government_Corruption
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default UserPage;
