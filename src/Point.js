export default class Point {
    /**
	 * Creates an instance of Point.
	 * @param {number} [x=0]
	 * @param {number} [y=0]
	 */
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
    }

	/**
	 * Fonction css_translate retourne la version css du point sous forme de "translate(0px,0px)"
	 * @returns {string}
	 */
	css_translate() {
		return `translate(${this.x}px, ${this.y}px)`;
	}

	/**
	 * Fonction alea qui retourne un point aléatoire qui se trouve dans la zone donnée en paramètre.
	 * @param {Zone} zone Un objet Zone
	 * @return {object} 
	 */
	 static alea(zone) {
		// On crée un objet Point avec un x et un y aléatoire en fonction de la zone disponible
		return new this(
			Math.floor(Math.random() * zone.w),
			Math.floor(Math.random() * zone.h)
		);
	}

}