import { HighChartSeries, Prefecture } from "../populationtrend.type";

export const deletePopulation = (
  highChartSeries: HighChartSeries[],
  prefectures: Prefecture[],
  prefCode: number,
  setHighChartSeries: React.Dispatch<React.SetStateAction<HighChartSeries[]>>
) => {
  highChartSeries.forEach((item, index) => {
    if (item.name === prefectures[prefCode].prefName) {
      highChartSeries.splice(index, 1);
      return index;
    }
  });
  const after_del_series = structuredClone(highChartSeries);
  setHighChartSeries(after_del_series);
};
