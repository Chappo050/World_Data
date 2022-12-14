import { useState } from "react";

//COMPONENETS
import Databox from "./databox";
import worldMapData from "../topology/world-countries.json";
import Hamburger from "./hamburger";
import { BiSearchAlt } from "react-icons/bi";
import DropdownList from "./dropdownList";

//LIBRARIES
import { useForm } from "react-hook-form";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from "react-router-dom";


const geoUrl = worldMapData;
const years = [
  { id: 1, data: 2015 },
  { id: 2, data: 2016 },
  { id: 3, data: 2017 },
  { id: 4, data: 2018 },
  { id: 5, data: 2019 },
];

interface FormData {
  country: string;
}

const World = () => {
  const [hovered, setHovered] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getKeyByValue = (object: any, value: string) => {
    return Object.keys(object).find((key: string) => object[key] === value);
  };
  const onSubmit = (countryName: any, countryCode: any) =>
    navigate(`/country/${countryName}/${countryCode}`);

  const onSearch = () => {
    const data = getValues("country");
    //Search by country name here
    if (Object.values(countryListAlpha2).includes(data)) {
      const code = getKeyByValue(countryListAlpha2, data);
      const country = data;
      navigate(`/country/${country}/${code}`);
    }
    //Search by country code here
    else if (countryListAlpha2[data as keyof typeof countryListAlpha2]) {
      const country = countryListAlpha2[data as keyof typeof countryListAlpha2];
      const code = data;
      navigate(`/country/${country}/${code}`);
    }
    //Reload page if not found. Change later
    else window.location.reload();
  };

  return (
    <div className="text-white flex justify-center">
      <div className="absolute left-0">
        <Hamburger />
      </div>
      <div className="hidden lg:block lg:absolute top-10 left-[10%] z-50 text-2xl font-extrabold">
        <DropdownList
          selectedData={selectedYear}
          setSelectedData={setSelectedYear}
          data={years}
        />
      </div>
      <div className="absolute top-80 left-36 ">
        {currentCountry !== "" ? (
          <Databox country={currentCountry} year={selectedYear.data} />
        ) : null}
      </div>

      <div className=" w-[60%]">
        <p className="lg:hidden block ">World Map unavailable on this sized screen. Please type the country name in directly</p>
        <WorldMap
          hovered={hovered}
          setCurrentCountry={setCurrentCountry}
          currentCountry={currentCountry}
          onSubmit={onSubmit}
        />
        <form onSubmit={handleSubmit(onSearch)} className="justify-center flex">
          <input
            className=" text-black rounded-full text-center"
            placeholder="Enter country name or code"
            {...register("country", { required: true })}
          />
          <button
            className="bg-osmo-600 p-1 m-1 rounded-full hover:bg-osmo-300 "
            type="submit"
          >
            <BiSearchAlt size={30} />
          </button>
        </form>
      </div>
    </div>
  );
};

const WorldMap = ({
  hovered,
  setCurrentCountry,
  currentCountry,
  onSubmit,
}: any) => {
  const handleClick = (e: any, geo: any) => {
    onSubmit(geo.properties.name, geo.properties["Alpha-2"]);
  };

  const handleMove = (e: any, geo: any) => {
    if (hovered) return;
    setCurrentCountry(geo.properties.name);
    console.log(geo.properties.name);
  };

  const handleExit = () => {
    if (hovered) return;
    setCurrentCountry("");
    console.log(currentCountry);
  };

  return (
    <ComposableMap
      className="hidden lg:flex col-span-8 col-start-2 scale-y-100 scale-x-125"
      projectionConfig={{
        scale: 150,
        center: [0, -10],
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              onClick={(e) => handleClick(e, geo)}
              onMouseEnter={(e) => handleMove(e, geo)}
              onMouseLeave={() => handleExit()}
              key={geo.rsmKey}
              geography={geo}
              stroke="#113c83f6"
              style={{
                hover: {
                  fill: "#6da2f8",
                },
                pressed: {
                  fill: "#6da2f8",
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

const countryListAlpha2 = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas (the)",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia (Plurinational State of)",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory (the)",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  CV: "Cabo Verde",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  KY: "Cayman Islands (the)",
  CF: "Central African Republic (the)",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands (the)",
  CO: "Colombia",
  KM: "Comoros (the)",
  CD: "Congo (the Democratic Republic of the)",
  CG: "Congo (the)",
  CK: "Cook Islands (the)",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Cura??ao",
  CY: "Cyprus",
  CZ: "Czechia",
  CI: "C??te d'Ivoire",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic (the)",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FK: "Falkland Islands (the) [Malvinas]",
  FO: "Faroe Islands (the)",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories (the)",
  GA: "Gabon",
  GM: "Gambia (the)",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and McDonald Islands",
  VA: "Holy See (the)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran (Islamic Republic of)",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea (the Democratic People's Republic of)",
  KR: "Korea (the Republic of)",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic (the)",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands (the)",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia (Federated States of)",
  MD: "Moldova (the Republic of)",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands (the)",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger (the)",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands (the)",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestine, State of",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines (the)",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  MK: "Republic of North Macedonia",
  RO: "Romania",
  RU: "Russian Federation (the)",
  RW: "Rwanda",
  RE: "R??union",
  BL: "Saint Barth??lemy",
  SH: "Saint Helena, Ascension and Tristan da Cunha",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin (French part)",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten (Dutch part)",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan (the)",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands (the)",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates (the)",
  GB: "United Kingdom of Great Britain and Northern Ireland (the)",
  UM: "United States Minor Outlying Islands (the)",
  US: "United States of America (the)",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela (Bolivarian Republic of)",
  VN: "Viet Nam",
  VG: "Virgin Islands (British)",
  VI: "Virgin Islands (U.S.)",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
  AX: "??land Islands",
};

export default World;
