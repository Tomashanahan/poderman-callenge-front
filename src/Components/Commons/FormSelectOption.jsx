import { Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function FormSelectOption({
	formData,
	setFormData,
	formDataKeyName,
	formDataSubKeyName,
	setFormErrors,
}) {
	const [observations, setObservations] = useState(false);

	const selectDefaultValue = () => {
		if (formData[formDataKeyName][formDataSubKeyName] === "Si") {
			return "Si";
		} else if (formData[formDataKeyName][formDataSubKeyName] === "No") {
			return "No";
		}
	};

	return (
		<>
			<Select
				placeholder="Selecciona una opción"
				value={observations ? "Observaciones" : selectDefaultValue()}
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
					// value={selectDefaultValue()}
					value={formData[formDataKeyName][formDataSubKeyName]}
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

export default FormSelectOption;
