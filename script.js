// Replace this with the counsellor's WhatsApp number before publishing.
// Use country code + number, without +, spaces, or leading 0. Example format: 2547XXXXXXXX
const COUNSELLOR_WHATSAPP = "2547XXXXXXXX";

const form = document.querySelector("#appointment-form");
const message = document.querySelector("#form-message");
const contactLink = document.querySelector("#contact-whatsapp");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function whatsappUrl(text = "Hello, I would like to ask about counselling appointments.") {
  return `https://wa.me/${COUNSELLOR_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

contactLink.addEventListener("click", event => {
  if (COUNSELLOR_WHATSAPP.includes("X")) {
    event.preventDefault();
    message.textContent = "The counsellor's WhatsApp number will be added before launch.";
    document.querySelector("#appointment").scrollIntoView({behavior: "smooth"});
    return;
  }
  contactLink.href = whatsappUrl();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (COUNSELLOR_WHATSAPP.includes("X")) {
    message.textContent = "The appointment form is ready. Add the counsellor's WhatsApp number in script.js to activate requests.";
    return;
  }

  const data = new FormData(form);
  const name = String(data.get("name")).trim();
  const phone = String(data.get("phone")).trim();
  const service = String(data.get("service")).trim();
  const time = String(data.get("time")).trim() || "Flexible";

  const text = [
    "Hello, I would like to request a counselling appointment.",
    `Name: ${name}`,
    `My phone: ${phone}`,
    `Service: ${service}`,
    `Preferred time: ${time}`,
    "",
    "Please let me know your availability."
  ].join("\n");

  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  message.textContent = "WhatsApp opened with your appointment request. Please send the message there to complete your request.";
});
