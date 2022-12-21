import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import CountryPage from "./components/countryPage";
import World from "./components/worldPage";
import Profile from "./components/userPage";
import Register from "./components/registerPage";
import Login from "./components/loginPage";
const RouteSwitch = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="world" element={<World />} />
        <Route path="country/:countryName/:code" element={<CountryPage />}  />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
