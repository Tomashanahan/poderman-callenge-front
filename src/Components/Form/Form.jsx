import React, { useState } from "react";
import axios from "axios";
import Agroinsumos from "../FormPages/Agroinsumos";
import Balanza from "../FormPages/Balanza";
import Camaras from "../FormPages/Camaras";
import CasaPrincipal from "../FormPages/CasaPrincipal";
import ExAgroinsumos from "../FormPages/ExAgroinsumos";
import Hangar from "../FormPages/Hangar";
import Oficina from "../FormPages/Oficina";
import Taller from "../FormPages/Taller";
import { Box, Button, Text } from "@chakra-ui/react";

const token = JSON.parse(localStorage.getItem("token"));
const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.signature;
const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo
	?.timestamp;

const Form = () => {
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [filestToTransform, setFilestToTransform] = useState({
		CasaPrincipal: {},
		ExAgroinsumos: {},
		Taller: {},
		Hangar: {},
		Oficina: {},
		Balanza: {},
	});

	const [formData, setFormData] = useState({
		CasaPrincipal: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoAP: "",
			FuncionamientoTelefono: "",
			UPS: "",
		},
		ExAgroinsumos: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoAP: "",
		},
		Taller: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoTelefono: "",
			FuncionamientoAP: "",
		},
		Hangar: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoTelefono: "",
			FuncionamientoAP: "",
		},
		Oficina: {
			FuncionamientoTelefono: "",
			LimpiarPC: "",
			AcomodarCables: "",
		},
		Balanza: {
			RackPrincipalLimpieza: "",
			RackPrincipalOrden: "",
			FuncionamientoAP: "",
			LimpiarPC: "",
			UPS: "",
			FuncionamientoTelefono: "",
		},
		Agroinsumos: {
			FuncionamientoAP: "",
		},
		Camaras: {
			ChequearVisualizacion: "",
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

	const FormTitles = [
		{
			title: "Casa Principal",
			component: (
				<CasaPrincipal
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
		{
			title: "ExAgroinsumos",
			component: (
				<ExAgroinsumos
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
		{
			title: "Taller",
			component: (
				<Taller
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
		{
			title: "Hangar",
			component: (
				<Hangar
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
		{
			title: "Oficina",
			component: (
				<Oficina
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
		{
			title: "Balanza",
			component: (
				<Balanza
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
		{
			title: "Agroinsumos",
			component: (
				<Agroinsumos
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
		{
			title: "Camaras",
			component: (
				<Camaras
					setFilestToTransform={setFilestToTransform}
					setFormData={setFormData}
				/>
			),
		},
	];

	const handleSubmit = async () => {
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
				ExAgroinsumos: {
					RackPrincipalLimpieza: "",
					RackPrincipalOrden: "",
					FuncionamientoAP: "",
				},
				Taller: {
					RackPrincipalLimpieza: "",
					RackPrincipalOrden: "",
					FuncionamientoTelefono: "",
					FuncionamientoAP: "",
				},
				Hangar: {
					RackPrincipalLimpieza: "",
					RackPrincipalOrden: "",
					FuncionamientoTelefono: "",
					FuncionamientoAP: "",
				},
				Oficina: {
					FuncionamientoTelefono: "",
					LimpiarPC: "",
					AcomodarCables: "",
				},
				Balanza: {
					RackPrincipalLimpieza: "",
					RackPrincipalOrden: "",
					FuncionamientoAP: "",
					LimpiarPC: "",
					UPS: "",
					FuncionamientoTelefono: "",
				},
				Agroinsumos: {
					FuncionamientoAP: "",
				},
				Camaras: {
					ChequearVisualizacion: "",
				},
			});
			setLoading(false);
		}
	};

	return (
		<Box w="50%" m="auto" mt="50px" bg="#e0e1f3" borderRadius="10px" p="20px">
			<Text fontSize="30px" fontWeight="bold">
				{FormTitles[page].title}
			</Text>
			<Box mt="20px" textAlign="center">
				<Button
					mr="10px"
					w="150px"
					bg="#636bc5"
					color="white"
					_hover={{ bg: "#636bc5" }}
					disabled={page === 0}
					onClick={() => {
						setPage((currPage) => currPage - 1);
					}}
				>
					Prev
				</Button>
				<Button
					mx="10px"
					w="150px"
					bg="#636bc5"
					color="white"
					_hover={{ bg: "#636bc5" }}
					onClick={() => {
						if (page < FormTitles.length - 1) {
							setPage((currPage) => currPage + 1);
						} else {
							handleSubmit();
						}
					}}
				>
					{page === FormTitles.length - 1 ? "Submit" : "Next"}
				</Button>
			</Box>
			{loading ? <h1>Cargando..</h1> : FormTitles[page].component}
		</Box>
	);
};

export default Form;
