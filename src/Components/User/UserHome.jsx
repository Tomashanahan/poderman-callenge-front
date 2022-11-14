import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
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
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: user,
		}).then((res) => setAllUserVisitsInfo(res.data));
	};

	useEffect(() => {
		getAllVisitedInfo();
	}, []);

	const FieldRender = (visitInfo) => {
		return Object.entries(visitInfo.visitInfo).map(([key, value]) => {
			if (
				["createdAt", "id", "preference_id", "updatedAt", "UserId"].includes(
					key
				)
			) {
				return <></>;
			}
			return value?.startsWith("https://") ? (
				<Flex
					align="center"
					gap="20px"
					justify="space-between"
					borderBottom="1px solid #8E8E8E"
				>
					<Text key={visitInfo.visitInfo.createdAt}>{key}</Text>
					<Image
						src={value}
						w="100px"
						h="100px"
						borderRadius="8px"
						objectFit={"cover"}
					/>
				</Flex>
			) : (
				<Flex
					key={visitInfo.visitInfo.createdAt}
					borderBottom="1px solid #8E8E8E"
					h="100px"
					align="center"
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
			const storeAllTheVisitsInformation = Object.entries(
				allUserVisitsInfo
			).map(([key, value]) => (
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
						<Box
							fontSize="20px"
							cursor="pointer"
							color="black"
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
		<Box w={["90%","90%","80%","60%"]} m="auto" my="40px" minH="600px">
			{showModal && (
				<FormModal
					getAllVisitedInfo={getAllVisitedInfo}
					formToShow={formSelected}
					clouseModal={setShowModal}
					thisIsAFormToEdit={thisIsAFormToEdit}
				/>
			)}
			<Box>
				{calcValuesToComplete().length ? (
					<>
						<Text fontWeight="extrabold" mb="20px" fontSize={["24px","25px","30px","30px"]}>
							Visita Existente
						</Text>
						<Box mb="60px">
							<Text mb="10px" fontSize={["10px","12px","15px","15px"]}>Campos que quedan por completar</Text>
							<Flex gap="50px">
								<Select
									placeholder="Selecciona un campo a completar"
									textTransform="capitalize"
									onChange={(e) => {
										setformSelected(e.target.value);
									}}
								>
									{calcValuesToComplete()?.map((element) => (
										<option value={element}>
											{element.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}
										</option>
									))}
								</Select>
								<Button
									bg={"blue.400"}
									color={"white"}
									_hover={{
										bg: "blue.500",
									}}
									fontSize={["12px","12px","15px","15px"]}
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
							bg={"blue.400"}
							color={"white"}
							_hover={{
								bg: "blue.500",
							}}
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
