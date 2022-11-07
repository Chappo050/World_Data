import { forwardRef, useEffect, useRef, useState } from "react";

//COMPONENETS
import Databox from "./components/databox";
import worldMapData from "./topology/world-countries.json";
import Hamburger from "./components/hamburger";
import { BiSearchAlt } from "react-icons/bi";

//GRAPHQL
import { GET_ALL_COUNTRIES } from "./queries/countryQueries";
import { useQuery } from "@apollo/client";

//LIBRARIES
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Listbox } from '@headlessui/react'
import { Navigate, useNavigate } from "react-router-dom";


const geoUrl = worldMapData;
const years = [
  { id: 1, year: 2015 },
  { id: 2, year: 2016 },
  { id: 3, year: 2017 },
  { id: 4, year: 2018 },
  { id: 5, year: 2019 },
]


const App = () => {
  const [hovered, setHovered] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");
  const yearRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(years[0])
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (countryName: any, countryCode: any) => navigate(`/country/${countryName}/${countryCode}`)

  return (
    <div className="text-white flex flex-row">
      <Hamburger />
   
      <div className="absolute top-10 left-1/2 z-50 text-2xl font-extrabold">
      <YearListBox selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
      </div>
      <div className="absolute top-80 left-36">
         {currentCountry !== "" ? 
        <Databox country={currentCountry} year={selectedYear.year}/>: null}
      </div>
 
      <div className="grid grid-cols-10 w-full">
        <div className="col-span-6 col-start-3">
     
          <WorldMap
            hovered={hovered}
            setCurrentCountry={setCurrentCountry}
            currentCountry={currentCountry}
            onSubmit={onSubmit}
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

const WorldMap = ({ hovered, setCurrentCountry, currentCountry, onSubmit }: any) => {
  const handleClick = (e: any, geo: any) => {
    onSubmit(geo.properties.name, geo.properties["Alpha-2"])
  };
  
  
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
            onClick={(e) => handleClick(e, geo)}
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

function YearListBox({selectedYear, setSelectedYear}: any) {


  return (
    <Listbox value={selectedYear} onChange={setSelectedYear}>
      <Listbox.Button>{selectedYear.year}</Listbox.Button>
      <Listbox.Options>
        {years.map((year) => (
          <Listbox.Option
            key={year.id}
            value={year}
            className="hover:bg-osmo-400 text-black bg-osmo-200 m-1 p-1 rounded-full text-xl"
          >
            {year.year}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}



export default App;
