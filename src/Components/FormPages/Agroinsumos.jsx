import { Box, FormLabel, Input } from "@chakra-ui/react";

function Agroinsumos({ url, setImage, setFormData }) {
	return (
		<Box>
			<FormLabel mt="20px" fontWeight="bold">
				Funcionamiento AP
			</FormLabel>
			<Input
				bg="white"
				type="text"
				onChange={(e) =>
					setFormData((lastFormValues) => ({
						...lastFormValues,
						Agroinsumos: {
							...lastFormValues.Agroinsumos,
							FuncionamientoAP: e.target.value,
						},
					}))
				}
			/>
		</Box>
	);
}

export default Agroinsumos;
