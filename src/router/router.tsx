import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/Home";
// import Navbar from "../page/Navbar/Navbar";
import App from "../App";
import { Product } from "../page/Product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/products",
        element:<Product/>
      }
    ],
  },
]);

export default router;
