import React, { useEffect, useState } from "react";
import { Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "services/login";

// import history from "utils/history";

const Logout = ({ from }) => {
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const { type } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout()).then(() => setHasLoggedOut(true));
  }, [dispatch, location, type]);

  if (!hasLoggedOut) {
    return <Redirect to={`/auth/${type}/login`} />;
  }
};

export { Logout };
