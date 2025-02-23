const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads API key from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    // Placeholder AI response
    const aiResponse = `AI says: ${userMessage}`;

    res.json({ response: aiResponse });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Server is running!");
});
