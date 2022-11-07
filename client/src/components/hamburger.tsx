import { useState } from "react";
import { FaHamburger } from "react-icons/fa";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sticky top-0 w-24 scroll-smooth z-50  ">
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
          <button
            onClick={() => setIsOpen(false)}
            className="text-white "
          >
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
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = window.location.origin;
              setIsOpen(false);
            }}
            className="rounded-full md:py-1 md:mx-5"
          >
            HOME
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = window.location.origin + window.location.pathname + "#projects";
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            WORLD MAP
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = window.location.origin + window.location.pathname + "#education";
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            Link
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = window.location.origin + window.location.pathname + "#about";
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            Link
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = window.location.origin + window.location.pathname + "#contact";
              setIsOpen(false);
            }}
            className=" rounded-full md:py-1 md:mx-5"
          >
            Link
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Hamburger;