import { useSetRecoilState } from "recoil";
import NavBarPresenter from "../presenter/NavBarPresenter";
import { graphType } from "../actions";
import { nav_contents, pageTitle } from "../populationtrend.constant";

export default function NavBarContainer() {
  const setGraphType = useSetRecoilState(graphType);

  const onNavClick = (showType: number) => {
    setGraphType(showType);
  };

  return (
    <NavBarPresenter
      pageTitle={pageTitle}
      nav_contents={nav_contents}
      onNavClick={onNavClick}
    />
  );
}
