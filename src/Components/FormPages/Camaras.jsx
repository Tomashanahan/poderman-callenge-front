import axios from "axios";
import {Box, Button, Flex, FormLabel, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

import FormSelectOption from "../Commons/FormSelectOption";

function Camaras({thisIsAFormToEdit, getAllVisitedInfo, clouseModal}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [idForUpdate, setIdForUpdate] = useState();
  const [formData, setFormData] = useState({
    ChequearVisualizacion: "",
  });

  useEffect(() => {
    if (thisIsAFormToEdit) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/camaras`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIdForUpdate(res.data.camaras.preference_id);
          setFormData({
            ChequearVisualizacion: res.data.camaras.ChequearVisualizacion,
          });
        });
    }
  }, []);

  const handleSubmit = async () => {
    if (formData.ChequearVisualizacion !== "") {
      Swal.fire({
        confirmButtonText: "Save",
        showCancelButton: true,
        title: "¿Estás de acuerdo con guardar los cambios?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          if (thisIsAFormToEdit) {
            await axios.patch(
              `${process.env.REACT_APP_BACKEND_URL}/camaras/${idForUpdate}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );
          } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/camaras`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }

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
      <FormLabel fontWeight="bold" mt="20px">
        Chequear visualizacion
      </FormLabel>
      <FormSelectOption
        formData={formData}
        formDataKeyName="ChequearVisualizacion"
        setFormData={setFormData}
        setFormErrors={setFormErrors}
      />
      <Flex align="center" gap="20px" mt="30px">
        <Button
          _hover={{bg: "blue.400"}}
          bg="blue.400"
          color="white"
          disabled={formErrors !== "" ? true : false}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Guardar
        </Button>
        {formErrors !== "" && (
          <Text color="red" fontWeight="extrabold" m="0">
            {formErrors}
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default Camaras;
