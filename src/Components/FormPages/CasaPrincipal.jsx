import axios from "axios";
import {useState} from "react";
import {Box, Button, Flex, FormLabel, Text} from "@chakra-ui/react";
import {useEffect} from "react";
import Swal from "sweetalert2";

import FormSelectOption from "../Commons/FormSelectOption";
import EditImageFileForm from "../Commons/EditImageFileForm";
import ShowImageInEditForm from "../Commons/ShowImageInEditForm";

function CasaPrincipal({thisIsAFormToEdit, getAllVisitedInfo, clouseModal}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const signature = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo?.signature;
  const timestamp = JSON.parse(localStorage.getItem("userInfo"))?.cloudinaryInfo?.timestamp;

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [idForUpdate, setIdForUpdate] = useState();
  const [filestToTransform, setFilestToTransform] = useState({});
  const [editImage, setEditImage] = useState({
    RackPrincipalLimpieza: false,
    RackPrincipalOrden: false,
  });

  const [formData, setFormData] = useState({
    FuncionamientoAP: "",
    FuncionamientoTelefono: "",
    RackPrincipalLimpieza: "",
    RackPrincipalOrden: "",
    UPS: "",
  });

  useEffect(() => {
    if (thisIsAFormToEdit) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/casa-principal`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIdForUpdate(res.data.casaPrincipal.preference_id);
          setFormData({
            FuncionamientoAP: res.data.casaPrincipal.FuncionamientoAP,
            FuncionamientoTelefono: res.data.casaPrincipal.FuncionamientoTelefono,
            RackPrincipalLimpieza: res.data.casaPrincipal.RackPrincipalLimpieza,
            RackPrincipalOrden: res.data.casaPrincipal.RackPrincipalOrden,
            UPS: res.data.casaPrincipal.UPS,
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
      ? Object.values(filestToTransform.CasaPrincipal).length === 2
      : true;

    if (
      checkingIfIsInEditMode &&
      formData.FuncionamientoAP !== "" &&
      formData.FuncionamientoTelefono !== "" &&
      formData.UPS !== ""
    ) {
      Swal.fire({
        confirmButtonText: "Save",
        showCancelButton: true,
        title: "??Est??s de acuerdo con guardar los cambios?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          let result = await apploadImage();

          if (thisIsAFormToEdit) {
            await axios.patch(
              `${process.env.REACT_APP_BACKEND_URL}/casa-principal/${idForUpdate}`,
              result,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );
          } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/casa-principal`, result, {
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
            UPS: "",
          });
          setLoading(false);
          await getAllVisitedInfo();
          clouseModal(false);
          window.scrollTo(0, 0);

          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      setFormErrors("Complete todos los campor por favor");
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
            keyNameToSetTheState="CasaPrincipal"
            setFilestToTransform={setFilestToTransform}
            subKeyNameToSetTheState="RackPrincipalLimpieza"
          />
        )
      ) : (
        <EditImageFileForm
          keyNameToSetTheState="CasaPrincipal"
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
            keyNameToSetTheState="RackPrincipalOrden"
            setFilestToTransform={setFilestToTransform}
          />
        )
      ) : (
        <EditImageFileForm
          keyNameToSetTheState="RackPrincipalOrden"
          setFilestToTransform={setFilestToTransform}
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
        Funcionamiento tel??fono
      </FormLabel>
      <FormSelectOption
        formData={formData}
        formDataKeyName="FuncionamientoTelefono"
        setFormData={setFormData}
        setFormErrors={setFormErrors}
      />
      <FormLabel fontWeight="bold" mt="20px">
        UPS
      </FormLabel>
      <FormSelectOption
        formData={formData}
        formDataKeyName="UPS"
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

export default CasaPrincipal;
