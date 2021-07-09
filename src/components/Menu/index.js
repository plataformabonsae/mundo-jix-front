import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useSpring, animated } from 'react-spring'

import { BASEURL } from "utils/api";

// import facebook from 'assets/components/Menu/facebook.svg'
// import linkedin from 'assets/components/Menu/linkedin.svg'
// import linkedin from 'assets/components/Menu/linkedin.svg'

import { Aside } from "./components/Aside";
import { Profile } from "./components/Profile";
import { Points } from "./components/Points";
import { Button } from "./components/Button";

import { dashboardFetch } from "services/dashboard";

// import styles from './styles.module.sass'

// TODO
// 1 - Animation on open e close aside
// 2 - social

const Menu = ({ active, className, user = { name: "", last_name: "" } }) => {
  // const location = useLocation();\
  const dispatch = useDispatch();
  const { data: type } = useSelector((state) => state.usertype);
  const { data: dashboard } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardFetch(type));
  }, [dispatch, type]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.paddingLeft = `${18}vw`;
    return () => (body.style.paddingLeft = 0);
  }, []);

  // const [ isOpen, setIsOpen ] = useState(false)
  // const [ props, set ] = useSpring(
  //     {
  //         width: !isOpen ? 4 : 20
  //     }
  // )

  return (
    <Aside
      // style={{ width: `${props.width}vw` }}
      // style={ props }
      // onMouseEnter={() => setIsOpen( true )}
      // onMouseLeave={() => setIsOpen( false )}
      className={className}
    >
      <Profile
        image={`${
          (user?.file || user?.data?.file) &&
          BASEURL + (user.file || user.data.file)
        }`}
        name={user?.name || user?.data?.name}
        lastName={user?.last_name || user?.data?.last_name}
        location={8}
      />

      {type === "talento" && (
        <>
          <Points points={dashboard?.finished_challenges?.points} />

          <Button to={`/dashboard`} dashboard>
            Dashboard
          </Button>
          <Button to={`/meus-desafios`} meusDesafios>
            Meus desafios
          </Button>
          <Button to={`/desafios`} desafios>
            Desafios
          </Button>
          <Button to={`/perfil`} perfil>
            Perfil
          </Button>
          <Button to={`/auth/${type}/logout`} sair>
            Sair
          </Button>
        </>
      )}
      {type === "empresa" && (
        <>
          <Button to={`/dashboard/`} dashboard>
            Dashboard
          </Button>
          <Button to={`/meus-desafios/`} meusDesafios>
            Meus desafios
          </Button>
          <Button to={`/perfil/pessoal`} perfil>
            Perfil
          </Button>
          <Button to={`/auth/${type}/logout`} sair>
            Sair
          </Button>
        </>
      )}
      {(type === "jurado" || type === "mentor") && (
        <>
          <Button to={`/meus-desafios/`} meusDesafios>
            Meus desafios
          </Button>
          <Button to={`/auth/${type}/logout`} sair>
            Sair
          </Button>
        </>
      )}
    </Aside>
  );
};

export { Menu };
