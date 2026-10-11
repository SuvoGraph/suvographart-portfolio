/*
  PERSONALISE THIS FILE:
  1) Edit the PROFILE object below.
  2) Replace image URLs with your own online image URLs, or place images in an
     "images" folder and use paths such as "images/my-photo.jpg".
  3) Save, then open index.html in your browser.
*/
const PROFILE = {
  name: "Subhadeep Ash",
  initials: "SA",
  role: "Graphic Designer & Visual Artist",
  intro: "I’m Subhadeep Ash, a graphic designer creating memorable identities, illustrations and digital experiences.",
  about: "I’m a graphic designer with a passion for turning complex ideas into clear, distinctive visuals. I work across branding, vector illustration, mascot design and motion graphics.",
  email: "hello@example.com",
  location: "Kolkata, India",
  experience: "8+ years",
  cvUrl: "", // Example: "files/subhadeep-cv.pdf"
  portrait: "file:///C:/Users/User/Downloads/Emblem_of_India.svg",
  behance: "https://www.behance.net/subhadeepash",
  linkedin: "",
  services: [
    { title: "Brand Identity", text: "Distinctive logo systems and visual identities built to help brands stand out." },
    { title: "Vector Illustration", text: "Clean, expressive vector artwork, icons, characters and detailed illustrations." },
    { title: "Mascot & Avatar Art", text: "Memorable characters and custom avatar artwork with personality." },
    { title: "Motion Graphics", text: "Animated logos and visual stories that bring static design to life." },
    { title: "Social Media Design", text: "Consistent, attention-grabbing creative assets for digital platforms." },
    { title: "Print & Packaging", text: "Practical, production-minded layouts for print, packaging and promotions." }
  ],
  projects: [
    { title: "Brand Identity Concept", category: "Branding", type: "Logo & Visual Identity", image: "https://images.unsplash.com/photo-1634942536790-2534db5a4f87?auto=format&fit=crop&w=1100&q=85", alt: "Brand identity design mockup" },
    { title: "Illustration Series", category: "Illustration", type: "Vector Illustration", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1100&q=85", alt: "Illustration and art materials" },
    { title: "Digital Campaign", category: "Digital", type: "Social Media Creative", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1100&q=85", alt: "Colourful graphic design composition" },
    { title: "Packaging Direction", category: "Branding", type: "Packaging Design", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1100&q=85", alt: "Product packaging mockup" }
  ]
};

const $ = (selector) => document.querySelector(selector);
const safeText = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };

document.title = `${PROFILE.name} — Creative Portfolio`;
safeText("#brandName", PROFILE.initials + ".");
safeText("#heroIntro", PROFILE.intro);
safeText("#detailName", PROFILE.name);
safeText("#detailEmail", PROFILE.email);
safeText("#detailLocation", PROFILE.location);
safeText("#detailExperience", PROFILE.experience);
safeText("#aboutText", PROFILE.about);
safeText("#contactLocation", PROFILE.location);
safeText("#footerText", `© ${new Date().getFullYear()} ${PROFILE.name}. Made with intention.`);
safeText("#socialLinks", [PROFILE.behance ? "Behance" : "", PROFILE.linkedin ? "LinkedIn" : ""].filter(Boolean).join(" · ") || "Add your social links in script.js");
$("#portrait").src = PROFILE.portrait;
$("#portrait").alt = `${PROFILE.name} portrait`;
$("#contactEmail").textContent = PROFILE.email + " ↗";
$("#contactEmail").href = `mailto:${PROFILE.email}`;
$("#emailButton").href = `mailto:${PROFILE.email}`;
$("#cvLink").href = PROFILE.cvUrl || "#contact";
$("#cvLink").addEventListener("click", (event) => {
  if (!PROFILE.cvUrl) { event.preventDefault(); alert("Add your CV file path to PROFILE.cvUrl in script.js first."); }
});

const servicesGrid = $("#servicesGrid");
PROFILE.services.forEach((service, index) => {
  const card = document.createElement("article");
  card.className = "service-card";
  card.innerHTML = `<span class="service-number">0${index + 1} / SERVICE</span><h3></h3><p></p>`;
  card.querySelector("h3").textContent = service.title;
  card.querySelector("p").textContent = service.text;
  servicesGrid.appendChild(card);
});

const filters = $("#filters");
const portfolioGrid = $("#portfolioGrid");
const categories = ["All", ...new Set(PROFILE.projects.map(project => project.category))];
let activeCategory = "All";

function renderFilters() {
  filters.innerHTML = "";
  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = `filter-btn${category === activeCategory ? " active" : ""}`;
    button.textContent = category;
    button.type = "button";
    button.addEventListener("click", () => { activeCategory = category; renderFilters(); renderProjects(); });
    filters.appendChild(button);
  });
}
function renderProjects() {
  portfolioGrid.innerHTML = "";
  const projects = PROFILE.projects.filter(project => activeCategory === "All" || project.category === activeCategory);
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "work-card";
    const imageWrap = document.createElement("div");
    imageWrap.className = "work-image";
    const img = document.createElement("img");
    img.src = project.image; img.alt = project.alt || project.title; img.loading = "lazy";
    const number = document.createElement("span");
    number.className = "work-index"; number.textContent = String(index + 1).padStart(2, "0");
    imageWrap.append(img, number);
    const info = document.createElement("div");
    info.className = "work-info";
    const copy = document.createElement("div");
    const title = document.createElement("h3"); title.textContent = project.title;
    const type = document.createElement("p"); type.textContent = project.type || project.category;
    copy.append(title, type);
    const arrow = document.createElement("span"); arrow.className = "work-arrow"; arrow.textContent = "↗";
    info.append(copy, arrow); card.append(imageWrap, info); portfolioGrid.appendChild(card);
  });
}
renderFilters(); renderProjects();

$("#menuToggle").addEventListener("click", () => $("#nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => $("#nav").classList.remove("open")));
