require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // Load API key from environment variables

app.use(cors());
app.use(express.json());

// Chatbot Route
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    // Simulated AI Response (Modify as Needed)
    const aiResponse = `AI says: ${userMessage}`;

    res.json({ response: aiResponse });
});

// Root Route for Health Check
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
