import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import Graph from "./Graph";
import React, { useEffect, useState } from "react";

function App() {
  const [dataType, setDataType] = useState(0);
  const [title, setTitle] = useState("総人口の推移");

  const handleClick = (value, title) => {
    setDataType(value);
    setTitle(title);
  };

  return (
    <>
      <header className="text-gray-700 bg-blue-400">
        <div className="container flex mx-auto p-5 flex-col md:flex-row items-center">
          <a href="#" className="font-medium text-xl text-white">
            <span>年齢別総人口の推移</span>
          </a>
          <nav className="md:ml-auto text-base text-gray-600">
            <a
              href="#all"
              onClick={() => handleClick(0, "総人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300"
            >
              all
            </a>
            <a
              href="#0_14"
              onClick={() => handleClick(1, "年少人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300"
            >
              0-14
            </a>
            <a
              href="#15_64"
              onClick={() => handleClick(2, "生産年齢人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300"
            >
              15-64
            </a>
            <a
              href="#65_"
              onClick={() => handleClick(3, "老年人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300"
            >
              65-
            </a>
          </nav>
        </div>
      </header>

      <div className="flex justify-center">
        <Main dataType={dataType} title={title} />
      </div>
    </>
  );
}

export default App;
