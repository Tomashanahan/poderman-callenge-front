import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import FormModal from "../FormModal/FormModal";
import CountdownTimer from "../Counter/CountDownTimer";

function UserHome() {
	const user = JSON.parse(localStorage.getItem("userInfo"));
	const token = JSON.parse(localStorage.getItem("token"));
	const [allUserVisitsInfo, setAllUserVisitsInfo] = useState([]);
	const [formSelected, setformSelected] = useState("");
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		axios("http://localhost:8080/userForm", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: user,
		}).then((res) => setAllUserVisitsInfo(res.data));
	}, []);

	const iterateCategoriesKeys = (object) => {
		let storeAllTheKeys = [];
		for (const key in object) {
			if (object[key] === null) {
				continue;
			}
			if (
				key !== "id" &&
				key !== "preference_id" &&
				key !== "createdAt" &&
				key !== "updatedAt" &&
				key !== "UserId"
			) {
				storeAllTheKeys.push(
					object[key]?.startsWith("https://") ? (
						<Flex align="center" gap="20px" justify="space-between">
							<Text key={object.createdAt}>{key}</Text>
							<Image src={object[key]} w="150px" h="100px" borderRadius="8px"  objectFit={'contain'} />
						</Flex>
					) : (
						<Text key={object.createdAt}>
							{key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}: <Text as="span" fontWeight="extrabold">{object[key]}</Text>
						</Text>
					)
				);
			}
		}
		return storeAllTheKeys;
	};
	const mapAllInfoVisit = () => {
		if (Object.keys(allUserVisitsInfo).length > 0) {
			let storeAllTheVisitsInformation = [];
			for (const key in allUserVisitsInfo) {
				storeAllTheVisitsInformation.push(
					<Box key={key}>
						<Flex
							justify="space-between"
							align="center"
							mt="20px"
							mb="10px"
							bg="#EDF2F6"
							p="10px"
							borderRadius="8px"
						>
							<Text
								fontWeight="extrabold"
								textTransform="capitalize"
								color="black"
							>
								{key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}
							</Text>
							<Box fontSize="20px" cursor="pointer">
								<AiFillEdit />
							</Box>
						</Flex>
						<Box ml="10px">{iterateCategoriesKeys(allUserVisitsInfo[key])}</Box>
					</Box>
				);
			}
			return storeAllTheVisitsInformation;
		} else {
			return (
				<Text textAlign="center" fontSize="17px">
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
		<Box w="60%" m="auto" my="40px" minH="600px">
			{showModal && (
				<FormModal formToShow={formSelected} clouseModal={setShowModal} />
			)}
			<CountdownTimer />
			<Box>
				<Text fontWeight="extrabold" mb="20px" fontSize="30px">
					Visita Existente
				</Text>
				<Box mb="60px">
					<Text mb="10px">Campos que quedan por completar</Text>
					<Flex gap="50px">
						<Select
							placeholder="Selecciona un campo a completar"
							textTransform="capitalize"
							onChange={(e) => {
								setformSelected(e.target.value);
							}}
						>
							{calcValuesToComplete()?.map((element) => (
								<option value={element}>{element.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</option>
							))}
						</Select>
						<Button
							bg={"blue.400"}
							color={"white"}
							_hover={{
								bg: "blue.500",
							}}
							onClick={() => {
								setShowModal(formSelected !== "" && true);
							}}
						>
							Completar
						</Button>
					</Flex>
				</Box>
				{mapAllInfoVisit()}
			</Box>
		</Box>
	);
}

export default UserHome;
