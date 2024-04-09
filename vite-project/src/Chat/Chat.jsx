import "./chat.css";
import { Msg } from "../Components/Msg";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { User, Users } from "../Components/users";

const MyText = ({msg,time}) => {
  return (
    <>
      <div className="my-msg">
        <div className="text">
          <span>
            {msg}
          </span>
          <br></br>
          <span>
            {time}
          </span>
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
  console.log(typeof chats); // Logs: 'object'
  console.log(chats); // Logs: []

  // Check if chats is an array using Array.isArray()
  const isChatsArray = Array.isArray(chats);
  console.log(isChatsArray); // Logs: true or false
  return (
    <>
      <div className="container">
        <div className="top">
          <Nav user={receiver ? receiver : currentUser} />
        </div>
        <div className="talk">
          {chats.length === 0 || !isChatsArray? (
            <div className="no-chats-message">
              <h1>No messages to display</h1>
            </div>
          ) : (
            chats.map((chat) =>
              chat.senderName === currentUser.username ? (
                <MyText key={chat.id} msg={chat.msg} time={chat.time} />
              ) : (
                <UrText key={chat.id} msg={chat.msg} time={chat.time} />
              )
            )
          )}
        </div>
        <div className="bottom">
          <Msg />
        </div>
      </div>
    </>
  );
};

export { Chat };
