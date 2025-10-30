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
