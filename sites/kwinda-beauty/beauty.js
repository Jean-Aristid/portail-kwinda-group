const beautyServices = [
  { category: "Mains & pieds", name: "Beauté des mains", price: "25 €" },
  { category: "Mains & pieds", name: "Beauté et soins des mains", price: "35 €" },
  { category: "Mains & pieds", name: "Beauté des pieds", price: "39 €" },
  { category: "Mains & pieds", name: "Beauté et soins des pieds", price: "59 €" },
  { category: "Coiffure", name: "Coupe à sec", price: "25 €" },
  { category: "Coiffure", name: "Coupe, brushing et style", price: "45 €" },
  { category: "Coiffure", name: "Soin, coupe et style", price: "À partir de 70 €" },
  { category: "Coiffure", name: "Nattes collées", price: "À partir de 20 €" },
  { category: "Coiffure", name: "Tissage ouvert", price: "À partir de 40 €" },
  { category: "Coiffure", name: "Tissage fermé", price: "À partir de 60 €" },
  { category: "Coiffure", name: "Pose de perruque", price: "À partir de 60 €" },
  { category: "Coiffure", name: "Customisation de perruque et pose", price: "90 €" },
  { category: "Coiffure", name: "Customisation simple", price: "35 €" },
  { category: "Coiffure", name: "Coiffure libre", price: "À partir de 50 €" },
  { category: "Coiffure", name: "Braids", price: "À partir de 40 €" },
  { category: "Coiffure", name: "Locks et style", price: "À partir de 60 €" },
  { category: "Coiffure", name: "Départ de locks", price: "1,50 € / lock" },
  { category: "Coiffure", name: "Départ de sisterlocks", price: "2 € / lock" },
  { category: "Coiffure", name: "Style simple sur locks", price: "30 €" },
  { category: "Coiffure", name: "Shampooing, resserrage et style", price: "À partir de 90 €" },
  { category: "Coiffure", name: "Décapage simple", price: "35 €" },
  { category: "Épilation", name: "Maillot intégral", price: "35 €" },
  { category: "Épilation", name: "Maillot semi-intégral", price: "25 €" },
  { category: "Épilation", name: "Maillot américain", price: "43 €" },
  { category: "Épilation", name: "Maillot échancré", price: "13 €" },
  { category: "Épilation", name: "Maillot brésilien", price: "18 €" },
  { category: "Épilation", name: "Maillot semi-intégral et sillon interfessier", price: "35 €" },
  { category: "Épilation", name: "Fesses", price: "15 €" },
  { category: "Épilation", name: "Sillon interfessier", price: "10 €" },
  { category: "Épilation", name: "Bras et aisselles", price: "17 €" },
  { category: "Épilation", name: "Visage au fil", price: "13 €" },
  { category: "Épilation", name: "Ventre", price: "20 €" },
  { category: "Épilation", name: "Torse", price: "13 €" },
  { category: "Épilation", name: "Cou", price: "10 €" },
  { category: "Épilation", name: "Nuque", price: "8 €" },
  { category: "Épilation", name: "Épaules", price: "12 €" },
  { category: "Épilation", name: "Dos", price: "28 €" },
  { category: "Épilation", name: "Bas du dos", price: "13 €" },
  { category: "Épilation", name: "Jambes", price: "18 €" },
  { category: "Épilation", name: "Visage à la cire", price: "12 €" },
  { category: "Épilation", name: "Corps complet", price: "95 €" },
  { category: "Épilation", name: "Jambes, aisselles et maillot intégral", price: "49 €" },
  { category: "Visage", name: "Soin express", price: "35 €" },
  { category: "Visage", name: "Soin classique", price: "29 €" },
  { category: "Visage", name: "Soin hydratant", price: "39 €" },
  { category: "Visage", name: "Coup d'éclat", price: "29 €" },
  { category: "Visage", name: "Soin anti-âge", price: "49 €" },
  { category: "Visage", name: "Radiofréquence", price: "66 €" },
  { category: "Visage", name: "Soin anti-acné adolescent", price: "29 €" },
  { category: "Visage", name: "Soin Kobido", price: "59 €" },
  { category: "Visage", name: "Soin au collagène", price: "49 €" },
  { category: "Visage", name: "Microneedling vitamine C et radiofréquence", price: "75 €" },
  { category: "Visage", name: "BB Glow", price: "39 €" },
  { category: "Visage", name: "Contour des yeux", price: "17 €" },
  { category: "Visage", name: "Soin aux herbes indiennes Siri Gold", price: "39 €" },
  { category: "Visage", name: "Microdermabrasion", price: "59 €" },
  { category: "Visage", name: "Black Mask", price: "29 €" },
  { category: "Visage", name: "Hydrafacial", price: "66 €" },
  { category: "Visage", name: "Soin purifiant", price: "49 €" },
  { category: "Visage", name: "Luminothérapie", price: "45 €" },
  { category: "Visage", name: "Soin Rajini", price: "139 €" },
  { category: "Corps & gommages", name: "Gommage au savon noir", price: "55 €" },
  { category: "Corps & gommages", name: "Gommage savon noir et hibiscus", price: "70 €" },
  { category: "Corps & gommages", name: "Gommage savon noir, hibiscus et curcuma", price: "85 €" },
  { category: "Corps & gommages", name: "Cure spéciale LA : 3 gommages, 1 soin corporel, massage et Kobido", price: "150 €" },
  { category: "Corps & gommages", name: "Gommage du corps et massage", price: "79 €" },
  { category: "Corps & gommages", name: "Soin du dos, gommage, massage et masque nettoyant", price: "59 €" },
  { category: "Silhouette", name: "Madérothérapie", price: "49 €" },
  { category: "Silhouette", name: "Soin du corps", price: "59 €" },
  { category: "Silhouette", name: "Enveloppement aux algues et à l'argile verte", price: "69 €" },
  { category: "Silhouette", name: "Palper-rouler / massage amincissant", price: "49 €" },
  { category: "Silhouette", name: "Lifting colombien", price: "49 €" },
  { category: "Silhouette", name: "Massage anti-jambes lourdes", price: "79 €" },
  { category: "Autres soins", name: "Décoloration des poils des bras", price: "29 €" },
  { category: "Autres soins", name: "Décoloration des poils des jambes", price: "39 €" },
  { category: "Autres soins", name: "Blanchiment dentaire", price: "60 €" },
  { category: "Massages", name: "Massage du corps", price: "49 €" },
  { category: "Massages", name: "Massage relaxant du dos", price: "35 € · 45 min" },
  { category: "Massages", name: "Massage suédois", price: "44 €" },
  { category: "Massages", name: "Massage californien", price: "49 €" },
  { category: "Massages", name: "Massage aux huiles essentielles", price: "59 €" },
  { category: "Massages", name: "Massage aromathérapie", price: "59 €" },
  { category: "Massages", name: "Massage du dos et de la tête", price: "39 € · 45 min" },
  { category: "Massages", name: "Massage indien tête, cervicales et visage", price: "29 € · 35 min" },
  { category: "Massages", name: "Massage Kobido et masque nettoyant", price: "49 €" },
  { category: "Massages", name: "Massage des pieds", price: "30 €" },
  { category: "Massages", name: "Massage des jambes", price: "35 €" },
  { category: "Massages", name: "Massage pieds et jambes", price: "39 €" },
  { category: "Massage afrotraditionnel", name: "Haut du corps", price: "60 €" },
  { category: "Massage afrotraditionnel", name: "Bas du corps", price: "50 €" },
  { category: "Massage afrotraditionnel", name: "Corps entier", price: "80 €" },
  { category: "Massage afrotraditionnel", name: "Raffermissement fessier", price: "50 €" }
];

const catalog = document.getElementById("price-catalog");
const filters = document.getElementById("price-filters");
const search = document.getElementById("price-search");
const bookingService = document.getElementById("booking-service");
const bookingForm = document.getElementById("home-booking-form");
const bookingStatus = document.getElementById("booking-status");
const categories = [...new Set(beautyServices.map((service) => service.category))];
let activeCategory = "Toutes";

function renderCatalog() {
  const query = search.value.trim().toLocaleLowerCase("fr");
  const visible = beautyServices.filter((service) => {
    const matchesCategory = activeCategory === "Toutes" || service.category === activeCategory;
    const matchesSearch = `${service.name} ${service.category}`.toLocaleLowerCase("fr").includes(query);
    return matchesCategory && matchesSearch;
  });

  catalog.innerHTML = visible.length
    ? visible.map((service) => `<article class="price-item"><div><span>${service.category}</span><h3>${service.name}</h3></div><strong>${service.price}</strong></article>`).join("")
    : '<p class="empty-results">Aucune prestation ne correspond à votre recherche.</p>';
}

["Toutes", ...categories].forEach((category) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `price-filter${category === "Toutes" ? " active" : ""}`;
  button.textContent = category;
  button.addEventListener("click", () => {
    activeCategory = category;
    filters.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    renderCatalog();
  });
  filters.appendChild(button);
});

beautyServices.forEach((service) => {
  const option = document.createElement("option");
  option.value = `${service.name} – ${service.price}`;
  option.textContent = `${service.name} – ${service.price}`;
  bookingService.appendChild(option);
});

search.addEventListener("input", renderCatalog);
renderCatalog();

bookingForm.querySelector('input[name="date"]').min = new Date().toISOString().split("T")[0];

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const data = Object.fromEntries(new FormData(bookingForm).entries());
  const config = window.KWINDA_BEAUTY_CONFIG || {};

  if (config.appsScriptUrl) {
    bookingStatus.textContent = "Envoi de votre demande…";
    try {
      await fetch(config.appsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...data, source: "KWINDA Beauty à domicile" })
      });
      bookingForm.reset();
      bookingStatus.textContent = "Votre demande a bien été transmise. Nous reviendrons vers vous pour confirmer le rendez-vous.";
    } catch {
      bookingStatus.textContent = "L'envoi automatique n'est pas disponible. Veuillez nous contacter par téléphone ou par e-mail.";
    }
    return;
  }

  const body = [
    "DEMANDE DE PRESTATION KWINDA BEAUTY À DOMICILE",
    "",
    `Cliente : ${data.nom}`,
    `Téléphone : ${data.telephone}`,
    `E-mail : ${data.email}`,
    `Prestation : ${data.prestation}`,
    `Adresse : ${data.adresse}, ${data.code_postal} ${data.ville}`,
    `Département : ${data.departement}`,
    `Date : ${data.date}`,
    `Horaire : ${data.horaire}`,
    `Informations : ${data.message || "Aucune"}`
  ].join("\n");

  window.location.href = `mailto:${config.email || "kwindainfo@gmail.com"}?subject=${encodeURIComponent("Demande KWINDA Beauty à domicile")}&body=${encodeURIComponent(body)}`;
  bookingStatus.textContent = "Votre application de messagerie va s'ouvrir pour finaliser l'envoi.";
});
