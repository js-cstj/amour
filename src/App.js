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

		
	}
	/**
	 * Fonction ajouterCoeur qui ajoute un coeur et, si l'application est active, programme l'ajout d'un autre coeur.
	 * @param {object} scene Un objet sous la forme {largeur: 0, hauteur: 0}
	 * @returns undefined
	 */
	
	
	/**
	 * Fonction html_coeur qui retourne un élément représentant un coeur dans l'espace disponible
	 * @param {object} scene Un objet sous la forme {largeur: 0, hauteur: 0}
	 * @returns {HTMLElement} 
	 */
	
	
	/**
	 * Fonction deplacer qui déplace le coeur donné dans la scène
	 * @param {HTMLElement} coeur L'objet à déplacer
	 * @returns undefined
	 */
	
	
	/**
	 * Fonction apparaitre qui gère l'apparition d'un coeur sur la scène
	 * @param {HTMLElement} coeur L'objet à faire apparaître
	 * @returns undefined
	 */
	
	
	/**
	 * Fonction disparaitre qui gère la disparition d'un coeur
	 * @param {HTMLElement} coeur L'objet à faire disparaître
	 * @returns undefined
	 */
	
	
	/**
	 * Fonction eclater qui retire l'élément donné de la scène et émet un son de pop
	 * @param {HTMLElement} coeur L'objet à faire éclater
	 * @returns undefined
	 */
	
	
	/**
	 * Fonction jouerPop qui joue un son "pop" aléatoire
	 * @returns {Audio}
	 */
	
	
	/**
	 * Fonction valeurRange qui retourn un nombre aléatoire en fonction d'un objet contenant le minimum et le maximum
	 * @param {object|number} range Un objet sous la forme {min: 0, max: 0}. Si range est déjà un nombre, on retourne ce nombre.
	 * @returns {number} 
	 */
	 
	
	/**
	 * Fonction piger qui retourne un élément aléatoire pigé dans le tableau donné
	 * @param {Array} tableau
	 * @returns {*} 
	 */
	
	
	/**
	 * Fonction ptAlea qui retourne un point aléatoire sous la forme {x: 0, y: 0} qui se trouve dans la zone donnée en paramètre.
	 * @param {object} zone Un objet sous la forme {largeur: 0, hauteur: 0}
	 * @return {object} 
	 */
	
	
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
