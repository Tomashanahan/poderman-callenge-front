import {Input, Select} from "@chakra-ui/react";
import {useState} from "react";

function FormSelectOption({formData, setFormData, formDataKeyName, setFormErrors}) {
  const [observations, setObservations] = useState(false);

  const selectDefaultValue = () => {
    if (formData[formDataKeyName] === "Si") {
      return "Si";
    } else if (formData[formDataKeyName] === "No") {
      return "No";
    }
  };

  return (
    <>
      <Select
        borderColor="rgba(148, 148, 156, 1)"
        color="black"
        placeholder="Selecciona una opción"
        value={observations ? "Observaciones" : selectDefaultValue()}
        onChange={(e) => {
          if (e.target.value === "Observaciones") {
            setObservations(true);
          } else {
            setObservations(false);
            setFormData((lastFormValues) => ({
              ...lastFormValues,
              [formDataKeyName]: e.target.value,
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
          color="black"
          mt="10px"
          type="text"
          value={formData[formDataKeyName]}
          onChange={(e) => {
            setFormErrors("");
            setFormData((lastFormValues) => ({
              ...lastFormValues,
              [formDataKeyName]: e.target.value,
            }));
          }}
        />
      )}
    </>
  );
}

export default FormSelectOption;
