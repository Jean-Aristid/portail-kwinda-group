const CONFIG = {
  spreadsheetId: "REMPLACER_PAR_ID_GOOGLE_SHEETS",
  sheetName: "Demandes domicile",
  notificationEmail: "kwindainfo@gmail.com",
  documentTemplateId: "",
  defaultServiceDurationMinutes: 40,
  parkingBufferMinutes: 15
};

const HEADERS = [
  "Reçu le", "Source", "Secteur", "Validation de zone", "Nom", "Téléphone",
  "E-mail", "Prestation", "Durée estimée (min)", "Adresse", "Code postal", "Ville",
  "Département", "Date souhaitée", "Plage horaire", "Informations", "Statut",
  "Distance depuis le RDV précédent", "Temps de trajet", "Stationnement (min)",
  "Temps total estimé (min)", "Fiche cliente"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    validateRequest_(data);
    const sheet = getSheet_();
    ensureHeaders_(sheet);
    const documentUrl = createClientDocument_(data);

    sheet.appendRow([
      new Date(), data.source || "Site KWINDA Beauty", data.zoneLabel || data.zone || "",
      data.zoneValidation || "À vérifier", data.nom || "", data.telephone || "",
      data.email || "", data.prestation || "", data.dureeEstimee || CONFIG.defaultServiceDurationMinutes,
      data.adresse || "", data.code_postal || "", data.ville || "", data.departement || "",
      data.date || "", data.horaire || "", data.message || "", "À confirmer", "", "",
      data.margeStationnement || CONFIG.parkingBufferMinutes, "", documentUrl
    ]);

    sendNotification_(data, documentUrl);
    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: error.message });
  }
}

function validateRequest_(data) {
  const allowedDays = { paris_nord: [1, 2], "77": [3, 4, 5], "94": [0] };
  if (!allowedDays[data.zone]) throw new Error("Secteur non reconnu");
  if (!data.date) throw new Error("Date manquante");

  const weekday = new Date(`${data.date}T12:00:00`).getDay();
  if (!allowedDays[data.zone].includes(weekday)) {
    throw new Error("La date ne correspond pas aux jours autorisés pour ce secteur");
  }

  const postcode = String(data.code_postal || "").replace(/\s/g, "");
  if (data.zone === "77" && !postcode.startsWith("77")) throw new Error("Code postal incompatible avec le 77");
  if (data.zone === "94" && !postcode.startsWith("94")) throw new Error("Code postal incompatible avec le 94");
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  return spreadsheet.getSheetByName(CONFIG.sheetName) || spreadsheet.insertSheet(CONFIG.sheetName);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
}

function createClientDocument_(data) {
  if (!CONFIG.documentTemplateId) return "";

  const copy = DriveApp.getFileById(CONFIG.documentTemplateId)
    .makeCopy(`Demande KWINDA Beauty - ${data.nom || "Cliente"} - ${data.date || "date à confirmer"}`);
  const document = DocumentApp.openById(copy.getId());
  const body = document.getBody();
  const replacements = {
    "NOM": data.nom,
    "TELEPHONE": data.telephone,
    "EMAIL": data.email,
    "PRESTATION": data.prestation,
    "ADRESSE": `${data.adresse}, ${data.code_postal} ${data.ville}`,
    "DEPARTEMENT": data.departement,
    "DATE": data.date,
    "HORAIRE": data.horaire,
    "MESSAGE": data.message || "Aucune information complémentaire"
  };

  Object.keys(replacements).forEach((key) => {
    body.replaceText(`\\{\\{${key}\\}\\}`, replacements[key] || "");
  });
  document.saveAndClose();
  return document.getUrl();
}

function sendNotification_(data, documentUrl) {
  const lines = [
    `Nouvelle demande à domicile de ${data.nom}`,
    `Prestation : ${data.prestation}`,
    `Secteur : ${data.zoneLabel || data.zone}`,
    `Téléphone : ${data.telephone}`,
    `E-mail : ${data.email}`,
    `Adresse : ${data.adresse}, ${data.code_postal} ${data.ville}`,
    `Département : ${data.departement}`,
    `Date : ${data.date} - ${data.horaire}`,
    `Durée provisoire : ${data.dureeEstimee || CONFIG.defaultServiceDurationMinutes} min`,
    `Informations : ${data.message || "Aucune"}`,
    documentUrl ? `Fiche : ${documentUrl}` : ""
  ].filter(Boolean);

  MailApp.sendEmail(CONFIG.notificationEmail, "Nouvelle demande KWINDA Beauty à domicile", lines.join("\n"));
}

function calculerTrajetsPourDate(dateIso) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const appointments = values.slice(1)
    .map((row, index) => ({ row, sheetRow: index + 2 }))
    .filter((item) => String(item.row[13]).slice(0, 10) === dateIso)
    .sort((a, b) => String(a.row[14]).localeCompare(String(b.row[14])));

  for (let index = 1; index < appointments.length; index += 1) {
    const previous = appointments[index - 1];
    const current = appointments[index];
    const origin = `${previous.row[9]}, ${previous.row[10]} ${previous.row[11]}`;
    const destination = `${current.row[9]}, ${current.row[10]} ${current.row[11]}`;
    const directions = Maps.newDirectionFinder()
      .setOrigin(origin)
      .setDestination(destination)
      .setMode(Maps.DirectionFinder.Mode.DRIVING)
      .getDirections();
    const leg = directions.routes[0].legs[0];
    const serviceMinutes = Number(current.row[8]) || CONFIG.defaultServiceDurationMinutes;
    const parkingMinutes = Number(current.row[19]) || CONFIG.parkingBufferMinutes;
    const drivingMinutes = Math.ceil(leg.duration.value / 60);
    sheet.getRange(current.sheetRow, 18, 1, 4)
      .setValues([[leg.distance.text, leg.duration.text, parkingMinutes, serviceMinutes + parkingMinutes + drivingMinutes]]);
  }
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
