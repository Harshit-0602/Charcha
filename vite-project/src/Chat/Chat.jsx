import "./chat.css";
import { Msg } from "../Components/Msg";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { User, Users } from "../Components/users";

const MyText = ({ msg, time }) => {
  return (
    <>
      <div className="my-msg">
        <div className="text">
          <span>{msg}</span>
          <br></br>
          <span>{time}</span>
        </div>
      </div>
    </>
  );
};

const UrText = ({ msg, time }) => {
  return (
    <>
      <div className="ur-msg">
        <div className="text">
          <span>{msg}</span>
          <br></br>
          <span>{time}</span>
        </div>
      </div>
    </>
  );
};

const Chat = ({ currentUser, receiver, chats = [] }) => {
   // Logs: []

  // Check if chats is an array using Array.isArray()
  const isChatsArray = Array.isArray(chats);
 // Logs: true or false
  return (
    <>
      <div className="container">
        <div className="top">
          <Nav user={receiver} />
        </div>
        <div className="talk">
          {!receiver ? (
            <div className="no-chats-message">
              <h1>Click on the user to start chatting ....</h1>
            </div>
          ) : chats.length === 0 || !isChatsArray ? (
            <div className="no-chats-message">
              <h1>No messages to display</h1>
            </div>
          ) : (
            chats.map((chat) =>
              chat.senderName === currentUser.username ? (
                <MyText key={chat._id} msg={chat.msg} time={chat.time} />
              ) : (
                <UrText key={chat._id} msg={chat.msg} time={chat.time} />
              )
            )
          )}
          ;
        </div>
        <div className="bottom">
          <Msg />
        </div>
      </div>
    </>
  );
};

export { Chat };
