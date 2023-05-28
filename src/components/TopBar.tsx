import customStyles from "@/styles/Custom.module.css";

const phaseName = new Map();
phaseName.set("INTRO", "Giriş");
phaseName.set("INTRO2", "Giriş");
phaseName.set("MAIN", "Giriş");
phaseName.set("END", "Sonuç");
phaseName.set("DEMO", "Anket");

function TopBar({ phase }: { phase: string }) {
	return <div className={customStyles.topbar}>{phaseName.get(phase)}</div>;
}

export default TopBar;
