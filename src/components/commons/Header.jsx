import { Typography } from "neetoui";
import { NavLink } from "react-router-dom";
import routes from "routes";

const Header = () => (
  <div className="flex items-center  ">
    <Typography className="px-2 font-bold " style="h2">
      <span className="text-blue-600">Cine </span>Searcher
    </Typography>
    <NavLink
      exact
      activeClassName="px-2 font-semibold text-blue-600"
      className="px-2 text-black"
      to={routes.root}
    >
      Home
    </NavLink>
    <NavLink
      exact
      activeClassName="px-2 font-semibold text-blue-500"
      className="px-2 text-black"
      to={routes.favourite}
    >
      Favourites
    </NavLink>
  </div>
);

export default Header;
