# Automatisation KWINDA Beauty

Ce dossier contient le socle Google Apps Script du formulaire de prestations à domicile.

## Règles géographiques intégrées

- lundi et mardi : Paris Nord et alentours de Porte de la Chapelle ;
- mercredi, jeudi et vendredi : toutes les villes de Seine-et-Marne (77) ;
- dimanche : toutes les villes du Val-de-Marne (94) ;
- samedi : aucune ouverture pour le moment.

Le calendrier du site affiche automatiquement les cinq prochains mois. La durée provisoire d'une prestation est fixée à 40 minutes et la marge de stationnement à 15 minutes. Ces valeurs sont modifiables dans la configuration.

## Ressources à créer

1. Un fichier Google Sheets avec un onglet nommé `Demandes domicile`.
2. Facultativement, un modèle Google Docs contenant les variables suivantes :
   `{{NOM}}`, `{{TELEPHONE}}`, `{{EMAIL}}`, `{{PRESTATION}}`, `{{ADRESSE}}`,
   `{{DEPARTEMENT}}`, `{{DATE}}`, `{{HORAIRE}}` et `{{MESSAGE}}`.
3. Un projet Apps Script dans lequel copier `Code.gs`.

## Configuration

Dans `Code.gs`, remplacer :

- `REMPLACER_PAR_ID_GOOGLE_SHEETS` par l'identifiant du fichier Google Sheets ;
- `documentTemplateId` par l'identifiant du modèle Google Docs, si utilisé ;
- `notificationEmail` si l'adresse de réception change.

Déployer ensuite Apps Script en tant qu'application Web :

- exécuter en tant que propriétaire du script ;
- autoriser l'accès aux visiteurs du site ;
- copier l'URL `/exec` du déploiement.

Reporter cette URL dans :

`sites/kwinda-beauty/configuration.js`

```js
window.KWINDA_BEAUTY_CONFIG = {
  appsScriptUrl: "URL_DU_DEPLOIEMENT_APPS_SCRIPT",
  email: "kwindainfo@gmail.com"
};
```

Sans URL Apps Script, le formulaire reste utilisable et prépare un e-mail dans l'application de messagerie de la cliente.

## Calcul des trajets

La fonction `calculerTrajetsPourDate("2026-10-10")` calcule la distance et le temps de conduite entre les rendez-vous successifs d'une journée. Elle ajoute également la durée provisoire de la prestation et la marge de stationnement. Elle peut être lancée manuellement ou depuis un déclencheur Apps Script.

Avant utilisation réelle, il faudra définir des horaires précis et valider l'ordre des rendez-vous. Le formulaire actuel recueille volontairement une plage horaire, car toute demande doit d'abord être confirmée.

## Acompte

Le paiement n'est pas traité par Apps Script. Après validation du rendez-vous, envoyer à la cliente un lien de paiement créé depuis un prestataire conforme, par exemple Stripe Checkout ou Stripe Payment Links. Ne jamais stocker de numéro de carte dans Google Sheets.
