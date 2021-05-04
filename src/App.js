import React, {
  useEffect,
  // useState
} from "react";
import {
  useDispatch,
  // useSelector,
} from "react-redux";
// import { useLocation } from 'react-router-dom'

// import { useRoutes } from 'hookrouter'
import { Routes } from "routes";
import "./App.css";

// import { useLocation } from 'react-router'

// import history from 'utils/history'

// import { store } from 'store/configureStore'
import { autoLogin } from "services/login";
// import { useAuth } from 'utils/context/auth'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return <Routes />;
};

export default App;
