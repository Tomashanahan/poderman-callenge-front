import { Route, Routes } from "react-router-dom";
import Form from "./Components/Form/Form";
import Login from "./Components/Login/Login";
import HomeUser from "./Components/authUserRoutes/HomeUser";
import { Box } from '@chakra-ui/react';

function App() {
	return (
		<Box className="App">
			<Routes>
				<Route path="/user" element={<HomeUser />}>
					<Route path="form" element={<Form />} />
				</Route>
				<Route exact path="/" element={<Login />} />
				{/* <Route exact path="/form" element={<Form />} /> */}
			</Routes>
		</Box>
	);
}

export default App;
