import axios from "axios";
import "./users.css";
import { useState } from "react";
import { Chat } from "../Chat/Chat";

const User = ({ user, loadChat }) => {
  
  return (
    <>
      <div className="user" onClick={() => {
        loadChat(user);
      }}>
        <div className="userPhoto"></div>
        <div className="username">
          <span>{user.username}</span>
        </div>
      </div>
    </>
  );
};

const Users = ({allUsers,loadChat}) => {
  
  return (
    <>
      <div className="users">
        {
          allUsers.map((user) => (
            <User key={user._id} user={user} loadChat={loadChat } />
          ))
        }
      </div>
    </>
  );
};

export { User, Users };
