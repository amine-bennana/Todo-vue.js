# Réponses aux Questions du TP : Comparaison React ↔ Vue.js 3

Ce document regroupe les réponses détaillées aux questions du TP (Q1 à Q14), analysant les différences de paradigme, de syntaxe et de gestion d'état entre React et Vue 3.

---

### **Partie 1 : Structure du Projet**

#### **➤ Q1 : Un fichier `.vue` a 3 sections séparées. Un fichier `.tsx` mélange tout. Quel avantage/inconvénient de chaque approche ?**

| Approche | Avantages | Inconvénients |
| :--- | :--- | :--- |
| **Vue (`.vue` - SFC)** | <ul><li>**Séparation claire des préoccupations** (HTML pour la structure, JS/TS pour la logique, CSS pour le style) dans un seul fichier.</li><li>Traductions et styles CSS isolés (`scoped`) intégrés de manière native.</li><li>Plus lisible et intuitif pour les développeurs web traditionnels ou les designers.</li></ul> | <ul><li>Moins flexible pour la manipulation dynamique avancée du markup par rapport à du pur JavaScript.</li><li>Le partage de variables entre le script et le style est moins direct (bien que Vue 3 supporte `v-bind` en CSS).</li></ul> |
| **React (`.tsx` - JSX)** | <ul><li>**"Tout est JavaScript"** : le markup HTML n'est qu'une expression JS, ce qui donne une flexibilité totale.</li><li>Typage TypeScript extrêmement puissant et natif (le JSX est entièrement vérifié au niveau des types).</li><li>Facilité pour extraire des sous-composants à la volée dans le même fichier.</li></ul> | <ul><li>Le code peut rapidement devenir désordonné si les styles, la logique et le JSX sont mal organisés.</li><li>Pas de solution de style isolée intégrée par défaut (nécessite CSS Modules, Tailwind, ou CSS-in-JS).</li></ul> |

---

### **Partie 2 : Réactivité & Syntaxe**

#### **➤ Q2 : En React, l’input nécessite `useState` + `value` + `onChange` (3 éléments). En Vue, `v-model` fait tout en 1. Pourquoi React ne propose-t-il pas de two-way binding natif ?**
React adhère à une philosophie stricte de **flux de données unidirectionnel** (unidirectional data flow). Les données descendent (via les props) et les actions montent (via les callbacks). 
* **Pourquoi ce choix ?** Cela rend le flux de données prévisible et facile à déboguer. Il n'y a pas de "magie" sous le capot : chaque modification d'état est explicite et tracée via une fonction gestionnaire (`onChange`).
* **Vue** utilise `v-model` comme du **sucre syntaxique** (syntactic sugar) qui génère automatiquement le binding de valeur (`:value`) et l'écouteur d'événement (`@input`).

#### **➤ Q3 : En React, `tasks.push(data)` est INTERDIT (immutabilité). En Vue, `tasks.value.push(data)` fonctionne. Expliquez pourquoi avec le mot « Proxy ».**
* **En React :** Le moteur s'appuie sur l'immutabilité. Il compare les références des objets (égalité stricte `===`). Si vous modifiez directement un tableau avec `.push()`, sa référence reste identique. React estime donc que le state n'a pas changé et ne déclenche aucun re-render.
* **En Vue 3 :** Le système de réactivité repose sur l'objet **`Proxy`** (ES6). Lorsque vous déclarez une variable réactive avec `ref()` ou `reactive()`, Vue enveloppe cet objet dans un `Proxy`. Quand vous exécutez `tasks.value.push(data)`, le `Proxy` intercepte cette mutation de manière transparente, détecte que le tableau a été modifié, et notifie automatiquement tous les composants dépendants pour mettre à jour le DOM de manière chirurgicale.

#### **➤ Q4 : React utilise `useEffect(fn, [])` pour le montage. Vue utilise `onMounted(fn)`. Lequel est plus lisible ? Pourquoi React a-t-il choisi un tableau de dépendances ?**
* **Lisibilité :** `onMounted(fn)` de Vue est plus lisible. Son nom indique explicitement à quel moment du cycle de vie le code s'exécute (au montage du composant).
* **Choix de React :** `useEffect` n'est pas un hook de cycle de vie au sens strict, mais un outil de **synchronisation d'état**. React a choisi un tableau de dépendances pour indiquer à quel moment resynchroniser l'effet. Si le tableau contient des variables `[a, b]`, l'effet s'exécute à chaque changement de ces variables. Un tableau vide `[]` signifie simplement que l'effet n'a pas de dépendances externes à surveiller, provoquant son exécution unique au montage par coïncidence de logique.

---

### **Partie 3 : Communication Composants**

#### **➤ Q5 : React passe des FONCTIONS en props (`onDelete={fn}`). Vue émet des ÉVÉNEMENTS (`@delete`). Quelle approche est plus proche du HTML natif ? Pourquoi ?**
L'approche de **Vue** (`@delete` / `emit`) est plus proche du HTML natif.
* **Pourquoi ?** Dans le DOM natif du navigateur, les éléments communiquent de bas en haut via des événements (par exemple, un bouton émet un événement `click` que l'on écoute avec `addEventListener` ou `@click`). Vue reproduit ce modèle standard de dispatch d'événements personnalisés. 
* **React** traite les fonctions comme n'importe quelle autre valeur passée en propriété (`prop`), ignorant la sémantique événementielle native pour rester dans un modèle objet classique.

#### **➤ Q6 : En React, si on oublie de passer `onDelete` en prop, l’app crash au clic. En Vue, si on oublie `@delete`, que se passe-t-il ?**
* **En Vue :** L'événement est émis par le composant enfant, mais comme aucun écouteur n'est défini sur le parent, il est **silencieusement ignoré**. L'application continue de fonctionner sans aucune erreur.
* **En React :** Tenter d'appeler `props.onDelete(...)` alors que la fonction n'a pas été fournie lèvera une exception `TypeError: props.onDelete is not a function` et fera crasher l'application (sauf si le développeur a écrit une vérification sécurisée du type `props.onDelete?.(...)`).

---

### **Partie 4 : Routage**

#### **➤ Q7 : React Router utilise `useParams()` + `useNavigate()` (2 hooks). Vue Router utilise `useRoute()` + `useRouter()` (2 hooks aussi). La logique est-elle vraiment différente ou juste les noms ?**
La logique globale de navigation est identique, mais la structure des responsabilités diffère :
* **`useRoute()` (Vue)** expose l'**état de la route actuelle** (les paramètres d'URL, la query string, le chemin, etc.). C'est l'équivalent de `useParams()` + `useLocation()` dans React Router.
* **`useRouter()` (Vue)** donne accès à l'**instance globale du routeur** pour effectuer des actions programmatiques (comme la redirection `router.push('/home')`). C'est l'équivalent de `useNavigate()` dans React Router.
C'est donc principalement une différence de regroupement sémantique (Info de route actuelle vs Actions du Routeur).

#### **➤ Q8 : En React, les routes sont définies DANS le JSX (`<Routes><Route .../></Routes>`). En Vue, elles sont dans un FICHIER de config (`router/index.ts`). Quel avantage à la séparation de Vue ?**
Définir les routes dans un fichier de configuration séparé comme en Vue apporte :
1. **Centralisation :** Une vue globale et instantanée de toute l'architecture de navigation de l'application au même endroit.
2. **Maintenance simplifiée :** Application facile de middlewares globaux (navigation guards, e.g. pour vérifier si un utilisateur est connecté avant d'entrer sur une page).
3. **Optimisation des performances :** La configuration facilite le code-splitting (chargement paresseux) de manière propre grâce aux imports dynamiques `component: () => import(...)`.

---

### **Partie 5 : State Management (Pinia vs Redux)**

#### **➤ Q9 : Redux Toolkit nécessite : `createSlice` + `configureStore` + `Provider` + `useSelector` + `useDispatch`. Pinia nécessite : `defineStore` + `useTaskStore()`. Comptez les concepts à apprendre pour chacun.**
* **Redux Toolkit (~6 concepts) :** Actions, Reducers, Store, Slices, Dispatcher (`useDispatch`), Selectors (`useSelector`), plus l'architecture de flux de données immuable.
* **Pinia (2 concepts) :** Définition du Store (`defineStore` composé de state, actions, getters) et utilisation via une fonction hook réactive (`useTaskStore`).

#### **➤ Q10 : En Redux, on écrit `dispatch(addTask(title))`. En Pinia, on écrit `store.addTask(title)`. Lequel est plus intuitif ? Redux a-t-il un avantage que Pinia n’a pas ?**
* **Plus intuitif :** L'écriture de **Pinia** (`store.addTask(title)`) est beaucoup plus intuitive car elle s'apparente à un simple appel de méthode orienté objet en JavaScript.
* **Avantage de Redux :** Le fait de passer par un `dispatch` centralisé d'actions immuables permet un traçage parfait et historique de chaque modification. C'est ce qui rend possible le **time-travel debugging** extrêmement puissant dans les DevTools de Redux (revenir en arrière pas-à-pas sur les actions passées), là où Pinia propose des DevTools simplifiés.

---

### **Partie 6 : Comparaison finale & Choix d'architecture**

#### **➤ Q11 : Quels concepts sont IDENTIQUES entre React et Vue (juste le nom qui change) ? Quels concepts sont FONDAMENTALEMENT différents ?**
* **Identiques :** Composants réutilisables, passage de données descendants (Props), utilisation d'un DOM virtuel pour optimiser les performances, division logique des pages et routage dynamique.
* **Différents :** La gestion du cycle de mise à jour (Immutabilité + re-rendu complet en React contre Mutabilité + Proxy réactif granulaire en Vue), et le binding bidirectionnel natif (`v-model` vs `onChange`).

#### **➤ Q12 : Vue a `v-model` (two-way binding natif) et les mutations directes (`push`, `splice`). React exige l’immutabilité et `onChange` explicite. Quel framework est plus « magique » ? Est-ce un avantage ou un inconvénient ?**
* **Vue est plus "magique"** car il prend en charge de façon transparente la détection des changements et le couplage des formulaires.
* **Avantages :** Gain de temps considérable, moins de code répétitif à écrire, courbe d'apprentissage initiale plus douce.
* **Inconvénients :** Le débogage peut être complexe si la réactivité est rompue (ex. en destructurant un objet réactif sans précautions), et cela peut occulter la compréhension des mécanismes fondamentaux du DOM pour les débutants.

#### **➤ Q13 : Vous devez créer une app e-commerce avec 50+ pages, une équipe de 10 développeurs, et un dashboard admin complexe. React ou Vue ? Justifiez.**
* **React** est souvent privilégié pour ce profil de projet :
  * **Écosystème géant :** Grande diversité de bibliothèques tierces matures pour les tableaux de données complexes, formulaires avancés et graphiques.
  * **Stricte architecture :** L'immutabilité et le typage TypeScript natif poussé de JSX limitent les comportements inattendus dans une équipe de 10 personnes.
  * *Alternative Vue :* Vue 3 avec TypeScript et Pinia est tout à fait capable de gérer ce projet avec une vitesse de développement supérieure, mais nécessite de poser des règles de cadre strictes au sein de l'équipe pour éviter les dérives de code.

#### **➤ Q14 : Un débutant qui n’a jamais fait de JavaScript framework veut apprendre. Vous lui conseillez React ou Vue en premier ? Pourquoi ?**
Il est conseillé de commencer par **Vue.js**.
* **Pourquoi ?** Vue respecte le découpage classique du web (HTML/CSS/JS). Le passage du JavaScript natif à Vue se fait naturellement. React, en revanche, impose d'assimiler JSX, l'immutabilité, et les règles strictes d'exécution des hooks dès le premier jour, ce qui augmente considérablement la charge cognitive de départ.
