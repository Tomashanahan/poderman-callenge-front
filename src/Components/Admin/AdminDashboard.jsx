import {useEffect} from "react";
import {
  Box,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import {useState} from "react";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchInfo = async () => {
    const result = await axios(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllInformation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setData(result.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const mapAllColumnsNames = (objKey) => {
    return (
      objKey &&
      objKey.length > 0 &&
      Object.keys(objKey[0])
        .filter(
          (key) =>
            !["createdAt", "id", "preference_id", "updatedAt", "UserId", "User"].includes(key),
        )
        .map((i) => {
          return (
            <>
              <Th>{i.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}</Th>
            </>
          );
        })
    );
  };

  const mapAllRowValues = (objKey) => {
    return objKey?.map((e) => {
      return (
        <>
          <Tr>
            <Td>{e?.User?.fullName}</Td>
            {Object.keys(e)
              ?.filter(
                (key) =>
                  !["createdAt", "id", "preference_id", "updatedAt", "UserId", "User"].includes(
                    key,
                  ),
              )
              .map((i) => {
                if (e[i]?.startsWith("https://")) {
                  return (
                    <>
                      <Td p="0">
                        <Image
                          alt="Image"
                          h="60px"
                          ml="25px"
                          objectFit="contain"
                          src={e[i]}
                          w="60px"
                        />
                      </Td>
                    </>
                  );
                } else {
                  return <Td key={i}>{e[i]}</Td>;
                }
              })}
          </Tr>
        </>
      );
    });
  };

  return (
    <>
      {data?.casaPrincipal?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Casa Principal
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.casaPrincipal)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.casaPrincipal)}</Tbody>
          </Table>
        </TableContainer>
      )}

      {data?.exAgroinsumos?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Ex Agroinsumos
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.exAgroinsumos)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.exAgroinsumos)}</Tbody>
          </Table>
        </TableContainer>
      )}

      {data?.taller?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Taller
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.taller)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.taller)}</Tbody>
          </Table>
        </TableContainer>
      )}

      {data?.hangar?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Hangar
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.hangar)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.hangar)}</Tbody>
          </Table>
        </TableContainer>
      )}

      {data?.oficina?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Hangar Oficina
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.oficina)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.oficina)}</Tbody>
          </Table>
        </TableContainer>
      )}

      {data?.balanza?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Hangar Oficina
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.balanza)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.balanza)}</Tbody>
          </Table>
        </TableContainer>
      )}

      {data?.agroinsumos?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Hangar Oficina
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.agroinsumos)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.agroinsumos)}</Tbody>
          </Table>
        </TableContainer>
      )}

      {data?.camaras?.length > 0 && (
        <TableContainer m="auto" my="20px" w="80%">
          <Box fontWeight="extrabold" mt="20px">
            Hangar Oficina
          </Box>
          <Table colorScheme="gray" variant="striped">
            <TableCaption>Lista de todas los campos completados por los equipos</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                {mapAllColumnsNames(data.camaras)}
              </Tr>
            </Thead>
            <Tbody justifyContent="center">{mapAllRowValues(data.camaras)}</Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default AdminDashboard;
