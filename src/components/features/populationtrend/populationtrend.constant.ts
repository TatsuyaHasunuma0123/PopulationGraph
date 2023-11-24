import { AxiosRequestConfig } from "axios";

export const apikey = "gxL4rcE0zr51kKeS41ZNh0vMnECvPL9OU6gcEeQs";
export const prefectures_URL =
  "https://opendata.resas-portal.go.jp/api/v1/prefectures";

export const population_URL =
  "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?";

export const pageTitle: string = "年齢別総人口の推移";

export const nav_contents = [
  {
    showType: 0,
    name: "all",
    graphTitle: "総人口の推移",
  },
  {
    showType: 1,
    name: "0-14",
    graphTitle: "年少人口の推移",
  },
  {
    showType: 2,
    name: "15-64",
    graphTitle: "生産年齢人口の推移",
  },
  {
    showType: 3,
    name: "65-",
    graphTitle: "老年人口の推移",
  },
];

export const getPrefecturesOptions: AxiosRequestConfig = {
  url: `${prefectures_URL}`,
  method: "GET",
  headers: { "X-API-KEY": apikey },
};
