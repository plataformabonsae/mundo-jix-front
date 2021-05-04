import React from "react";
import { useParams } from "react-router-dom";

import Type from "./Type";
import { Judges } from "./components/Judges";
import { Recover } from "./components/Recover";

const Auth = () => {
  let { action, type } = useParams();

  if (type === "mentor" || type === "jurado") {
    return <Judges type={type} action={action} />;
  } else if (action === "recuperar") {
    return <Recover type={type} action={action} />;
  } else {
    return <Type type={type} action={action} />;
  }
};

export default Auth;
