import {Box, Flex, Image} from "@chakra-ui/react";
import {AiFillEdit} from "react-icons/ai";

function ShowImageInEditForm({
  formData,
  editImage,
  setEditImage,
  keyNameToSetTheState,
  subKeyNameToSetTheState,
}) {
  return (
    <Flex align="center" justify="space-between" mx="10px">
      <Image
        alt="Image"
        h="100px"
        objectFit="contain"
        src={`${
          formData[keyNameToSetTheState][subKeyNameToSetTheState] !== undefined
            ? formData[keyNameToSetTheState][subKeyNameToSetTheState]
            : ""
        }`}
        w="100px"
      />
      <Box
        cursor="pointer"
        fontSize="20px"
        onClick={() => {
          console.log("holaa");
          setEditImage({...editImage, [subKeyNameToSetTheState]: true});
        }}
      >
        <AiFillEdit />
      </Box>
    </Flex>
  );
}

export default ShowImageInEditForm;
