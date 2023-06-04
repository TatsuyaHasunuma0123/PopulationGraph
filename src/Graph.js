import React, { useEffect } from "react";

function Graph({ dataType }) {
  const population_URL =
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=1";

  useEffect(() => {
    fetch(population_URL, {
      headers: { "X-API-KEY": process.env.REACT_APP_RESAS_KEY },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert("エラーが発生しました。");
      }, []);
  });

  return <div>Graph</div>;
}

export default Graph;
