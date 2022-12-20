import { useForm } from "react-hook-form";
//COMPONENETS
import Hamburger from "./hamburger";

//GRAPHQL
import { LOGIN_USER } from "../queries/userQueries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const LoginPage = () => {
    let navigate = useNavigate()
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
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
    loginUser({
      variables: {
        input: { username: username, password: password },
      },
    }).catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center">
      <div className="absolute left-0">
        <Hamburger />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" col-start-3 grid grid-cols-1 gap-5 mt-20 p-2 border-2 w-1/4  "
      >
        <h1 className="text-center text-3xl text-white">Login</h1>
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
            Password
        </label>
        <input
          {...register("password", {
            required: true,
        
            minLength: {
              value: 8,
              message: "Must be longer than 8 characters long.",
            }
          })}
          type="password"
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

export default LoginPage;
