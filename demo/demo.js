const counterValue = document.getElementById("counterValue");
const timestampValue = document.getElementById("timestampValue");
const statusValue = document.getElementById("statusValue");
const updatedValue = document.getElementById("updatedValue");
const message = document.getElementById("message");
const refreshButton = document.getElementById("refreshButton");
const logoutButton = document.getElementById("logoutButton");

const SENSOR_ENDPOINT = window.NVM_SENSOR_ENDPOINT || "";
const SENSOR_STALE_MS = Number(window.NVM_SENSOR_STALE_MS || 90000);
const POLL_INTERVAL_MS = 60000;
let lastGoodReading = null;

enforceDemoSession();
refreshButton.addEventListener("click", loadReading);
logoutButton.addEventListener("click", logoutDemoSession);

if (!SENSOR_ENDPOINT || SENSOR_ENDPOINT.includes("REPLACE_ME")) {
  statusValue.textContent = "Setup Needed";
  setMessage(
    "Add your public reading endpoint to demo/config.js before this page can show live board data.",
    "error"
  );
} else {
  loadReading();
  window.setInterval(loadReading, POLL_INTERVAL_MS);
}

async function loadReading() {
  refreshButton.disabled = true;
  refreshButton.textContent = "Refreshing...";

  try {
    const response = await fetch(SENSOR_ENDPOINT, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`endpoint returned ${response.status}`);
    }

    const payload = await response.json();
    const reading = normalizeReading(payload);

    if (reading.counter == null) {
      throw new Error("counter reading missing");
    }

    lastGoodReading = reading;
    counterValue.textContent = formatCounter(reading.counter);
    statusValue.textContent = reading.isStale ? "Stale" : "Live";
    timestampValue.textContent = formatTimestamp(reading.timestamp);
    updatedValue.textContent = reading.isStale
      ? `PLC scan delayed by ${formatAge(reading.ageMs)}`
      : "PLC scan healthy";
    setMessage(
      reading.isStale
        ? "Sensor link is responding, but the last PLC-style reading is older than expected."
        : "Live reading loaded from the cloud PLC publish path.",
      reading.isStale ? "error" : "ok"
    );
  } catch (error) {
    if (lastGoodReading) {
      counterValue.textContent = formatCounter(lastGoodReading.counter);
      timestampValue.textContent = formatTimestamp(lastGoodReading.timestamp);
      statusValue.textContent = "Stale";
      updatedValue.textContent = "Showing last successful PLC scan";
    } else {
      statusValue.textContent = "Offline";
      updatedValue.textContent = "Waiting for the first PLC scan";
      timestampValue.textContent = "Last reading: none yet";
    }
    setMessage(`Unable to load the live board reading. ${error.message}`, "error");
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "Refresh";
  }
}

function enforceDemoSession() {
  const sessionValue = window.sessionStorage.getItem("nvm-demo-auth");

  if (!sessionValue) {
    window.location.replace("/login/?next=/demo/");
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
    window.location.replace("/login/?next=/demo/");
  }
}

function logoutDemoSession() {
  window.sessionStorage.removeItem("nvm-demo-auth");
  window.location.replace("/login/");
}

function normalizeReading(payload) {
  const source =
    payload.latest && typeof payload.latest === "object"
      ? payload.latest
      : payload.data && typeof payload.data === "object"
        ? payload.data
        : payload;
  const timestamp =
    source.timestamp ||
    source.time ||
    source.readingAt ||
    source.updatedAt ||
    source.receivedAt ||
    source.serverReceivedAt ||
    null;
  const parsedTimestamp = timestamp ? new Date(timestamp) : null;
  const ageMs =
    parsedTimestamp && !Number.isNaN(parsedTimestamp.getTime())
      ? Date.now() - parsedTimestamp.getTime()
      : null;

  return {
    counter: asNumber(
      source.counter ??
        source.count ??
        source.value ??
        source.counter_value ??
        null
    ),
    timestamp,
    ageMs,
    isStale: ageMs != null && ageMs > SENSOR_STALE_MS,
  };
}

function formatCounter(counter) {
  return Number.isInteger(counter) ? `${counter}` : `${counter.toFixed(2)}`;
}

function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function setMessage(text, tone) {
  message.textContent = text;
  message.className = `message ${tone}`;
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "Last reading time unavailable";
  }

  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) {
    return `Last reading: ${timestamp}`;
  }

  return `Last reading: ${parsed.toLocaleString()}`;
}

function formatAge(ageMs) {
  if (ageMs == null || ageMs < 0) {
    return "unknown";
  }

  if (ageMs < 1000) {
    return "under 1 second";
  }

  const totalSeconds = Math.round(ageMs / 1000);
  if (totalSeconds < 60) {
    return `${totalSeconds} sec`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds === 0 ? `${minutes} min` : `${minutes} min ${seconds} sec`;
}
