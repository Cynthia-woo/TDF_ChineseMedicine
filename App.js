    const express= require('express');
    const app= express();
    const path= require('path');
    const axios= require('axios');

    const bodyParser= require('body-parser');// parse json
    app.use(bodyParser.json( ));

    //website to run code:'http://localhost:8000/'
    const host= 'localhost';
    const port= 8000;

    var publicPath= path.join(__dirname, 'public'); //get the path to use our "public" folder storing our html, css, images, etc
    app.use(express.static( publicPath ));

    // express-router
    const router = express.Router();

    // web server url
    // if there's no url extension, it will show "index.html"
    router.get("/", function(req,res) {
        res.sendFile(path.join(__dirname, "/"));//default "/" means "index.html"
     });
    //handle APT request
    app.post("/api", async(req,res) => {
        try{
            const inputText = req.body.inputText;
            const user_id = req.body.user_id; // Optional user_id
            const session_id = req.body.session_id; // Optional session_id
            const stateful = req.body.stateful; // Optional stateful flag
            const apiResponse = await callZeroWidthAPI(inputText, user_id, session_id, stateful);
            // console.log('apiResponse', apiResponse);
            if (apiResponse && apiResponse.output_data && apiResponse.output_data.content) {
                const responseText = apiResponse.output_data.content;
                res.json({ response: responseText });
            } else {
                console.error('Invalid API Response Format:', apiResponse);
                res.status(500).json({ error: 'Invalid API response format' });
            }
        } catch (error) {
            console.log('Error in API request', error);
            res.status(500).json({ error: error.message});
        }
    });

    const callZeroWidthAPI = async (inputText, user_id, session_id, stateful) => {
        const apiUrl = "https://api.zerowidth.ai/process/NFkuStb1R0pe33kgs3IW/nFDVr95RfczyBCTiiOcu?verbose=true";
        const apiKey = "Bearer sk0w-8801efb57d18337bd57e8866f208052d";
        const messagesArray = [];
        // messagesArray.push({
        //     content: 'i got a stomachache',
        //     role: "user",
        // })
        messagesArray.push({
            content: inputText,
            role: "user",
        })
        const reqBody = {
            data: {
                messages: messagesArray,
                variables:{
                    "AGE_OF_USER":""
                },
            },
            user_id: user_id, // Optional user_id
            session_id: session_id, // Optional session_id
            stateful: stateful || true, // Optional stateful flag (default to false)
        };

        try {
            console.log('Making API Request:', apiUrl, reqBody);
            const response = await axios.post(apiUrl, reqBody, {
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

    app.get('/a', function (req, res) {
        res.sendFile(publicPath + '/a.html');
    });
    app.get('/b', function (req, res) {
        res.sendFile(publicPath + '/b.html');
    });
    app.get('/c', function (req, res) {
        res.sendFile(publicPath + '/c.html');
    });

    //run the server: "node App.js"
    app.listen(port, () => {
        console.log(`Server is hosting on http://${host}:${port}`);
    })
