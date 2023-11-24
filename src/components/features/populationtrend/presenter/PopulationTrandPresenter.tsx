import { Prefecture } from "../populationtrend.type";

type Props = {
  prefectures: Prefecture[];
  isPrefectureLoading: boolean;
  isPopulationLoading: boolean;
  handleCheckChange: (prefCode: number) => void;
};

export default function PopulationTrandPresenter({
  prefectures,
  isPrefectureLoading,
  isPopulationLoading,
  handleCheckChange,
}: Props) {
  return isPrefectureLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="flex justify-center">
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-3 mt-5 rounded-lg gap-1 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] lg:grid-cols-8  md:grid-cols-5 dark:bg-neutral-700">
          {prefectures.map((prefecture) => (
            <div key={prefecture.prefCode} className="items-center pl-3 flex">
              <input
                id={String(prefecture.prefCode)}
                type="checkbox"
                onChange={() => handleCheckChange(prefecture.prefCode - 1)}
                disabled={isPopulationLoading}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded duration-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              ></input>
              <label
                htmlFor={String(prefecture.prefCode)}
                className="lg:py-3 md:py-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-gray-600 hover:underline hover:duration-100"
              >
                {prefecture.prefName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
