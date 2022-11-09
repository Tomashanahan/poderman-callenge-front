import { Box, Text, Button } from "@chakra-ui/react";
import CasaPrincipal from "../FormPages/CasaPrincipal";
import ExAgroinsumos from "../FormPages/ExAgroinsumos";
import Taller from "../FormPages/Taller";
import Hangar from "../FormPages/Hangar";
import Oficina from "../FormPages/Oficina";
import Balanza from "../FormPages/Balanza";
import Agroinsumos from "../FormPages/Agroinsumos";
import Camaras from "../FormPages/Camaras";

function FormModal({ formToShow, clouseModal }) {
	console.log("formToShow:", formToShow);
	const FormTitles = {
		casaPrincipal: {
			title: "Casa Principal",
			component: <CasaPrincipal />,
		},
		exagroinsumos: {
			title: "ExAgroinsumos",
			component: <ExAgroinsumos />,
		},
		taller: {
			title: "Taller",
			component: <Taller />,
		},
		hangar: {
			title: "Hangar",
			component: <Hangar />,
		},
		oficina: {
			title: "Oficina",
			component: <Oficina />,
		},
		balanza: {
			title: "Balanza",
			component: <Balanza />,
		},
		agroinsumos: { title: "Agroinsumos", component: <Agroinsumos /> },
		camaras: {
			title: "Camaras",
			component: <Camaras />,
		},
	};

	return (
		<Box
			pos="absolute"
			bg="#FFFF"
			zIndex={1000}
			top="45%"
			boxShadow="-webkit-box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);
      -moz-box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);
      box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);"
			left="50%"
			w="61%"
			h="90%"
			borderRadius="8px"
			p="30px"
			transform="translate(-50%,-50%)"
		>
			<Button
				pos="absolute"
				right="30px"
				top="30px"
				onClick={() => clouseModal(false)}
			>
				X
			</Button>
			<Text fontSize="30px" fontWeight="bold">
				{FormTitles[formToShow]?.title}
			</Text>
			{FormTitles[formToShow]?.component}
		</Box>
	);
}

export default FormModal;
