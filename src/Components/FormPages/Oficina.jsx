import axios from "axios";
import { Box, Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ShowImageInEditForm from "../Commons/ShowImageInEditForm";
import EditImageFileForm from "../Commons/EditImageFileForm";
import Swal from "sweetalert2";

const token = JSON.parse(localStorage.getItem("token"));
const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.signature;
const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.timestamp;

function Oficina({ thisIsAFormToEdit, getAllVisitedInfo, clouseModal }) {
	const [loading, setLoading] = useState(false);
	const [filestToTransform, setFilestToTransform] = useState({ Oficina: {} });
	const [formErrors, setFormErrors] = useState("");
	const [editImage, setEditImage] = useState({
		FuncionamientoTelefono: false,
		LimpiarPC: false,
	});

	const [formData, setFormData] = useState({
		Oficina: {
			FuncionamientoTelefono: "",
			LimpiarPC: "",
			AcomodarCables: "",
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
						Oficina: {
							FuncionamientoTelefono: res.data.oficina.FuncionamientoTelefono,
							LimpiarPC: res.data.oficina.LimpiarPC,
							AcomodarCables: res.data.oficina.AcomodarCables,
						},
					});
				});
		}
	}, []);

	const apploadImage = async () => {
		let stateFormCopy = { ...formData };
		for (const key in filestToTransform) {
			for (const subKey in filestToTransform[key]) {
				const data = new FormData();
				data.append("file", filestToTransform[key][subKey]);
				data.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
				data.append("signature", signature);
				data.append(
					"timestamp",
					timestamp || Math.round(new Date().getTime() / 1000)
				);

				const cloudinaryResponse = await axios.post(
					`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
					data,
					{
						headers: { "Content-Type": "multipart/form-data" },
					}
				);
				stateFormCopy = {
					...stateFormCopy,
					[key]: {
						...stateFormCopy[key],
						[subKey]: cloudinaryResponse.data.secure_url,
					},
				};
			}
		}
		return stateFormCopy;
	};

	const handleSubmit = async () => {
		let checkingIfIsInEditMode = !thisIsAFormToEdit
			? Object.values(filestToTransform.Oficina).length === 3
			: true;
		if (checkingIfIsInEditMode) {
			Swal.fire({
				title: "¿Estás de acuerdo con guardar los cambios?",
				showCancelButton: true,
				confirmButtonText: "Save",
			}).then(async (result) => {
				if (result.isConfirmed) {
					setLoading(true);
					let result = await apploadImage();
					if (thisIsAFormToEdit) {
						await axios.put("http://localhost:8080/userForm/oficina", result, {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						});
					} else {
						await axios.post(
							"http://localhost:8080/userForm/form?typeOfCategory=oficina",
							result,
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${token}`,
								},
							}
						);
					}
					setFormData({
						Oficina: {
							FuncionamientoTelefono: "",
							LimpiarPC: "",
							AcomodarCables: "",
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
				Funcionamiento Telefono
			</FormLabel>
			{thisIsAFormToEdit ? (
				!editImage.FuncionamientoTelefono ? (
					<ShowImageInEditForm
						formData={formData}
						editImage={editImage}
						setEditImage={setEditImage}
						keyNameToSetTheState="Oficina"
						subKeyNameToSetTheState="FuncionamientoTelefono"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Oficina"
						subKeyNameToSetTheState="FuncionamientoTelefono"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Oficina"
					subKeyNameToSetTheState="FuncionamientoTelefono"
				/>
			)}

			<FormLabel mt="20px" fontWeight="bold">
				Limpiar PC
			</FormLabel>
			{thisIsAFormToEdit ? (
				!editImage.LimpiarPC ? (
					<ShowImageInEditForm
						formData={formData}
						editImage={editImage}
						setEditImage={setEditImage}
						keyNameToSetTheState="Oficina"
						subKeyNameToSetTheState="LimpiarPC"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Oficina"
						subKeyNameToSetTheState="LimpiarPC"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Oficina"
					subKeyNameToSetTheState="LimpiarPC"
				/>
			)}

			<FormLabel mt="20px" fontWeight="bold">
				Acomodar Cables
			</FormLabel>
			{thisIsAFormToEdit ? (
				!editImage.AcomodarCables ? (
					<ShowImageInEditForm
						formData={formData}
						editImage={editImage}
						setEditImage={setEditImage}
						keyNameToSetTheState="Oficina"
						subKeyNameToSetTheState="AcomodarCables"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Oficina"
						subKeyNameToSetTheState="AcomodarCables"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Oficina"
					subKeyNameToSetTheState="AcomodarCables"
				/>
			)}

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

export default Oficina;
