import { NavContent } from "../populationtrend.type";

type Props = {
  pageTitle: string;
  nav_contents: NavContent[];
  onNavClick: (showType: number) => void;
};

export default function NavBarPresenter({
  pageTitle,
  nav_contents,
  onNavClick,
}: Props) {
  return (
    <header className="text-gray-700 bg-blue-400">
      <div className="container flex mx-auto p-5 flex-col md:flex-row items-center">
        <p className="font-medium text-xl text-white cursor-pointer">
          <span>{pageTitle}</span>
        </p>

        <nav className="flex md:ml-auto text-base text-gray-600">
          {nav_contents.map((nav_content) => (
            <div key={nav_content.showType}>
              <p
                className="mr-5 text-gray-600 hover:text-white duration-300 cursor-pointer"
                onClick={() => onNavClick(nav_content.showType)}
              >
                {nav_content.name}
              </p>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
