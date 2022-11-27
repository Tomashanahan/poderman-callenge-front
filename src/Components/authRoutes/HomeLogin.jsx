import {Outlet, Navigate} from "react-router-dom";

const HomeLogin = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      {userInfo === null ? (
        <>
          <Outlet />
        </>
      ) : userInfo.rol === "Admin" ? (
        <Navigate to="/admin/dashboard" />
      ) : (
        userInfo.rol === "User" && <Navigate to="/user" />
      )}
    </>
  );
};

export default HomeLogin;
