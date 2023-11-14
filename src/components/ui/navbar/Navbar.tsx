type NavbarConttents = {
  title: string;
  navbarMenus: string[];
};

export default function NavberTitle({ title, navbarMenus }: NavbarConttents) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{title}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navbarMenus.map((navbarMenu) => (
            <li>{navbarMenu}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
