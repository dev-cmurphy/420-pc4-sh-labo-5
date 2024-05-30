Cet exemple comprend deux parties :

1. Le front-end (Vue.js) dans le répertoire lab5_frontend.

On peut démarrer celui-ci en ouvrant le répertoire dans VS Code, en allant dans le terminal puis en lançant les commandes habituelles pour le lancer :

npm install
npm run dev

Le front-end a un proxy de configuré qui relaie toute requête aux chemins d'URL qui commencent par /api/ au back-end (http://localhost:3000) qui doit être démarré en parallèle, voir la section suivante.


2. Le back-end (Node.js Express) dans le répertoire lab5_backend.

Les étapes pour démarrer le back-end en mode développement sont exactement les mêmes que pour le front-end :

 - Ouvrir le projet dans VS Code
 - Aller dans le terminal
 - Lancer les commandes:
 
npm install
npm run dev


On devrait voir apparaître cet affichage sur la console :
------------------------------------------------------------
> exemple-1-backend@0.0.0 dev
> nodemon ./bin/www

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./bin/www`
------------------------------------------------------------


Une fois ces deux étapes accomplies, vous pouvez ensuite ouvrir la page servie par le front-end (http://localhost:5173) et réaliser les exercices du laboratoire.
