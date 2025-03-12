from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Configure Gemini API Key
GENAI_API_KEY = "AIzaSyA1Z5fpTyzYlkEDh6ZFOEhSJSasl0ga5Q0"
genai.configure(api_key=GENAI_API_KEY)

def get_gemini_response(veg_fruit_name):
    prompt = f"""
    Provide detailed information about the following {veg_fruit_name}:
    1. Suitable soil type
    2. Time required for growth (days)
    3. Best marketplaces to sell
    4. Common diseases and prevention
    5. Additional important details
    """

    response = genai.generate_text(prompt=prompt)
    return response.text if response else "No data found."

@app.route('/get_info', methods=['POST'])
def get_info():
    data = request.json
    veg_fruit_name = data.get('name', '')

    if not veg_fruit_name:
        return jsonify({"error": "Please provide a vegetable or fruit name"}), 400

    response_text = get_gemini_response(veg_fruit_name)
    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(debug=True)
