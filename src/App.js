import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "routes";
import "./App.css";

import { Loading } from "components/Loading";

import { autoLogin } from "services/login";

import history from "utils/history";

import { Creators as UserActions } from "store/ducks/User";

const App = () => {
  const dispatch = useDispatch();
  const { data: user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(autoLogin())
  //     .then(() => {
  //       if (user?.user?.is_mentor || user?.user?.is_judge) {
  //         window.location.pathname.split("/")[1] === "auth" &&
  //           history.push("/meus-desafios");
  //       } else {
  //         window.location.pathname.split("/")[1] === "auth" &&
  //           history.push("/dashboard");
  //       }
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       dispatch(UserActions.logoutSuccess());
  //       // history.push("/auth/mentor/login");
  //     });
  // }, [dispatch]);

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
      {/* {loading && <Loading />} */}
      <Routes />
    </>
  );
};

export default App;
