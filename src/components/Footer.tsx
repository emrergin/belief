import customStyles from "@/styles/Custom.module.css";

function Footer() {
	return (
		<footer className={customStyles.footer}>
			<a href="https://github.com/emrergin" target="_blank">
				Emre Ergin
			</a>{" "}
			tarafından yapılmıştır.
		</footer>
	);
}

export default Footer;
