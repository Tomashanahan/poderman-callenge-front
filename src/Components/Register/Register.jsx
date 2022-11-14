import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
	const navigation = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		team: "",
	});

	const validation = (values) => {
		const errors = {};
		let pattern = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,30}$$/;

		if (!values.fullName.trim()) {
			errors.fullName = "El campo es requerido";
		} else if (!pattern.test(!values.fullName.trim())) {
			errors.fullName =
				"¡El campo Nombre completo debe tener entre 3 y 30 caracteres y no acepta valores especiales!";
		}
		if (!values.email.trim()) {
			errors.email = "El campo es requerido";
		}

		if (!values.team) {
			errors.team = "El campo es requerido";
		}

		if (!values.email.trim()) {
			errors.email = "El campo es requerido";
		}

		if (!values.password.trim()) {
			errors.password = "El campo es requerido";
		} else if (values.password.length < 5) {
			errors.password = "Constraseña muy corta";
		}
		if (!values.confirmPassword.trim()) {
			errors.confirmPassword = "El campo es requerido";
		} else if (values.confirmPassword !== values.password) {
			errors.confirmPassword = "Las contraseñas no coinciden";
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleChange(e);
		setErrors(validation(form));

		try {
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, form);
			e.target.reset();
			navigation("/login")
			
		} catch (error) {
			console.log("error:", error);
		}
	};
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Flex minH={"100vh"} mt="30px" align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} w={"40%"} py={12} px={6}>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"2xl"}
					p={8}
				>
					<Stack align={"center"} mb="20px">
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Crear cuenta
						</Heading>
					</Stack>
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<Box>
								<FormControl>
									<FormLabel>Nombre completo</FormLabel>
									<Input
										onChange={handleChange}
										type="text"
										value={form.fullName}
										name="fullName"
										placeholder="Escribe tu nombre completo"
									/>
									{errors.fullName && (
										<Text color="#FE0A01">{errors.fullName}</Text>
									)}
								</FormControl>
							</Box>
							<Box>
								<FormControl>
									<FormLabel>Equipo</FormLabel>
									<Select
										placeholder="A que equipo perteneces"
										name="team"
										onChange={handleChange}
									>
										<option value="Telecomunicaciones">
											Telecomunicaciones
										</option>
										<option value="Microinformatica">Microinformatica</option>
									</Select>
									{errors.team && <Text color="#FE0A01">{errors.team}</Text>}
								</FormControl>
							</Box>
							<FormControl id="email">
								<FormLabel>Email</FormLabel>
								<Input
									onChange={handleChange}
									value={form.email}
									name="email"
									type="email"
									placeholder="email@hotmail.com"
								/>
								{errors.email && <Text color="#FE0A01">{errors.email}</Text>}
							</FormControl>
							<FormControl id="password">
								<FormLabel>Contraseña</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? "text" : "password"}
										onChange={handleChange}
										value={form.password}
										name="password"
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPassword((showPassword) => !showPassword)
											}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
								{errors.password && (
									<Text color="#FE0A01">{errors.password}</Text>
								)}
							</FormControl>
							<FormControl id="confirmPassword">
								<FormLabel>Confirmar contraseña</FormLabel>
								<InputGroup>
									<Input
										type={showPasswordConfirm ? "text" : "password"}
										onChange={handleChange}
										value={form.confirmPassword}
										name="confirmPassword"
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPasswordConfirm(
													(showPasswordConfirm) => !showPasswordConfirm
												)
											}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
								{errors.confirmPassword && (
									<Text color="#FE0A01">{errors.confirmPassword}</Text>
								)}
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									type="submit"
									loadingText="Submitting"
									size="lg"
									bg={"blue.400"}
									color={"white"}
									_hover={{
										bg: "#242524",
									}}
								>
									Registrate
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									¿Ya sos usuario?
									<RouterLink style={{ color: "#4399E1" }} to="/login">
										<span style={{ color: "#659DF6", fontWeight: "bolder" }}>
											{" "}
											Iniciar Sesion
										</span>
									</RouterLink>
								</Text>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
