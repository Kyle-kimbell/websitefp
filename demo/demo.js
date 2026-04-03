const distanceValue = document.getElementById("distanceValue");
const timestampValue = document.getElementById("timestampValue");
const statusValue = document.getElementById("statusValue");
const updatedValue = document.getElementById("updatedValue");
const message = document.getElementById("message");
const refreshButton = document.getElementById("refreshButton");

const SENSOR_ENDPOINT = window.NVM_SENSOR_ENDPOINT || "";
const SENSOR_STALE_MS = Number(window.NVM_SENSOR_STALE_MS || 90000);
const POLL_INTERVAL_MS = 60000;
let lastGoodReading = null;

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

    lastGoodReading = reading;
    distanceValue.textContent = `${reading.distance.toFixed(1)} cm`;
    statusValue.textContent = reading.isStale ? "Stale" : "Live";
    timestampValue.textContent = formatTimestamp(reading.timestamp);
    updatedValue.textContent = reading.isStale
      ? `PLC scan delayed by ${formatAge(reading.ageMs)}`
      : "PLC scan healthy";
    setMessage(
      reading.isStale
        ? "Sensor link is responding, but the last PLC-style reading is older than expected."
        : "Live reading loaded from the ESP32 station-mode publish path.",
      reading.isStale ? "error" : "ok"
    );
  } catch (error) {
    if (lastGoodReading) {
      distanceValue.textContent = `${lastGoodReading.distance.toFixed(1)} cm`;
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
    distance: asNumber(
      source.distance_cm ??
        source.distanceCm ??
        source.distance ??
        source.ultrasonic_cm ??
        source.level_cm ??
        null
    ),
    timestamp,
    ageMs,
    isStale: ageMs != null && ageMs > SENSOR_STALE_MS,
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
