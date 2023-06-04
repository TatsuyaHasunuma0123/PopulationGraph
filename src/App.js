import "./App.css";
import Main from "./Main";
import React, { useState } from "react";

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
          <font className="font-medium text-xl text-white cursor-pointer">
            <span>年齢別総人口の推移</span>
          </font>
          <nav className="md:ml-auto text-base text-gray-600">
            <font
              onClick={() => handleClick(0, "総人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300 cursor-pointer"
            >
              all
            </font>
            <font
              onClick={() => handleClick(1, "年少人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300 cursor-pointer"
            >
              0-14
            </font>
            <font
              onClick={() => handleClick(2, "生産年齢人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300 cursor-pointer"
            >
              15-64
            </font>
            <font
              onClick={() => handleClick(3, "老年人口の推移")}
              className="mr-5 text-gray-600 hover:text-white duration-300 cursor-pointer"
            >
              65-
            </font>
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
