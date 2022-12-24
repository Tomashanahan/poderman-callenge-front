import axios from "axios";
import {Box, Button, Flex, FormLabel, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

import FormSelectOption from "../Commons/FormSelectOption";

function Agroinsumos({thisIsAFormToEdit, getAllVisitedInfo, clouseModal}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [agroinsumoIdToUpdate, setAgroinsumoIdToUpdate] = useState();
  const [formData, setFormData] = useState({
    FuncionamientoAP: "",
  });

  useEffect(() => {
    if (thisIsAFormToEdit) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/agroinsumos`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setAgroinsumoIdToUpdate(res.data.agroinsumos.preference_id);
          setFormData({FuncionamientoAP: res.data.agroinsumos.FuncionamientoAP});
        });
    }
  }, []);

  const handleSubmit = async () => {
    if (formData.FuncionamientoAP !== "") {
      Swal.fire({
        confirmButtonText: "Save",
        showCancelButton: true,
        title: "¿Estás de acuerdo con guardar los cambios?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          if (thisIsAFormToEdit) {
            await axios.patch(
              `${process.env.REACT_APP_BACKEND_URL}/agroinsumos/${agroinsumoIdToUpdate}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );
          } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/agroinsumos`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }
          setFormData({
            Agroinsumos: {
              FuncionamientoAP: "",
            },
          });
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
      <FormLabel color="black" fontWeight="bold" mt="20px">
        Funcionamiento AP
      </FormLabel>
      <FormSelectOption
        formData={formData}
        formDataKeyName="FuncionamientoAP"
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

export default Agroinsumos;
