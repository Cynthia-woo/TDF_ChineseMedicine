const express = require('express');
const bodyParser = require('body-parser'); // Add this line to parse JSON
const app = express();
const path = require('path');
const axios = require('axios');

app.use(bodyParser.json()); // Use body-parser to parse JSON

const host = 'localhost';
const port = 8000;

var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Serve the HTML file for the root route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Handle the API request
app.post("/api", async (req, res) => {
    try {
        const inputText = req.body.inputText;
        const user_id = req.body.user_id; // Optional user_id
        const session_id = req.body.session_id; // Optional session_id
        const stateful = req.body.stateful; // Optional stateful flag

        const apiResponse = await callZeroWidthAPI(inputText, user_id, session_id, stateful);

        if (apiResponse && apiResponse.output_data && apiResponse.output_data.content) {
            const responseText = apiResponse.output_data.content;
            res.json({ response: responseText });
        } else {
            console.error('Invalid API Response Format:', apiResponse);
            res.status(500).json({ error: 'Invalid API response format' });
        }
    } catch (error) {
        console.error("Error in API request:", error);
        res.status(500).json({ error: error.message });
    }
});


// Function to make the API call
async function callZeroWidthAPI(inputText, user_id, session_id, stateful) {
    const apiUrl = "https://api.zerowidth.ai/process/NFkuStb1R0pe33kgs3IW/nFDVr95RfczyBCTiiOcu";
    const apiKey = "Bearer sk0w-8801efb57d18337bd57e8866f208052d";
    const requestBody = {
        data: {
            messages: [
                {
                    content: inputText,
                    role: "user",
                },
            ],
            variables:{
                "AGE_OF_USER":""
            },
        },
        user_id: user_id, // Optional user_id
        session_id: session_id, // Optional session_id
        stateful: stateful || false, // Optional stateful flag (default to false)
    };

    try {
        console.log('Making API Request:', apiUrl, requestBody);
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                Authorization: apiKey,
                'Content-Type': 'application/json', // Include Content-Type header
            },
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.message);
        return "API Error";
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
