import { Box, FormLabel, Input } from "@chakra-ui/react";

function ExAgroinsumos({ setFilestToTransform, setFormData }) {
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
						ExAgroinsumos: {
							...prevFiles?.ExAgroinsumos,
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
						ExAgroinsumos: {
							...prevFiles?.ExAgroinsumos,
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
						ExAgroinsumos: {
							...lastFormValues.ExAgroinsumos,
							FuncionamientoAP: e.target.value,
						},
					}))
				}
			/>
		</Box>
	);
}

export default ExAgroinsumos;
