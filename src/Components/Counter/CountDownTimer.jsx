/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const CountdownTimer = () => {
	let countDown = localStorage.getItem("countDown");
	if (!countDown) {
		localStorage.setItem("countDown", "null");
	}
	const [remainingTime, setRemainingTime] = useState(
		localStorage.getItem("countDown")
	);
	const [myTimeOut, setMyTimeOut] = useState();

	useEffect(() => {
		if (countDown < 0) {
			localStorage.setItem("countDown", "null");
			clearTimeout(myTimeOut);
		} else if (countDown === "No hay mas tiempo") {
			localStorage.setItem("countDown", "No hay mas tiempo");
			clearTimeout(myTimeOut);
		} else if (countDown !== "null" && countDown > 0) {
			console.log("aaaaaa");
			setMyTimeOut(
				setTimeout(() => {
					setRemainingTime(remainingTime - 1000);
				}, 1000)
			);
			localStorage.setItem("countDown", JSON.stringify(remainingTime - 1000));
		}
	}, [remainingTime]);

	const getFormattedTime = (millisec) => {
		if (millisec === "null") {
			return (
				<Button
					bg={"blue.400"}
					color={"white"}
					_hover={{
						bg: "blue.500",
					}}
					mb="40px"
					p="30px"
					onClick={() => {
						localStorage.setItem(
							"countDown",
							JSON.stringify(1 * 24 * 60 * 60 * 1000)
						);
						setRemainingTime(localStorage.getItem("countDown"));
					}}
				>
					Crear una nueva visita
				</Button>
			);
		} else if (typeof millisec === "number" && millisec > 0) {
			let totalOfMillisec = parseInt(Math.floor(millisec / 1000));
			let totalOfMin = parseInt(Math.floor(totalOfMillisec / 60));
			let totalOfHours = parseInt(Math.floor(totalOfMin / 60));

			let seconds = parseInt(totalOfMillisec % 60);
			let minutes = parseInt(totalOfMin % 60);
			let hours = parseInt(totalOfHours % 24);

			return (
				<Flex align="center" gap="20px">
					<Box
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
						mb="40px"
						p="10px"
            w="200px"
            borderRadius="8px"
					>
						<Flex justify="center" align="center">
							<Box mx="10px">
								<Text textAlign="center" fontWeight="extrabold">{hours} :</Text>
								<Box>Hor</Box>
							</Box>
							<Box mx="10px">
								<Text textAlign="center" fontWeight="extrabold">{minutes} :</Text>
								<Box>Min</Box>
							</Box>
							<Box mx="10px">
								<Text textAlign="center" fontWeight="extrabold">{seconds}</Text>
								<Box>Seg</Box>
							</Box>
						</Flex>
					</Box>
					<Button
						bg={"red"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
						mb="40px"
						p="30px"
						onClick={() => {
							setRemainingTime("No hay mas tiempo");
							localStorage.setItem("countDown", "No hay mas tiempo");
							clearTimeout(myTimeOut);
						}}
					>
						Cerrar visita
					</Button>
				</Flex>
			);
		} else if (millisec === "No hay mas tiempo") {
			localStorage.setItem("countDown", "No hay mas tiempo");
			return <Text>No hay mas tiempo</Text>;
		}
	};

	return (
		<div className="countdown-timer">{getFormattedTime(remainingTime)}</div>
	);
};

export default CountdownTimer;
