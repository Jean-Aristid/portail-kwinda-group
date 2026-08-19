const inquiryForm = document.getElementById("inquiry-form");

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!inquiryForm.reportValidity()) return;

  const formData = new FormData(inquiryForm);
  const lines = [
    "FICHE DE RENSEIGNEMENTS INNOGLOBE.BLK",
    "",
    `Nom : ${formData.get("nom")}`,
    `Prénom : ${formData.get("prenom")}`,
    `E-mail : ${formData.get("email")}`,
    `Téléphone : ${formData.get("telephone") || "Non renseigné"}`,
    `Pays / ville : ${formData.get("localisation") || "Non renseigné"}`,
    `Entreprise ou projet : ${formData.get("projet") || "Non renseigné"}`,
    `Profil : ${formData.get("profil")}`,
    `Secteur d'activité : ${formData.get("secteur")}`,
    `Objet : ${formData.get("objet")}`,
    "",
    "Besoin :",
    formData.get("message")
  ];

  const subject = encodeURIComponent("Nouvelle fiche de renseignements Innoglobe.blk");
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:kwindainfo@gmail.com?subject=${subject}&body=${body}`;
});
