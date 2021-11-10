import Objet from "./Objet.js";
import Point from "./Point.js";
export default class Coeur extends Objet {
    /**
     * Creates an instance of Coeur.
     * @param {Zone} scene
     * @param {Point} [origine=new Point(0, 0)]
     */
    constructor(scene, origine = new Point(0, 0)) {
        super(scene, origine);
    }

	/**
	 * Fonction html_coeur qui retourne un élément représentant un coeur dans l'espace disponible
	 * @returns {HTMLElement} 
	 */
    html_creer() {
		var coeur = super.html_creer("images/coeur.png");
        coeur.classList.add("coeur");
        return coeur;
	}
}