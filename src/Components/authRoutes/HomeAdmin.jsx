import { Outlet, Navigate } from "react-router-dom";

const HomeAdmin = () => {
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	// const token = JSON.parse(localStorage.getItem("token"));

	return (
		<>
			{userInfo !== null && userInfo.team === "Admin" ? (
				<main className="conteiner mx-auto mt-20">
					<Outlet />
				</main>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

export default HomeAdmin;
