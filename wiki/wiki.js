const logoutButton = document.getElementById("logoutButton");

enforceDemoSession();
logoutButton.addEventListener("click", logoutDemoSession);

function enforceDemoSession() {
  const sessionValue = window.sessionStorage.getItem("nvm-demo-auth");

  if (!sessionValue) {
    window.location.replace("/login/?next=/wiki/");
    return;
  }

  try {
    const session = JSON.parse(sessionValue);
    const expiresAt = Number(session.expiresAt || 0);

    if (!session.email || !expiresAt || expiresAt < Date.now()) {
      throw new Error("session expired");
    }
  } catch {
    window.sessionStorage.removeItem("nvm-demo-auth");
    window.location.replace("/login/?next=/wiki/");
  }
}

function logoutDemoSession() {
  window.sessionStorage.removeItem("nvm-demo-auth");
  window.location.replace("/login/");
}
