import {
	Image,
	ImageProps,
	Modal,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { StaticImageData } from "next/image";

export default function OpenableImage(
	props: ImageProps & {
		image: StaticImageData;
		modalW?: string;
		modalH?: string;
	},
) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { src, width, height } = props.image;

	return (
		<>
			<Image
				{...props}
				cursor="pointer"
				onClick={onOpen}
				src={src}
				alt={props.alt}
			/>
			<Modal onClose={onClose} isOpen={isOpen} isCentered size={"4xl"}>
				<ModalOverlay />
				<ModalContent
					background="transparent"
					shadow="none"
					h={props.modalW ?? "60vh"}
					w={props.modalH ?? "90vw"}
					pointerEvents="none"
					alignItems="center"
					justifyContent="center"
				>
					{/* <ModalCloseButton color={"white"} /> */}
					<Image
						{...props}
						src={props.image.src}
						alt={props.alt}
						borderRadius={8}
						_hover={{}}
						sx={{
							aspectRatio: `${width} / ${height}`,
						}}
						w="auto"
						h="auto"
						maxW="100%"
						maxH="100%"
					></Image>
				</ModalContent>
			</Modal>
		</>
	);
}
