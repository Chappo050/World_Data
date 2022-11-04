import { AnimatePresence, motion, usePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { GET_ALL_COUNTRIES } from "./queries/countryQueries";
// Import everything needed to use the `useQuery` hook
import { useQuery } from "@apollo/client";
import Hamburger from "./components/hamburger";
import worldMapData from "./topology/world-countries.json";
import ReactTooltip from "react-tooltip";
import { BiSearchAlt } from "react-icons/bi";

const geoUrl = worldMapData;

interface CountryData {
  Country: String;
  Reigon: String;
  Happiness_Rank: Number;
  Happiness_Score: Number;
  Standard_Error: Number;
  Lower_Confidence_Interval: Number;
  Upper_Confidence_Interval: Number;
  Whisker_high: Number;
  Whisker_low: Number;
  Economy_GDP_per_Capita: Number;
  Family: Number;
  Health_Life_Expectancy: Number;
  Freedom: Number;
  Trust_Government_Corruption: Number;
  Generosity: Number;
  Dystopia_Residual: Number;
  Year: Number;
}

const App = () => {
  const [hovered, setHovered] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="text-white flex flex-row">
      <Hamburger />
      <div className="absolute top-20 left-36 w-40 h-56 border border-osmo-600 text-4xl ">
        {currentCountry}
      </div>
      <div className="grid grid-cols-10 w-full">
        <div className="col-span-6 col-start-3">
          <WorldMap
            hovered={hovered}
            setCurrentCountry={setCurrentCountry}
            currentCountry={currentCountry}
          />
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-2">
            <input
              className="col-start-2"
              placeholder="Enter country name to search."
              {...register("countrySearch", { required: true })}
            />
            <button
              className="bg-osmo-600 col-start-2 w-full items-center justify-center flex "
              type="submit"
            >
              <BiSearchAlt size={25} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

//Use like this to get data
const DisplayCountries = () => {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.getAllCountries.map(
    ({ id, Country, Year, Happiness_Rank }: any) => (
      <div key={id}>
        <h3>{Country}</h3>
        <p>{Year}</p>
        <p>{Happiness_Rank}</p>
        <br />
      </div>
    )
  );
};

const WorldMap = ({ hovered, setCurrentCountry, currentCountry }: any) => {
  const handleMove = (e: any, geo: any) => {
    if (hovered) return;
    setCurrentCountry(geo.properties.name);
    console.log(geo.properties.name);
  };

  const handleExit = () => {
    if (hovered) return;
    setCurrentCountry("");
    console.log(currentCountry);
  };

  return (
    <ComposableMap
      className="hidden lg:flex col-span-8 col-start-2 scale-y-100 scale-x-125"
      projectionConfig={{
        scale: 150,
        center: [0, -10],
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              onMouseEnter={(e) => handleMove(e, geo)}
              onMouseLeave={() => handleExit()}
              key={geo.rsmKey}
              geography={geo}
              stroke="#113c83f6"
              style={{
                hover: {
                  fill: "#6da2f8",
                },
                pressed: {
                  fill: "#6da2f8",
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default App;
