import axios, { AxiosError, AxiosResponse } from "axios";
import { Prefecture, PrefectureAPIResponse } from "../populationtrend.type";
import { getPrefecturesOptions } from "../populationtrend.constant";

export const fetchPrefecturesOnMount = async (
  setPrefecture: React.Dispatch<React.SetStateAction<Prefecture[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  axios(getPrefecturesOptions)
    .then((res: AxiosResponse<PrefectureAPIResponse>) => {
      const { data } = res;
      setPrefecture(data.result);
      setIsLoading(false);
    })
    .catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message);
    });
};
