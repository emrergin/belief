import customStyles from "@/styles/Custom.module.css";

const phaseName = new Map();
phaseName.set("INTRO", "Giriş");
phaseName.set("INTRO2", "Giriş");
phaseName.set("MAIN", "Giriş");
phaseName.set("END", "Sonuç");
phaseName.set("DEMO", "Anket-1");
phaseName.set("GPS", "Anket-2");

function TopBar({ phase, points }: { phase: string; points: number }) {
	return (
		<div className={customStyles.topbar}>
			<div>{phaseName.get(phase)}</div>
			<div>Toplam puan: {points}</div>
		</div>
	);
}

export default TopBar;
