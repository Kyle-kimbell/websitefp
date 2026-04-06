const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const DEMO_USERS = Array.isArray(window.NVM_DEMO_USERS) ? window.NVM_DEMO_USERS : [];
const SESSION_TTL_MS = Number(window.NVM_DEMO_SESSION_TTL_MS || 4 * 60 * 60 * 1000);
const url = new URL(window.location.href);
const nextPath = sanitizeNextPath(url.searchParams.get("next"));
const forceLogin = url.searchParams.get("force") === "1";

if (forceLogin) {
  window.sessionStorage.removeItem("nvm-demo-auth");
}

if (!DEMO_USERS.length) {
  setMessage(
    "Add at least one demo user in demo/config.js before using this page.",
    "error"
  );
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!DEMO_USERS.length) {
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const matchedUser = DEMO_USERS.find((user) => {
    return (
      String(user.email || "").trim().toLowerCase() === email &&
      String(user.password || "") === password
    );
  });

  if (!matchedUser) {
    window.sessionStorage.removeItem("nvm-demo-auth");
    setMessage("The email or password is not correct.", "error");
    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  window.sessionStorage.setItem(
    "nvm-demo-auth",
    JSON.stringify({
      email,
      name: String(matchedUser.name || "Demo User"),
      expiresAt: Date.now() + SESSION_TTL_MS,
    })
  );

  setMessage("Login successful. Redirecting to demo...", "ok");
  window.setTimeout(() => {
    window.location.assign(nextPath);
  }, 300);
});

function sanitizeNextPath(value) {
  if (!value || !value.startsWith("/")) {
    return "/wiki/";
  }

  return value;
}

function setMessage(text, tone) {
  message.textContent = text;
  message.className = `message ${tone}`;
}
