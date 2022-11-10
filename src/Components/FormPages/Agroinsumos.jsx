import axios from "axios";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import { useState } from "react";
import FormSelectFile from "../Commons/FormSelectFile";

const token = JSON.parse(localStorage.getItem("token"));

function Agroinsumos() {
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState("");
	const [formData, setFormData] = useState({
		Agroinsumos: {
			FuncionamientoAP: "",
		},
	});

	const handleSubmit = async () => {
		if (formData.Agroinsumos.FuncionamientoAP !== "") {
			if (
				window.confirm(
					"Are you sure you want to save this thing into the database?"
				)
			) {
				setLoading(true);
				await axios.post("http://localhost:8080/userForm/form", formData, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setFormData({
					Agroinsumos: {
						FuncionamientoAP: "",
					},
				});
				setLoading(false);
			}
		} else {
			setFormErrors("Complete todos los campos por favor");
		}
	};

	return (
		<Box>
			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento AP
			</FormLabel>
			<FormSelectFile
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="Agroinsumos"
				formDataSubKeyName="FuncionamientoAP"
			/>
			<Flex align="center" gap="20px" mt="30px">
				<Button
					isLoading={loading}
					bg="blue.400"
					color="white"
					disabled={formErrors !== "" ? true : false}
					onClick={handleSubmit}
				>
					Guardar
				</Button>
				{formErrors !== "" && (
					<Text m="0" fontWeight="extrabold" color="red">
						{formErrors}
					</Text>
				)}
			</Flex>
		</Box>
	);
}

export default Agroinsumos;
