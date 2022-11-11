import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Login from "./Components/Login/Login";
import HomeUser from "./Components/authRoutes/HomeUser";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import HomeAdmin from "./Components/authRoutes/HomeAdmin";
import Register from "./Components/Register/Register";
import HomeLogin from "./Components/authRoutes/HomeLogin";
import UserHome from './Components/User/UserHome';

function App() {
	return (
		<Box className="App">
			<Routes>
				<Route exact path="/" element={<HomeLogin />}>
					<Route exact path="login" element={<Login />} />
					<Route exact path="register" element={<Register />} />
				</Route>
				<Route exact path="/admin" element={<HomeAdmin />}>
					<Route path="dashboard" element={<AdminDashboard />} />
				</Route>
				<Route exact path="/user" element={<HomeUser />}>
					<Route path="" element={<UserHome />} />
				</Route>
			</Routes>
		</Box>
	);
}

export default App;
