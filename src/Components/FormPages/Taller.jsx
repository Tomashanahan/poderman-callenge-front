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

function Taller({ thisIsAFormToEdit, getAllVisitedInfo, clouseModal }) {
	const [loading, setLoading] = useState(false);
	const [filestToTransform, setFilestToTransform] = useState({ Taller: {} });
	const [formErrors, setFormErrors] = useState("");
	const [editImage, setEditImage] = useState({
		RackPrincipalLimpieza: false,
		RackPrincipalOrden: false,
	});
	const [formData, setFormData] = useState({
		Taller: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoTelefono: "",
			FuncionamientoAP: "",
		},
	});

	useEffect(() => {
		if (thisIsAFormToEdit) {
			axios
				.get(`${process.env.REACT_APP_BACKEND_URL}/userForm`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setFormData({
						Taller: {
							RackPrincipalLimpieza: res.data.taller.RackPrincipalLimpieza,
							RackPrincipalOrden: res.data.taller.RackPrincipalOrden,
							FuncionamientoTelefono: res.data.taller.FuncionamientoTelefono,
							FuncionamientoAP: res.data.taller.FuncionamientoAP,
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
			? Object.values(filestToTransform.Taller).length === 2
			: true;
		if (
			checkingIfIsInEditMode &&
			formData.Taller.FuncionamientoAP !== "" &&
			formData.Taller.FuncionamientoTelefono !== ""
		) {
			Swal.fire({
				title: "¿Estás de acuerdo con guardar los cambios?",
				showCancelButton: true,
				confirmButtonText: "Save",
			}).then(async (result) => {
				if (result.isConfirmed) {
					setLoading(true);
					let result = await apploadImage();

					if (thisIsAFormToEdit) {
						console.log('result:', result)
						await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userForm/taller`, result, {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						});
					} else {
						await axios.post(
							`${process.env.REACT_APP_BACKEND_URL}/userForm/form?typeOfCategory=taller`,
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
				Rack Principal (limpieza)
			</FormLabel>
			{thisIsAFormToEdit ? (
				!editImage.RackPrincipalLimpieza ? (
					<ShowImageInEditForm
						formData={formData}
						editImage={editImage}
						setEditImage={setEditImage}
						keyNameToSetTheState="Taller"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Taller"
						subKeyNameToSetTheState="RackPrincipalLimpieza"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Taller"
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
						keyNameToSetTheState="Taller"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				) : (
					<EditImageFileForm
						setFilestToTransform={setFilestToTransform}
						keyNameToSetTheState="Taller"
						subKeyNameToSetTheState="RackPrincipalOrden"
					/>
				)
			) : (
				<EditImageFileForm
					setFilestToTransform={setFilestToTransform}
					keyNameToSetTheState="Taller"
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
				formDataKeyName="Taller"
				formDataSubKeyName="FuncionamientoAP"
			/>
			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento teléfono
			</FormLabel>
			<FormSelectOption
				formData={formData}
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
