const API_KEY = "AIzaSyA1Z5fpTyzYlkEDh6ZFOEhSJSasl0ga5Q0"; // Replace with your Gemini API key

async function fetchData() {
    const name = document.getElementById("query").value.trim();
    if (!name) {
        alert("Please enter a vegetable or fruit name.");
        return;
    }

    const prompt = `Provide information about ${name}:
    1. Suitable soil type  
    2. Growth duration in days  
    3. Best marketplaces to sell  
    4. Common diseases and prevention  
    5. Additional important details`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 500  // Ensures enough response length
                })
            }
        );

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        if (data && data.candidates && data.candidates.length > 0) {
            document.getElementById("response").innerText = data.candidates[0].content; 
        } else {
            document.getElementById("response").innerText = "No data found. Try a different vegetable or fruit.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response").innerText = "Error fetching data.";
    }
}
