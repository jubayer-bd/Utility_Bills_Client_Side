import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgetPassword";
import Bills from "../pages/Bills/Bills";
import BillDetails from "../pages/Bills/BillsDetails";
import PrivateRoute from "./PrivateRoutes";
import MyPayBills from "../pages/MyPayBills/MyPayBills";
import AddBills from "../pages/Bills/AddBills";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "bills",
        element: <Bills />,
      },
      {
        path: "bills/:id",
        element: (
          <PrivateRoute>
            {" "}
            <BillDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-bill",
        element: <AddBills />,
      },
      {
        path: "my-bills",
        element: (
          <PrivateRoute>
            <MyPayBills />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
     
    ],
  },
]);
