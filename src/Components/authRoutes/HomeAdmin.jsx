import {Outlet, Navigate} from "react-router-dom";

const HomeAdmin = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>{userInfo !== null && userInfo.rol === "Admin" ? <Outlet /> : <Navigate to="/login" />}</>
  );
};

export default HomeAdmin;
