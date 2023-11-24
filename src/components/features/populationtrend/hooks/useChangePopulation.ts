import { HighChartSeries, NavContent } from "../populationtrend.type";

export const changePopulation = (
  selectedPrefectures: boolean[],
  highChartSeries: HighChartSeries[],
  nav_contents: NavContent[],
  graph: number,
  setHighChartSeries: React.Dispatch<React.SetStateAction<HighChartSeries[]>>
) => {
  selectedPrefectures.forEach((isSelected, prefCode) => {
    if (isSelected) {
      for (var i = 0; i < highChartSeries.length; i++) {
        if (highChartSeries[i].code === prefCode) {
          const new_population = highChartSeries[i].all_data[
            nav_contents[graph].showType
          ].data.map((item) => {
            return item.value;
          });
          highChartSeries[i].data = new_population;
        }
      }
    }
    const del_series = structuredClone(highChartSeries);
    setHighChartSeries(del_series);
  });
};
