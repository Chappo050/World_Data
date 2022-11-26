import { forwardRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

//COMPONENETS
import Hamburger from "./hamburger";

//GRAPHQL
import { CREATE_USER } from "../queries/userQueries";
import { useMutation } from "@apollo/client";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = () => {
    const username = getValues("username");
    const email = getValues("email");
    const password = getValues("password");

    createUser({
      variables: { input: {username: username, email: email, password: password }},
    });
    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;
  };

  return (
    <div className="flex justify-center text-white">
      <div className="absolute left-0">
        <Hamburger />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-10 mt-20 p-2 border-2 text-black"
      >
        <input
          {...register("username")}
          placeholder="Username"
          className=" text-center"
        />
        <input
          {...register("email")}
          placeholder="Email"
          className=" text-center"
        />
        <input
          {...register("password")}
          placeholder="Password"
          className=" text-center"
        />
        <input
          type="submit"
          className="bg-osmo-800 hover:bg-osmo-300 p-2 m-2 text-white"
        />
      </form>
    </div>
  );
};

export default RegisterPage;
