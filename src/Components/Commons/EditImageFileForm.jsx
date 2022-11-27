import {Input} from "@chakra-ui/react";

function EditImageFileForm({setFilestToTransform, keyNameToSetTheState, subKeyNameToSetTheState}) {
  return (
    <Input
      border="none"
      css={{
        "&::-webkit-file-upload-button": {
          border: "none",
          borderRadius: "6px",
          color: "black",
          cursor: "pointer",
          marginRight: "30px",
          padding: "10px",
        },
        "&::-webkit-file-upload-text": {
          color: "blue",
        },
      }}
      type="file"
      onChange={(e) => {
        e.preventDefault();
        setFilestToTransform((prevFiles) => ({
          ...prevFiles,
          [keyNameToSetTheState]: {
            ...prevFiles?.[keyNameToSetTheState],
            [subKeyNameToSetTheState]: e.target.files[0],
          },
        }));
      }}
    />
  );
}

export default EditImageFileForm;
