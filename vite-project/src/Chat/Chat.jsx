import "./chat.css";
import { Msg } from "../Components/Msg";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { User, Users } from "../Components/users";
import { socket } from "../Socket/socket.connection.js";
import { useState, useEffect } from "react";

const Message = ({ msg, time, isMyMessage }) => {
  return (
    <>
      <div className={isMyMessage ? "my-msg" : "ur-msg"}>
        <div className="text">
          <span>{msg}</span>
          <br />
          <span>{time}</span>
        </div>
      </div>
    </>
  );
};

const Chat = ({ currentUser, receiver, initialChats = [] }) => {
  // console.log(initialChats);
  const [chats, setChats] = useState(initialChats);
  useEffect(() => {
    // Update chats when initialChats changes
    setChats(initialChats);
  }, [initialChats]);
  // console.log(chats);
  useEffect(() => {
    if (socket) {
      socket.on("display", (data) => {
        setChats((prevChats) => {
          if (Array.isArray(prevChats)) {
            return [...prevChats, data];
          } else {
            return [data];
          }
        });
      });

      return () => {
        socket.off("display");
      };
    }
  }, [socket]);


  return (
    <>
      <div className="container">
        <div className="top">
          <Nav user={receiver} />
        </div>
        <div className="talk">
          {/* <Message
            key={1}
            msg="HIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
            time={1}
            isMyMessage={true}
          /> */}
          {/* <Message
            key={1}
            msg="HIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
            time={1}
            isMyMessage={false}
          /> */}
          {!receiver ? (
            <div className="no-chats-message">
              <h1>Click on the user to start chatting ....</h1>
            </div>
          ) : !Array.isArray(chats) || chats.length === 0 ? (
            <div className="no-chats-message">
              <h1>No messages to display</h1>
            </div>
          ) : (
            chats.map((chat, index) => (
              <Message
                key={index}
                msg={chat.msg}
                time={chat.time}
                isMyMessage={chat.senderName === currentUser.username}
              />
            ))
          )}
        </div>
        <div className="bottom">
          <Msg currentUser={currentUser} user={receiver} />
        </div>
      </div>
    </>
  );
};

export { Chat };
