const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener("submit", () => {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    if (note) {
      note.hidden = false;
      note.textContent = "Thank you! Sending your message now...";
    }
  });
}
