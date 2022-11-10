import axios from "axios";
import { Box, Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import FormSelectFile from "../Commons/FormSelectFile";

const token = JSON.parse(localStorage.getItem("token"));
const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.signature;
const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.timestamp;

function Taller() {
	const [loading, setLoading] = useState(false);
	const [filestToTransform, setFilestToTransform] = useState({ Taller: {} });
	const [formErrors, setFormErrors] = useState("");

	const [formData, setFormData] = useState({
		Taller: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoTelefono: "",
			FuncionamientoAP: "",
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
			Object.values(filestToTransform.Taller).length === 2 &&
			formData.Taller.FuncionamientoAP !== "" &&
			formData.Taller.FuncionamientoTelefono !== ""
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
					Oficina: {
						FuncionamientoTelefono: "",
						LimpiarPC: "",
						AcomodarCables: "",
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
				Rack Principal (limpieza)
			</FormLabel>
			<Input
				border="none"
				type="file"
				onChange={(e) => {
					e.preventDefault();
					setFormErrors("");
					setFilestToTransform((prevFiles) => ({
						...prevFiles,
						Taller: {
							...prevFiles?.Taller,
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
					setFormErrors("");
					setFilestToTransform((prevFiles) => ({
						...prevFiles,
						Taller: {
							...prevFiles?.Taller,
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
				formDataKeyName="Taller"
				formDataSubKeyName="FuncionamientoAP"
			/>

			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento teléfono
			</FormLabel>
			<FormSelectFile
				setFormData={setFormData}
				setFormErrors={setFormErrors}
				formDataKeyName="Taller"
				formDataSubKeyName="FuncionamientoTelefono"
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

export default Taller;
