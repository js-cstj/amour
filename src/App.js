import Coeur from "./Coeur.js";
import Zone from "./Zone.js";

/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var app = document.getElementById("app");
		this.actif = false;
		this.vitesseDApparition = { min: 0, max: 500 };

		document.body.addEventListener("click", e => {
			this.actif = !this.actif;
			if (this.actif) {
				var scene = new Zone(
					window.innerWidth,
					window.innerHeight
				);
				this.ajouterCoeur(scene);
				app.style.backgroundColor = "green";
			} else {
				app.style.backgroundColor = "red";
			}
		})
	}

	/**
	 * Fonction ajouterCoeur qui ajoute un coeur et, si l'application est active, programme l'ajout d'un autre coeur.
	 * @param {object} scene Un objet sous la forme {largeur: 0, hauteur: 0}
	 * @returns undefined
	 */
	static ajouterCoeur(scene) {
		var app = document.getElementById("app");
		var coeur = new Coeur(scene, scene.ptAlea(scene));
		app.appendChild(coeur.html_creer());
		if (this.actif) {
			window.setTimeout(() => {
				this.ajouterCoeur(scene);
			}, Coeur.prototype.valeurRange(this.vitesseDApparition));
		}
	}
	
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns undefined Ne retourne rien
	 */
	static init() {
		window.addEventListener("load", () => {
			this.main();
		});
	}
}
App.init();
