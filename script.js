const CHANNEL_ID = "3106054";
const API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=1`;

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const feed = data.feeds[0];

    document.getElementById("temp").innerText = feed.field1 + " °C";
    document.getElementById("humidity").innerText = feed.field2 + " %";
    document.getElementById("tds").innerText = feed.field3 + " ppm";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.getElementById("refresh").addEventListener("click", fetchData);
fetchData();
