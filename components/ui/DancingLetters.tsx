import { chakra } from "@chakra-ui/react";
import styles from "./DancingLetters.module.scss";

export default function DancingLetters(props: { children: string }) {
	const letters = props.children ?? "";
	return (
		<>
			{letters.split("").map((letter, i) => (
				<chakra.span
					key={i}
					className={styles.letter}
					style={{
						animationDelay: (letters.length - i) * -100 + "ms",
						display: letter == " " ? "initial" : "",
					}}
				>
					{letter}
				</chakra.span>
			))}
		</>
	);
}
