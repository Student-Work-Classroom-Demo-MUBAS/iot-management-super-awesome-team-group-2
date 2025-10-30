// -------------------------------
//  Dashboard Live Update Script
// -------------------------------

// Selecting DOM elements
const tempEl = document.getElementById("temperature-value");
const humidityEl = document.getElementById("humidity-value");
const moistureEl = document.getElementById("moisture-value");
const hourlyDataContainer = document.getElementById("hourly-data");

// Backend server base URL
const BASE_URL = "/api/sensor-readings";

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

async function fetchHourlyAverages() {
  try {
    const res = await fetch("/api/sensor-readings/hourly?hours=3");
    if (!res.ok) throw new Error("Failed to fetch hourly averages");
    const data = await res.json();

    // Sort chronologically ascending (oldest first)
    data.sort((a, b) => new Date(a.hour) - new Date(b.hour));

    // logging a warning and safely stopping instead of failing, If it doesn’t find that element in the page
    const hourlyAvgContainer = document.getElementById("hourly-averages");
    if (!hourlyAvgContainer) {
        console.warn("No container found for hourly averages");
        return;
    }


    // Clear previous blocks
    hourlyDataContainer.innerHTML = "";

    data.forEach((r) => {
      const hour = new Date(r.hour);
      const timeStr = hour.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const block = document.createElement("div");
      block.classList.add("hour-block", "text-center");
      block.innerHTML = `
        <div><strong>${timeStr}</strong></div>
        <div>🌡️ ${Number(r.avg_temperature).toFixed(1)}°C</div>
        <div>💧 ${Number(r.avg_moisture).toFixed(1)}%</div>
        <div>💨 ${Number(r.avg_humidity).toFixed(1)}%</div>
      `;
      hourlyDataContainer.appendChild(block);
    });
  } catch (err) {
    console.error("Error loading hourly averages:", err);
  }
}


// Fetch every 5 seconds
fetchReadings();
setInterval(fetchReadings, 5000);