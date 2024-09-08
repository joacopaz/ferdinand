let game_state = 0;
const TRANS_MS = 1000;

const b = document.querySelector("body");
const mt = document.querySelector("#main-text");
const q = document.querySelector("#questions");
const first = document.querySelector("#first-q");
const second = document.querySelector("#second-q");
const third = document.querySelector("#third-q");
const allOptions = document.querySelectorAll(".question");

mt.style.transition = `opacity ${TRANS_MS}ms ease`;
q.style.transition = `opacity ${TRANS_MS}ms ease`;

const t = (time) => new Promise((r) => setTimeout(r, time));

let showing = false;

const writeNewText = async (content, time) => {
	if (showing) {
		mt.style.opacity = "0";
		await t(TRANS_MS);
	}
	showing = true;
	mt.innerText = content;
	mt.style.opacity = "1";
	if (time) {
		setTimeout(() => (mt.style.opacity = "0"), time * 1000);
		await t(time * 1000 + TRANS_MS);
		showing = false;
	} else {
		await t(TRANS_MS);
	}
};

const showOptions = async (textArray, callbackArray) => {
	let selected = false;
	first.innerText = textArray[0];
	first.addEventListener(
		"click",
		() => {
			if (selected) return;
			selected = true;
			callbackArray[0]();
		},
		{ once: true },
	);
	second.innerText = textArray[1];
	second.addEventListener(
		"click",
		() => {
			if (selected) return;
			selected = true;
			callbackArray[1]();
		},
		{ once: true },
	);
	if (textArray.length === 3) {
		third.style.display = "flex";
		third.innerText = textArray[2];
		third.addEventListener(
			"click",
			() => {
				if (selected) return;
				selected = true;
				callbackArray[2]();
			},
			{ once: true },
		);
	} else {
		third.style.display = "none";
		third.innerText = "";
	}
	q.style.display = "flex";
	setTimeout(() => (q.style.opacity = "1"), 5);

	await t(TRANS_MS);
};

const hideOptions = async () => {
	q.style.opacity = "0";
	await t(TRANS_MS);
	q.style.display = "none";
};

const playSound = (url, duration) => {
	return new Promise((r) => {
		const audio = new Audio();
		audio.addEventListener("loadeddata", function () {
			audio.play();
			t(duration).then(r);
		});
		audio.src = url;
	});
};

const main = async () => {
	await writeNewText("Hola Ferdinando!!!", 2);
	await writeNewText("Llegó un momento crucial en tu vida...", 4);
	await writeNewText("Ahora sos un onvre... asique elegí sabiamente", 4);
	await writeNewText(
		"Estás en una isla solitaria por el resto de tu vida, preferís...",
	);
	await new Promise(async (r) => {
		await showOptions(
			["Tener el minecraft", "Tener un juego distinto por mes al azar"],
			[
				() => playSound("./boli.mp3", 4000).then(r),
				() => playSound("./boli.mp3", 4000).then(r),
			],
		);
	});
	await hideOptions();

	await writeNewText("Cuál es el significado de la vida?");
	await new Promise(async (r) => {
		await showOptions(
			[
				"Construir un CPU en minecraft",
				"Aprender árabe",
				"Conocer todos los países de Europa",
			],
			[
				() => playSound("./allahekbeeer.mp3", 1500).then(r),
				() => playSound("./allahekbeeer.mp3", 1500).then(r),
				() => playSound("./allahekbeeer.mp3", 1500).then(r),
			],
		);
	});
	await hideOptions();

	await writeNewText("Una lamborgini o 10 honda cívics?");
	await new Promise(async (r) => {
		await showOptions(
			[
				"LAMBO ALL NIGHT PAPÁ",
				"Dame todos los honda cívics y cashate",
				"Scooter eléctrico porque vivo en Palermo",
			],
			[
				() => playSound("./alto-guiso.mp3", 1500).then(r),
				() => playSound("./alto-guiso.mp3", 1500).then(r),
				() => playSound("./alto-guiso.mp3", 1500).then(r),
			],
		);
	});
	await hideOptions();

	await writeNewText("Tenés que elegir un hermanE preferidE elegís a...");
	await new Promise(async (r) => {
		await showOptions(
			["Remo", "Sofi", "Mari"],
			[
				() => playSound("./milei-preparate.mp3", 4000).then(r),
				() => playSound("./milei-preparate.mp3", 4000).then(r),
				() => playSound("./milei-preparate.mp3", 4000).then(r),
			],
		);
		await t(4000);
		allOptions.forEach((o) => (o.innerText = "JOACO EL MÁS GRANDE DEL MUNDO"));
	});
	await hideOptions();

	await writeNewText("Bueno... elegí tu regalo");
	await new Promise(async (r) => {
		await showOptions(
			["El Minecraft Original", "25 dólares en Steam"],
			[
				() => playSound("./no-hay-plata.mp3", 4000).then(r),
				() => playSound("./no-hay-plata.mp3", 4000).then(r),
			],
		);
	});
	await hideOptions();
	await writeNewText("QUE ASÍ SEA FERDINANDO!");
};

main();
