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
import {useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    confirmPassword: "",
    email: "",
    fullName: "",
    password: "",
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
    setLoading(true);
    handleChange(e);
    setErrors(validation(form));

    try {
      if (!Object.values(errors).length > 0) throw new Error();
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, form);

      e.target.reset();
      navigation("/login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setRegisterErrors(error.response.data.message || errors);
    }
  };
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <Flex align={"center"} justify={"center"} minH={"100vh"} mt="30px">
      <Stack mx={"auto"} px={6} py={12} spacing={8} w={"40%"}>
        <Box bg={useColorModeValue("white", "gray.700")} boxShadow={"2xl"} p={8} rounded={"lg"}>
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
                    name="fullName"
                    placeholder="Escribe tu nombre completo"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <Text color="#FE0A01">{errors.fullName}</Text>}
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Equipo</FormLabel>
                  <Select name="team" placeholder="A que equipo perteneces" onChange={handleChange}>
                    <option value="Telecomunicaciones">Telecomunicaciones</option>
                    <option value="Microinformatica">Microinformatica</option>
                  </Select>
                  {errors.team && <Text color="#FE0A01">{errors.team}</Text>}
                </FormControl>
              </Box>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="email@hotmail.com"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <Text color="#FE0A01">{errors.email}</Text>}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <Text color="#FE0A01">{errors.password}</Text>}
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirmar contraseña</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    type={showPasswordConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPasswordConfirm((showPasswordConfirm) => !showPasswordConfirm)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && <Text color="#FE0A01">{errors.confirmPassword}</Text>}
              </FormControl>
              <Stack pt={2} spacing={10}>
                <Button
                  _hover={{
                    bg: "blue.400",
                  }}
                  bg={"blue.400"}
                  color={"white"}
                  isLoading={loading}
                  loadingText="Submitting"
                  size="lg"
                  type="submit"
                >
                  Registrate
                </Button>
                {registerErrors && (
                  <Text color="red" fontWeight="bold" textAlign="center">
                    {registerErrors}
                  </Text>
                )}
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  ¿Ya sos usuario?
                  <RouterLink style={{color: "#4399E1"}} to="/login">
                    <span style={{color: "#659DF6", fontWeight: "bolder"}}> Iniciar Sesion</span>
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
