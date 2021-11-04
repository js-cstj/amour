/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var app = document.getElementById("app");
		var scene = {
			largeur: window.innerWidth,
			hauteur: window.innerHeight
		};
		window.setInterval(() => {
			var coeur = app.appendChild(document.createElement("div"));
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
			coeur.vitesse = {x: Math.floor(Math.random()*600) - 300, y: Math.floor(Math.random()*600) - 300};
			coeur.interval = window.setInterval((obj) => {
				var x = obj.depart.x + obj.vitesse.x * (new Date().getTime() - obj.debut) / 1000;
				var y = obj.depart.y + obj.vitesse.y * (new Date().getTime() - obj.debut) / 1000;
				obj.style.transform = "translate("+x+"px, "+y+"px)";
				if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
					obj.remove();
					window.clearInterval(obj.interval);
				}
			}, 33, coeur);
			window.setTimeout((obj) => {
				obj.classList.remove("apparaitre");
				obj.classList.add("disparaitre");
				obj.addEventListener("animationend", e => {
					console.log(e.animationName);
					if (e.animationName === "apparaitre") {
						window.clearInterval(obj.interval);
						obj.remove();
					}
					if (e.animationName === "disparaitre") {
						window.clearInterval(obj.interval);
						obj.remove();
					}
				});
			}, 3000, coeur);
		}, 100);
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
