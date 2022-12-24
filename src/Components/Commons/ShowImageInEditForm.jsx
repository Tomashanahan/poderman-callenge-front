import {Box, Flex, Image} from "@chakra-ui/react";
import {AiFillEdit} from "react-icons/ai";

function ShowImageInEditForm({formData, editImage, setEditImage, keyNameToSetTheState}) {
  return (
    <Flex align="center" justify="space-between" mx="10px">
      <Image
        alt="Image"
        h="100px"
        objectFit="contain"
        src={`${
          formData[keyNameToSetTheState] !== undefined ? formData[keyNameToSetTheState] : ""
        }`}
        w="100px"
      />
      <Box
        cursor="pointer"
        fontSize="20px"
        onClick={() => {
          setEditImage({...editImage, [keyNameToSetTheState]: true});
        }}
      >
        <AiFillEdit />
      </Box>
    </Flex>
  );
}

export default ShowImageInEditForm;
