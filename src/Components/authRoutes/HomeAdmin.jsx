import { Outlet, Navigate } from "react-router-dom";

const HomeAdmin = () => {
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	return (
		<>
			{userInfo !== null && userInfo.team === "Admin" ? (
				<Outlet />
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

export default HomeAdmin;
