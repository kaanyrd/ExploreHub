import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoot from "./pages/Root/MainRoot";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Favs from "./pages/Favs/Favs";
import MyProfile from "./pages/Profiles/MyProfile";
import OtherProfile from "./pages/Profiles/OtherProfile";
import Places from "./pages/Places/Places";
import PlaceDetail from "./pages/Places/PlaceDetail";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import AddPlace from "./pages/Places/AddPlace";
import ChangePassword from "./pages/Authentication/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "places",
        children: [
          {
            index: true,
            element: <Places />,
          },
          {
            path: ":placesId",
            element: <PlaceDetail />,
          },
        ],
      },
      {
        path: "addplace",
        element: <AddPlace />,
      },
      {
        path: "favs",
        element: <Favs />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
        path: "otherprofile",
        element: <OtherProfile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "changepassword",
        element: <ChangePassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
