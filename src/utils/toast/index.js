import React from "react";
import { toast, ToastContainer } from "react-toastify";

const position = toast.POSITION.BOTTOM_RIGHT;

const Success = (props) => {
  toast.success(props.message, {
    position,
  });
  return <ToastContainer />;
};

const Error = (props) => {
  toast.error(props.message, {
    position,
  });
  return <ToastContainer />;
};

export { Success, Error };
