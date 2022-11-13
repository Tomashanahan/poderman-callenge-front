import axios from "axios";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormSelectOption from "../Commons/FormSelectOption";
import Swal from "sweetalert2";

const token = JSON.parse(localStorage.getItem("token"));

function Camaras({ thisIsAFormToEdit, getAllVisitedInfo, clouseModal }) {
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState("");
	const [formData, setFormData] = useState({
		Camaras: {
			ChequearVisualizacion: "",
		},
	});

	useEffect(() => {
		if (thisIsAFormToEdit) {
			axios
				.get("http://localhost:8080/userForm", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setFormData({
						Camaras: {
							ChequearVisualizacion: res.data.camaras.ChequearVisualizacion,
						},
					});
				});
		}
	}, []);

	const handleSubmit = async () => {
		if (formData.Camaras.ChequearVisualizacion !== "") {
			Swal.fire({
				title: "¿Estás de acuerdo con guardar los cambios?",
				showCancelButton: true,
				confirmButtonText: "Save",
			}).then(async (result) => {
				if (result.isConfirmed) {
					setLoading(true);
					if (thisIsAFormToEdit) {
						console.log('result:', result)
						await axios.put("http://localhost:8080/userForm/camaras", formData, {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						});
					} else {
						await axios.post(
							"http://localhost:8080/userForm/form?typeOfCategory=camaras",
							formData,
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${token}`,
								},
							}
						);
					}

					setLoading(false);
					getAllVisitedInfo();
					clouseModal(false);
					window.scrollTo(0, 0);

					Swal.fire("Saved!", "", "success");
				} else if (result.isDenied) {
					Swal.fire("Changes are not saved", "", "info");
				}
			});
		} else {
			setFormErrors("Complete todos los campos por favor");
		}
	};

	return (
		<Box>
			<FormLabel mt="20px" fontWeight="bold">
				Chequear visualizacion
			</FormLabel>
			<FormSelectOption
				formData={formData}
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="Camaras"
				formDataSubKeyName="ChequearVisualizacion"
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

export default Camaras;
