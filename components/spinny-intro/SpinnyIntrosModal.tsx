import {
	Box,
	Grid,
	GridItem,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
	UseDisclosureReturn,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import type { ClientInfo } from "../../server/main";
import { config } from "../../utils/config";
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

	useEffect(() => {
		const onKeydown = (e: KeyboardEvent) => {
			if (!spinnyIntroReady) return;

			switch (e.key) {
				case "a":
				case "ArrowLeft":
					if (selectedIntroIndex <= 0) break;
					setSelectedIntroIndex(selectedIntroIndex - 1);
					break;

				case "d":
				case "ArrowRight":
					if (selectedIntroIndex >= SpinnyIntros.length - 1) break;
					setSelectedIntroIndex(selectedIntroIndex + 1);
					break;
			}
		};

		document.addEventListener("keydown", onKeydown);

		return () => {
			document.removeEventListener("keydown", onKeydown);
		};
	}, [spinnyIntroReady, selectedIntroIndex]);

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
				overflow={"hidden"}
			>
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
						{spinnyIntro.changes.length > 0 ? (
							<>
								<Box mb={8}>
									<Text fontWeight={700} opacity={1} ml={4}>
										changes:
									</Text>
									{spinnyIntro.changes.map((text, i) => (
										<Text
											key={i}
											opacity={0.6}
											fontWeight={700}
											fontSize={14}
											fontFamily={
												"var(--chakra-fonts-monospace)"
											}
										>
											• {text}
										</Text>
									))}
								</Box>
							</>
						) : (
							<></>
						)}
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
