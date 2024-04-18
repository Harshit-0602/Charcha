import "./app.css";
import { Chat } from "../src/Chat/Chat";
import { Start } from "../src/Start/Start";
import axios from "axios";
import { useState, useEffect } from "react";
import { LoginPage } from "./Login/login";
import { Spinner } from "./Spinner/spinner";
import { socketConnect } from "./Socket/socket.connection.js";
const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [chats, setChats] = useState([]);
  const [receiver, setReceiver] = useState();

  const loadChat = (user) => {
    if (!user) {
      user = currentUser;
    }
    axios
      .get(`/user/chat/fetch/${currentUser?.email}/${user?.email}`)
      .then((res) => {
        // console.log(res.data.chats);
        setChats(res.data.chats);
        setReceiver(user);
      })
      .catch((err) => {
        console.log("oppppsssssss : "+err);
      });
  };

  useEffect(() => {
    axios
      .get("/user/fetchUsers")
      .then((res) => {
        setAllUsers(res.data.users);
          setCurrentUser(res.data.currentUser);
          // setReceiver(res.data.currentUser);
        // console.log(currentUser);
        
      })
      .catch((err) => {
        console.log("Error occurred while Fetching users .... : " + err);
      });
      socketConnect();
  }, []);
    
  return (
    <div className="mainDiv">
      <div className="startColumn">
        <Start
          allUsers={allUsers}
          currentUser={currentUser}
          loadChat={loadChat}
          setCurrentUser={setCurrentUser}
        />
      </div>
      <div className="chatColumn">
        <Chat
          currentUser={currentUser}
          receiver={receiver}
          initialChats={chats}
        />
      </div>
    </div>
  );
}


export { App };