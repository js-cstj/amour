# Exercice "Amour"
Exemple d'utilisation de setInterval et de setTimeout

## Description
En prévision de la Saint-Valentin, on vous demande de faire une animation impliquant des coeurs et du mouvement.

## Étapes
1. Ajouter un coeur dans la scène à une position aléatoire (avec transform)
    1. Ajouter un coeur dans le coin supérieur gauche
    1. Récupérer la taille de la scène
    1. Créer la fonction ptAlea
    1. Placer le coeur à la position aléatoire avec le transform
1. Placer plusieurs coeurs
    1. À l'aide d'une boucle
    1. À l'aide de setInterval (interval régulier)
    1. À l'aide de setTimeout (interval variable)
1. Faire démarrer et arrêter la création de coeurs lors du clic dans le body
1. Faire déplacer les coeurs lors de la création
    1. Garder en mémoire la position de départ du coeur
    1. Déterminer une vitesse aléatoire pour chaque coeur lors de leur création (en pixels par secondes)
    1. Déterminer l'heure du début du mouvement
    1. Ajouter un setInterval pour calculer la position en fonction du temps et placer le coeur au bon endroit.
1. Faire disparaître le coeur après un certain temps (aléatoire)
    1. Créer la fonction valeurRange
    1. Ajouter un setTimout déterminant la durée de vie d'un coeur
    1. À échéance, ajouter la classe "disparaitre" au coeur
    1. Ajouter un événement qui s'exécute à la fin de l'animation ("animationend") qui :
        1. Supprime le coeur
        1. Enlève le setTimeout de déplacement
1. Faire "exploser" un coeur lorsqu'il sort de l'écran
    1. Valider la position du coeur à chaque déplacement
    1. Supprimer le déplacement à l'aide de clearInterval
1. Faire "exploser" un coeur lorsque la souris le touche
    1. Ajouter un événement "mousemove" ou "mouseenter"
    1. Enlever le coeur de l'écran
    1. Enlever le setInterval de déplacement
    1. Enlever le setTimeout de durée de vie
1. Ajouter les animations
1. Ajouter les effets sonores
1. Ajouter de la gravité


## Variantes et ajouts possibles

