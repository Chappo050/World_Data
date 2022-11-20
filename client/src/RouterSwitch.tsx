import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import CountryPage from "./components/countryPage";
import World from "./components/worldPage";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="world" element={<World />} />
        <Route path="country/:countryName/:code" element={<CountryPage />}  />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
