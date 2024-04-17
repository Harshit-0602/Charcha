import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Chat } from "../src/Chat/Chat";
import { Start } from "../src/Start/Start";
import axios from "axios";
import { useState, useEffect } from "react";
import { LoginPage } from "./Login/login";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { Spinner } from "./Spinner/spinner";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <App/>
  <RouterProvider router={router}/>
    // <Spinner />
  // <LoginPage />
);
