const loginForm = document.getElementById("loginForm");
const accessCode = document.getElementById("accessCode");
const message = document.getElementById("message");

const DEMO_ACCESS_CODE = String(window.NVM_DEMO_ACCESS_CODE || "");

if (!DEMO_ACCESS_CODE) {
  setMessage(
    "Add a demo access code in demo/config.js before using this page.",
    "error"
  );
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!DEMO_ACCESS_CODE) {
    return;
  }

  const submittedCode = accessCode.value.trim();

  if (submittedCode !== DEMO_ACCESS_CODE) {
    window.sessionStorage.removeItem("nvm-demo-auth");
    setMessage("That access code is not correct.", "error");
    accessCode.select();
    return;
  }

  window.sessionStorage.setItem("nvm-demo-auth", submittedCode);
  setMessage("Access granted. Redirecting to demo...", "ok");
  window.setTimeout(() => {
    window.location.assign("/demo/");
  }, 300);
});

function setMessage(text, tone) {
  message.textContent = text;
  message.className = `message ${tone}`;
}
