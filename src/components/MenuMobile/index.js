import React, {
  // useState
  useEffect,
  // useState,
} from "react";
// import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useSpring, animated } from 'react-spring'

// import { BASEURL } from "utils/api";

// import facebook from 'assets/components/Menu/facebook.svg'
// import linkedin from 'assets/components/Menu/linkedin.svg'
// import linkedin from 'assets/components/Menu/linkedin.svg'

import { Button } from "./components/Button";

import styles from "./styles.module.sass";

// TODO
// 1 - Animation on open e close aside
// 2 - social

const MenuMobile = ({
  active,
  className,
  user = { name: "", last_name: "" },
}) => {
  // const location = useLocation();
  let { data: type } = useSelector((state) => state.usertype);

  // const [ height, setHeigth ] = useState(false)
  // const [ props, set ] = useSpring(
  //     {
  //         width: !isOpen ? 4 : 20
  //     }
  // )

  // useState(() => {
  //   document.getElementById('menu')?.clientHeight &&
  //   setHeigth(document.getElementById('menu').clientHeight)
  //   console.log(height, 'height')
  // }, [document.getElementById('menu').clientHeight, height])

  useEffect(() => {
    const offset = document.getElementById("menu").clientHeight;
    window.localStorage.setItem("mobile_offset", offset);
    // return () => (body.style.paddingBottom = 0);
  }, []);

  return (
    <>
      <nav
        id="menu"
        // style={{ width: `${props.width}vw` }}
        // style={ props }
        // onMouseEnter={() => setIsOpen( true )}
        // onMouseLeave={() => setIsOpen( false )}
        className={styles.nav}
      >
        {type === "talento" && (
          <>
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
            {/* <Button to={`/auth/${type}/logout`} sair>
            Sair
          </Button> */}
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
            <Button to={`/auth/${type}/logout`} sair>
              Sair
            </Button>
          </>
        )}
      </nav>
      {/* <div style={{height: 120, position: 'relative'}}></div> */}
    </>
  );
};

export { MenuMobile };
