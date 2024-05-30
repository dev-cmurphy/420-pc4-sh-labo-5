<template>
    <div class="boxed-left">
        <form @submit.prevent="soumettreInfos">
            <div>
                <h2>Paiement</h2>
                <div class="form-control" :class="{ invalide: !nomPaiementValide }">
                    <label for="nom-paiement">Nom sur la carte de crédit: </label>
                    <!-- L'événement blur survient lorsqu'on perd le focus de ce champ -->
                    <!-- Le modificateur .trim ajouté à v-model supprime les espaces au début et à la fin de la chaîne entrée -->
                    <input id="nom-paiement" name="nom-paiement" type="text" v-model.trim="nomPaiement"
                        @blur="validerNomPaiement" />
                    <span v-if="!nomPaiementValide">Veuillez entrer un nom !</span>
                </div>
                <div class="form-control" :class="{ invalide: !carteCreditValide }">
                    <label for="cartecredit">Numéro de carte de crédit: </label>
                    <input id="cartecredit" name="cartecredit" type="text" v-model.trim="carteCredit" />
                    <span v-if="!carteCreditValide">Veuillez entrer un numéro de carte de crédit sous la forme 4555 5555
                        5555 5555</span>
                </div>
                <div class="form-control" :class="{ invalide: !dateExpValide }">
                    <label for="dateexp">Année et mois d'expiration (AAAA/MM): </label>
                    <input id="dateexp" name="dateexp" type="text" v-model.trim="dateExp" />
                    <span v-if="!dateExpValide">Veuillez entrer une date d'expiration, p.ex. 2024/05</span>
                </div>
            </div>
            <h2>Expédition</h2>
            <div>
                <h4>Mode d'expédition</h4>
                <div class="form-control">
                    <input id="expedition-postes-canada" name="expedition" type="radio" value="postescanada"
                        v-model="modeExpedition" />
                    <label for="expedition-postes-canada">Postes Canada</label>
                    <input id="expedition-purolator" name="expedition" type="radio" value="purolator"
                        v-model="modeExpedition" />
                    <label for="expedition-purolator">Purolator</label>
                    <input id="expedition-fedex" name="expedition" type="radio" value="fedex" v-model="modeExpedition" />
                    <label for="expedition-fedex">FedEx</label>
                </div>
            </div>
            <div>
                <h4>Adresse</h4>
                <div class="form-control" :class="{ invalide: !nomExpeditionValide }">
                    <label for="nom-expedition">Nom: </label>
                    <input id="nom-expedition" name="nom-expedition" type="text" v-model.trim="nomExpedition" />
                    <span v-if="!nomExpeditionValide">Veuillez entrer un nom</span>
                </div>
                <div class="form-control" :class="{ invalide: !adresseValide }">
                    <label for="adresse-expedition">Adresse: </label>
                    <input id="adresse-expedition" name="adresse-expedition" type="text" v-model.trim="adresse" />
                    <span v-if="!adresseValide">Veuillez entrer une adresse</span>
                </div>
                <div class="form-control" :class="{ invalide: !villeValide }">
                    <label for="ville-expedition">Ville: </label>
                    <input id="ville-expedition" name="ville-expedition" type="text" v-model.trim="ville" />
                    <span v-if="!villeValide">Veuillez entrer une ville</span>
                </div>
                <div class="form-control" :class="{ invalide: !provinceValide }">
                    <label for="province">Province: </label>
                    <select id="province" name="province" v-model="province">
                        <option v-for="province in listeProvinces" :value="province">{{ province }}</option>
                    </select>
                    <span v-if="!provinceValide">Veuillez choisir une province</span>
                </div>
                <div class="form-control" :class="{ invalide: !codePostalValide }">
                    <label for="codepostal-expedition">Code postal: </label>
                    <input id="codepostal-expedition" name="codepostal-expedition" type="text" v-model.trim="codePostal" />
                    <span v-if="!codePostalValide">Veuillez entrer un code postal valide</span>
                </div>
            </div>
            <button>Passer la commande</button>
        </form>
    </div>
</template>

<script>

export default {
    inject: ['cart'],
    data() {
        return {
            nomPaiement: '',
            nomPaiementValide: true,
            carteCredit: '',
            carteCreditValide: true,
            dateExp: '',
            dateExpValide: true,
            modeExpedition: 'postescanada',
            nomExpedition: '',
            nomExpeditionValide: true,
            adresse: '',
            adresseValide: true,
            ville: '',
            villeValide: true,
            province: '',
            provinceValide: true,
            listeProvinces:
                [
                    'Yukon',
                    'Territoires du Nord-Ouest',
                    'Nunavut',
                    'Colombie-Britannique',
                    'Alberta',
                    'Saskatchewan',
                    'Manitoba',
                    'Ontario',
                    'Québec',
                    'Nouveau-Brunswick',
                    'Nouvelle-Écosse',
                    'Île-du-Prince-Édouard',
                    'Terre-Neuve et Labrador'
                ],
            codePostal: '',
            codePostalValide: true
        }
    },
    methods: {
        soumettreInfos() {
            console.log('nomPaiement: ', this.nomPaiement);
            console.log('carteCredit: ', this.carteCredit);
            console.log('dateExp: ', this.dateExp);
            console.log('modeExpedition: ', this.modeExpedition);
            console.log('nomExpedition: ', this.nomExpedition);
            console.log('adresse: ', this.adresse);
            console.log('ville: ', this.ville);
            console.log('province: ', this.province);
            console.log('nomPaiement: ', this.nomPaiement);
            console.log('codePostal: ', this.codePostal);

            this.validerNomPaiement();
            this.validerCarteCredit();
            this.validerDateExp();
            this.validerNomExpedition();
            this.validerAdresse();
            this.validerVille();
            this.validerProvince();
            this.validerCodePostal();

            if (this.nomPaiementValide && this.carteCreditValide && this.dateExpValide && this.nomExpeditionValide
                && this.adresseValide && this.villeValide && this.provinceValide && this.codePostalValide) {
                this.envoyerCommande();
            } else {
                alert("Veuillez corriger les informations erronées");
            }
        },
        reinitialiserFormulaire() {
            this.nomPaiement = '';
            this.nomPaiementValide = true;
            this.carteCredit = '';
            this.carteCreditValide = true;
            this.dateExp = '';
            this.dateExpValide = true;
            this.modeExpedition = 'postescanada';
            this.nomExpedition = '';
            this.nomExpeditionValide = true;
            this.adresse = '';
            this.adresseValide = true;
            this.ville = '';
            this.villeValide = true;
            this.province = '';
            this.provinceValide = true;
        },
        envoyerCommande() {
            // ** Exercice 2.7 : utiliser la fonction fetch(...) de JavaScript
            // pour soumettre la commande au back-end. **

            /*
            Étape 1 : Construire un objet qui contiendra toutes les données nécessaires pour soumettre
                      la commande. Voir la partie 1 du laboratoire pour connaître la structure de données
                      que le back-end accepte. Noter qu'on n'a pas à envoyer les articles individuels dans
                      le panier avec la requête effectuant la commande : en spécifiant le userId dans l'objet
                      de la requête, le back-end pourra retrouver les articles et quantités du panier de ce client car
                      ils ont déjà été enregistrés côté back-end­.
                      Vous pouvez coder en dur le userId à la valeur "josbleau" actuellement. Dans un futur
                      laboratoire, cette valeur sera remplacée par le userId de l'utilisateur authentifié.

            Étape 2 : Faire le fetch, qui retournera une promesse pour un objet réponse.
                      Le endpoint à utiliser est "/api/orders". On passera dans le corps de la requête
                      l'objet construit à l'étape 1, sérialisé en JSON.
                      À vous de déterminer quelle méthode HTTP employer !

            Étape 3 : Avec cette promesse, vérifier si le statut de la réponse est OK. Si oui, faites
                      les actions suivantes :
                      1. Faire l'appel de la méthode fetchCart() afin de recharger les données du panier
                         après leur modification côté back-end. Le back-end s'occupe de vider le panier
                         de l'utilisateur si la commande est traitée correctement, donc il importe
                         d'appeler fetchCart() pour que tous les composants qui dépendent du panier
                         soient rafraîchis.
                      2. Appeler la méthode reinitialiserFormulaire() du composant présent afin de
                         vider tous les champs du formulaire.
                      3. Afficher un pop-up (la fonction alert(...) peut être utilisé) affichant le message
                         "La commande a bien été reçue, merci d'avoir acheté au Panier Vert !".

                      Si le statut n'est pas OK, on doit retourner une promesse rompue (ou lancer
                      une exception, cela aura le même effet) qui sera gérée plus loin avec une
                      méthode catch(...).

            Étape 4 : Gérer les erreurs de la promesse retournée par les étapes précédentes, grâce à
                      la méthode catch(...). Afficher l'erreur dans la console.
            
            En alternative à l'usage de fetch(...).then(...).then(...).catch(...), il est aussi possible
            d'écrire une fonction async et d'utiliser le mot-clé await. L'approche est laissée à votre
            discrétion, tant que la fonctionnalité est correcte.
            */
        },
        validerNomPaiement() {
            if (this.nomPaiement === '') {
                this.nomPaiementValide = false;
            } else {
                this.nomPaiementValide = true;
            }
        },
        validerCarteCredit() {
            const regex = /^4[0-9]{3}(?: [0-9]{4}){3}$/;
            if (this.carteCredit && regex.test(this.carteCredit)) {
                this.carteCreditValide = true;
            } else {
                this.carteCreditValide = false;
            }
        },
        // Informations utiles :
        // regex pour valider le mois et année (AAAA/MM) : /^[0-9]{4}\/[0-1][0-9]$/
        // (permet d'entrer des mois plus grands que 12 mais bon ...)
        // 
        // regex pour valider le code postal : /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/
        validerDateExp() {
            const regex = /^[0-9]{4}\/[0-1][0-9]$/;
            if (this.dateExp && regex.test(this.dateExp)) {
                this.dateExpValide = true;
            } else {
                this.dateExpValide = false;
            }
        },
        validerNomExpedition() {
            if (this.nomExpedition !== '') {
                this.nomExpeditionValide = true;
            } else {
                this.nomExpeditionValide = false;
            }
        },
        validerAdresse() {
            if (this.adresse !== '') {
                this.adresseValide = true;
            } else {
                this.adresseValide = false;
            }
        },
        validerVille() {
            if (this.ville !== '') {
                this.villeValide = true;
            } else {
                this.villeValide = false;
            }
        },
        validerProvince() {
            if (this.province !== '') {
                this.provinceValide = true;
            } else {
                this.provinceValide = false;
            }
        },
        validerCodePostal() {
            const regex = /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/;
            if (this.codePostal && regex.test(this.codePostal)) {
                this.codePostalValide = true;
            } else {
                this.codePostalValide = false;
            }
        }
    },
    watch: {
        carteCredit(nouvCarteCredit) {
            this.validerCarteCredit();
        },
        dateExp(nouvDateExp) {
            this.validerDateExp();
        },
        nomExpedition(nouvNomExpedition) {
            this.validerNomExpedition();
        },
        adresse(nouvAdresse) {
            this.validerAdresse();
        },
        ville(nouvVille) {
            this.validerVille();
        },
        province(nouvProvince) {
            this.validerProvince();
        },
        codePostal(nouvCodePostal) {
            this.validerCodePostal();
        }
    }
}
</script>

<style scoped>
.form-control.invalide input,
.form-control.invalide select {
    border-color: red;
}

.form-control.invalide label {
    color: red;
}

form * {
    margin: 0.3rem;
}

.boxed-left {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
    width: 90%;
    max-width: 80rem;
}
</style>
