import axios from "axios";
import { Box, Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormSelectOption from "../Commons/FormSelectOption";
import ShowImageInEditForm from "../Commons/ShowImageInEditForm";
import EditImageFileForm from "../Commons/EditImageFileForm";

const token = JSON.parse(localStorage.getItem("token"));
const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.signature;
const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.timestamp;

function ExAgroinsumos({ thisIsAFormToEdit, setShowModal }) {
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState("");
	const [filestToTransform, setFilestToTransform] = useState({
		ExAgroinsumos: {},
	});
	const [editImage, setEditImage] = useState({
		RackPrincipalLimpieza: false,
		RackPrincipalOrden: false,
	});

	const [formData, setFormData] = useState({
		ExAgroinsumos: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoAP: "",
		},
	});
	console.log("formData:", formData);

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
						ExAgroinsumos: {
							RackPrincipalLimpieza:
								res.data.exAgroinsumos.RackPrincipalLimpieza,
							RackPrincipalOrden: res.data.exAgroinsumos.RackPrincipalOrden,
							FuncionamientoAP: res.data.exAgroinsumos.FuncionamientoAP,
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
			? Object.values(filestToTransform.ExAgroinsumos).length === 2
			: true;
		if (
			checkingIfIsInEditMode &&
			formData.ExAgroinsumos.FuncionamientoAP !== ""
		) {
			if (
				window.confirm(
					"Are you sure you want to save this thing into the database?"
				)
			) {
				setLoading(true);
				let result = await apploadImage();
				console.log("result:", result);
				await axios.post("http://localhost:8080/userForm/form", result, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setFormData({
					ExAgroinsumos: {
						RackPrincipalLimpieza: "",
						RackPrincipalOrden: "",
						FuncionamientoAP: "",
					},
				});
				setLoading(false);
				setShowModal(false)
			}
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
						keyNameToSetTheState="ExAgroinsumos"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="ExAgroinsumos"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="ExAgroinsumos"
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
						keyNameToSetTheState="ExAgroinsumos"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="ExAgroinsumos"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="ExAgroinsumos"
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
				formDataKeyName="ExAgroinsumos"
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

export default ExAgroinsumos;
