import { Input } from "@chakra-ui/react";
import React from "react";

function EditImageFileForm({
	setFilestToTransform,
	keyNameToSetTheState,
	subKeyNameToSetTheState,
}) {
	return (
		<Input
			border="none"
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
			css={{
				"&::-webkit-file-upload-button": {
					color: "black",
					borderRadius: "6px",
					padding: "10px",
					cursor: "pointer",
					border: "none",
					marginRight: "30px",
				},
				"&::-webkit-file-upload-text": {
					color: "blue",
				},
			}}
		/>
	);
}

export default EditImageFileForm;
