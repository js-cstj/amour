import Point from "./Point.js";
export default class Zone {
    /**
	 * Creates an instance of Zone.
	 * @param {number} [w=0]
	 * @param {number} [h=0]
	 */
	constructor(w = 0, h = 0) {
		this.w = w;
		this.h = h;
	}

	/**
	 * Fonction contient qui indique si le point donné se trouve dans la zone
	 * @param {Point} point Le point à valider
	 * @returns {boolean}
	 */
	contient(point) {
		return !(point.x < 0 || point.x > this.w || point.y < 0 || point.y > this.h);
	}

	/**
	 * Fonction ptAlea qui retourne un objet Point aléatoire qui se trouve dans la zone.
	 * @returns {Point} 
	 */
	ptAlea() {
		// On crée un objet Point avec un x et un y aléatoire en fonction de la zone disponible
		return new Point(
			Math.floor(Math.random() * this.w),
			Math.floor(Math.random() * this.h)
		);
	}
}