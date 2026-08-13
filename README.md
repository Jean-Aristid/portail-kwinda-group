# Portail de marques

## Objectif
Ce projet est organisé pour être déployé facilement sur un hébergement statique avec un nom de domaine. Le fichier `index.html` reste à la racine, car c'est le point d'entrée attendu quand on visite le domaine.

## Structure
```text
portail-marques/
├── index.html
├── README.md
├── ressources/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── logo-principal.svg
├── logos/
│   └── logos des marques
└── sites/
    ├── fichiers-communs/
    │   ├── styles-pages.css
    │   └── interactions-pages.js
    ├── inno/
    │   └── index.html
    ├── kwinda/
    │   ├── index.html
    │   └── styles.css
    ├── renaissance/
    │   └── index.html
    ├── gospelguess/
    │   └── index.html
    ├── kwinda-events/
    │   └── index.html
    ├── kwinda-beauty/
    │   └── index.html
    ├── kwinda-accessories/
    │   └── index.html
    └── kwinda-immo/
        └── index.html
```

## Rôle des dossiers
- `ressources/css/` : CSS global du portail et base visuelle commune.
- `ressources/js/` : JavaScript du portail principal.
- `logos/` : tous les logos des marques, à conserver.
- `sites/fichiers-communs/` : CSS et JavaScript communs aux pages internes.
- `sites/kwinda/` : page de catégories KWINDA.
- Les autres dossiers dans `sites/` : pages dédiées aux univers ou catégories.

## Liens principaux
Le portail pointe vers :
- `sites/inno/index.html`
- `sites/kwinda/index.html`
- `sites/renaissance/index.html`
- `sites/gospelguess/index.html`

La page KWINDA pointe vers :
- `sites/kwinda-events/index.html`
- `sites/kwinda-beauty/index.html`
- `sites/kwinda-accessories/index.html`
- `sites/kwinda-immo/index.html`

## Déploiement
Pour un hébergement classique, envoyer tout le contenu de ce dossier sur le serveur. Le domaine doit pointer vers la racine du dossier contenant `index.html`.

Ne pas déplacer `index.html` dans un sous-dossier sauf si l'hébergeur est configuré pour utiliser ce sous-dossier comme racine publique.


