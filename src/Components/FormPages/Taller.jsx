import { Box, FormLabel, Input } from "@chakra-ui/react";

function Taller({ setFilestToTransform, setFormData }) {
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
			<Input
				bg="white"
				type="text"
				onChange={(e) =>
					setFormData((lastFormValues) => ({
						...lastFormValues,
						Taller: {
							...lastFormValues.Taller,
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
						Taller: {
							...lastFormValues.Taller,
							FuncionamientoTelefono: e.target.value,
						},
					}))
				}
			/>
		</Box>
	);
}

export default Taller;
