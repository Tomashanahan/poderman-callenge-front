import {Button} from "@chakra-ui/react";
// import {Input} from "@chakra-ui/react";

function UploadFileButton() {
  return (
    <Button bg={"#E2E8F0"} cursor="pointer" p="6px 12px">
      Subir Imagen
      {/* <Input color="black" type={thisIsAFormToEdit ? "text" : "file"} /> */}
    </Button>
  );
}

export default UploadFileButton;
