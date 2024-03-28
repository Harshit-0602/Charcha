import "./Start.css";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { Users } from "../Components/users";

const Start = ({allUsers}) => {
  return (
    <div className="container1">
      <div>
        <Nav />
      </div>
      <Search />
      <Users allUsers={allUsers} />
    </div>
  );
};

export { Start };
