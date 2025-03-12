const API_KEY = "AIzaSyA1Z5fpTyzYlkEDh6ZFOEhSJSasl0ga5Q0"; // Replace with your valid API key

async function fetchData() {
    const name = document.getElementById("query").value.trim();
    if (!name) {
        alert("Please enter a vegetable or fruit name.");
        return;
    }

    const prompt = `Provide detailed information about the fruit or vegetable: ${name}
    - Suitable soil type
    - Growth duration in days
    - Best marketplaces to sell
    - Common diseases and prevention
    - Any additional farming tips.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: prompt,
                    temperature: 0.7,  // Adjusts response variety
                    maxOutputTokens: 300  // Prevents truncation
                })
            }
        );

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        // Extract and display response
        if (data && data.candidates && data.candidates[0] && data.candidates[0].output) {
            document.getElementById("response").innerText = data.candidates[0].output;
        } else {
            document.getElementById("response").innerText = "No data found. Try another query.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response").innerText = "Error fetching data. Check console.";
    }
}
