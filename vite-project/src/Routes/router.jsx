import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../Login/login";
import { App } from "../app";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
        {
            path: "",
            element: <LoginPage check={false} />,
        },
        {
            path: "login",
            element: <LoginPage check={true} />,
        },
        {
            path: "home",
            element: <App />,
        },
        ],
    },
]);

export { router };
