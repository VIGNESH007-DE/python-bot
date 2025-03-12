function fetchData() {
    const name = document.getElementById("query").value;
    if (!name) {
        alert("Please enter a vegetable or fruit name.");
        return;
    }

    fetch('http://127.0.0.1:5000/get_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerText = data.response;
    })
    .catch(error => console.error("Error:", error));
}
