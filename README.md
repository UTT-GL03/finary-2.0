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

Tab.1 : Mesure de l'EcoIndex moyen de services de quotidiens nationaux.

Nous avons decidé d'analyser seulement le scénario n°1. Ce scénario est réalisable avec toutes les autres web app, alors que la fonctionnalité de news par la communauté est propre à Finary 

Les sites que nous avons selectionnés semblent suivre les bonnes pratiques (cashing etc), qui permettent d’améilorer drastiquement leur score.
