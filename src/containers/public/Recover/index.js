import React from "react";

import Type from "./Type";
import { useParams } from "react-router-dom";

const Recover = () => {
  let { action, type } = useParams();

  return <Type type={type} action={action} />;
};

export { Recover };
