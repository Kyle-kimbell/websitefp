const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

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

    // Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual EmailJS IDs
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
      .then(() => {
        if (button) button.textContent = "Sent!";
        if (note) {
          note.textContent = "Success! Your message has been sent directly to Kyle.";
          note.style.color = "#47b296";
        }
        form.reset();
      }, (error) => {
        console.log('FAILED...', error);
        if (button) {
          button.disabled = false;
          button.textContent = "Try Again";
        }
        if (note) {
          note.textContent = "Sorry, there was an error. Please try again or email kyle@nvmonitoring.com directly.";
          note.style.color = "#ff4c4c";
        }
      });
  });
}
