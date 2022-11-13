import { ReactNode } from "react";
import {
	Box,
	Flex,
	Avatar,
	Link,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useColorModeValue,
	Stack,
	useColorMode,
	Center,
	Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const navigation = useNavigate();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					{userInfo?.rol === "Admin" ? <Box>Admin</Box> : <Box></Box>}

					<Flex alignItems={"center"}>
						<Stack direction={"row"} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
							</Button>

							<Menu>
								<MenuButton
									as={Button}
									rounded={"full"}
									variant={"link"}
									cursor={"pointer"}
									minW={0}
								>
									<Avatar
										size={"sm"}
										src={"https://avatars.dicebear.com/api/male/username.svg"}
									/>
								</MenuButton>
								<MenuList alignItems={"center"}>
									<br />
									<Center>
										<Avatar
											size={"2xl"}
											src={"https://avatars.dicebear.com/api/male/username.svg"}
										/>
									</Center>
									<br />
									<Center>
										<Text textTransform="capitalize">{userInfo?.fullName}</Text>
									</Center>
									<br />
									<MenuDivider />
									<MenuItem
										onClick={() => {
											localStorage.removeItem("token");
											localStorage.removeItem("userInfo");
											navigation("/login");
										}}
									>
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
