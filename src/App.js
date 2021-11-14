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
		this.son = false;
		this.eclatement = false;
		this.framerate = 10;
		this.vitesseDApparition = { min: 0, max: 500 };
		this.vitessePossible = { x: { min: -300, max: 300 }, y: { min: -300, max: 300 } };
		this.gravite = 800;
		this.evenement = "touchstart";
		this.scene = new Zone(
			app.clientWidth,
			app.clientHeight
		);
		this.majForm(document.getElementById("controls"));
		document.getElementById("controls").addEventListener("input", e => {
			this.majForm(e.currentTarget);
		});	
		document.getElementById("controls").addEventListener("click", e => {
			if (e.target === e.currentTarget && e.shiftKey) {
				e.currentTarget.classList.toggle("avance");
			}
		});	
		document.getElementById("btnDemarrer").addEventListener("click", e => {
			this.demarrer();
		});	
	}
	
	/**
	 * Fonction demarrer qui démarre (ou arrête) l'animation
	 * @param {boolean} etat
	 * @returns undefined
	 */
	static demarrer(etat) {
		if (etat !== undefined) {
			this.actif === etat;
		} else {
			this.actif = !this.actif;
		}
		if (this.actif) {
			this.ajouterCoeur(this.scene);
			document.body.classList.add("actif");
			// document.getElementById("app").style.backgroundColor = "green";
			// document.getElementById("btnDemarrer").innerHTML = "Arrêter";
		} else {
			document.body.classList.remove("actif");
			// document.getElementById("app").style.backgroundColor = "red";
			// document.getElementById("btnDemarrer").innerHTML = "Démarrer";
		}
	}

	/**
	 * Fonction majForm qui met à jour les propriétés en fonction du formulaire
	 * @param {HTMLFormElement} form
	 * @returns undefined
	 */
	static majForm(form) {
		this.vitesseDApparition.max = form.vitesseDApparition.valueAsNumber;
		if (form.gravite.checked) {
			this.gravite = 800;
			this.vitessePossible.y = { min: -600, max: 0 };
		} else {
			this.gravite = 0;
			this.vitessePossible.y = { min: -300, max: 300 };
		}
		this.son = form.son.checked;
		this.eclatement = form.eclatement.checked;
		this.evenement = form.evenement.value;
		this.framerate = form.framerate.valueAsNumber;
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
