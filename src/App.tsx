import { RecoilRoot } from "recoil";
import PopulationTrendContainer from "./components/features/populationtrend/container/PopulationTrendContainer";
import NavBarContainer from "./components/features/populationtrend/container/NavBarContainer";

function App() {
  return (
    <RecoilRoot>
      <NavBarContainer />
      <PopulationTrendContainer />
    </RecoilRoot>
  );
}

export default App;
