import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../queries/userQueries";
import { Link } from "react-router-dom";
const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = () => {
    logoutUser().catch((err) => console.log(err));
  };

  return (
    <div className="sticky top-2 left-2 w-24 scroll-smooth z-50  ">
      <button className="  text-3xl m-2 " onClick={() => setIsOpen(true)}>
        <FaHamburger />
      </button>
      <div
        className={`fixed z-30 inset-y-0 left-0 w-24 px-8 py-4 bg-osmo-800 border-r border-osmo-600 overflow-auto  transform ${
          isOpen
            ? "translate-x-0 ease-out transition-medium"
            : "-translate-x-full ease-in transition-medium"
        }`}
      >
        <div className="-mx-3 pl-3 pr-1 flex items-center justify-between">
          <span />
          <button onClick={() => setIsOpen(false)} className="text-white ">
            <svg fill="none" viewBox="0 0 24 24" className="h-6 w-6">
              <path
                d="M6 18L18 6M6 6L18 18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-10 flex flex-col gap-10 items-center justify-between text-xl">
          <Link
          to={'/'}
            onClick={(e) => {
              setIsOpen(false);
            }}
            className="rounded-full md:py-1 md:mx-5"
          >
            HOME
          </Link>
          <Link
          to={"/world"}
            onClick={(e) => {
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            WORLD MAP
          </Link>
          <Link
          to={"/profile"}
            onClick={(e) => {
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            PROFILE
          </Link>
          <Link
          to={"/login"}
            onClick={(e) => {
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            LOGIN
          </Link>
          <Link
                  to={"/register"}
            onClick={(e) => {
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            REGISTER
          </Link>
          <a
          href='/'
            onClick={(e) => {
              handleLogout();
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          > 
            LOGOUT
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Hamburger;
