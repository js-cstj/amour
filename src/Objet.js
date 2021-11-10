import Point from "./Point.js";
import App from "./App.js";
export default class Objet {
	/**
	 * Creates an instance of Objet.
	 * @param {Zone} scene
	 * @param {Point} [origine=new Point(0, 0)]
	 */
	constructor(scene, origine = new Point(0, 0)) {
		this.origine = origine;
		this.scene = scene;
		this.framerate = 30;
		this.gravite = App.gravite;
		this.dureeDeVie = { min: 1000, max: 3000 };
		this.sonsPop = [
			// "sons/QKTA234-pop.mp3",
			"sons/sfx-pop.mp3"
		];
		this.sonSwoosh = "sons/sfx-swoosh19.mp3";
	}

	/**
	 * Fonction html_creer qui retourne un élément représentant un objet dans l'espace disponible
	 * L'élément HTML créé est également gardée dans la propriété this.dom
	 * @param {string} urlImage L'URL de l'image à faire bouger
	 * @returns {HTMLElement} 
	 */
	html_creer(urlImage) {
		this.dom = document.createElement("div");
		this.dom.classList.add("objet");
		var image = this.dom.appendChild(document.createElement("img"));
		image.src = urlImage;
		this.dom.style.transform = this.origine.css_translate();
		this.debut = new Date().getTime();
		this.apparaitre();
		this.vitesse = new Point(
			this.valeurRange(App.vitessePossible.x),
			this.valeurRange(App.vitessePossible.y)
		);
		this.timeoutVie = window.setTimeout(() => {
			this.disparaitre();
		}, this.valeurRange(this.dureeDeVie));
		this.intervalDeplacement = window.setInterval(() => {
			this.deplacer();
		}, 1000 / this.framerate);
		this.dom.addEventListener("mousemove", e => {
			this.eclater();
			// this.disparaitre();
		});
		return this.dom;
	}
	
	/**
	 * Fonction deplacer qui déplace l'objet donné dans la scène
	 * @returns undefined
	 */
	deplacer() {
		var t = (new Date().getTime() - this.debut) / 1000;
		var pt = new Point(
			this.origine.x + this.vitesse.x * t,
			this.origine.y + this.vitesse.y * t + .5 * this.gravite * t * t
		);
		if (App.eclatement && !this.scene.contient(pt)) {
			this.eclater();
		}
		this.dom.style.transform = pt.css_translate();
	}

	/**
	 * Fonction apparaitre qui gère l'apparition d'un objet sur la scène
	 * @returns undefined
	 */
	apparaitre() {
		this.dom.classList.add("apparaitre");
		this.dom.addEventListener("animationend", e => {
			if (e.animationName === "apparaitre") {
				e.currentTarget.classList.remove("apparaitre");
			}
		});
	}

	/**
	 * Fonction disparaitre qui gère la disparition d'un objet
	 * @returns undefined
	 */
	disparaitre() {
		this.dom.classList.add("disparaitre");
		this.dom.addEventListener("animationend", e => {
			if (e.animationName === "disparaitre") {
				window.clearTimeout(this.timeoutVie);
				window.clearInterval(this.intervalDeplacement);
				e.currentTarget.remove();
			}
		});
		this.jouerSwoosh();
	}

	/**
	 * Fonction eclater qui retire l'élément donné de la scène et émet un son de pop
	 * @returns undefined
	 */
	eclater() {
		window.clearInterval(this.intervalDeplacement);
		window.clearTimeout(this.timeoutVie);
		this.dom.remove();
		this.jouerPop();
	}

	/**
	 * Fonction jouerSon qui joue un son donné en paramètre
	 * @param {string|Array} son Le chemin vers le fichier de son. Si son est un tableau, on pige au hasard.
	 * @returns {Audio}
	 */
	jouerSon(son) {
		if (!App.son) {
			return;
		}
		if (typeof son !== "string") {
			son = this.piger(son);
		}
		var audio = new Audio();
		audio.src = son;
		audio.play();
		return audio;
	}

	/**
	 * Fonction jouerPop qui joue un son "pop" aléatoire
	 * @returns {Audio}
	 */
	jouerPop() {
		return this.jouerSon(this.sonsPop);
	}

	/**
	 * Fonction jouerSwoosh qui joue le son "swoosh" de la disparition
	 * @returns {Audio}
	 */
	jouerSwoosh() {
		return this.jouerSon(this.sonSwoosh);
	}

	/**
	 * Fonction valeurRange qui retourn un nombre aléatoire en fonction d'un objet contenant le minimum et le maximum
	 * @param {object|number} range Un objet sous la forme {min: 0, max: 0}. Si range est déjà un nombre, on retourne ce nombre.
	 * @returns {number} 
	 */
	valeurRange(range) {
		if (typeof range !== "object") {
			return range;
		}
		return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
	}

	/**
	 * Fonction piger qui retourne un élément aléatoire pigé dans le tableau donné
	 * @param {Array} tableau
	 * @returns {*} 
	 */
	piger(tableau) {
		var pos = Math.floor(Math.random() * tableau.length);
		return tableau[pos];
	}
}