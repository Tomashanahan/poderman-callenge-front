import { Box, Text, Button } from "@chakra-ui/react";
import CasaPrincipal from "../FormPages/CasaPrincipal";
import ExAgroinsumos from "../FormPages/ExAgroinsumos";
import Taller from "../FormPages/Taller";
import Hangar from "../FormPages/Hangar";
import Oficina from "../FormPages/Oficina";
import Balanza from "../FormPages/Balanza";
import Agroinsumos from "../FormPages/Agroinsumos";
import Camaras from "../FormPages/Camaras";

function FormModal({
	getAllVisitedInfo,
	formToShow,
	clouseModal,
	thisIsAFormToEdit,
}) {
	const FormTitles = {
		casaPrincipal: {
			title: "Casa Principal",
			component: (
				<CasaPrincipal
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
		exAgroinsumos: {
			title: "Ex Agroinsumos",
			component: (
				<ExAgroinsumos
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
		taller: {
			title: "Taller",
			component: (
				<Taller
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
		hangar: {
			title: "Hangar",
			component: (
				<Hangar
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
		oficina: {
			title: "Oficina",
			component: (
				<Oficina
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
		balanza: {
			title: "Balanza",
			component: (
				<Balanza
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
		agroinsumos: {
			title: "Agroinsumos",
			component: (
				<Agroinsumos
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
		camaras: {
			title: "Camaras",
			component: (
				<Camaras
					thisIsAFormToEdit={thisIsAFormToEdit}
					clouseModal={clouseModal}
					getAllVisitedInfo={getAllVisitedInfo}
				/>
			),
		},
	};

	return (
		<Box
			pos="absolute"
			bg="#FFFF"
			zIndex={1000}
			top="0px"
			boxShadow="-webkit-box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);
      -moz-box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);
      box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);"
			left="50%"
			w="61%"
			h="-webkit-fit-content"
			borderRadius="8px"
			p="30px"
			transform="translate(-50%, 0%)"
			overflowY="scroll"
		>
			<Button
				pos="absolute"
				right="30px"
				top="30px"
				bg="red"
				color="white"
				onClick={() => clouseModal(false)}
				_hover={{ bg: "red", color: "white" }}
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
