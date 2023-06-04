import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const prefectures_URL =
  "https://opendata.resas-portal.go.jp/api/v1/prefectures";

function CheckList({ dataType, title }) {
  const [titleChange_Next, setTitleChange_Next] = useState(0); //タイトルが変わった際、次のuseEffectを発火させるためのフック
  const [prefs, setPrefs] = useState(undefined); //都道府県のデータを入れておく
  const [selected, setSelected] = useState(Array(47).fill(false)); //選択されているチェックボックスのデータ
  const [series, setSeries] = useState([]); //都道府県のデータ及び、人口推移のデータ
  const [responses, setResponse] = useState([]); //チェックボックスをチェックした時に得られたレスポンスを保持しておく

  // チェックボックスに表示する都道府県を読み込む
  useEffect(() => {
    const apikey = process.env.REACT_APP_RESAS_KEY;
    fetch(prefectures_URL, {
      headers: { "X-API-KEY": apikey },
    })
      .then((response) => response.json())
      .then((res) => {
        setPrefs(res.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //データタイプが
  useEffect(() => {
    setSeries([]);
    setTitleChange_Next(titleChange_Next + 1);
  }, [dataType]);

  useEffect(() => {
    let count = 0;
    let prev_res_series = [];

    const selected_copy = selected.slice();

    selected_copy.forEach((value, index) => {
      if (value) {
        let tmptmp = [];
        Object.keys(responses[count].result.data[dataType].data).forEach(
          (i) => {
            tmptmp.push(responses[count].result.data[dataType].data[i].value);
          }
        );
        const res_series = {
          name: prefs[index].prefName,
          data: tmptmp,
        };

        prev_res_series.push(res_series);
        setSeries(prev_res_series);
        count++;
      }
    });
  }, [titleChange_Next]);

  const changeSelection = (index) => {
    const apikey = process.env.REACT_APP_RESAS_KEY;
    const selected_copy = selected.slice();
    selected_copy[index] = !selected_copy[index];

    if (!selected[index]) {
      fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${
          index + 1
        }`,
        {
          headers: { "X-API-KEY": apikey },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          let tmp = [];
          Object.keys(res.result.data[dataType].data).forEach((i) => {
            tmp.push(res.result.data[dataType].data[i].value);
          });
          const res_series = {
            name: prefs[index].prefName,
            data: tmp,
          };
          const response = res;
          setSelected(selected_copy);
          setSeries([...series, res_series]);
          setResponse([...responses, response]);
        });
    } else {
      const series_copy = series.slice();
      // チェック済みであった場合
      for (let i = 0; i < series_copy.length; i++) {
        if (series_copy[i].name === prefs[index].prefName) {
          series_copy.splice(i, 1);
        }
      }
      setSelected(selected_copy);
      setSeries(series_copy);
    }
  };

  const options = {
    title: {
      text: title,
    },
    subtitle: {
      text: "reference : RESAS API",
    },
    yAxis: {
      title: {
        text: "人口",
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointInterval: 5,
        pointStart: 1965,
      },
    },
    series: series,
    chart: {
      backgroundColor: "#f4f4f5",
    },
    accessibility: {
      enabled: false,
    },
  };

  return (
    <>
      {!prefs || prefs.length === 0 ? (
        <h1 className="font-medium text-xl text-center">Loading...</h1>
      ) : (
        <div className="flex flex-col w-11/12">
          <div className="grid grid-cols-1 mt-5 rounded-lg gap-5 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] lg:grid-cols-8  md:grid-cols-5 dark:bg-neutral-700">
            {prefs.map((pref) => (
              <div key={pref.prefCode} className="items-center pl-3 flex">
                <input
                  id={pref.prefCode}
                  type="checkbox"
                  checked={selected[pref.prefCode - 1]}
                  onChange={() =>
                    changeSelection(pref.prefCode - 1, "fromCheck")
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded duration-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                ></input>
                <label
                  htmlFor={pref.prefCode}
                  className="py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-gray-600 hover:underline hover:duration-100"
                >
                  {pref.prefName}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      )}
    </>
  );
}

export default CheckList;
