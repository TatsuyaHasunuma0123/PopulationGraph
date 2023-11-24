import { useEffect, useState } from "react";
import { HighChartSeries, Prefecture } from "../populationtrend.type";
import { fetchPrefecturesOnMount } from "../hooks/useFetchPrefectures";
import PopulationTrandPresenter from "../presenter/PopulationTrandPresenter";
import { fetchPopulation } from "../hooks/useFetchPopulation";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { deletePopulation } from "../hooks/useDeletePopulation";
import { useRecoilValue } from "recoil";
import { graphType } from "../actions";
import { nav_contents } from "../populationtrend.constant";
import { changePopulation } from "../hooks/useChangePopulation";

export default function PopulationTrendContainer() {
  const [isPrefectureLoading, setIsPrefectureLoading] =
    useState<boolean>(false);
  const [isPopulationLoading, setIsPopulationLoading] =
    useState<boolean>(false);
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<boolean[]>(
    Array(47).fill(false)
  );
  const [highChartSeries, setHighChartSeries] = useState<HighChartSeries[]>([]);
  const graph = useRecoilValue(graphType);

  useEffect(() => {
    fetchPrefecturesOnMount(setPrefectures, setIsPrefectureLoading);
  }, []);

  useEffect(() => {
    changePopulation(
      selectedPrefectures,
      highChartSeries,
      nav_contents,
      graph,
      setHighChartSeries
    );
  }, [graph]);

  const handleCheckChange = (prefCode: number) => {
    selectedPrefectures[prefCode] = !selectedPrefectures[prefCode];
    setSelectedPrefectures(selectedPrefectures);

    if (selectedPrefectures[prefCode]) {
      fetchPopulation(
        setHighChartSeries,
        setIsPopulationLoading,
        prefCode,
        nav_contents[graph],
        prefectures,
        highChartSeries
      );
    } else {
      deletePopulation(
        highChartSeries,
        prefectures,
        prefCode,
        setHighChartSeries
      );
    }
  };

  const graphOptions = {
    chart: {
      backgroundColor: "#f4f4f5",
    },
    title: {
      text: nav_contents[graph].graphTitle,
    },
    subtitle: {
      text:
        "reference: " +
        '<a href="https://opendata.resas-portal.go.jp/" ' +
        'target="_blank">RESAS API</a>',
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
        pointStart: 1960,
      },
    },
    series: [],
    accessibility: {
      enabled: false,
    },
  };

  return (
    <>
      <PopulationTrandPresenter
        prefectures={prefectures}
        isPrefectureLoading={isPrefectureLoading}
        isPopulationLoading={isPopulationLoading}
        handleCheckChange={handleCheckChange}
      />
      <div className="mt-10 containere mx-auto rounded-lg w-11/12">
        <HighchartsReact highcharts={Highcharts} options={graphOptions} />
      </div>
    </>
  );
}
