import customStyles from "@/styles/Custom.module.css";

function NSRExpression({
	nominator,
	inline = false,
	style,
}: {
	nominator: string;
	inline?: boolean;
	style?: React.CSSProperties;
}) {
	if (inline) {
		return (
			<span
				style={{
					display: "inline-block",
					marginTop: "0.6em",
					marginBottom: "0.8em",
					...style,
				}}
			>
				<div
					className={customStyles.fullExpression}
					style={{
						display: "inline-flex",
						alignSelf: "flex-start",
						verticalAlign: "top",
						height: "1.2em",
					}}
				>
					<div className={customStyles.outerBracket}>[</div>
					<div className={customStyles.one}>1</div>
					<div className={customStyles.minus}>-</div>
					<div className={customStyles.paranthesis}>(</div>
					<div className={customStyles.fraction}>
						<div>{nominator}</div>
						<hr />
						<div>100</div>
					</div>
					<div className={customStyles.paranthesis}>)</div>
					<sup className={customStyles.sup}>2</sup>
					<div className={customStyles.outerBracket}>]</div>
					<div className={customStyles.one}>x 100</div>
				</div>
			</span>
		);
	}
	return (
		<div className={customStyles.fullExpression} style={style}>
			<div className={customStyles.outerBracket}>[</div>
			<div className={customStyles.one}>1</div>
			<div className={customStyles.minus}>-</div>
			<div className={customStyles.paranthesis}>(</div>
			<div className={customStyles.fraction}>
				<div>{nominator}</div>
				<hr />
				<div>100</div>
			</div>
			<div className={customStyles.paranthesis}>)</div>
			<sup className={customStyles.sup}>2</sup>
			<div className={customStyles.outerBracket}>]</div>
			<div className={customStyles.one}>x 100</div>
		</div>
	);
}

export default NSRExpression;
