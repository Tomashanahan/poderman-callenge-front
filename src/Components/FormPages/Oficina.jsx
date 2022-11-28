import axios from "axios";
import {Box, Button, Flex, FormLabel, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

import ShowImageInEditForm from "../Commons/ShowImageInEditForm";
import EditImageFileForm from "../Commons/EditImageFileForm";

function Oficina({thisIsAFormToEdit, getAllVisitedInfo, clouseModal}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo?.signature;
  const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo?.timestamp;
  const [loading, setLoading] = useState(false);
  const [filestToTransform, setFilestToTransform] = useState({Oficina: {}});
  const [formErrors, setFormErrors] = useState("");
  const [editImage, setEditImage] = useState({
    FuncionamientoTelefono: false,
    LimpiarPC: false,
  });

  const [formData, setFormData] = useState({
    Oficina: {
      AcomodarCables: "",
      FuncionamientoTelefono: "",
      LimpiarPC: "",
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
            Oficina: {
              AcomodarCables: res.data.oficina.AcomodarCables,
              FuncionamientoTelefono: res.data.oficina.FuncionamientoTelefono,
              LimpiarPC: res.data.oficina.LimpiarPC,
            },
          });
        });
    }
  }, []);

  const apploadImage = async () => {
    let stateFormCopy = {...formData};

    for (const key in filestToTransform) {
      for (const subKey in filestToTransform[key]) {
        const data = new FormData();

        data.append("file", filestToTransform[key][subKey]);
        data.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
        data.append("api_secret", process.env.REACT_APP_CLOUD_SECRET);
        data.append("signature", signature);
        data.append("timestamp", timestamp || Math.round(new Date().getTime() / 1000));

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          data,
          {
            headers: {"Content-Type": "multipart/form-data"},
          },
        );

        stateFormCopy = {
          ...stateFormCopy,
          [key]: {
            ...stateFormCopy[key],
            [subKey]: cloudinaryResponse.data.secure_url,
          },
        };
      }
    }

    return stateFormCopy;
  };

  const handleSubmit = async () => {
    let checkingIfIsInEditMode = !thisIsAFormToEdit
      ? Object.values(filestToTransform.Oficina).length === 3
      : true;

    if (checkingIfIsInEditMode) {
      Swal.fire({
        confirmButtonText: "Save",
        showCancelButton: true,
        title: "¿Estás de acuerdo con guardar los cambios?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          let result = await apploadImage();

          if (thisIsAFormToEdit) {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userForm/oficina`, result, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          } else {
            await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/userForm/form?typeOfCategory=oficina`,
              result,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );
          }
          setFormData({
            Oficina: {
              AcomodarCables: "",
              FuncionamientoTelefono: "",
              LimpiarPC: "",
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
      <FormLabel fontWeight="bold" mt="20px">
        Funcionamiento Telefono
      </FormLabel>
      {thisIsAFormToEdit ? (
        !editImage.FuncionamientoTelefono ? (
          <ShowImageInEditForm
            editImage={editImage}
            formData={formData}
            keyNameToSetTheState="Oficina"
            setEditImage={setEditImage}
            subKeyNameToSetTheState="FuncionamientoTelefono"
          />
        ) : (
          <EditImageFileForm
            keyNameToSetTheState="Oficina"
            setFilestToTransform={setFilestToTransform}
            subKeyNameToSetTheState="FuncionamientoTelefono"
          />
        )
      ) : (
        <EditImageFileForm
          keyNameToSetTheState="Oficina"
          setFilestToTransform={setFilestToTransform}
          subKeyNameToSetTheState="FuncionamientoTelefono"
        />
      )}

      <FormLabel fontWeight="bold" mt="20px">
        Limpiar PC
      </FormLabel>
      {thisIsAFormToEdit ? (
        !editImage.LimpiarPC ? (
          <ShowImageInEditForm
            editImage={editImage}
            formData={formData}
            keyNameToSetTheState="Oficina"
            setEditImage={setEditImage}
            subKeyNameToSetTheState="LimpiarPC"
          />
        ) : (
          <EditImageFileForm
            keyNameToSetTheState="Oficina"
            setFilestToTransform={setFilestToTransform}
            subKeyNameToSetTheState="LimpiarPC"
          />
        )
      ) : (
        <EditImageFileForm
          keyNameToSetTheState="Oficina"
          setFilestToTransform={setFilestToTransform}
          subKeyNameToSetTheState="LimpiarPC"
        />
      )}

      <FormLabel fontWeight="bold" mt="20px">
        Acomodar Cables
      </FormLabel>
      {thisIsAFormToEdit ? (
        !editImage.AcomodarCables ? (
          <ShowImageInEditForm
            editImage={editImage}
            formData={formData}
            keyNameToSetTheState="Oficina"
            setEditImage={setEditImage}
            subKeyNameToSetTheState="AcomodarCables"
          />
        ) : (
          <EditImageFileForm
            keyNameToSetTheState="Oficina"
            setFilestToTransform={setFilestToTransform}
            subKeyNameToSetTheState="AcomodarCables"
          />
        )
      ) : (
        <EditImageFileForm
          keyNameToSetTheState="Oficina"
          setFilestToTransform={setFilestToTransform}
          subKeyNameToSetTheState="AcomodarCables"
        />
      )}

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

export default Oficina;
