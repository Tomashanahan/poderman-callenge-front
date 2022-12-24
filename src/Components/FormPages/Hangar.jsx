import axios from "axios";
import {Box, Button, Flex, FormLabel, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

import FormSelectOption from "../Commons/FormSelectOption";
import ShowImageInEditForm from "../Commons/ShowImageInEditForm";
import EditImageFileForm from "../Commons/EditImageFileForm";

function Hangar({thisIsAFormToEdit, getAllVisitedInfo, clouseModal}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo?.signature;
  const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo?.timestamp;
  const [loading, setLoading] = useState(false);
  const [filestToTransform, setFilestToTransform] = useState({Hangar: {}});
  const [formErrors, setFormErrors] = useState("");
  const [editImage, setEditImage] = useState({
    RackPrincipalLimpieza: false,
    RackPrincipalOrden: false,
  });
  const [idForUpdate, setIdForUpdate] = useState();
  const [formData, setFormData] = useState({
    FuncionamientoAP: "",
    FuncionamientoTelefono: "",
    RackPrincipalLimpieza: "",
    RackPrincipalOrden: "",
  });

  useEffect(() => {
    if (thisIsAFormToEdit) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/hangar`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIdForUpdate(res.data.hangar.preference_id);
          setFormData({
            FuncionamientoAP: res.data.hangar.FuncionamientoAP,
            FuncionamientoTelefono: res.data.hangar.FuncionamientoTelefono,
            RackPrincipalLimpieza: res.data.hangar.RackPrincipalLimpieza,
            RackPrincipalOrden: res.data.hangar.RackPrincipalOrden,
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
          [subKey]: cloudinaryResponse.data.secure_url,
        };
      }
    }

    return stateFormCopy;
  };

  const handleSubmit = async () => {
    let checkingIfIsInEditMode = !thisIsAFormToEdit
      ? Object.values(filestToTransform.Hangar).length === 2
      : true;

    if (
      checkingIfIsInEditMode &&
      formData.FuncionamientoTelefono !== "" &&
      formData.FuncionamientoAP !== ""
    ) {
      Swal.fire({
        confirmButtonText: "Save",
        showCancelButton: true,
        title: "¿Estás de acuerdo con guardar los cambios?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          let result = await apploadImage();

          if (thisIsAFormToEdit) {
            await axios.patch(
              `${process.env.REACT_APP_BACKEND_URL}/hangar/${idForUpdate}`,
              result,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );
          } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hangar`, result, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }

          setFormData({
            FuncionamientoAP: "",
            FuncionamientoTelefono: "",
            RackPrincipalLimpieza: "",
            RackPrincipalOrden: "",
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
        Rack Principal (limpieza)
      </FormLabel>
      {thisIsAFormToEdit ? (
        !editImage.RackPrincipalLimpieza ? (
          <ShowImageInEditForm
            editImage={editImage}
            formData={formData}
            keyNameToSetTheState="RackPrincipalLimpieza"
            setEditImage={setEditImage}
          />
        ) : (
          <EditImageFileForm
            keyNameToSetTheState="Hangar"
            setFilestToTransform={setFilestToTransform}
            subKeyNameToSetTheState="RackPrincipalLimpieza"
          />
        )
      ) : (
        <EditImageFileForm
          keyNameToSetTheState="Hangar"
          setFilestToTransform={setFilestToTransform}
          subKeyNameToSetTheState="RackPrincipalLimpieza"
        />
      )}

      <FormLabel fontWeight="bold" mt="20px">
        Rack Principal (orden)
      </FormLabel>
      {thisIsAFormToEdit ? (
        !editImage.RackPrincipalOrden ? (
          <ShowImageInEditForm
            editImage={editImage}
            formData={formData}
            keyNameToSetTheState="RackPrincipalOrden"
            setEditImage={setEditImage}
          />
        ) : (
          <EditImageFileForm
            keyNameToSetTheState="Hangar"
            setFilestToTransform={setFilestToTransform}
            subKeyNameToSetTheState="RackPrincipalOrden"
          />
        )
      ) : (
        <EditImageFileForm
          keyNameToSetTheState="Hangar"
          setFilestToTransform={setFilestToTransform}
          subKeyNameToSetTheState="RackPrincipalOrden"
        />
      )}

      <FormLabel fontWeight="bold" mt="20px">
        Funcionamiento AP
      </FormLabel>
      <FormSelectOption
        formData={formData}
        formDataKeyName="FuncionamientoAP"
        setFormData={setFormData}
        setFormErrors={setFormErrors}
      />

      <FormLabel fontWeight="bold" mt="20px">
        Funcionamiento teléfono
      </FormLabel>
      <FormSelectOption
        formData={formData}
        formDataKeyName="FuncionamientoTelefono"
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

export default Hangar;
