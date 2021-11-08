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
		this.framerate = 30;
		this.vitesseDApparition = {min: 0, max: 1000};
		this.dureeDeVie = {min: 1000, max: 3000};
		this.vitesse = {x: {min: -300, max: 300}, y: {min: -300, max: 300}};
		this.sons = [
			"sons/QKTA234-pop.mp3",
			"sons/sfx-pop.mp3"
		];

		document.body.addEventListener("click", e => {
			this.actif = !this.actif;
			if (this.actif) {
				var scene = {
					largeur: window.innerWidth,
					hauteur: window.innerHeight
				};
				// window.setInterval(() => {
				// 	var coeur = app.appendChild(this.html_coeur(scene));
				// }, 100);
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
		var coeur = app.appendChild(this.html_coeur(scene));
		coeur.interval = window.setInterval((obj) => {
			this.deplacer(obj);
		}, 1000/this.framerate, coeur);
		this.apparaitre(coeur);
		coeur.timeout = window.setTimeout((obj) => {
			this.disparaitre(obj);
		}, this.valeurRange(this.dureeDeVie), coeur);
		coeur.addEventListener("mousemove", e => {
			this.eclater(e.currentTarget);
			//this.disparaitre(e.currentTarget);
		});
		if (this.actif) {
			window.setTimeout(() => {
				this.ajouterCoeur(scene);
			}, this.valeurRange(this.vitesseDApparition));
		}
	}
	/**
	 * Fonction html_coeur qui retourne un élément représentant un coeur dans l'espace disponible
	 * @param {object} scene Un objet sous la forme {largeur: 0, hauteur: 0}
	 * @returns {HTMLElement} 
	 */
	static html_coeur(scene) {
		var coeur = document.createElement("div");
		coeur.classList.add("coeur");
		var image = coeur.appendChild(document.createElement("img"));
		image.src = "images/coeur.png";
		coeur.depart = this.ptAlea(scene);
		coeur.style.transform = "translate("+coeur.depart.x+"px, "+coeur.depart.y+"px)";
		coeur.debut = new Date().getTime();
		coeur.vitesse = {x: this.valeurRange(this.vitesse.x), y: this.valeurRange(this.vitesse.y)};
		return coeur;
	}
	/**
	 * Fonction deplacer qui déplace le coeur donné dans la scène
	 * @param {HTMLElement} coeur L'objet à déplacer
	 * @returns undefined
	 */
	static deplacer(coeur) {
		// Si le coeur est en train de disparaître, on ne le déplace pas
		if (coeur.classList.contains("disparaitre")) {
			return;
		}
		var x = coeur.depart.x + coeur.vitesse.x * (new Date().getTime() - coeur.debut) / 1000;
		var y = coeur.depart.y + coeur.vitesse.y * (new Date().getTime() - coeur.debut) / 1000;
		if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
			this.eclater(coeur);
		}
		coeur.style.transform = "translate("+x+"px, "+y+"px)";
	}
	/**
	 * Fonction apparaitre qui gère l'apparition d'un coeur sur la scène
	 * @param {HTMLElement} coeur L'objet à faire apparaître
	 * @returns undefined
	 */
	static apparaitre(coeur) {
		coeur.classList.add("apparaitre");
		coeur.addEventListener("animationend", e => {
			if (e.animationName === "apparaitre") {
				e.currentTarget.classList.remove("apparaitre");
			}
		});
	}
	/**
	 * Fonction disparaitre qui gère la disparition d'un coeur
	 * @param {HTMLElement} coeur L'objet à faire disparaître
	 * @returns undefined
	 */
	static disparaitre(coeur) {
		coeur.classList.remove("apparaitre");
		coeur.classList.add("disparaitre");
		var swoosh = new Audio();
		swoosh.src = "sons/sfx-swoosh19.mp3";
		swoosh.play();
		window.clearTimeout(coeur.timeout);
		coeur.addEventListener("animationend", e => {
			if (e.animationName === "disparaitre") {
				window.clearInterval(e.currentTarget.interval);
				e.currentTarget.remove();
			}
		});
	}
	/**
	 * Fonction eclater qui retire l'élément donné de la scène et émet un son de pop
	 * @param {HTMLElement} coeur L'objet à faire éclater
	 * @returns undefined
	 */
	static eclater(coeur) {
		coeur.remove();
		window.clearInterval(coeur.interval);
		window.clearTimeout(coeur.timeout);
		this.jouerPop();
	}
	/**
	 * Fonction jouerPop qui joue un son "pop" aléatoire
	 * @returns {Audio}
	 */
	static jouerPop() {
		var audio = new Audio();
		audio.src = this.piger(this.sons);
		audio.play();
		return audio;
	}
	/**
	 * Fonction valeurRange qui retourn un nombre aléatoire en fonction d'un objet contenant le minimum et le maximum
	 * @param {object|number} range Un objet sous la forme {min: 0, max: 0}. Si range est déjà un nombre, on retourne ce nombre.
	 * @returns {number} 
	 */
	 static valeurRange(range) {
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
	static piger(tableau) {
		return tableau[Math.floor(Math.random() * tableau.length)];
	}
	/**
	 * Fonction ptAlea qui retourne un point aléatoire sous la forme {x: 0, y: 0} qui se trouve dans la zone donnée en paramètre.
	 * @param {object} zone Un objet sous la forme {largeur: 0, hauteur: 0}
	 * @return {object} 
	 */
	static ptAlea(zone) {
		var x = Math.floor(Math.random() * zone.largeur);
		var y = Math.floor(Math.random() * zone.hauteur);
		return {x: x, y: y};
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
