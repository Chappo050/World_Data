import { forwardRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
//COMPONENETS
import Hamburger from "./hamburger";

//GRAPHQL
import { CREATE_USER } from "../queries/userQueries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
    let navigate = useNavigate()
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    update() {navigate('/')}
  });
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
      variables: {
        input: { username: username, email: email, password: password },
      },
    }).catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center">
      <div className="absolute left-0 text-white">
        <Hamburger />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" col-start-3 grid grid-cols-1 gap-5 mt-20 p-2 border-2 w-1/4  "
      >
        <h1 className="text-center text-3xl text-white">Register</h1>
        <label>
            Username
        </label>
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          className=" text-center text-black"
          maxLength={20}
        />
           <label>
            Email (something@something.com)
        </label>
        <input
          {...register("email", {
            required: true,
            maxLength: 30,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid Email. something@something.com.",
            },
          })}
          placeholder="Email"
          className=" text-center text-black"
        />
        <label>
            Password (At least 8 characters)
        </label>
        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Must be longer than 8 characters long.",
            }
          })}
          placeholder="Password"
          className=" text-center text-black"
        />
        <input
          type="submit"
          className="bg-osmo-800 hover:bg-osmo-300 p-2 m-2 text-white"
        />

        <div className="text-red-500">
          <p>{errors.email?.message}</p>
        <br/>
          <p>{errors.password?.message}</p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
