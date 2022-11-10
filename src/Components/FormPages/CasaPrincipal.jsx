import axios from "axios";
import React, { useState } from "react";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import FormSelectOption from "../Commons/FormSelectOption";
import { useEffect } from "react";
import EditImageFileForm from "../Commons/EditImageFileForm";
import ShowImageInEditForm from "../Commons/ShowImageInEditForm";

const token = JSON.parse(localStorage.getItem("token"));
const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.signature;
const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.timestamp;

function CasaPrincipal({ thisIsAFormToEdit, getAllVisitedInfo }) {
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState("");
	const [filestToTransform, setFilestToTransform] = useState({
		CasaPrincipal: {},
	});
	const [editImage, setEditImage] = useState({
		RackPrincipalLimpieza: false,
		RackPrincipalOrden: false,
	});

	const [formData, setFormData] = useState({
		CasaPrincipal: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoAP: "",
			FuncionamientoTelefono: "",
			UPS: "",
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
						CasaPrincipal: {
							RackPrincipalLimpieza:
								res.data.casaPrincipal.RackPrincipalLimpieza,
							RackPrincipalOrden: res.data.casaPrincipal.RackPrincipalOrden,
							FuncionamientoAP: res.data.casaPrincipal.FuncionamientoAP,
							FuncionamientoTelefono:
								res.data.casaPrincipal.FuncionamientoTelefono,
							UPS: res.data.casaPrincipal.UPS,
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
			? Object.values(filestToTransform.CasaPrincipal).length === 2
			: true;
		if (
			checkingIfIsInEditMode &&
			formData.CasaPrincipal.FuncionamientoAP !== "" &&
			formData.CasaPrincipal.FuncionamientoTelefono !== "" &&
			formData.CasaPrincipal.UPS !== ""
		) {
			if (
				window.confirm(
					"Are you sure you want to save this thing into the database?"
				)
			) {
				setLoading(true);
				let result = await apploadImage();
				await axios.post("http://localhost:8080/userForm/form", result, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setFormData({
					CasaPrincipal: {
						RackPrincipalLimpieza: "",
						RackPrincipalOrden: "",
						FuncionamientoAP: "",
						FuncionamientoTelefono: "",
						UPS: "",
					},
				});
				setLoading(false);
				await getAllVisitedInfo();
			}
		} else {
			setFormErrors("Complete todos los campor por favor");
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
						keyNameToSetTheState="CasaPrincipal"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="CasaPrincipal"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="CasaPrincipal"
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
						keyNameToSetTheState="CasaPrincipal"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="CasaPrincipal"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="CasaPrincipal"
					subKeyNameToSetTheState="RackPrincipalOrden"
				/>
			)}
			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento AP
			</FormLabel>
			<FormSelectOption
				formData={formData}
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="CasaPrincipal"
				formDataSubKeyName="FuncionamientoAP"
			/>
			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento teléfono
			</FormLabel>
			<FormSelectOption
				formData={formData}
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="CasaPrincipal"
				formDataSubKeyName="FuncionamientoTelefono"
			/>
			<FormLabel mt="20px" fontWeight="bold">
				UPS
			</FormLabel>
			<FormSelectOption
				formData={formData}
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="CasaPrincipal"
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

export default CasaPrincipal;
