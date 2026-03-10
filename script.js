const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init({
    publicKey: "OWGwjXh12B1as_J9",
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    if (note) {
      note.hidden = false;
      note.textContent = "Sending message...";
    }

    emailjs.sendForm('service_j8jea57', 'template_w84xphk', form)
      .then(() => {
        if (button) button.textContent = "Sent!";
        if (note) {
          note.textContent = "Success! Your message has been sent directly to Kyle.";
          note.style.color = "#47b296";
        }
        form.reset();
      }, (error) => {
        console.error('EmailJS Error:', error);
        if (button) {
          button.disabled = false;
          button.textContent = "Try Again";
        }
        if (note) {
          note.textContent = "Error: " + (error.text || "Submission failed") + ". Please try again.";
          note.style.color = "#ff4c4c";
        }
      });
  });
}
