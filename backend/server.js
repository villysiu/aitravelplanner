
const express = require('express');
const cors = require('cors');
// const {samplePlan} = require("./samplePlan");
const { fetchImage } = require('./pexels/getImages')
const {post} = require("axios");
const {fetchSecret} = require("./google/getSecret");

const app = express();
const PORT = 8080;



// app.use(cors());
// Enable CORS for your frontend URL (you can add more origins if needed)
app.use(cors({
    // origin: 'http://localhost:3000',  // Allow requests from your frontend (localhost)
    origin: 'https://ai-travel-planner-821de.web.app',
    methods: ['POST'],        // You can adjust allowed methods here
    allowedHeaders: ['Content-Type', 'Authorization'],  // Customize based on your needs
}));
app.use(express.json());




// Endpoint: Generate Itinerary
app.post('/api/itinerary', async (req, res) => {
    const { destination } = req.body;


    const prompt = `
  Create a travel plan for ${destination} in JSON format. Default 3 days and 2 adults if not mentioned.
  Include fields:
  - Destination
  - 100 words description of country, culture, and weather
  - Itineraries (array of { day in number, description, 3-5 popular visitor favoriote  (array of { name, description } ) }).
  Output only pure JSON without extra commentary.
`;

console.log(prompt)
    try {
            // Get OpenAi api key
        const apiKey = await fetchSecret('OPENAI_API_KEY');
        console.log(`Authorization header: Bearer ${apiKey}`);
        // Ask ChatGPT
        const chatResponse = await post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7
            },
            {
                headers: {
                    // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let itinerary = JSON.parse(chatResponse.data.choices[0].message.content);

        // sample plan
        // let itinerary = null;
        // setTimeout(async()=>{
        //    const itinerary = samplePlan;

        itinerary.imageUrl = await fetchImage(itinerary.destination);

        // Fetch images for each landmark
        for (const day of itinerary.itineraries) {
            for (let i = 0; i < day.landmarks.length; i++) {
                const landmark = day.landmarks[i];
                const imageUrl = await fetchImage(landmark.name);
                day.landmarks[i] = { name: landmark.name, description: landmark.description, imageUrl: imageUrl };
            }
        }

        res.json(itinerary);
            // }, 5000)

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to generate itinerary' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
