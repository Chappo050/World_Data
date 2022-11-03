import { AnimatePresence, motion, usePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { request } from "graphql-request"; //allows us to perform a request on our server
import { getAllPeopleQuery, addPersonMutation } from "./constants/constants";
const App = () => {
  const [data, setData] = useState([]);

  const { register, handleSubmit } = useForm();

  const fetchGraphQL = async () => {
    const res = await request(
      "http://localhost:5000/graphql",
      getAllPeopleQuery
    );
    const result = res.getAllPeople;
    setData(result);
  };

  const onSubmit =  async (data: any) => {
    const response = await request(
      "http://localhost:5000/graphql",
      addPersonMutation,
      data
    )
    window.location.reload()
    console.log(response);
  }

  useEffect(() => {
    fetchGraphQL();
  }, []);


  return (
    <div className="bg-black text-blue-500">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*Bind our handler to this form.*/}
        {/* The user's input will be saved within the 'name' property */}
        <input className="bg-white" placeholder="enter name here!" {...register("name")} />
        <input className="bg-white"  type="submit" />
      </form>
      <div>
        {data.map((item: any) => {
          //render the 'result' array to the UI
          return <p key={item.id}>{item.name}</p>;
        })}
      </div>
    </div>
  );
};

export default App;
