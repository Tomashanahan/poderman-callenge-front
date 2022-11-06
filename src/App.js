import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Form from "./Components/Form/Form";
import Login from "./Components/Login/Login";
import HomeUser from "./Components/authRoutes/HomeUser";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import HomeAdmin from "./Components/authRoutes/HomeAdmin";

function App() {
	return (
		<Box className="App">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/admin" element={<HomeAdmin />}>
					<Route path="dashboard" element={<AdminDashboard />} />
				</Route>
				<Route exact path="/user" element={<HomeUser />}>
					<Route path="form" element={<Form />} />
				</Route>
			</Routes>
		</Box>
	);
}

export default App;
