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

// import { store } from "store/configureStore";
import { autoLogin } from "services/login";
// import { useAuth } from 'utils/context/auth'

import history from "utils/history";

import { Creators as UserActions } from "store/ducks/User";

const App = () => {
  const dispatch = useDispatch();
  const { data: user, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(autoLogin());
    // .then(() => {

    // })
    // .catch((err) => {
    //   // console.log(err);
    //   dispatch(UserActions.logoutSuccess());
    //   // history.push("/auth/mentor/login");
    // });
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (user?.user?.is_mentor || user?.user?.is_judge) {
        window.location.pathname.split("/")[1] === "auth" &&
          history.push("/meus-desafios");
      } else {
        window.location.pathname.split("/")[1] === "auth" &&
          history.push("/dashboard");
      }
    } else if (error) {
      dispatch(UserActions.logoutSuccess());
    }
  }, [dispatch, user, error]);

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <Routes />
    </>
  );
};

export default App;
