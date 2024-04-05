import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Chat } from "../src/Chat/Chat";
import { Start } from "../src/Start/Start";
import axios from "axios";
import { useState, useEffect } from "react";
import { LoginPage } from "./Login/login";
function App() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/user/fetchUsers")
      .then((res) => {
        setAllUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log("Error occurred while Fetching users .... : " + err);
      });
  }, []);

  return (
    <div className="mainDiv">
      <div className="startColumn">
        <Start allUsers={allUsers} />
      </div>
      <div className="chatColumn">
        <Chat allUsers={allUsers} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App/>
  // <LoginPage />
);
