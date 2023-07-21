import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../pages/Signup/Signup";

const routes = createBrowserRouter([
{
path: '/',
element: <App />,
},
{
    path: '/signup',
    element: <Signup />,
  },
])

    export default routes