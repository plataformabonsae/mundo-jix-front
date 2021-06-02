import React, {
  useEffect,
  // useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useRoutes } from 'hookrouter'
import { Routes } from "routes";
import "./App.css";

// import {
//   // Link,
//   // useLocation,
//   useHistory,
// } from "react-router-dom";

import { Loading } from "components/Loading";

// import history from 'utils/history'

import { store } from "store/configureStore";
import { autoLogin } from "services/login";
// import { useAuth } from 'utils/context/auth'

import history from "utils/history";

import { Creators as UserActions } from "store/ducks/User";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(autoLogin())
      .then(() => console.log("autologin succeeded"))
      .catch((err) => {
        console.log(err);
        dispatch(UserActions.logoutSuccess());
        history.push("/");
      });
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <Routes />
    </>
  );
};

export default App;
