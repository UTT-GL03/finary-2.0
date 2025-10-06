# Readme

## **Choix du sujet**

Finary est un service qui permet d’optimiser ses dépenses et de gérer son partimoine.

Cette application permet à la fois d’identifier les dépenses en doublons, abonnement d’un service non utilisé, ou encore investir son argent, pour faire fructifier son patrimoine, sans frais “injustifiés” par les banques et services traditionnels.

Il y’a moins d’une semaine, Finary ont levé 25 millions, et comptabilisent plus de 600k d’utililsateurs (dont nous faisons partis). Ce type de plateforme innovante nous interesse particulierement, tant sur le volet technologique, que sur les divers impact sociaux et plus largement environnementaux.

## **Utilité sociale**

Les services de gestion de patrimoine comptabilise aujourd’hui 4 millions d’utilisateurs en France. De manière plus générale, les services bancaires sont devenus une partie intégrante de notre quotidien.

L’inflation en France n'a cessé de croitre ces dernières années. D’après l’inserm, +5,9% en 2023, 1,9% en 2024.

C’est dans ce contexte que de plus en plus de personne ont le désir de mieux gérer leur patrimoine, aussi bien leurs dépenses que leurs méthodes d’investissements.

Les services bancaires comme Finary, proposent un accompagnement autonome et personnalisé, pour à la fois aider l’utilisateur à mieux dépenser son argent, et mieux l’investir.

A travers ces divers fonctionnalités, ces applications permettent de redonner du pouvoir d’achat, et de faire gagner du temps.

- Autonomie sur la gestion de ses comptes
- Transparence complète sur tous les frais (bien plus bas que les banques traditionnelles)
- Plateforme tout en un, quoi centralise gestion des comptes et investissement du patriomoine

## **Effets de la numérisation**

Ce type de plateforme se revendique avant tout comme un outil tout en un. En quelques clics, l'utilisateur peut connecter l'ensemble de ses services bancaires, et avoir un apperçu global de ses dépenses. Cette capacité de centralisation permet de supprimer le travail chronophage et manuel de revelés des comptes. 
D'un point de vue environnemental, ce type de plateforme permet de diminuer le nombre de connexion aux services tiers. Au lieu de se rendre quotidiennement sur 5 applications, Finary permet de visualiser les données souhaitez en un seul click.

Les services bancaires digitaux ont permi de numériser les factures, relevés de comptes, et autre paperasse, ce qui permet une réduction drastique de l'utilisation du papier. En creusant ce point, on peut identifier des avantages environnementaux comme la réduction de l'emprunte carbone de la livraison des lettres.

    
- Effet rebond sur l’utilisation excessive à cause de la facilité d’utilisation.

  ## Identification des concurrents:

Nous avons identifié plusieurs acteurs qui évoluent dans le même secteur d’activité que Finary.

Nous nous sommes basés sur nos connaissances et sur des sources externes : [https://fr.semrush.com/website/finary.com/competitors/#:~:text=Comparaison des visites mensuelles %3A,.fr et avenuedesinvestisseurs.fr](https://fr.semrush.com/website/finary.com/competitors/#:~:text=Comparaison%20des%20visites%20mensuelles%20%3A,.fr%20et%20avenuedesinvestisseurs.fr).

Nous avons dans un premier temps, dressé un tableau pour nous donner une idée des ressources utilisées par nos différents acteurs.

Nous avons utilisé l’outil destiné au développeurs “inspect”, qui nous permet de consulter divers types de données. Les éléments qui nous ont semblé être pertinent sont le nombre de requete, le transfert réseau en MB, et les ressources chargées en MB.

| Service | URL | Requêtes | Transfert réseau | Ressources chargées |
| --- | --- | --- | --- | --- |
| Finary | https://finary.com/fr | 70 | 2.1 MB | 5.9 MB |
| Bankin | https://bankin.com/ | 35 | 1.7 MB | 3.3 MB |
| Linxo | https://linxo.com/ | 42 | 1.8 MB | 7.2 MB |
| Revolut | https://www.revolut.com/fr-FR/ | 95 | 46,2 MB | 49 MB |

## **Scénarios d'usage et impacts**

Nous allons prendre l’exemple d’un utilisateur quotidien, qui consulte ses investissements et ses comptes plusieurs fois par jours. Nous pouvons estimer qu’il consulte au moins 5 fois par jour la web app, le matin, le midi et plusieurs fois le soir. 

Nous verrons donc avec 2 cas d’utilisation:

- La consultation des informations
- L’investissement de son patrimoine (moins quotidien en fonction du type d’utilisateur)

### **Scénario : "Consultation de ses comptes et ses investissements"**

1. L’utilisateur ouvre la web app dans un premier temps et se connecte si besoin.
2. Il consulte la courbe sur la page d’accueil.
3. Il change le filtre d’affichage temporel.
4. Il consulte l’ensemble des monnaies dans lesquelles il a investit. 
5. Il consulte détail d’un compte 
6. Il retourne sur la page d’accueil 

### **Scénario : Consultation des informations de la communauté**

1. L’utilisateur charge la page d’accueil
2. Il se rend dans la rubrique communauté.
3. Il consulte le sommaire des articles les plus récents.
4. Il clique sur l’un des articles pour le consulter.
5. Il lit l’ensemble de l’article.
6. Il retourne sur la rubrique des articles.

## **Impact de l'exécution des scénarios auprès de différents services concurrents**

L'EcoIndex d'une page (de A à G) est calculé (sources : [EcoIndex](https://www.ecoindex.fr/comment-ca-marche/), [Octo](https://blog.octo.com/sous-le-capot-de-la-mesure-ecoindex), [GreenIT](https://github.com/cnumr/GreenIT-Analysis/blob/acc0334c712ba68939466c42af1514b5f448e19f/script/ecoIndex.js#L19-L44)) en fonction du positionnement de cette page parmi les pages mondiales concernant :

- le nombre de requêtes lancées,
- le poids des téléchargements,
- le nombre d'éléments du document.

Nous avons choisi de comparer l'impact des scénarios sur les services concurrents de Finary que nous avons identifiés, et réferencés dans la partie “Identification des concurrents”.

| **Service** | **Score (sur 100)** | **Classe** |
| --- | --- | --- |
| Finary | 86 | A 🟩 |
| Bankin | 85 | A 🟩 |
| Linxo | 85 | A 🟩 |
| Revolut | 78 | B 🟩 |

## Business model

## Bankin

Bankin fonctionne principalement sur un modèle freemium combiné à des services B2B et des partenariats

- L’application de base permet de regrouper tous ses comptes bancaires en un seul espace, gratuitement, pour le grand public
- Un abonnement Premium propose des fonctionnalités avancées comme un meilleur suivi des dépenses, des notifications enrichies et la possibilité de créer des catégories personnalisées
- Bankin propose également des produits et services pour les entreprises (B2B) : par exemple des solutions d’agrégation bancaire et d’enrichissement de données à destination de fintechs, banques, ou assureurs souhaitant intégrer des fonctionnalités de pilotage de comptes pour leurs propres clients
- Des revenus sont générés via des partenariats (ex. cashback, offre de produits financiers partenaires via l’app, etc.)
- Enfin, la société monétise l’accès à des APIs et des solutions Data pour l’analyse de transaction et la catégorisation, proposées en marque blanche

## Linxo

Linxo combine le modèle freemium, les services premium, les partenariats financiers et une offre B2B avec sa filiale Linxo Connect

- L’app gratuite permet d’agréger des comptes et d’obtenir un suivi budgétaire de base, tandis que l’offre Premium apporte la catégorisation personnalisée, la recherche avancée et la prévision du solde
- Linxo génère des revenus additionnels via l’aide à l’épargne, l’exécution de virements bancaires intégrés, et la recommandation de produits financiers partenaires (crédits, assurances, etc.)
- Une part importante du business model est l’offre Linxo Connect qui propose une API d’agrégation bancaire et d’initiation de paiement sous licence de l’ACPR. Cette offre vise les banques, fintechs, experts-comptables et institutionnels qui souhaitent intégrer l’agrégation ou le paiement open banking dans leurs solutions (revenus B2B par abonnement ou usage)
- Linxo bénéficie du soutien d’un grand groupe bancaire français et s’appuie sur la certification ISO 27001 pour rassurer partenaires et clients sur la sécurité

## Revolut

Revolut est une néobanque au business model multi-leviers, à la fois B2C et B2B.

- L’application propose un compte courant gratuit avec IBAN, carte bancaire, transferts, change multi-devises, suivi de budget et analytics.
- Plusieurs formules d’abonnements Premium/Metal (paiement mensuel) donnent accès à des avantages (assurances, plafonds étendus, opérations gratuites, cashback, trading…)
- Les revenus sont aussi générés via les frais d’utilisation (ex : retraits au-delà des plafonds), commissions sur change, investissement et trading (actions, cryptos), cashback sur achats, ventes de services d’assurance, etc.
- Sur le segment B2B, Revolut propose Revolut Business, une solution payante de gestion de comptes professionnels et d’outils pour PME, incluant facturation, cartes d’équipes, paiements internationaux, API, etc.
- Revolut monétise aussi la distribution de produits partenaires financiers au sein de l’app (prêts, assurances, crypto), prenant une commission sur la souscription et l’utilisation

---

| Entreprise | Modèle principal | Modèles complémentaires | B2B/Partenariats |
| --- | --- | --- | --- |
| Bankin | Freemium grand public | Premium, cashback, Data/API | Oui (agrégation, data, API, marque blanche) |
| Linxo | Freemium + Premium | Reco produits, virements intégrés | Oui (Linxo Connect API agrégation, paiement) |
| Revolut | Compte bancaire + abonnement | Commissions, trading, cashback | Oui (Revolut Business, produits partenaires) |

Voici un tableau plus précis sur les divers utilisation des services en fonction des status:


| **Service** | **Visiteur anonyme** | **Abonné (Premium/Payant)** |
| --- | --- | --- |
| Bankin | Consultation de comptes agrégés de base
Vue globale des soldes
Catégorisation automatique standard | Catégorisation personnalisée
Recherche avancée de transactions
Suivi budgétaire avancé
Export de données
Alertes personnalisées
Accès prioritaire au support |
| Linxo | Agrégation multi-comptes bancaire 
Visualisation budgétaire simple
Prévision de solde standard
Catégorisation automatique de base | Création de ses propres catégories
Prévisions de solde détaillées
Recherche par montant/date/catégorie illimitée
Suivi précis de l’épargne et des investissements
Virements bancaires directement via l’appli
Support et assistance prioritaire |
| Revolut | Compte bancaire gratuit (IBAN)
Carte virtuelle et physique standard
Paiements et transferts de base
Change multi-devises à tarif standard | Cartes haut de gamme
Plafonds de retrait supérieurs
Assurances premium (voyage, achat, etc.)
Accès à l’investissement (cryptos/actions) sans frais ou à frais réduits
Cashback sur achats
Support prioritaire |

Comme nos concurrents fonctionnent tous sur un model freemium, nous pensons resté sur ce même modèle pour ne pas perdre l’utilisateur.

Bankin propose ses services à 3.33€ / mois, Finary 12€ /mois, Linxo 4€/mois et Revolut 10€/mois. 

Nous avons remarqué que tous ces concurrents proposent un large panel de fonctionnalité pour assurer leur rentabilité. Leur offre devient donc beaucoup plus large et parfois moins claire. 

Or nous voulons principalement nous concentrer sur la gestion des dépenses, sans ajouter une multitude de produit dans le produit. Nous pensons donc pouvoir nous différencier par la simplicité et le cout plus réduit que nous pouvons proposer, proposer un abonnement à 2.99€.

Il nous faudrait donc 1190 abonnés pour pouvoir verser un salaire.

En nous basant sur le cout salaire median, qui s’élève à 3569€  selon l’URSAF.

Les 2 fonctionnalités sur lesquelles nous allons nous concentrer sont:

- Referencement des dépenses
- Identification des doublons & économie possibles.

Les autres business model, dons, publicité ne nous paraissent absoulement pas viable pour notre projet, étant donné que tous nos concurrents proposent déjà ces services à des prix très accéssibles, sans publicité, qui appauvri l’experience utilisateur.

Nous sommes bien conscient que cet objectif peut être compliqué à atteindre. 

Nous avons cependant pensé à plusieurs stratégies pour toucher notre marché de Niche:

- Publication de contenu sur les réseaux  pour créer une communauté
- Système de parrainage
- Subvention de l’état: Nous pensons que la littératie financière de la population peut être favorable à l’état.
