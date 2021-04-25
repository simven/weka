# Rapport Weka

Organisation
=============
Présentation de l'équipe
---------------------
Ce projet vise à réaliser une application web permettant de créer des quiz et d’y jouer, en mode
authentifié ou non.

1. L'équipe est composé de :

    - Simon Vennat
    - Louis Huret
    - Yanis Boudali
    - Kevin Kerkhove
    - Quentin Barrez
2. Supervisé par plusieurs encadrants :

    - Frédéric Boussemart
    - Iokanaan Goutier
    - Christophe Lecoutre
    - Nicolas Paris

Présentation de l'application
------------
Le wekaQuiz est une application web basé sur du <b>ReactJS</b> avec un serveur <b>ExpressJS</b> et une base de donnée <b>SQL</b> (SGBD postgreSQL).

Présentation des outils utilisés
------------
Coté IDE, nous avons utilisés <b>Webstorm</b> ou <b>visual Studio Code</b> ainsi que le système de gestion de base de données <b>PostgreSQL</b> (avec l'interface pgAdmin pour certains).
Pour ce qui est des packages utilisés, il y a :

    - Axios : pour les requêtes HTTTP (interagir avec la BDD depuis le front (get, post, etc.))
    - @reach/router : pour gérer les différentes routes
    - bootstrap : pour le style de l'application
    - passport-jwt : pour l'authentification
    - bcrypt : pour le hashage des données comme les mots de passe
    - cors
    - express
    - morgan



Gestion de projet
===================
Nous avons utilisé l'outils collaboratif Trello pour se partager les tâches accomplies ou à faire. Nous avons choisi cet outils car il est très pratique pour avoir un tableau récapituliatif des tâches et c'est une manière très efficace de savoir ce que l'on doit implémenter ou que l'on a déjà implémenté.
De plus pour partager notre travail, l'utilisation de <b>git</b> était obligatoire. 
Au niveau des rôles, nous avons chacuns pris des tâches dans le tableau de Trello. Globalement, nous avons fait à la fois du front et du back en restant en accord les uns des autres.

Application
================
Fonctionnalités obligatoires
---------------
|Membres|Fonctionne totalement|Fonctionne partiellement|ne fonctionne pas|
|:-------------------|:--------------------------------|:---------------|:-------------------|
|**Louis Huret**|Affichage de la liste des quizz avec image associée<br>intégrer une question dont les réponses sont des images et les afficher <br>Authentification
|**Simon Vennat**|Création base de données<br>Affichage de la liste des quizz avec image associée<br>Affichage de la liste des quizz en fonction d'un mot clé<br>Permettre de jouer à un quizz et afficher la somme des points obtenus
|**Quentin Barrez**|Insertion des données dans la base de données (quizz + questions)<br>Authentification<br>Limitation des joueurs non identifiés<br>Création de quiz par un joueur authentifier
|**Kevin Kerkhove**|Permettre de jouer à un quizz et afficher la somme des points obtenus
|**Yanis Boudali**|Affichage des formulaires, intégration de bootstrap aux composants, redimentionnement des images et design de la page d'accueil

**Non fait**
>Modifier un quiz<br>
>Interdire à un joueur de jouer à ses propres quiz<br>
>Mémoriser les scores des joueurs authentifiés     

Mise en place
================
Pour exécuter notre application, il vous suffit de suivre les instructions suivantes :

1. Option 1
   - Commande bash : `./setup`
   
2. Option 2 (lancer les commandes manuellement)
   - Lancer le fichier server/db/pg.sql : `npm run resetDB`
   - Lancer le serveur : `node server/server.js`
   - Compiler le client `npm start`
   
Et voilà ! Vous pouvez maintenant vous rendre sur : [http://localhost:3000/](http://localhost:3000/)

Rétrospective
================
Difficultés rencontrées
---------------
- Gestion de l'affichage des questions et des réponses.
  * Une question par page (donc navigation au sein des questions)
  * Afficher toutes les réponses correspondant à la question sur cette même page
- Gestion des réponses données par l'utilisateur
  * Récupération des données des "checkboxes" sélectionnées par un utilisateur afin de les comparer avec les réponses correctes
- Récupération du score de l'utilisateur
  * Calcul du score de l'utilisateur : comparer les réponses données par un utilisateur (pouvant être multiples) avec les réponses correctes (pouvant aussi être multiples) pour chaque question ; afin de l'afficher à la fin du quiz.

Forces de l'équipe
---------------
- Motivation
- Bonne cohésion
- Persévérance

Gestion des risques
---------------
- Nous avons commencé à regarder à l'authentification dès le début du projet car nous savions que cette partie allait être assez complexe à mettre en place. 

Parties qui auraient pu être améliorées
---------------
- Interface plus "user friendly" pour l'authentification. Par exemple, lorsqu'on essaye de se connecter avec un compte non inscrit, rien n'est indiqué à l'utilisateur. 
- Créer plus de quiz en base de données, plus de quiz avec des images comme réponses.
- Le design des quiz.
- Passer moins de temps sur ce qui a été réalisé pour pouvoir réaliser plus de taches.
