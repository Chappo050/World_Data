import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
//COMPONENETS
import Hamburger from "./hamburger";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import DropdownList from "./dropdownList";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import { GET_USER_INFO, UPDATE_USER_INFO } from "../queries/userQueries";
import { GET_COUNTRY_ALL_YEAR_DATA } from "../queries/countryQueries";

const { DateTime } = require("luxon");

const newsAPI = axios.create({
  baseURL: "https://bing-news-search1.p.rapidapi.com/news",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "57f149e787mshb35c21467fa240ap1eb47ajsn400c1a713f2b",
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
  const { loading, error, data } = useQuery(GET_USER_INFO);
  const [
    updateUserInfo,
    { loading: update_loading, error: update_error, data: update_data },
  ] = useMutation(UPDATE_USER_INFO);
  const [isLogged, setIsLogged] = useState<Boolean>(false);
  const [countryNews, setCountryNews] = useState<News>();
  const [isSubscribed, setIsSubscribed] = useState<Boolean>(false);
  const [flag, setFlag] = useState("");
  const [field, setField] = useState<String>("Happiness_Rank");
  const [selectedCategory, setSelectedCategory] = useState(newsCatagories[5]);
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
        setCountryNews(data);
      })
      .catch((res) =>
        console.error("Failed to fetch data with category, retying" + res)
      );
  }, []);

  useEffect(() => {
    setFlag(`https://flagcdn.com/${code?.toLocaleLowerCase()}.svg`);
  }, []);

  useEffect(() => {
    if (code && data) {
      const countryCodeList: any = data.getUserInfo.subscribedCountriesCode;

      if (countryCodeList.includes(code)) {
        setIsSubscribed(true);
      }
    }
    if (data) {
      setIsLogged(true);
    }
  }, [data]);
  
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
          setCountryNews(data);
        })
        .catch((res) =>
          console.error("Failed to fetch data with category, retying" + res)
        );
    } else {
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
    }
  };

  const subscribe = () => {
    updateUserInfo({
      variables: {
        input: {
          subscribedCountriesCode: [
            code,
            ...data.getUserInfo.subscribedCountriesCode,
          ],
          subscribedCountriesName: [
            countryName,
            ...data.getUserInfo.subscribedCountriesName,
          ],
        },
      },
    })
      .then((res) => setIsSubscribed(true))
      .catch((err) => console.log(err));
  };

  const unsubscribe = () => {
    const updatedListCode = data.getUserInfo.subscribedCountriesCode.filter(
      (e: String) => e !== code
    );
    const updatedListName = data.getUserInfo.subscribedCountriesName.filter(
      (e: String) => e !== countryName
    );
    updateUserInfo({
      variables: {
        input: {
          subscribedCountriesCode: [...updatedListCode],
          subscribedCountriesName: [...updatedListName],
        },
      },
    })
      .then((res) => setIsSubscribed(false))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="">
        <Hamburger />
      </div>

      <div className="flex flex-col">
        {isLogged ? (
          <>
            {" "}
            {isSubscribed ? (
              <button
                onClick={() => unsubscribe()}
                className=" w-auto bg-osmo-800 justify-center hover:bg-osmo-500"
              >
                {" "}
                Unsubscribe
              </button>
            ) : (
              <button
                onClick={() => subscribe()}
                className=" w-auto bg-osmo-500 justify-center hover:bg-osmo-300"
              >
                Subscribe
              </button>
            )}
          </>
        ) : (
          <></>
        )}

        <span className="text-center justify-center text-6xl">
          {countryName}
        </span>
        <span className="justify-center flex m-10">
          <img className="w-1/6 " src={flag} alt={countryName}></img>
        </span>

        <div className=" grid lg:grid-cols-4 grid-cols-1">
          <span className=" col-span-2 pl-20">
            <div className="text-2xl font-extrabold  col-start-3">
              {code ===
              ("AU" || "CA" || "CN" || "IN" || "JP" || "GB" || "US") ? (
                <DropdownList
                  selectedData={selectedCategory}
                  setSelectedData={setSelectedCategory}
                  data={newsCatagories}
                />
              ) : (
                <></>
              )}
            </div>
            <div className=" h-[500px] overflow-y-auto scrollbar">
              {countryNews ? (
                countryNews.value.map((article, key) => (
                   <DisplayNews key={key} article={article} />
                ))
              ) : (
                <span>Loading news, please wait...</span>
              )}
            </div>
          </span>
          <div className=" text-center place-self-center w-full h-auto col-span-2">
            <GraphRadioButtons field={field} setField={setField} />
            <GraphData country={countryName} field={field} />
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
    <ResponsiveContainer width={"99%"} height={500}>
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
          strokeWidth = '3'
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const GraphRadioButtons = ({field, setField}: any) => {
  return (
    <RadioGroup value={field} onChange={setField} className='grid grid-cols-1 m-2 lg:grid-cols-2 text-white '>
      <RadioGroup.Option value="Happiness_Rank" >
        {({ checked }) => (
          <span className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}>Happiness_Rank</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Freedom">
        {({ checked }) => (
          <span className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}>Freedom</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Economy_GDP_per_Capita">
        {({ checked }) => (
          <span className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}>Economy_GDP_per_Capita</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Family">
        {({ checked }) => (
          <span className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}>Family</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Health_Life_Expectancy">
        {({ checked }) => (
          <span className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}>Health_Life_Expectancy</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Generosity">
        {({ checked }) => (
          <span className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}>Generosity</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="Trust_Government_Corruption">
        {({ checked }) => (
          <span className={checked ? "bg-osmo-400 text-black rounded-full p-1" : ""}>Trust_Government_Corruption</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default CountryPage;
