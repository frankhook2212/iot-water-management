const CHANNEL_ID = "3106054";
const API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=1`;

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const feed = data.feeds[0];

    const temp = Number(feed.field1);
    const humidity = Number(feed.field2);
    const tds = Number(feed.field3);

    // Display values
    document.getElementById("temp").innerText = temp + " °C";
    document.getElementById("humidity").innerText = humidity + " %";
    document.getElementById("tds").innerText = tds + " ppm";

    // Fish safety assessment
    const safe = tds <= 500 && temp >= 20 && temp <= 30;

    const safetyElement = document.getElementById("safety");
    if (safetyElement) {
      safetyElement.innerText = safe ? "🟢 Safe" : "🔴 Attention";
    }

    // Recommendations
    const recommendationElement =
      document.getElementById("recommendation");

    if (recommendationElement) {
      recommendationElement.innerText = safe
        ? "Water quality is suitable for aquaculture. Continue normal operation."
        : "Check filtration system and consider partial water replacement.";
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Refresh button support
const refreshBtn = document.getElementById("refresh");

if (refreshBtn) {
  refreshBtn.addEventListener("click", fetchData);
}

// Initial load
fetchData();
