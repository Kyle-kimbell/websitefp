const distanceValue = document.getElementById("distanceValue");
const statusValue = document.getElementById("statusValue");
const updatedValue = document.getElementById("updatedValue");
const message = document.getElementById("message");
const refreshButton = document.getElementById("refreshButton");

const SENSOR_ENDPOINT = window.NVM_SENSOR_ENDPOINT || "";
const POLL_INTERVAL_MS = 15000;

refreshButton.addEventListener("click", loadReading);

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

    if (reading.distance == null) {
      throw new Error("distance reading missing");
    }

    distanceValue.textContent = `${reading.distance.toFixed(1)} cm`;
    statusValue.textContent = "Live";
    updatedValue.textContent = reading.timestamp
      ? `Updated ${new Date(reading.timestamp).toLocaleString()}`
      : "Updated just now";
    setMessage("Live reading loaded from the cloud endpoint.", "ok");
  } catch (error) {
    statusValue.textContent = "Offline";
    updatedValue.textContent = "Waiting for a cloud reading";
    setMessage(`Unable to load the live board reading. ${error.message}`, "error");
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "Refresh";
  }
}

function normalizeReading(payload) {
  const source =
    payload.latest && typeof payload.latest === "object"
      ? payload.latest
      : payload.data && typeof payload.data === "object"
        ? payload.data
        : payload;

  return {
    distance: asNumber(
      source.distance_cm ??
        source.distanceCm ??
        source.distance ??
        source.ultrasonic_cm ??
        source.level_cm ??
        null
    ),
    timestamp: source.timestamp || source.time || null,
  };
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
