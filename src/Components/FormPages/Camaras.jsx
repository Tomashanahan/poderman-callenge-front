import axios from "axios";
import {Box, Button, Flex, FormLabel, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

import FormSelectOption from "../Commons/FormSelectOption";

const token = JSON.parse(localStorage.getItem("token"));

function Camaras({thisIsAFormToEdit, getAllVisitedInfo, clouseModal}) {
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [formData, setFormData] = useState({
    Camaras: {
      ChequearVisualizacion: "",
    },
  });

  useEffect(() => {
    if (thisIsAFormToEdit) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/userForm`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setFormData({
            Camaras: {
              ChequearVisualizacion: res.data.camaras.ChequearVisualizacion,
            },
          });
        });
    }
  }, []);

  const handleSubmit = async () => {
    if (formData.Camaras.ChequearVisualizacion !== "") {
      Swal.fire({
        confirmButtonText: "Save",
        showCancelButton: true,
        title: "¿Estás de acuerdo con guardar los cambios?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          if (thisIsAFormToEdit) {
            console.log("result:", result);
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userForm/camaras`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          } else {
            await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/userForm/form?typeOfCategory=camaras`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );
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
        formDataKeyName="Camaras"
        formDataSubKeyName="ChequearVisualizacion"
        setFormData={setFormData}
        setFormErrors={setFormErrors}
      />
      <Flex align="center" gap="20px" mt="30px">
        <Button
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
