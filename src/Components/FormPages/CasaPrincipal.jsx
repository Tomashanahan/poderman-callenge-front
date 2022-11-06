import React from "react";
import { Box, FormLabel, Input } from "@chakra-ui/react";

function CasaPrincipal({
	setFormData,
	setFilestToTransform,
	filestToTransform,
}) {
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
			<Input
				bg="white"
				type="text"
				onChange={(e) =>
					setFormData((lastFormValues) => ({
						...lastFormValues,
						CasaPrincipal: {
							...lastFormValues.CasaPrincipal,
							FuncionamientoAP: e.target.value,
						},
					}))
				}
			/>

			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento teléfono
			</FormLabel>
			<Input
				bg="white"
				type="text"
				onChange={(e) =>
					setFormData((lastFormValues) => ({
						...lastFormValues,
						CasaPrincipal: {
							...lastFormValues.CasaPrincipal,
							FuncionamientoTelefono: e.target.value,
						},
					}))
				}
			/>

			<FormLabel mt="20px" fontWeight="bold">
				UPS
			</FormLabel>
			<Input
				bg="white"
				type="text"
				onChange={(e) =>
					setFormData((lastFormValues) => ({
						...lastFormValues,
						CasaPrincipal: {
							...lastFormValues.CasaPrincipal,
							UPS: e.target.value,
						},
					}))
				}
			/>
		</Box>
	);
}

export default CasaPrincipal;
