import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import loginImg from "../images/Street Workout.webp";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {
  // const { token } = useSelector((state) => state.user);

  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/admin" />;
  }

  console.log(token);
  return (
    <div id="guestLayout">
      <Outlet className="child" />
      <div className="login-image">
        <div className="brand">CaliFit</div>
        <img src={loginImg} alt="login-image" />
      </div>
    </div>
  );
};

export default GuestLayout;
