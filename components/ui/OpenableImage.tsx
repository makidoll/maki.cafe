import {
	Modal,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";

export default function OpenableImage(
	props: ImageProps & {
		imageWidth: number;
		imageHeight: number;
		modalW?: string;
		modalH?: string;
	},
) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Image
				{...(props as any)}
				style={{ cursor: "pointer" }}
				onClick={onOpen}
				src={props.src}
				alt={props.alt}
				width={props.width}
				height={props.height}
				blurDataURL={props.blurDataURL}
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
					position={"relative"}
				>
					{/* <ModalCloseButton color={"white"} /> */}
					<Image
						alt={props.alt}
						// fill={true}
						src={props.src}
						width={props.imageWidth}
						height={props.imageHeight}
						blurDataURL={props.blurDataURL}
						style={{
							aspectRatio: `${props.imageWidth} / ${props.imageHeight}`,
							width: "auto",
							height: "auto",
							maxWidth: "100%",
							maxHeight: "100%",
							borderRadius: 8,
						}}
					/>
					{/* <Image
						{...(props as any)}
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
					></Image> */}
				</ModalContent>
			</Modal>
		</>
	);
}
