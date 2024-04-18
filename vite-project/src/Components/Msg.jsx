import { useState } from "react";
import "./Msg.css";
import axios from "axios";
import { socket } from "../Socket/socket.connection";

const Msg = ({ currentUser, user }) => {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if needed
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if needed
    const time = `${hours}:${minutes}`;

    return time;
  };
  const [message, setMessage] = useState("");
  const send = (msg) => {
    socket.emit("Send",{msg,room:currentUser.chattedUsers[user._id],sender:currentUser,time:getCurrentTime()});
  }
  return (
    <div className="msg">
      <div className="inputText">
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <button type="sumbit" className="send btn" onClick={() => {
          send(message);
          axios.post(`/user/chat/send/${currentUser?.email}/${user?.email}`, { text: message })
            .then((res) => {
              console.log("Saved in DataBase : "+res.data);
            })
            .catch((err) => {
              console.log("Error Occurred while saving new msg in database"+err);
            });
          setMessage("");
        }}>
          <img src="send-message-new.png" alt="" />
        </button>
        <button type="file" className="file btn">
          <img src="file2.png" alt="" />
        </button>
      </div>
    </div>
  );
};
export { Msg };
