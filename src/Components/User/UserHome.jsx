import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, Flex, Image, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import FormModal from "../FormModal/FormModal";
import CountdownTimer from "../Counter/CountDownTimer";

function UserHome() {
	const user = JSON.parse(localStorage.getItem("userInfo"));
	const token = JSON.parse(localStorage.getItem("token"));
	// const [allUserVisitsInfo, setAllUserVisitsInfo] = useState({});
	const [allUserVisitsInfo, setAllUserVisitsInfo] = useState({
    "casaPrincipal": {
        "id": 23,
        "preference_id": null,
        "RackPrincipalLimpieza": "https://res.cloudinary.com/dh9f1aicj/image/upload/v1668105054/r7cbjcnoy3u44bgraxxk.jpg",
        "RackPrincipalOrden": "https://res.cloudinary.com/dh9f1aicj/image/upload/v1668106402/yueysjutrmu5meejza1s.png",
        "FuncionamientoAP": "No",
        "FuncionamientoTelefono": "No",
        "UPS": "No",
        "createdAt": "2022-11-10T20:20:07.001Z",
        "updatedAt": "2022-11-10T20:20:07.039Z",
        "UserId": 1
    },
    "exAgroinsumos": {
        "id": 18,
        "preference_id": null,
        "RackPrincipalLimpieza": "https://res.cloudinary.com/dh9f1aicj/image/upload/v1668105669/dgwcvz1jmeikc1gzyhlq.jpg",
        "RackPrincipalOrden": "https://res.cloudinary.com/dh9f1aicj/image/upload/v1668105670/wuit9ryiiczylnfivkus.png",
        "FuncionamientoAP": "No",
        "createdAt": "2022-11-10T19:49:58.810Z",
        "updatedAt": "2022-11-10T19:49:58.822Z",
        "UserId": 1
    },
    "taller": {
        "id": 14,
        "preference_id": null,
        "RackPrincipalLimpieza": "https://res.cloudinary.com/dh9f1aicj/image/upload/v1668108460/mqnii2dk2r4dwmm1rbwo.png",
        "RackPrincipalOrden": "https://res.cloudinary.com/dh9f1aicj/image/upload/v1668108461/dm8czdjr1kisxu3jqtfh.jpg",
        "FuncionamientoTelefono": "No",
        "FuncionamientoAP": "Si",
        "createdAt": "2022-11-10T19:44:26.411Z",
        "updatedAt": "2022-11-10T19:44:26.455Z",
        "UserId": 1
    }
});
	const [formSelected, setformSelected] = useState("");
	const [thisIsAFormToEdit, setThisIsAFormToEdit] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [allInfoToRender, setAllInfoToRender] = useState([]);

	const updateAllInfoToRender = useCallback(() =>{
		const result = Object.entries(allUserVisitsInfo)?.map(([key, visitInfo]) => Object.entries(visitInfo).filter(([key]) =>
		!["id", "preference_id", "updatedAt", "UserId"].includes(
			key
		)
	).map(([key, value])=> {
		if (key === "createdAt"){
			return <></>;
		}
		return value?.startsWith("https://") ? (
			<Flex align="center" gap="20px" justify="space-between">
				<Text key={visitInfo.createdAt}>{key}</Text>
				<Image
					src={value}
					w="150px"
					h="100px"
					borderRadius="8px"
					objectFit={"contain"}
				/>
			</Flex>
		) : (
			<Text key={visitInfo.createdAt}>
				{key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}:{" "}
				<Text as="span" fontWeight="extrabold">
					{value}
				</Text>
			</Text>
		);
		}));
		setAllInfoToRender(result);
	},[allUserVisitsInfo])

	const getAllVisitedInfo = () => {
		axios("http://localhost:8080/userForm", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: user,
		}).then((res) => setAllUserVisitsInfo(res.data));
	};

	// useEffect(() => {
	// 	getAllVisitedInfo();
	// }, []);

	useEffect(()=> {
		updateAllInfoToRender()
	}, [allUserVisitsInfo])

	// const iterateCategoriesKeys = (object) => {
	// 	return Object.entries(object)
	// 		.filter(([key, value]) =>
	// 			!["id", "preference_id", "updatedAt", "UserId"].includes(
	// 				key
	// 			)
	// 		)
	// 		.map(([key, value]) => {
	// 			if (key === "createdAt"){
	// 				return <></>;
	// 			}
	// 			return value?.startsWith("https://") ? (
	// 				<Flex align="center" gap="20px" justify="space-between">
	// 					<Text key={object.createdAt}>{key}</Text>
	// 					<Image
	// 						src={value}
	// 						w="150px"
	// 						h="100px"
	// 						borderRadius="8px"
	// 						objectFit={"contain"}
	// 					/>
	// 				</Flex>
	// 			) : (
	// 				<Text key={object.createdAt}>
	// 					{key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}:{" "}
	// 					<Text as="span" fontWeight="extrabold">
	// 						{value}
	// 					</Text>
	// 				</Text>
	// 			);
	// 			// }
	// 		});
	// };

	const mapAllInfoVisit = () => {
		if (Object.keys(allUserVisitsInfo).length > 0) {
			console.log("allUserVisitsInfo:", allUserVisitsInfo);
			const storeAllTheVisitsInformation = Object.entries(allUserVisitsInfo).map(
				([key, value]) => (
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
								onClick={() => {
									setformSelected(key);
									setThisIsAFormToEdit(true);
									setShowModal(true);
								}}
							>
								<AiFillEdit />
							</Box>
						</Flex>
						<Box ml="10px">{allInfoToRender.map(elem => elem)}</Box>
					</Box>
				)
			);

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
				<FormModal
					getAllVisitedInfo={getAllVisitedInfo}
					setShowModal={setShowModal}
					formToShow={formSelected}
					clouseModal={setShowModal}
					thisIsAFormToEdit={thisIsAFormToEdit}
				/>
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
							onClick={() => {
								setShowModal(formSelected !== "" && true);
								setThisIsAFormToEdit(false);
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
