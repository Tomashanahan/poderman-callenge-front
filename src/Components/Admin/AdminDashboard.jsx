import React from "react";
import useFetch from "../../hooks/useFetch";
import { Box, SimpleGrid } from '@chakra-ui/react';

function AdminDashboard() {
	const [data] = useFetch("http://localhost:8080/admin/getAllInformation");
	console.log("data:", data);

	return (
    <SimpleGrid columns={3} w="60%" m="auto" bg="red">
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
    </SimpleGrid>
  );
}

export default AdminDashboard;
