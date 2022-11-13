import axios from "axios";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormSelectOption from "../Commons/FormSelectOption";
import Swal from "sweetalert2";

const token = JSON.parse(localStorage.getItem("token"));

function Agroinsumos({ thisIsAFormToEdit, getAllVisitedInfo, clouseModal }) {
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState("");
	const [formData, setFormData] = useState({
		Agroinsumos: {
			FuncionamientoAP: "",
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
						Agroinsumos: {
							FuncionamientoAP: res.data.agroinsumos.FuncionamientoAP,
						},
					});
				});
		}
	}, []);

	const handleSubmit = async () => {
		if (formData.Agroinsumos.FuncionamientoAP !== "") {
			Swal.fire({
				title: "¿Estás de acuerdo con guardar los cambios?",
				showCancelButton: true,
				confirmButtonText: "Save",
			}).then(async (result) => {
				if (result.isConfirmed) {
					setLoading(true);
					if (thisIsAFormToEdit) {
						await axios.put("http://localhost:8080/userForm/agroinsumos", formData, {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						});
					} else {
						await axios.post(
							"http://localhost:8080/userForm/form?typeOfCategory=agroinsumos",
							formData,
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${token}`,
								},
							}
						);
					}
					setFormData({
						Agroinsumos: {
							FuncionamientoAP: "",
						},
					});
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
				Funcionamiento AP
			</FormLabel>
			<FormSelectOption
				formData={formData}
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
