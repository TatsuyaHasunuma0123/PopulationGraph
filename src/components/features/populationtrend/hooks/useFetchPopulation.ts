import axios, { AxiosError, AxiosResponse } from "axios";
import { apikey, population_URL } from "../populationtrend.constant";
import {
  HighChartSeries,
  NavContent,
  PopulationAPIResponse,
  Prefecture,
} from "../populationtrend.type";

export const fetchPopulation = async (
  setHighChartSeries: React.Dispatch<React.SetStateAction<HighChartSeries[]>>,
  setIsPopulationLoading: React.Dispatch<React.SetStateAction<boolean>>,
  prefCode: number,
  graphType: NavContent,
  prefectures: Prefecture[],
  highChartSeries: HighChartSeries[]
) => {
  setIsPopulationLoading(true);
  axios
    .get(population_URL, {
      headers: { "X-API-KEY": apikey },
      params: { cityCode: "-", prefCode: prefCode },
    })
    .then((res: AxiosResponse<PopulationAPIResponse>) => {
      const { data } = res;
      const all_data = data.result.data;
      const population_data = data.result.data[graphType.showType].data.map(
        (population) => {
          return population.value;
        }
      );

      console.log(all_data);

      const new_series = {
        code: prefCode,
        name: prefectures[prefCode].prefName,
        all_data: all_data,
        data: population_data,
      };

      setHighChartSeries([...highChartSeries, new_series]);

      setIsPopulationLoading(false);
    })
    .catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message);
    });
};
