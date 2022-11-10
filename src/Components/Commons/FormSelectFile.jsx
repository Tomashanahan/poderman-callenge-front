import { Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";

function FormSelectFile({
	setFormData,
	formDataKeyName,
	formDataSubKeyName,
	setFormErrors,
}) {
	const [observations, setObservations] = useState(false);
	return (
		<>
			<Select
				placeholder="Selecciona una opción"
				onChange={(e) => {
					if (e.target.value === "Observaciones") {
						setObservations(true);
					} else {
						setObservations(false);
						setFormData((lastFormValues) => ({
							...lastFormValues,
							[formDataKeyName]: {
								...lastFormValues[formDataKeyName],
								[formDataSubKeyName]: e.target.value,
							},
						}));
					}
					setFormErrors("");
				}}
			>
				<option value="Si">Si</option>
				<option value="No">No</option>
				<option value="Observaciones">Observaciones</option>
			</Select>
			{observations && (
				<Input
					bg="white"
					type="text"
					mt="10px"
					onChange={(e) => {
						setFormErrors("");
						setFormData((lastFormValues) => ({
							...lastFormValues,
							[formDataKeyName]: {
								...lastFormValues[formDataKeyName],
								[formDataSubKeyName]: e.target.value,
							},
						}));
					}}
				/>
			)}
		</>
	);
}

export default FormSelectFile;
