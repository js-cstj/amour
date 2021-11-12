# Exercice "Amour"
Exemple d'utilisation de setInterval et de setTimeout

## Description
En prévision de la Saint-Valentin, on vous demande de faire une animation impliquant des coeurs et du mouvement.

## Étapes
1. Créer toutes les fonctions vides avant d'ajouter du code.
1. Ajouter un coeur dans la scène à une position aléatoire (avec transform)
    1. Dans le `main`, récupérer la taille de la scène
        ```js
        var scene = {
            largeur: window.innerWidth,
            hauteur: window.innerHeight
        };
        ```
    1. Ajouter un coeur dans le coin supérieur gauche avec la fonction `html_coeur`. Reproduire en Javascript le HTML suivant :
        ```html
        <div class="coeur">
            <img src="images/coeur.png" alt="coeur"/>
        </div>
        ```
    1. Dans `main`, faire l'appel à la fonction `html_coeur`
        ```js
        var coeur = ???.???(scene);
        app.???(coeur);
        ```
    1. Créer la fonction `ptAlea` avec le code suivant complété :
        ```js
        static ptAlea(zone) {
            // On crée un objet vide
            var resultat = {};
            // On ajoute un x et un y aléatoire en fonction de la zone disponible
            resultat.x = Math.???(Math.???() * zone.largeur);
            resultat.y = Math.???(Math.???() * zone.hauteur);
            return resultat;
        }
        ```
    1. Dans `html_coeur`, faire l'appel à la fonction `ptAlea`.
        ```js
        var pt = ???.???(scene);
        ```
    1. Placer le coeur à la position aléatoire (`pt`) avec le transform
        ```js
        coeur.style.transform = "translate("+???.x+"px, "+???.y+"px)";
        ```
1. Placer plusieurs coeurs
    1. Compléter la fonction `ajouterCoeur`
        ```js
        var app = ???;
        var coeur = app.???(this.html_coeur(scene));
        ```
    1. Dans le `main`, ajouter 10 coeurs l'aide d'une boucle `for` et de la fonction `ajouterCoeur`
        ```js
        // Une boucle avec 10 itération
        ```
    1. Dans le main, ajouter des coeurs à interval régulier à l'aide de `setInterval`
        ```js
        var idInterval = window.setInterval(() => {
            this.???(scene);
        }, 1000)
        ```
    1. Ajouter des coeurs à interval variable à l'aide de `setTimeout`. Modifier la fonction `ajouterCoeur` en y ajoutant le code ci-dessous. **Mettre les deux autre méthodes en commentaires**
        ```js
        var idTimeout = window.setTimeout(() => {
			this.ajouterCoeur(scene);
		}, Math.floor(Math.random() * 1000));    
        ```
    1. Compléter la fonction `valeurRange` et l'utiliser avec la variable globale `this.vitesseDApparition` pour créer le aléatoire de l'étape précédente.
        ```js
        static valeurRange(range) {
            if (typeof range !== "object") {
                return range;
            }
            return Math.???(Math.???() * (range.max - range.min + 1)) + range.min;
        }
        ```
1. Faire démarrer et arrêter la création de coeurs lors du clic dans le `body`.
    1. Modifier le `main` :
        ```js
        document.body.???("click", e => {
            this.actif = !this.actif;
            if (this.actif) {
                document.body.???.??? = "green";
                this.ajouterCoeur(scene);
            } else {
                document.body.???.??? = "red";
            }
        });
        ```
    1. Modifier `ajouterCoeur` :
        ```js
		if (this.actif) {
            // Mettre le timeout ici
        }
        ```
1. Faire déplacer les coeurs lors de la création
    1. Garder en mémoire la position de départ du coeur
        ```js
        // Changer var pt = this.ptAlea(scene); pour
        coeur.origine = this.ptAlea(scene);
        // Utiliser coeur.origine à la place de pt
        ```
    1. Déterminer une vitesse aléatoire pour chaque coeur lors de leur création (en pixels par secondes)
        ```js
        coeur.vitesse = {
            x: this.valeurRange(this.vitesse.x),
            y: this.valeurRange(this.vitesse.y)
        };
        ```
    1. Déterminer l'heure du début du mouvement
        ```js
        coeur.debut = new Date().getTime();
        ```
    1. Dans `ajouterCoeur`, ajouter un `setInterval` pour calculer la position en fonction du temps et placer le coeur au bon endroit.
        ```js
        coeur.intervalDeplacement = window.???(() => {
            var t = (new Date().getTime() - coeur.debut) / 1000;
            var x = coeur.origine.x + coeur.vitesse.x * t;
            var y = coeur.origine.y + coeur.vitesse.y * t;
            coeur.style.??? = "???("+x+"px, "+y+"px)";
        }, 33);
        ```
    1. Utiliser la variable globale `this.framerate` : remplacer `33` par `1000 / this.framerate`
    1. Mettre le contenu de la fonction anonyme du `setInterval` dans la fonction `deplacer` et appeler la fonction (à la place).
1. Faire disparaître le coeur après un certain temps (aléatoire)
    1. Ajouter un `setTimout` déterminant la durée de vie d'un coeur. Utiliser la variable `this.dureeDeVie`.
        ```js
		coeur.timeoutVie = ???.???(() => {
			// Le coeur est mort
		}, this.???(this.dureeDeVie));
        ```
    1. À échéance, ajouter la classe "disparaitre" au coeur
        ```js
        ???.???.???("???");
        ```
    1. Ajouter un événement qui s'exécute à la fin de l'animation ("animationend") qui :
        1. Enlève le `setTimeout` de vie
        1. Enlève le `setInterval` de déplacement
        1. Supprime le coeur
        ```js
        coeur.???("???", e => {
            if (e.animationName === "disparaitre") {
                window.clearTimeout(e.currentTarget.timeoutVie);
                window.clearInterval(e.currentTarget.intervalDeplacement);
                e.currentTarget.???();
            }
        });
        ```
    1. Mettre le contenu de la fonction anonyme du `setTimeout` dans la fonction `disparaitre` et appeler la fonction (à la place).
1. Ajouter l'animation d'apparition (dans la fonction `apparaitre`)
    1. Appeler la fonction apparaitre à partir de la fonction `html_coeur` ou `ajouterCoeur`.
        ```js
        this.apparaitre(coeur);
        ```
    1. Ajouter la classe "apparaitre" lors de la création du coeur.
        ```js
        ???.???.???("???");
        ```
    1. Enlever la classe "apparaitre" lorsque l'animation "apparaitre" est terminée.
        ```js
        ???.???("???", e => {
			e.currentTarget.classList.remove("???");
		});
        ```
1. Faire "eclater" un coeur lorsqu'il sort de l'écran
    1. Valider la position du coeur **à chaque déplacement**. C'est à dire dans la fonction `deplacer`.
        ```js
        if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
			// Faire éclater le coeur
		}
        ```
    1. Supprimer le déplacement à l'aide de `clearInterval`.
        ```js
        window.???(???.intervalDeplacement);
        ```
    1. Supprimer le timeout de vie à l'aide de `clearTimeout`.
        ```js
        window.???(???.timeoutVie);
        ```
    1. Supprimer le coeur.
        ```js
        ???.???();
		```
    1. Mettre les instruction du `if` dans la fonction `eclater` et appeler la fonction (à la place).
1. Faire "eclater" ou "disparaitre" un coeur lorsque la souris le touche
    1. Dans la fonction `ajouterCoeur`, ajouter un événement "mousemove" ou "mouseenter"
    1. Appeler la fonction `eclater` ou `disparaitre`
    ```js
    // Non! Je ne vous donne pas le code pour ça!
    ```
1. Ajouter les effets sonores
    1. Créer la fonction piger.
        ```js
        static piger(tableau) {
            var pos = Math.???(Math.???() * tableau.???);
            return tableau[???];
        }	
        ```
    1. Créer la fonction `jouerPop`.
        ```js
        static jouerPop() {
            var audio = new Audio();
            audio.src = this.piger(this.sons);
            audio.play();
            return audio;
        }
        ```
    1. Créer la fonction `jouerSwoosh`.
        ```js
        static jouerSwoosh() {
            var swoosh = new ???();
            swoosh.??? = "sons/sfx-swoosh19.mp3";
            swoosh.???();
            return swoosh;
        }
        ```
    1. Appeler la fonction `jouerPop` dans la fonction `eclater` et la fonction `jouerSwoosh` dans la fonction `disparaitre`.
1. Ajouter de la gravité
    1. Modifier la ligne qui détermine la position verticale :
        ```js
		var y = coeur.origine.y + coeur.vitesse.y * t + .5 * this.gravite * t * t;
        ```
    1. Modifier `this.vitesse` pour que les coeurs partent toujours vers le haut.
        ```js
        this.vitesse = {x: {min: -300, max: 300}, y: {min: -600, max: 0}};
        ```


## Variantes et ajouts possibles

