export function XIcon({ width, height }: { width: number; height: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 14 14"
		>
			<g fill="none" stroke="#222" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="7" cy="7" r="4.5"></circle>
				<circle cx="7" cy="7" r=".5"></circle>
				<path d="M7 2.5v-2m0 13v-2M11.5 7h2M.5 7h2"></path>
			</g>
		</svg>
	);
}
