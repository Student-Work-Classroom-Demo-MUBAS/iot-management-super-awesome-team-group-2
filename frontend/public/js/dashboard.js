// -------------------------------
//  Dashboard Live Update Script
// -------------------------------

const tempEl = document.getElementById("temperature-value");
const humidityEl = document.getElementById("humidity-value");
const moistureEl = document.getElementById("moisture-value");
const hourlyDataContainer = document.getElementById("hourly-data");

// Function to fetch readings from backend API
async function fetchReadings() {
  try {
    const res = await fetch("/api/sensor-readings");
    if (!res.ok) throw new Error("Failed to fetch readings");
    const data = await res.json();

    if (data.length === 0) return;

    // Get the most recent reading
    const latest = data[data.length - 1];

    // Update main values
    tempEl.textContent = `${latest.temperature.toFixed(1)}°C`;
    humidityEl.textContent = `${latest.humidity.toFixed(1)}%`;
    moistureEl.textContent = `${latest.soil_moisture.toFixed(1)}%`;

    // Update hourly data blocks (last 6 readings)
    hourlyDataContainer.innerHTML = "";
    const recent = data.slice(-6).reverse(); // show newest first
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
    console.error("Error loading readings:", err);
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
fetchHourlyAverages();
setInterval(fetchReadings, 5000);
setInterval(fetchHourlyAverages, 300000);