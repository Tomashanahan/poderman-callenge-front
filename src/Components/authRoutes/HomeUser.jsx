import {Outlet, Navigate} from "react-router-dom";

const HomeUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = JSON.parse(localStorage.getItem("token"));

  return <>{userInfo !== null || token !== null ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default HomeUser;
