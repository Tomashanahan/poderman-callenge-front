import { useState } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	useColorModeValue,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const navigation = useNavigate();
	const [inputValues, setInputValues] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (inputValues.email === "" || inputValues.password === "") return;

			const info = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/login`,
				{
					email: inputValues.email,
					password: inputValues.password,
				}
			);
			localStorage.setItem("userInfo", JSON.stringify(info.data));
			localStorage.setItem("token", JSON.stringify(info.data.token));

			if (info.data.team === "Admin") {
				navigation("/admin/dashboard");
			} else if (
				info.data.team === "Microinformatica" ||
				info.data.team === "Telecomunicaciones"
			) {
				navigation("/user");
			}
		} catch (error) {
			console.log("error:", error);
		}
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} w={"500px"} py={12} px={6}>
				<Heading textAlign="center" fontSize={"4xl"}>
					Iniciar Sesion
				</Heading>
				<form onSubmit={handleSubmit}>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
						p={8}
					>
						<Stack spacing={4}>
							<FormControl id="email">
								<FormLabel>Email address</FormLabel>
								<Input
									value={inputValues.email}
									onChange={(e) =>
										setInputValues({ ...inputValues, email: e.target.value })
									}
									type="email"
								/>
							</FormControl>
							<FormControl id="password">
								<FormLabel>Contraseña</FormLabel>
								<Input
									value={inputValues.password}
									onChange={(e) =>
										setInputValues({ ...inputValues, password: e.target.value })
									}
									type="password"
								/>
							</FormControl>
							<Stack pt={6}>
								<Text align={"center"}>
									No tienes cuenta?{" "}
									<Link to="/register">
										<Box as="span" color={"blue.400"}>
											Crear cuenta
										</Box>
									</Link>
								</Text>
							</Stack>
							<Stack spacing={10}>
								<Button
									bg={"blue.400"}
									color={"white"}
									type="submit"
									_hover={{
										bg: "blue.500",
									}}
								>
									Iniciar Sesion
								</Button>
							</Stack>
						</Stack>
					</Box>
				</form>
			</Stack>
		</Flex>
	);
}
