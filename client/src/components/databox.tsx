import { AnimatePresence, motion, usePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DATA,
  GET_COUNTRY_YEAR_DATA,
} from "../queries/countryQueries";


import { useQuery } from "@apollo/client";

const Databox = ({ country, year }: any) => {
  return (
    <div className="text-white flex flex-row border w-80 border-osmo-600 text-3xl z-50">
      {country !== "" ? (
        <div className="grid grid-col-1 text-xl gap-2 w-full m-5">
          <span className="border-b-2 border-osmo-500 text-3xl text-center">
            {country}
          </span>
            <DisplayCountries country={country} year={year}  />
        </div>
      ) : null}
    </div>
  );
};

const DisplayCountries = ({ country, year }: any) => {
  const { loading, error, data } = useQuery(GET_COUNTRY_YEAR_DATA, {
    variables: { countryName: country, year: year },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const returnedData = data.getCountryYearData;
  console.log(returnedData);
  
if (returnedData === null) {
   return <p>No Data Available</p>;
}
  return (
    <>
      <span> Happiness Rank: {returnedData.Happiness_Rank}</span>
      <span> Freedom: {returnedData.Freedom.toFixed(2)}</span>
      <span> Trust: {returnedData.Trust_Government_Corruption.toFixed(2)}</span>
      <span> Health: {returnedData.Health_Life_Expectancy.toFixed(2)}</span>
      <span> Economy: {returnedData.Economy_GDP_per_Capita.toFixed(2)}</span>
      <span> Generosity: {returnedData.Generosity.toFixed(2)}</span>
      <span> Family: {returnedData.Family.toFixed(2)}</span>
    </>
  );
};

export default Databox;
