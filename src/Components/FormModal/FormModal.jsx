import {Box, Text, Button} from "@chakra-ui/react";

import CasaPrincipal from "../FormPages/CasaPrincipal";
import ExAgroinsumos from "../FormPages/ExAgroinsumos";
import Taller from "../FormPages/Taller";
import Hangar from "../FormPages/Hangar";
import Oficina from "../FormPages/Oficina";
import Balanza from "../FormPages/Balanza";
import Agroinsumos from "../FormPages/Agroinsumos";
import Camaras from "../FormPages/Camaras";

function FormModal({getAllVisitedInfo, formToShow, clouseModal, thisIsAFormToEdit}) {
  const FormTitles = {
    agroinsumos: {
      component: (
        <Agroinsumos
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Agroinsumos",
    },
    balanza: {
      component: (
        <Balanza
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Balanza",
    },
    camaras: {
      component: (
        <Camaras
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Camaras",
    },
    casaPrincipal: {
      component: (
        <CasaPrincipal
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Casa Principal",
    },
    exAgroinsumo: {
      component: (
        <ExAgroinsumos
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Ex Agroinsumos",
    },
    hangar: {
      component: (
        <Hangar
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Hangar",
    },
    hangarOficina: {
      component: (
        <Oficina
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Oficina",
    },
    taller: {
      component: (
        <Taller
          clouseModal={clouseModal}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      ),
      title: "Taller",
    },
  };

  return (
    <Box
      bg="#FFF"
      borderRadius="8px"
      boxShadow="-webkit-box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);
      -moz-box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);
      box-shadow: 8px 8px 24px 0px rgba(148, 148, 156, 1);"
      color="black"
      h="-webkit-fit-content"
      left="50%"
      overflowY="scroll"
      p="30px"
      pos="absolute"
      top="60px"
      transform="translate(-50%, 0%)"
      w="61%"
      zIndex={1000}
    >
      <Button
        _hover={{bg: "red", color: "white"}}
        bg="red"
        color="white"
        pos="absolute"
        right="30px"
        top="30px"
        onClick={() => clouseModal(false)}
      >
        X
      </Button>
      <Text color="black" fontSize="30px" fontWeight="bold">
        {FormTitles[formToShow]?.title}
      </Text>
      {FormTitles[formToShow]?.component}
    </Box>
  );
}

export default FormModal;
