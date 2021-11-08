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
	static ajouterCoeur(scene) {
		var coeur = app.appendChild(this.html_coeur(scene));
		if (this.actif) {
			window.setTimeout(() => {
				this.ajouterCoeur(scene);
			}, this.valeurRange(this.vitesseDApparition));
		}

	}
	static valeurRange(range) {
		var resultat = range;
		if (typeof resultat === "object") {
			resultat = Math.floor(Math.random() * (resultat.max - resultat.min + 1)) + resultat.min;
		}
		return resultat;
	}
	static html_coeur(scene) {
		var coeur = document.createElement("div");
		coeur.classList.add("coeur");
		coeur.classList.add("apparaitre");
		var image = coeur.appendChild(document.createElement("img"));
		image.src = "images/coeur.png";
		var pt = this.ptAlea(scene);
		coeur.style.transform = "translate("+pt.x+"px, "+pt.y+"px)";
		// var taille = Math.random() * .5 + .5;
		// var angle = Math.floor(Math.random() * 60) - 30;
		// image.style.transform = "scale("+taille+") rotate("+angle+"deg)";
		coeur.debut = new Date().getTime();
		coeur.depart = pt;
		coeur.vitesse = {x: this.valeurRange(this.vitesse.x), y: this.valeurRange(this.vitesse.y)};
		coeur.interval = window.setInterval((obj) => {
			if (obj.classList.contains("disparaitre")) {
				return;
			}
			var x = obj.depart.x + obj.vitesse.x * (new Date().getTime() - obj.debut) / 1000;
			var y = obj.depart.y + obj.vitesse.y * (new Date().getTime() - obj.debut) / 1000;
			obj.style.transform = "translate("+x+"px, "+y+"px)";
			if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
				obj.remove();
				window.clearInterval(obj.interval);
				window.clearTimeout(obj.timeout);
				this.html_pop();
			}
		}, 33, coeur);
		coeur.timeout = window.setTimeout((obj) => {
			obj.classList.remove("apparaitre");
			obj.classList.add("disparaitre");
			var swoosh = new Audio();
			swoosh.src = "sons/sfx-swoosh19.mp3";
			swoosh.play();
			window.clearTimeout(obj.timeout);
			obj.addEventListener("animationend", e => {
				if (e.animationName === "disparaitre") {
					window.clearInterval(obj.interval);
					obj.remove();
				}
			});
		}, this.valeurRange(this.dureeDeVie), coeur);
		coeur.addEventListener("mousemove", e => {
			e.currentTarget.remove();
			window.clearInterval(e.currentTarget.interval);
			window.clearTimeout(e.currentTarget.timeout);
			this.html_pop();
		});
		return coeur;
	}
	static html_pop() {
		var resultat = new Audio();
		resultat.src = this.piger(this.sons);
		resultat.play();
	}
	static piger(t) {
		return t[Math.floor(Math.random() * t.length)];
	}
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
