import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { Menu } from "components/Menu";
import { Loading } from "components/Loading";
import { MenuMobile } from "components/MenuMobile";
import { Header } from "components/Header";
import { ToastContainer } from "react-toastify";

// import { useAuth } from 'utils/context/auth'

// import styles from "./styles.module.sass";

import { WindowSize } from "utils/etc";

// import { autoLogin } from 'services/login'

export const PrivateRouteContainer = ({ component: Component, ...rest }) => {
  // const location = useLocation();
  // const { data: usertype } = useSelector((state) => state.usertype);
  const { width } = WindowSize();
  const mobileOffset = window.localStorage.getItem("mobile_offset");
  const { data: user } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (
        // loading ? (
        //   <Loading />
        // ) : user ? (
        <>
          {!!width && width > 762 ? (
            <Menu user={user?.user ? user?.user : user?.data} />
          ) : (
            <MenuMobile user={user?.user ? user?.user : user?.data} />
          )}
          <Header user={user?.user ? user?.user : user?.data} />
          <Component {...props} />
          <ToastContainer />
          {!!width && width < 762 && (
            <div style={{ minHeight: mobileOffset + "px" }}></div>
          )}
        </>
        // ) : (
        //   <Redirect to={`/auth/talento/login`} />
      )}
    />
  );
};

// import React from "react";
// import { useSelector } from "react-redux";
// import { Route, Redirect, useLocation } from "react-router-dom";

// import { Menu } from "components/Menu";
// import { Header } from "components/Header";

// // import { useAuth } from 'utils/context/auth'

// // import { autoLogin } from 'services/login'

// export const PrivateRouteContainer = ({ component: Component, ...rest }) => {
//   const location = useLocation();
//   const { data: usertype } = useSelector((state) => state.usertype);
//   const { data: user } = useSelector((state) => state.user);
//   // console.log(user, loading)

//   // if (loading) {
//   //     return <div>carregando...</div>
//   // } else {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? (
//           <>
//             <Menu user={user} />
//             <Header user={user} />
//             <Component {...props} />
//           </>
//         ) : (
//           <Redirect
//             to={{
//               pathname: `/auth/${usertype}/logout`,
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };
