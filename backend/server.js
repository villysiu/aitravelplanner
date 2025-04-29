
require('dotenv').config();
const { createClient } = require('pexels');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const {samplePlan} = require("./samplePlan");


const app = express();
const PORT = 8080;

// Initialize Pexels client
// console.log('Pexels Key:', process.env.PEXELS_API_KEY);
const pexelsClient = createClient(process.env.PEXELS_API_KEY);

app.use(cors());
app.use(express.json());

// 🗃  in-memory cache for landmark images
const imageCache = {};

async function fetchImage(landmark) {

    // Check if image is already cached
    if (imageCache[landmark]) {
        console.log(`Cache hit for: ${landmark}`);
        return imageCache[landmark];
    }


    // Not cached, fetch from Pexels
    console.log(`Cache miss. Fetching from Pexels: ${landmark}`);
    try {
        const response = await pexelsClient.photos.search({ query: landmark, per_page: 1 });

        const photo = response.photos[0];

        const imageUrl = photo ? photo.src.medium : null;

        // Save to cache
        if (imageUrl) {
            imageCache[landmark] = imageUrl;
        }

        return imageUrl;
    } catch (error) {
        console.error(`Error fetching image for ${landmark}:`, error.message);
        return null;
    }
}

// Endpoint: Generate Itinerary
app.post('/api/itinerary', async (req, res) => {
    const { destination } = req.body;

    console.log(destination)
//     const prompt = `
//     Create a 3-day travel itinerary for Tokyo in JSON format.
// Include fields:
// - Destination
// - 100 words description of country, culture and weather
// - itineraries (array of { day in number, description, 2-4 landmarks (array of {name, description} ) }).
// Output only pure JSON without extra commentary.
//   `;
    const prompt = `
  Create a travel plan for ${destination} in JSON format.
  Include fields:
  - Destination
  - 100 words description of country, culture, and weather
  - Itineraries (array of { day in number, description, 2-4 landmarks (array of { name, description } ) }).
  Output only pure JSON without extra commentary.
`;

console.log(prompt)
    try {
        // Ask ChatGPT
        // const chatResponse = await axios.post(
        //     'https://api.openai.com/v1/chat/completions',
        //     {
        //         model: 'gpt-3.5-turbo',
        //         messages: [{ role: 'user', content: prompt }],
        //         temperature: 0.7
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // );
        //
        // let itinerary = JSON.parse(chatResponse.data.choices[0].message.content);

        // sample plan
        // let itinerary = null;
        setTimeout(async()=>{
           const itinerary = samplePlan;





        itinerary.imageUrl = await fetchImage(itinerary.destination);

        // Fetch images for each landmark
        for (const day of itinerary.itineraries) {
            for (let i = 0; i < day.landmarks.length; i++) {
                const landmark = day.landmarks[i];
                // const imageUrl = await fetchImage(landmark.name);
                const imageUrl=null;
                day.landmarks[i] = { name: landmark.name, description: landmark.description, imageUrl: imageUrl };
            }
        }

        res.json(itinerary);
            }, 5000)

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to generate itinerary' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
