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
import About from "../pages/About/About";
import Profile from "../pages/Profile/Profile";
import ErrorPage from "../pages/Error/NotFound";
import SavingsTips from "../pages/Savings/SavingsTips";
import DashboardLayout from "../layout/DashBoardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        element: <BillDetails />,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "about",

        element: <About />,
      },
      {
        path: "savings-tips",
        element: <SavingsTips />,
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <div>DashBoard Overview</div>,
      },
      {
        path: "add-bill",
        element: <AddBills />,
      },
      {
        path: "my-bills",
        element: <MyPayBills />,
      },
      // Placeholders for the other sidebar links
      {
        path: "analytics",
        element: <div>Analytics Coming Soon</div>,
      },
      {
        path: "settings",
        element: <div>Settings Coming Soon</div>,
      },
    ],
  },
]);
