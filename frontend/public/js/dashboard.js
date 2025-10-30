// -------------------------------
//  Dashboard Live Update Script
// -------------------------------

// Selecting DOM elements
const tempEl = document.getElementById("temperature-value");
const humidityEl = document.getElementById("humidity-value");
const moistureEl = document.getElementById("moisture-value");
const hourlyDataContainer = document.getElementById("hourly-data");

// Backend server base URL
const BASE_URL = "http://192.168.1.149:3000/api/sensor-readings";

// Fetch latest reading
async function fetchLatestReading() {
  try {
    const res = await fetch(`${BASE_URL}/latest`);
    if (!res.ok) throw new Error("Failed to fetch latest reading");
    const latest = await res.json();

    // Update main readings
    tempEl.textContent = `${latest.temperature.toFixed(1)}°C`;
    humidityEl.textContent = `${latest.humidity.toFixed(1)}%`;
    moistureEl.textContent = `${latest.soil_moisture.toFixed(1)}%`;

    // Log for debugging
    console.log("Latest updated at:", new Date(latest.timestamp).toLocaleTimeString());

  } catch (err) {
    console.error("Error fetching latest reading:", err);
  }
}

// Fetch the last few readings for the hourly/mini chart section
async function fetchRecentReadings() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch all readings");
    const data = await res.json();

    if (data.length === 0) return;

    hourlyDataContainer.innerHTML = "";
    const recent = data.slice(-6).reverse(); // last 6 readings, newest first

    recent.forEach((r) => {
      const block = document.createElement("div");
      block.classList.add("hour-block");
      const time = new Date(r.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      block.innerHTML = `
        <div><strong>${time}</strong></div>
        <div>${r.temperature.toFixed(1)}°C</div>
        <div>${r.humidity.toFixed(1)}%</div>
        <div>${r.soil_moisture.toFixed(1)}%</div>
      `;
      hourlyDataContainer.appendChild(block);
    });
  } catch (err) {
    console.error("Error fetching recent readings:", err);
  }
}

// Function to refresh everything
async function updateDashboard() {
  await fetchLatestReading();
  await fetchRecentReadings();
}

// Run once at startup
updateDashboard();

// Refresh every 5 seconds (adjust if needed)
setInterval(updateDashboard, 5000);
