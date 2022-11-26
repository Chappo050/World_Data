import { forwardRef, useEffect, useRef, useState } from "react";

//COMPONENETS
import Hamburger from "./hamburger";

//GRAPHQL
import { GET_USER_INFO } from "../queries/userQueries";
import { useQuery } from "@apollo/client";

const UserPage = () => {

  return (
    <div className="text-white flex justify-center">
      <div className="absolute left-0">
        <Hamburger />
      </div>
   
 
      <div className="grid grid-cols-10 w-full">
        <DisplaySubscriptions/>
      </div>
    </div>
  );
};

//Use like this to get data
const DisplaySubscriptions = () => {
    const { loading, error, data } = useQuery(GET_USER_INFO, {
        variables: { userID: "6379d72dae0f52483cb6f6f9" },
      });
      
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;  

  return <div>
    {data.getUserInfo.subscribedCountries.map((countryCode: String, key: any) => {
        return (
<span key={key}>
    {countryCode}
</span>
        )
    })}
  </div>
};

export default UserPage;
