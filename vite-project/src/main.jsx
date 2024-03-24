import "./main.css";
import React from "react";
import ReactDOM from "react-dom";
import { Chat } from "../src/Chat/Chat";
import { Start } from "../src/Start/Start";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="mainDiv">
      <div className="startColumn">
        <Start />
      </div>
      <div className="chatColumn">
        <Chat />
      </div>
    </div>
  </React.StrictMode>
);

