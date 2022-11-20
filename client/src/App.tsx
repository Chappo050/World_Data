import { forwardRef, useEffect, useRef, useState } from "react";

//COMPONENETS
import Hamburger from "./components/hamburger";
import World from "./components/worldPage";

//LIBRARIES
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { Listbox } from "@headlessui/react";
import { Navigate, useNavigate } from "react-router-dom";

const App = () => {
  return (
    <div className="text-white flex flex-col">
      <Hamburger />
        <span className="text-4xl justify-center text-center pt-1">WORLD DATA </span>
    </div>
  );
};

export default App;
