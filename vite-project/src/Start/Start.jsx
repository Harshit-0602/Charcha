import "./Start.css";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { Users } from "../Components/users";

const Start = () => {
  return (
    <div className="container1">
      <div>
        <Nav />
      </div>
      <Search />
      <Users />
    </div>
  );
};

export { Start };
