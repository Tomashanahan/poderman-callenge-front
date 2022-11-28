import {useEffect, useState} from "react";
import {Box, Button, Flex, Image, Select, Text} from "@chakra-ui/react";
import axios from "axios";
import {AiFillEdit} from "react-icons/ai";

import FormModal from "../FormModal/FormModal";

function UserHome() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [allUserVisitsInfo, setAllUserVisitsInfo] = useState({});
  const [formSelected, setformSelected] = useState("");
  const [thisIsAFormToEdit, setThisIsAFormToEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getAllVisitedInfo = () => {
    axios(`${process.env.REACT_APP_BACKEND_URL}/userForm`, {
      body: user,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setAllUserVisitsInfo(res.data);
    });
  };

  useEffect(() => {
    getAllVisitedInfo();
  }, []);

  const FieldRender = (visitInfo) => {
    return Object.entries(visitInfo.visitInfo).map(([key, value]) => {
      if (["createdAt", "id", "preference_id", "updatedAt", "UserId"].includes(key)) {
        return <></>;
      }

      return value?.startsWith("https://") ? (
        <Flex align="center" borderBottom="1px solid #8E8E8E" gap="20px" justify="space-between">
          <Text key={visitInfo.visitInfo.createdAt}>{key}</Text>
          <Image borderRadius="8px" h="100px" objectFit={"cover"} src={value} w="100px" />
        </Flex>
      ) : (
        <Flex
          key={visitInfo.visitInfo.createdAt}
          align="center"
          borderBottom="1px solid #8E8E8E"
          h="100px"
        >
          <Text>
            {key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}:{" "}
            <Text as="span" fontWeight="extrabold">
              {value}
            </Text>
          </Text>
        </Flex>
      );
    });
  };

  const mapAllInfoVisit = () => {
    if (Object.keys(allUserVisitsInfo).length > 0) {
      const storeAllTheVisitsInformation = Object.entries(allUserVisitsInfo).map(([key, value]) => (
        <Box key={key}>
          <Flex
            align="center"
            bg="#EDF2F6"
            borderRadius="8px"
            justify="space-between"
            mb="10px"
            mt="20px"
            p="10px"
          >
            <Text color="black" fontWeight="extrabold" textTransform="capitalize">
              {key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}
            </Text>
            <Box
              color="black"
              cursor="pointer"
              fontSize="20px"
              onClick={() => {
                setformSelected(key);
                setThisIsAFormToEdit(true);
                setShowModal(true);
                window.scrollTo(0, 0);
              }}
            >
              <AiFillEdit />
            </Box>
          </Flex>
          <Box ml="10px">
            <FieldRender visitInfo={value} />
          </Box>
        </Box>
      ));

      return storeAllTheVisitsInformation;
    } else {
      return (
        <Text fontSize="17px" textAlign="center">
          No se encuentran campos completados
        </Text>
      );
    }
  };

  const calcValuesToComplete = () => {
    let allNecessaryInfo = [
      "casaPrincipal",
      "exAgroinsumos",
      "taller",
      "hangar",
      "oficina",
      "balanza",
      "agroinsumos",
      "camaras",
    ];
    let infoCompleted = Object.keys(allUserVisitsInfo);
    let concatedInfo = [...allNecessaryInfo, ...infoCompleted];

    return concatedInfo.filter((e) => {
      return !infoCompleted.includes(e);
    });
  };

  return (
    <Box m="auto" minH="600px" my="40px" w={["90%", "90%", "80%", "60%"]}>
      {showModal && (
        <FormModal
          clouseModal={setShowModal}
          formToShow={formSelected}
          getAllVisitedInfo={getAllVisitedInfo}
          thisIsAFormToEdit={thisIsAFormToEdit}
        />
      )}
      <Box>
        {calcValuesToComplete().length ? (
          <>
            <Text fontSize={["24px", "25px", "30px", "30px"]} fontWeight="extrabold" mb="20px">
              Visita Existente
            </Text>
            <Box mb="60px">
              <Text fontSize={["10px", "12px", "15px", "15px"]} mb="10px">
                Campos que quedan por completar
              </Text>
              <Flex gap="50px">
                <Select
                  placeholder="Selecciona un campo a completar"
                  textTransform="capitalize"
                  value={formSelected}
                  onChange={(e) => {
                    setformSelected(e.target.value);
                  }}
                >
                  {calcValuesToComplete()?.map((element, i) => (
                    <option key={i} value={element}>
                      {element.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}
                    </option>
                  ))}
                </Select>
                <Button
                  _hover={{
                    bg: "blue.500",
                  }}
                  bg={"blue.400"}
                  color={"white"}
                  fontSize={["12px", "12px", "15px", "15px"]}
                  onClick={() => {
                    setShowModal(formSelected !== "" && true);
                    setThisIsAFormToEdit(false);
                  }}
                >
                  Completar
                </Button>
              </Flex>
            </Box>
          </>
        ) : (
          <Box>
            <Button
              _hover={{
                bg: "blue.500",
              }}
              bg={"blue.400"}
              color={"white"}
              mb="40px"
              p="30px"
              onClick={() => {}}
            >
              Cerrar Visita
            </Button>
          </Box>
        )}
        {mapAllInfoVisit()}
      </Box>
    </Box>
  );
}

export default UserHome;
