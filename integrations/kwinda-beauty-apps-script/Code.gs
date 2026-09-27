const CONFIG = {
  spreadsheetId: "REMPLACER_PAR_ID_GOOGLE_SHEETS",
  sheetName: "Demandes domicile",
  notificationEmail: "kwindainfo@gmail.com",
  documentTemplateId: ""
};

const HEADERS = [
  "Reçu le", "Source", "Nom", "Téléphone", "E-mail", "Prestation",
  "Adresse", "Code postal", "Ville", "Département", "Date souhaitée",
  "Plage horaire", "Informations", "Statut", "Distance depuis le RDV précédent",
  "Temps de trajet", "Fiche cliente"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    ensureHeaders_(sheet);
    const documentUrl = createClientDocument_(data);

    sheet.appendRow([
      new Date(), data.source || "Site KWINDA Beauty", data.nom || "",
      data.telephone || "", data.email || "", data.prestation || "",
      data.adresse || "", data.code_postal || "", data.ville || "",
      data.departement || "", data.date || "", data.horaire || "",
      data.message || "", "À confirmer", "", "", documentUrl
    ]);

    sendNotification_(data, documentUrl);
    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: error.message });
  }
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
    `Téléphone : ${data.telephone}`,
    `E-mail : ${data.email}`,
    `Adresse : ${data.adresse}, ${data.code_postal} ${data.ville}`,
    `Département : ${data.departement}`,
    `Date : ${data.date} - ${data.horaire}`,
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
    .filter((item) => String(item.row[10]).slice(0, 10) === dateIso)
    .sort((a, b) => String(a.row[11]).localeCompare(String(b.row[11])));

  for (let index = 1; index < appointments.length; index += 1) {
    const previous = appointments[index - 1];
    const current = appointments[index];
    const origin = `${previous.row[6]}, ${previous.row[7]} ${previous.row[8]}`;
    const destination = `${current.row[6]}, ${current.row[7]} ${current.row[8]}`;
    const directions = Maps.newDirectionFinder()
      .setOrigin(origin)
      .setDestination(destination)
      .setMode(Maps.DirectionFinder.Mode.DRIVING)
      .getDirections();
    const leg = directions.routes[0].legs[0];
    sheet.getRange(current.sheetRow, 15, 1, 2).setValues([[leg.distance.text, leg.duration.text]]);
  }
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
