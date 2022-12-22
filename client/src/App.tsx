//COMPONENETS
import { Link } from "react-router-dom";
import Hamburger from "./components/hamburger";

//LIBRARIES

const App = () => {
  return (
    <div className="text-white flex flex-col">
      <Hamburger />
      <h1 className="text-4xl justify-center text-center pt-1">WORLD DATA </h1>
      <div className="text-center p-10 text-2xl">
        <p>
          Welcome to my website to summarise news along with the World Happiness
          Report.
        </p>
        <p>
          Navigate to the{" "}
          <Link className=" underline text-blue-500 hover:bg-osmo-700" to={'/world'}>World Map </Link> 
            and click or search for a country.
        </p>
        <br />
        <p>
          On each countries respective page you will find its news feed along
          with data from the World Happiness Report.
        </p>
        <br />
        <p>
          The World Happiness Report uses 6 metrics to estimate the happiness of
          that country compared to other countries.
        </p>
        <br />
        <p>
          Please make an account and login to subscibe to the news feed for each
          country.
        </p>
      </div>

      <div className="text-center p-10 text-2xl border m-10">
        <h2 className="underline">6 Variable Information</h2>
        <br />
        <li>Economy, GDP per Capita: 0~2 </li>
        <li>Family: 0~2, Measures things like social support</li>
        <li>Health, Life Expectancy: 0~2</li>
        <li>Freedom: 0~1, Freedom of press, speech and life choices. </li>
        <li>Generosity: 0~1, volunteering/charity. </li>
        <li>
          Trust, Government Corruption: 0~0.5, perception of corruption of the
          government{" "}
        </li>
      </div>
    </div>
  );
};

export default App;
