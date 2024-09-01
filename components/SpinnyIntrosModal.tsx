import {
	Box,
	Grid,
	GridItem,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	UseDisclosureReturn,
	VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { ClientInfo } from "../server/main";
import { config } from "../utils/config";
import { SpinnyIntros, SpinnyIntrosSortedByYear } from "./spinny-intros";
import SpinnyIntro from "./SpinnyIntro";

const shortMonths = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const fullMonths = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function SelectorButton(props: {
	disabled: boolean;
	text: string;
	onClick: () => any;
}) {
	return (
		<Box
			background={"#444"}
			px={2}
			py={1}
			m={1}
			borderRadius={8}
			textAlign={"center"}
			fontWeight={700}
			cursor={props.disabled ? null : "pointer"}
			opacity={props.disabled ? 0.4 : 1}
			transition={config.styles.hoverTransition}
			transformOrigin={"center center"}
			_hover={{
				transform: props.disabled ? "" : "scale(1.05)",
			}}
			onClick={() => {
				if (props.disabled) return;
				props.onClick();
			}}
			userSelect={"none"}
		>
			{props.text}
		</Box>
	);
}

function SpinnyIntroSelector(props: {
	spinnyIntroReady: boolean;
	selectedIntroIndex: number;
	setSelectedIntroIndex: (i: number) => any;
}) {
	return (
		<VStack spacing={4}>
			{SpinnyIntrosSortedByYear.map(({ year, intros }) => (
				<VStack key={year} spacing={1}>
					<Heading size={"lg"} fontWeight={700}>
						{year}
					</Heading>
					<Grid templateColumns="repeat(5, 1fr)">
						{intros.map(intro => (
							<GridItem key={intro.index}>
								<SelectorButton
									disabled={
										!props.spinnyIntroReady ||
										props.selectedIntroIndex == intro.index
									}
									text={`${shortMonths[intro.date[1] - 1]} ${
										intro.date[2]
									}`}
									onClick={() => {
										props.setSelectedIntroIndex(
											intro.index,
										);
									}}
								/>
							</GridItem>
						))}
					</Grid>
				</VStack>
			))}
		</VStack>
	);
}

export default function SpinnyIntrosModal(props: {
	client: ClientInfo;
	disclosure: UseDisclosureReturn;
}) {
	const [spinnyIntroReady, setSpinnyIntroReady] = useState(false);

	const [selectedIntroIndex, setSelectedIntroIndex] = useState(0);

	const spinnyIntro = useMemo(() => {
		return SpinnyIntros[selectedIntroIndex];
	}, [selectedIntroIndex]);

	return (
		<Modal
			isOpen={props.disclosure.isOpen}
			onClose={props.disclosure.onClose}
			isCentered
			colorScheme="brand"
		>
			<ModalOverlay background={"rgba(17,17,17,0.7)"} />
			<ModalContent
				background={"#222"}
				width={"fit-content"}
				maxWidth={"fit-content"}
				borderRadius={16}
			>
				{/* TODO: should not do this based on user agent lmao */}
				{props.client.isMobile ? (
					<ModalCloseButton
						zIndex={999}
						color={`rgba(255,255,255,0.2)`}
					/>
				) : (
					<></>
				)}
				<ModalBody>
					<VStack spacing={0}>
						<SpinnyIntro
							h={600}
							mx={0}
							mt={-12}
							mb={-4}
							onReady={() => setSpinnyIntroReady(true)}
							onUnready={() => setSpinnyIntroReady(false)}
							client={props.client}
							intro={spinnyIntro}
							disableScaleTween
							disableAutoSpin
						/>
						{/* <Heading size={"lg"} mb={16}>
							{`${fullMonths[spinnyIntro.date[1] - 1]} ${
								spinnyIntro.date[2]
							}, ${spinnyIntro.date[0]}`}
						</Heading> */}
						<SpinnyIntroSelector
							spinnyIntroReady={spinnyIntroReady}
							selectedIntroIndex={selectedIntroIndex}
							setSelectedIntroIndex={setSelectedIntroIndex}
						/>
						<Text mt={8} mb={8} fontWeight={600} opacity={0.4}>
							there are more, but those used three.js
						</Text>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
