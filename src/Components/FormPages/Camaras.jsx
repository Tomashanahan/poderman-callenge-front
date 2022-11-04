import { Box, FormLabel, Input } from "@chakra-ui/react";

function Camaras({ setFormData }) {
	return (
		<Box>
			<FormLabel mt="20px" fontWeight="bold">
				Chequear visualizacion
			</FormLabel>
			<Input
				bg="white"
				type="text"
				onChange={(e) =>
					setFormData((lastFormValues) => ({
						...lastFormValues,
						Camaras: {
							...lastFormValues.Camaras,
							ChequearVisualizacion: e.target.value,
						},
					}))
				}
			/>
		</Box>
	);
}

export default Camaras;
