import {useState} from "react";
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
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
  const navigation = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputValues.email === "" || inputValues.password === "")
        setErrors("Complete todos los campos por favor");
      else {
        setErrors("");
        const info = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          email: inputValues.email,
          password: inputValues.password,
        });

        localStorage.setItem("userInfo", JSON.stringify(info.data));
        localStorage.setItem("token", JSON.stringify(info.data.token));

        if (info.data.rol === "Admin") {
          navigation("/admin/dashboard");
        } else if (
info.data.team === "Microinformatica" ||
                                  info.data.team === 'Telecomunicaciones' ||
          info.data.rol === "User"
        ) {
          navigation("/user");
        }
      }
    } catch (error) {
      console.log("error:", error.response.data.msg);
      setErrors(error.response.data.msg);
    }
  };

  return (
    <Flex
      align={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      justify={"center"}
      minH={"100vh"}
    >
      <Stack mx={"auto"} px={6} py={12} spacing={8} w={"500px"}>
        <Heading fontSize={"4xl"} textAlign="center">
          Iniciar Sesion
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8} rounded={"lg"}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={inputValues.email}
                  onChange={(e) => setInputValues({...inputValues, email: e.target.value})}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  value={inputValues.password}
                  onChange={(e) => setInputValues({...inputValues, password: e.target.value})}
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
                  _hover={{
                    bg: "blue.500",
                  }}
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                >
                  Iniciar Sesion
                </Button>
                {errors && (
                  <Text color="red" fontWeight="bold" textAlign="center">
                    {errors}
                  </Text>
                )}
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
