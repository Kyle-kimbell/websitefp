const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init({
    publicKey: "sOWGwjXh12B1as_J9",
  });
  console.log("EmailJS Initialized with Public Key: sOWGwjXh12B1as_J9");
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form) {
  // Added diagnostic message
  if (note) {
    note.hidden = false;
    note.style.color = "#4b5a69";
    note.textContent = "Diagnostic: Contact system ready.";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    if (note) {
      note.hidden = false;
      note.style.color = "#1b3b52";
      note.textContent = "Sending message to Kyle...";
    }

    emailjs.sendForm('service_j8jea57', 'template_w84xphk', form)
      .then(() => {
        console.log('SUCCESS!');
        if (button) {
           button.textContent = "Sent!";
           button.style.backgroundColor = "#47b296";
        }
        if (note) {
          note.textContent = "Success! Your message has been sent directly to Kyle.";
          note.style.color = "#28a745"; // Clear green
          note.style.fontWeight = "bold";
        }
        form.reset();
      }, (error) => {
        console.error('FAILED...', error);
        if (button) {
          button.disabled = false;
          button.textContent = "Try Again";
          button.style.backgroundColor = "#ff4c4c";
        }
        if (note) {
          // Show the exact error text from EmailJS
          const errorMsg = error.text || JSON.stringify(error);
          note.textContent = "Error: " + errorMsg;
          note.style.color = "#d9534f"; // Clear red
          note.style.fontWeight = "bold";
        }
      });
  });
}
