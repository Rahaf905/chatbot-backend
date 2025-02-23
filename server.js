// Testing redeploy after installing axios
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads API key from .env file
const axios = require('axios'); // Import axios for API calls

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // Use your API Key
const AI_API_URL = "https://openrouter.ai/api/v1/chat/completions"; // OpenRouter API

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        // Make API request to OpenRouter or OpenAI
        const response = await axios.post(AI_API_URL, {
            model: "mistralai/mistral-7b-instruct:free", // Change model if needed
            messages: [
                { role: "system", content: "You are a helpful AI assistant." },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7 // Add this line for better responses
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const aiResponse = response.data.choices[0].message.content;

        res.json({ response: aiResponse });

    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to get AI response" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});
