import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/Home";
// import Navbar from "../page/Navbar/Navbar";
import App from "../App"


const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [{
            path: "/",
            element: <Home/>,
        }],
    }
]);

export default router;