// dashboard.js
// Script to update live sensor data on the dashboard and handle button interactions

// Wait until the DOM content is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  /**
   * updateLiveData function simulates fetching live data 
   * and updates the sensor values in the dashboard card.
   * Replace with real data fetching logic as needed.
   */
async function updateLiveData() {
    try{ 
        const response = await fetch('/api/sensor-readings/latest');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        //update the data from DB to the dashboard
        document.getElementById('temperature-value').textContent = `${data.temperature}°C`;
        document.getElementById('moisture-value').textContent = `${data.soil_moisture}%`;
        document.getElementById('humidity-value').textContent = `${data.humidity}%`;

    } catch (error) {
        console.error('Failed to fetch live data:', error);
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