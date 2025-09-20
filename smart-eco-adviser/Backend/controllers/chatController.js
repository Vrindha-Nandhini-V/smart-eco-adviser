const model = require('../config/geminiConfig'); 

// Clean up response text
const cleanResponse = (response) => {
    return response
        .replace(/[\n*]/g, '')  
        .replace(/\s+/g, ' ')   
        .trim();                
};

const ecoChat = async (req, res) => {
    try {
        const { prompt } = req.body;

        // Prompt tailored for Smart Eco Advisor
        const fullPrompt = `You are an AI-powered Smart Eco Advisor. 
        Provide clear, practical, and actionable eco-friendly advice based on: ${prompt}. 
        Avoid unnecessary formatting and keep the response concise and easy to understand.`;

        // Call Gemini API
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = await response.text();
        const cleanedText = cleanResponse(text);

        // Send back clean response
        res.json({ advice: cleanedText });

    } catch (error) {
        console.error("Error in ecoChat:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { ecoChat };
