import axios from "axios";
import React, { useState } from "react";
import { Box, Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import FormSelectFile from "../Commons/FormSelectFile";

const token = JSON.parse(localStorage.getItem("token"));
const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.signature;
const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.timestamp;

function CasaPrincipal() {
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState("");
	const [filestToTransform, setFilestToTransform] = useState({
		CasaPrincipal: {},
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
		if (
			Object.values(filestToTransform.CasaPrincipal).length === 2 &&
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
			<Input
				border="none"
				type="file"
				onChange={(e) => {
					e.preventDefault();
					setFilestToTransform((prevFiles) => ({
						...prevFiles,
						CasaPrincipal: {
							...prevFiles?.CasaPrincipal,
							RackPrincipalLimpieza: e.target.files[0],
						},
					}));
				}}
				css={{
					"&::-webkit-file-upload-button": {
						color: "black",
						borderRadius: "6px",
						padding: "10px",
						cursor: "pointer",
						border: "none",
						marginRight: "30px",
					},
					"&::-webkit-file-upload-text": {
						color: "blue",
					},
				}}
			/>

			<FormLabel mt="20px" fontWeight="bold">
				Rack Principal (orden)
			</FormLabel>
			<Input
				border="none"
				type="file"
				onChange={(e) => {
					e.preventDefault();
					setFilestToTransform((prevFiles) => ({
						...prevFiles,
						CasaPrincipal: {
							...prevFiles?.CasaPrincipal,
							RackPrincipalOrden: e.target.files[0],
						},
					}));
				}}
				css={{
					"&::-webkit-file-upload-button": {
						color: "black",
						borderRadius: "6px",
						padding: "10px",
						cursor: "pointer",
						border: "none",
						marginRight: "30px",
					},
				}}
			/>

			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento AP
			</FormLabel>
			<FormSelectFile
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="CasaPrincipal"
				formDataSubKeyName="FuncionamientoAP"
			/>

			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento teléfono
			</FormLabel>
			<FormSelectFile
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="CasaPrincipal"
				formDataSubKeyName="FuncionamientoTelefono"
			/>

			<FormLabel mt="20px" fontWeight="bold">
				UPS
			</FormLabel>
			<FormSelectFile
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
