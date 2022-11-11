import axios from "axios";
import { Box, Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormSelectOption from "../Commons/FormSelectOption";
import ShowImageInEditForm from "../Commons/ShowImageInEditForm";
import EditImageFileForm from "../Commons/EditImageFileForm";
import Swal from "sweetalert2";

const token = JSON.parse(localStorage.getItem("token"));
const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.signature;
const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.timestamp;

function Balanza({ thisIsAFormToEdit, getAllVisitedInfo, clouseModal }) {
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState("");
	const [filestToTransform, setFilestToTransform] = useState({
		Balanza: {},
	});
	const [editImage, setEditImage] = useState({
		RackPrincipalLimpieza: false,
		RackPrincipalOrden: false,
		LimpiarPC: false,
	});
	const [formData, setFormData] = useState({
		Balanza: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoAP: "",
			LimpiarPC: "",
			UPS: "",
			FuncionamientoTelefono: "",
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
						Balanza: {
							RackPrincipalLimpieza: res.data.balanza.RackPrincipalLimpieza,
							RackPrincipalOrden: res.data.balanza.RackPrincipalOrden,
							FuncionamientoAP: res.data.balanza.FuncionamientoAP,
							LimpiarPC: res.data.balanza.LimpiarPC,
							UPS: res.data.balanza.UPS,
							FuncionamientoTelefono: res.data.balanza.FuncionamientoTelefono,
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
				data.append("timestamp", timestamp);

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
			? Object.values(filestToTransform.Balanza).length === 3
			: true;
		if (
			checkingIfIsInEditMode &&
			formData.Balanza.FuncionamientoAP !== "" &&
			formData.Balanza.FuncionamientoTelefono !== "" &&
			formData.Balanza.UPS !== ""
		) {
			Swal.fire({
				title: "¿Estás de acuerdo con guardar los cambios?",
				showCancelButton: true,
				confirmButtonText: "Save",
			}).then(async (result) => {
				if (result.isConfirmed) {
					setLoading(true);
					let result = await apploadImage();

					await axios.post("http://localhost:8080/userForm/form", result, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});
					setFormData({
						Balanza: {
							RackPrincipalLimpieza: "",
							RackPrincipalOrden: "",
							FuncionamientoAP: "",
							LimpiarPC: "",
							UPS: "",
							FuncionamientoTelefono: "",
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
				Rack Principal (limpieza)
			</FormLabel>
			{thisIsAFormToEdit ? (
				!editImage.RackPrincipalLimpieza ? (
					<ShowImageInEditForm
						formData={formData}
						editImage={editImage}
						setEditImage={setEditImage}
						keyNameToSetTheState="Balanza"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Balanza"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Balanza"
					subKeyNameToSetTheState="RackPrincipalLimpieza"
				/>
			)}

			<FormLabel mt="20px" fontWeight="bold">
				Rack Principal (orden)
			</FormLabel>
			{thisIsAFormToEdit ? (
				!editImage.RackPrincipalOrden ? (
					<ShowImageInEditForm
						formData={formData}
						editImage={editImage}
						setEditImage={setEditImage}
						keyNameToSetTheState="Balanza"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Balanza"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Balanza"
					subKeyNameToSetTheState="RackPrincipalOrden"
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
						keyNameToSetTheState="Balanza"
						subKeyNameToSetTheState="LimpiarPC"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Balanza"
						subKeyNameToSetTheState="LimpiarPC"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Balanza"
					subKeyNameToSetTheState="LimpiarPC"
				/>
			)}

			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento AP
			</FormLabel>
			<FormSelectOption
				formData={formData}
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="Balanza"
				formDataSubKeyName="FuncionamientoAP"
			/>
			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento teléfono
			</FormLabel>
			<FormSelectOption
				formData={formData}
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="Balanza"
				formDataSubKeyName="FuncionamientoTelefono"
			/>
			<FormLabel mt="20px" fontWeight="bold">
				UPS
			</FormLabel>
			<FormSelectOption
				formData={formData}
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="Balanza"
				formDataSubKeyName="UPS"
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

export default Balanza;
