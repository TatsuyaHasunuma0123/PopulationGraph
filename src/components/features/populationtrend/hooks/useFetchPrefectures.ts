const apikey = process.env.REACT_APP_RESAS_KEY;

export const fetchPrefecturesOnMount = async (setPrefecture, setIsLoading) => {
  const prefectures_URL =
    "https://opendata.resas-portal.go.jp/api/v1/prefectures";

  try {
    const response = await fetch(prefectures_URL, {
      headers: { "X-API-KEY": apikey },
    });
    const data = await response.json();
    setPrefecture(data.result);
  } catch (error) {
    console.error("Error fetching data : ", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
