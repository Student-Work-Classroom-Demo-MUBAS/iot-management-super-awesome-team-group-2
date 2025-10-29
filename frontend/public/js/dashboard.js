// dashboard.js
// Script to update live sensor data on the dashboard and handle button interactions

// Wait until the DOM content is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  /**
   * updateLiveData function simulates fetching live data 
   * and updates the sensor values in the dashboard card.
   * Replace with real data fetching logic as needed.
   */
function updateLiveData() {
    const tempElem = document.getElementById('temperature-value');
    const moistureElem = document.getElementById('moisture-value');
    const humidityElem = document.getElementById('humidity-value');

// Check if elements exist before updating to avoid runtime errors
    if (tempElem && moistureElem && humidityElem) {
      // Simulate sensor values with random numbers (replace with actual API calls)
      tempElem.textContent = `${(20 + Math.random() * 10).toFixed(1)}°C`;
      moistureElem.textContent = `${(40 + Math.random() * 20).toFixed(0)}%`;
      humidityElem.textContent = `${(50 + Math.random() * 30).toFixed(0)}%`;
    }
  }

  // Initial call to show live data right away on page load
  updateLiveData();

  // Set interval to update live data every 10,000 milliseconds (10 seconds)
  setInterval(updateLiveData, 10000);

/**
   * Attach event listener to the View Charts button
   * This can be extended to open charts, load new content, etc.
   */   
  const viewChartsBtn = document.querySelector('.btn-view-charts');
  if (viewChartsBtn) {
    viewChartsBtn.addEventListener('click', (e) => {
      e.preventDefault();  // Prevent default anchor navigation

      // For now, simply alert. Replace with chart display logic.
      alert('This will show charts. Replace with your chart view code.');
    });
  }
});