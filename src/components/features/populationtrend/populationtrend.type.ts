export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefectureAPIResponse = {
  message: null;
  result: Prefecture[];
};

type Population = {
  yaer: number;
  value: number;
};

type PopulationData = {
  label: string;
  data: Population[];
};

export type PopulationAPIResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: PopulationData[];
  };
};

export type HighChartSeries = {
  code: number;
  name: string;
  all_data: PopulationData[];
  data: number[];
};

export type NavContent = {
  showType: number;
  name: string;
  graphTitle: string;
};
