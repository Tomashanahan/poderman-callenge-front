import {Route, Routes} from "react-router-dom";
import {Box} from "@chakra-ui/react";

import Login from "./Components/Login/Login";
import HomeUser from "./Components/authRoutes/HomeUser";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import HomeAdmin from "./Components/authRoutes/HomeAdmin";
import Register from "./Components/Register/Register";
import HomeLogin from "./Components/authRoutes/HomeLogin";
import UserHome from "./Components/User/UserHome";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Box className="App">
      <Routes>
        <Route exact element={<HomeLogin />} path="/">
          <Route exact element={<Login />} path="login" />
          <Route exact element={<Register />} path="register" />
        </Route>
        <Route exact element={<HomeAdmin />} path="/admin">
          <Route
            element={
              <>
                <Header />
                <AdminDashboard />
              </>
            }
            path="dashboard"
          />
        </Route>
        <Route exact element={<HomeUser />} path="/user">
          <Route
            element={
              <>
                <Header />
                <UserHome />
              </>
            }
            path=""
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
