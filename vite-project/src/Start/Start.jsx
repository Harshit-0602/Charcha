import "./Start.css";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { Users } from "../Components/users";

const Start = ({ allUsers, currentUser, loadChat, setCurrentUser }) => {
  // console.log(currentUser);
  return (
    <div className="container1">
      <div>
        <Nav user={currentUser} />
      </div>
      <Search />
      <Users
        allUsers={allUsers}
        loadChat={loadChat}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

export { Start };
