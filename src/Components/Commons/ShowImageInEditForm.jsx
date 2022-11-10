import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";

function ShowImageInEditForm({
	formData,
	editImage,
	setEditImage,
	keyNameToSetTheState,
	subKeyNameToSetTheState,
}) {
	return (
		<Flex justify="space-between" align="center" mx="10px">
			<Image
				src={`${
					formData[keyNameToSetTheState][subKeyNameToSetTheState] !== undefined
						? formData[keyNameToSetTheState][subKeyNameToSetTheState]
						: ""
				}`}
				alt="Image"
				h="100px"
				w="100px"
				objectFit="contain"
			/>
			<Box
				onClick={() => {
					console.log("holaa");
					setEditImage({ ...editImage, [subKeyNameToSetTheState]: true });
				}}
				cursor="pointer"
				fontSize="20px"
			>
				<AiFillEdit />
			</Box>
		</Flex>
	);
}

export default ShowImageInEditForm;
