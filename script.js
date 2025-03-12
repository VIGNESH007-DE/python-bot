const API_KEY = "AIzaSyA1Z5fpTyzYlkEDh6ZFOEhSJSasl0ga5Q0"; // Replace with your Gemini API key

async function fetchData() {
    const name = document.getElementById("query").value;
    if (!name) {
        alert("Please enter a vegetable or fruit name.");
        return;
    }

    const prompt = `Provide information about ${name}:
    1. Suitable soil type
    2. Growth duration in days
    3. Best marketplaces to sell
    4. Common diseases and prevention
    5. Additional details`;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=" + API_KEY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        if (data && data.candidates && data.candidates.length > 0) {
            document.getElementById("response").innerText = data.candidates[0].text;
        } else {
            document.getElementById("response").innerText = "No data found.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response").innerText = "Error fetching data.";
    }
}
