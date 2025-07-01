
const fetch = require("node-fetch");
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const imageCache = new Map(); // In-memory cache
exports.handler = async function (event, context) {
  if (event.httpMethod === "OPTIONS") {
    // Preflight CORS request
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://villysiu.github.io",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
    
  }
  
  // if (event.httpMethod !== "POST") {
  //   return {
  //     statusCode: 405,
  //     headers: {
  //       "Access-Control-Allow-Origin": "https://villysiu.github.io",
  //     },
  //     body: "Method Not Allowed"
  //   };
  // }

  async function fetchImage(landmark) {
    
    // Check if image is already cached
    if (imageCache.has(landmark)) {
        console.log(`Cache hit for: ${landmark}`);
        return imageCache.get(landmark);
    }

    try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(landmark)}&per_page=1`, 
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            }
          });

        const data = await response.json();
        const photo = data.photos?.[0];

        const imageUrl = photo ? photo.src.medium : null;

        // Save to cache
        if (imageUrl) {
            imageCache.set(landmark, imageUrl);
        }

        return imageUrl;
    } catch (error) {
        console.error(`Error fetching image for ${landmark}:`, error.message);
        return null;
    }
}

  try {
    const { destination } = JSON.parse(event.body);

    const prompt = `
        Create a travel plan for ${destination} in JSON format. Default 3 days and 2 adults if not mentioned.
        Include fields:
        - Destination
        - 100 words description of country, culture, and weather
        - Itineraries (array of { day in number, description, 3-5 popular visitor favoriote  (array of { name, description } ) }).
        Output only pure JSON without extra commentary.
    `;


    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI error:", errorData);
      throw new Error("Failed to fetch from OpenAI");
    }


    const data = await response.json();
    let itinerary = JSON.parse(data.choices[0].message.content);


      itinerary.imageUrl = await fetchImage(itinerary.destination);

      // Fetch images for each landmark
      for (const day of itinerary.itineraries) {
          for (let i = 0; i < day.landmarks.length; i++) {
              const landmark = day.landmarks[i];
              const imageUrl = await fetchImage(landmark.name);
              day.landmarks[i] = { name: landmark.name, description: landmark.description, imageUrl: imageUrl };
          }
      }

      // res.json(itinerary);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin":  "*",
      },
      body: JSON.stringify(itinerary)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin":  "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Something went wrong." }),
    };
  }
};
