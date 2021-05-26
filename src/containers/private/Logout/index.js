import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Loading } from "components/Loading";

import { logout } from "services/login";

// import history from "utils/history";

const Logout = ({ from }) => {
  // const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const { type } = useParams();
  // const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
      // .then(() => setHasLoggedOut(true))
      .then((res) => history.push(`/auth/${type}/login`))
      .catch((err) => new Error(err));
  }, [dispatch, history, type]);

  return <Loading full>Deslogando, aguarde...</Loading>;
};

export { Logout };
