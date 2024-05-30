import { reactive } from 'vue';

/**
 * Construit une instance d'un objet "cart" représentant un panier d'achats.
 * Le contenu du panier est récupéré grâce au REST API du back-end.
 * Les données sont synchronisées avec le back-end lors de toute action qui modifie le panier.
 * 
 * @param {String} userId L'identifiant de l'utilisateur présentement connecté
 * @returns Un objet représentant le panier
 */
export function createCart(userId) {
    const cart = reactive({
        userId: userId,
        initialLoadInvoked: false,
        loading: false,
        itemsLoaded: false,
        loadError: false,
        items: [],
        /**
         * Cette méthode fait la récupération initiale des données du panier depuis l'API back-end.
         * Puisque celle-ci peut être appelée à partir de plus d'un composant (avec sa méthode de cycle de vie mounted()),
         * on garde un trace de si elle a déjà été appelée grâce au champ initialLoadInvoked. Si c'est le cas,
         * on ne l'appellera pas une deuxième fois, afin d'éviter de charger les données à nouveau pour rien.
         */
        initialFetch() {
            if (!this.initialLoadInvoked) {
                this.initialLoadInvoked = true;
                this.fetchCart();
            }
        },
        /**
         * Récupère les données du panier depuis le REST API (back-end). Le tableau items de l'objet courant sera
         * peuplé avec les items du panier lorsque le téléchargement est complété. Le champs itemsLoaded sera mis à true
         * également, afin d'indiquer que le chargement est terminé. Si une erreur quelconque survient, le champ
         * loadError sera mis à true afin d'indiquer qu'il y a un problème.
         * 
         * @return Promesse avec les données du panier chargées
         */
        fetchCart() {
            this.loading = true;

            // ** Exercice 2.3 : utiliser la fonction fetch(...) de JavaScript
            // pour récupérer le panier (cart) pour l'usager courant, spécifié par la propriété userId
            // de l'objet. **

            /*
            Étape 1 : Faire le fetch, qui retournera une promesse pour un objet réponse.
                      Le endpoint à utiliser est "/api/cart/{userId}", où on substitue {userId}
                      par la valeur de la propriété userId de l'objet courant.
                      À vous de déterminer quelle méthode HTTP employer !

            Étape 2 : Avec cette promesse, vérifier si le statut de la réponse est OK,
                      puis obtenir un objet JavaScript (qui sera retourné comme promesse)
                      à partir du le contenu JSON de la réponse.
                      Si le statut n'est pas OK, on doit retourner une promesse rompue (ou lancer
                      une exception, cela aura le même effet) qui sera gérée plus loin avec une
                      méthode catch(...).

            Étape 3 : Avec la promesse pour l'objet JavaScript (représentant les items du panier),
                      affecter les données à la propriété items de l'objet courant afin que les items
                      du panier soient accessibles à tous les composants qui utilisent le panier. Puisque
                      l'objet courant est réactif, les composants vont se rafraîchir tout seul.
                      S'assurer par le fait même de mettre à jour les propriétés suivantes :
                        itemsLoaded : doit être true lorsque le chargement est complété
                        loading : doit être false lorsque le chargement est complété
                        loadError : doit être false lorsque le chargement s'est fait sans problème

            Étape 4 : Gérer les erreurs de la promesse retournée par les étapes précédentes, grâce à
                      la méthode catch(...).
                      On doit mettre la propriété loadError à true si une erreur
                      est survenue. Des composants se servent de cette propriété afin d'indiquer un
                      problème a empêché le chargement des données.
            
            En alternative à l'usage de fetch(...).then(...).then(...).catch(...), il est aussi possible
            d'écrire une fonction async et d'utiliser le mot-clé await. L'approche est laissée à votre
            discrétion, tant que la fonctionnalité est correcte.
            */

        },
        /**
         * Ajoute un produit (selon son productId) au panier. L'ajout est géré côté back-end, on fait
         * un appel PUT au chemin /api/cart/:userId/:productId sans spécifier la quantité dans l'objet JSON
         * de la requête. Si le produit existe déjà dans le panier, le back-end s'occupera d'incrémenter
         * sa quantité de 1.
         * 
         * @param {String} productId L'identifiant du produit à ajouter
         */
        addToCart(productId) {
            // Ceci désactivera les actions qui modifient les données du panier (ajout, changement de quantité, retrait)
            // en attendant que le rechargement des données du panier soit complété.
            this.loading = true;

            // ** Exercice 2.4 : utiliser la fonction fetch(...) de JavaScript
            // pour dire au back-end d'ajouter un article au panier. **

            /*
            Étape 1 : Faire le fetch, qui retournera une promesse pour un objet réponse.
                      Le endpoint à utiliser est "/api/cart/{userId}/{productId}", où on substitue {userId}
                      par la valeur de la propriété userId de l'objet courant et {productId} par la valeur
                      du paramètre productId. À vous de déterminer quelle méthode HTTP employer !
                      Noter que la logique côté back-end traitera correctement l'ajout d'un article sans quantité :
                       - Si l'article n'est pas déjà dans le panier, il sera ajouté avec une quantité de 1.
                       - Si l'article est déjà dans le panier, sa quantité sera incrémentée de 1.

            Étape 2 : Avec cette promesse, vérifier si le statut de la réponse est OK. Si oui,
                      faire l'appel de la méthode fetchCart() afin de recharger les données du panier
                      après leur modification côté back-end.
                      On doit faire cela pour rafraîchir l'affichage de tous les composants qui dépendent du
                      panier, après sa modification côté back-end. Ce n'est pas la méthode la plus efficace
                      côté performance, car on aurait pu recharger uniquement les données pour l'article
                      ajouté, mais ça a l'avantage d'être simple à faire !

                      Si le statut n'est pas OK, on doit retourner une promesse rompue (ou lancer
                      une exception, cela aura le même effet) qui sera gérée plus loin avec une
                      méthode catch(...).

            Étape 3 : Gérer les erreurs de la promesse retournée par les étapes précédentes, grâce à
                      la méthode catch(...). Afficher l'erreur dans la console.
            
            En alternative à l'usage de fetch(...).then(...).then(...).catch(...), il est aussi possible
            d'écrire une fonction async et d'utiliser le mot-clé await. L'approche est laissée à votre
            discrétion, tant que la fonctionnalité est correcte.
            */
        },
        /**
         * Retire un produit du panier selon son productId. Si aucun produit avec ce productId n'existe,
         * la méthode n'a aucun effet. La suppression se fait depuis le back-end.
         * @param {String} productId L'identifiant du produit à retirer
         */
        removeFromCart: function (productId) {
            // Ceci désactivera les actions qui modifient les données du panier (ajout, changement de quantité, retrait)
            // en attendant que le rechargement des données du panier soit complété.
            this.loading = true;

            // ** Exercice 2.5 : utiliser la fonction fetch(...) de JavaScript
            // pour dire au back-end de retirer un article du panier. **

            /*
            Étape 1 : Faire le fetch, qui retournera une promesse pour un objet réponse.
                      Le endpoint à utiliser est "/api/cart/{userId}/{productId}", où on substitue {userId}
                      par la valeur de la propriété userId de l'objet courant et {productId} par la valeur
                      du paramètre productId.
                      À vous de déterminer quelle méthode HTTP employer !

            Étape 2 : Avec cette promesse, vérifier si le statut de la réponse est OK. Si oui,
                      faire l'appel de la méthode fetchCart() afin de recharger les données du panier
                      après leur modification côté back-end.
                      On doit faire cela pour rafraîchir l'affichage de tous les composants qui dépendent du
                      panier, après sa modification côté back-end. Ce n'est pas la méthode la plus efficace
                      côté performance, car on aurait pu recharger uniquement les données pour l'article
                      ajouté, mais ça a l'avantage d'être simple à faire !

                      Si le statut n'est pas OK, on doit retourner une promesse rompue (ou lancer
                      une exception, cela aura le même effet) qui sera gérée plus loin avec une
                      méthode catch(...).

            Étape 3 : Gérer les erreurs de la promesse retournée par les étapes précédentes, grâce à
                      la méthode catch(...). Afficher l'erreur dans la console.
            
            En alternative à l'usage de fetch(...).then(...).then(...).catch(...), il est aussi possible
            d'écrire une fonction async et d'utiliser le mot-clé await. L'approche est laissée à votre
            discrétion, tant que la fonctionnalité est correcte.
            */
        },
        /**
         * Change la quantité d'un produit dans le panier.
         * @param {String} productId L'identifiant du produit dont on veut changer la quantité
         * @param {Number} newQuantity La nouvelle quantité
         */
        changeQuantity: function (productId, newQuantity) {
            // Ceci désactivera les actions qui modifient les données du panier (ajout, changement de quantité, retrait)
            // en attendant que le rechargement des données du panier soit complété.
            this.loading = true;

            // ** Exercice 2.6 : utiliser la fonction fetch(...) de JavaScript
            // pour dire au back-end de modifier la quantité d'un article dans le panier. **

            /*
            Étape 1 : Faire le fetch, qui retournera une promesse pour un objet réponse.
                      Le endpoint à utiliser est "/api/cart/{userId}/{productId}", où on substitue {userId}
                      par la valeur de la propriété userId de l'objet courant et {productId} par la valeur
                      du paramètre productId.
                      À vous de déterminer quelle méthode HTTP employer et quel contenu passer avec la requête !

            Étape 2 : Avec cette promesse, vérifier si le statut de la réponse est OK. Si oui,
                      faire l'appel de la méthode fetchCart() afin de recharger les données du panier
                      après leur modification côté back-end.
                      On doit faire cela pour rafraîchir l'affichage de tous les composants qui dépendent du
                      panier, après sa modification côté back-end. Ce n'est pas la méthode la plus efficace
                      côté performance, car on aurait pu recharger uniquement les données pour l'article
                      ajouté, mais ça a l'avantage d'être simple à faire !

                      Si le statut n'est pas OK, on doit retourner une promesse rompue (ou lancer
                      une exception, cela aura le même effet) qui sera gérée plus loin avec une
                      méthode catch(...).

            Étape 3 : Gérer les erreurs de la promesse retournée par les étapes précédentes, grâce à
                      la méthode catch(...). Afficher l'erreur dans la console.
            
            En alternative à l'usage de fetch(...).then(...).then(...).catch(...), il est aussi possible
            d'écrire une fonction async et d'utiliser le mot-clé await. L'approche est laissée à votre
            discrétion, tant que la fonctionnalité est correcte.
            */
        },
        /**
         * Calcule et retourne le prix total de tous les produits dans le panier
         * @returns Le prix total des produits dans le panier
         */
        calculateTotal() {
            let total = 0;
            this.items.forEach((item) => {
                total = total + item.quantity * item.product.price;
            });

            return total;
        },
        /**
         * Retourne le nombre total d'articles dans le panier
         * @returns Le nombre d'articles dans le panier
         */
        calculateTotalItems() {
            let total = 0;
            this.items.forEach((item) => {
                total = total + item.quantity;
            });

            return total;
        }
    });
    return cart;
}
