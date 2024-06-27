import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/pages/homepage/Homepage";
import Login from "./components/pages/login/Login";
import Registration from "./components/pages/registration/Registration";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function setAuth(bool) {
    setIsAuthenticated(bool);
  }

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Homepage
          isAuthenticated={isAuthenticated}
          setAuth={setAuth}
        ></Homepage>
      ),
    },
    {
      path: "/login",
      element: !isAuthenticated ? (
        <Login setAuth={setAuth}></Login>
      ) : (
        <Navigate to="/" replace={true}></Navigate>
      ),
    },
    {
      path: "/register",
      element: !isAuthenticated ? (
        <Registration setAuth={setAuth}></Registration>
      ) : (
        <Navigate to="/" replace={true}></Navigate>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
