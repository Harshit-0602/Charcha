import "./chat.css";
import { Msg } from "../Components/Msg";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { User, Users } from "../Components/users";

const MyText = () => {
  return (
    <>
      <div className="my-msg">
        <div className="text">
          <span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nam
            minus repellendus fugit neque dolorem blanditiis magnam ipsum
            reiciendis mollitia animi cupiditate consectetur, quaerat voluptates
            cum, quos incidunt. Tempore, aperiam!
          </span>
        </div>
      </div>
    </>
  );
};

const UrText = () => {
  return (
    <>
      <div className="ur-msg">
        <div className="text">
          <span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nam
            minus repellendus fugit neque dolorem blanditiis magnam ipsum
            reiciendis mollitia animi cupiditate consectetur, quaerat voluptates
            cum, quos incidunt. Tempore, aperiam!
          </span>
        </div>
      </div>
    </>
  );
};

const Chat = ({currentUser,receiver,chats}) => {
  return (
    <>
      <div className="container">
        <div className="top">
          <Nav user={receiver?receiver:currentUser} />
        </div>
        <div className="talk">
          <MyText />
          <UrText />
          <MyText />
          <UrText />
          <MyText />
          <UrText />
          <MyText />
          <UrText />
          <MyText />
          <UrText />
          <MyText />
          <UrText />
          <MyText />
          <UrText />
          <MyText />
          <UrText />
        </div>
        <div className="bottom">
          <Msg />
        </div>
      </div>
    </>
  );
};
export { Chat };
