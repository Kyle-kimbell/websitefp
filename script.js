const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener("submit", () => {
    if (note) {
      note.textContent = "Sending your comment...";
    }
  });
}
