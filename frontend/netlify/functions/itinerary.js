
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
  
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "https://villysiu.github.io",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "Method Not Allowed"
    };
  }

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
You are a travel assistant.

Create a travel plan for the following input:
Destination: "${destination}"

Instructions:
- If no number of days or travelers is mentioned, assume 3 days and 2 adults.
- Return only a strict **JSON object** (no extra text or markdown).
- Use the following fixed structure:

{
  "destination": "string",
  "description": "100-word overview of the country's culture, climate, and travel vibe.",
  "itineraries": [
    {
      "day": 1,
      "description": "Summary of the day in 1-2 sentences.",
      "landmarks": [
        {
          "name": "Landmark name",
          "description": "1-2 sentence description"
        }
        // Include 3 to 5 items in this array
      ]
    }
    // Repeat one object per day of the trip
  ]
}

Rules:
- The "itineraries" array must have one object per day.
- Each "landmarks" array must include 3–5 places.
- Keys and structure must be consistent and match exactly.
- Output only valid JSON with no comments or extra explanations.
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
    console.log("Itinerary:", JSON.stringify(itinerary, null, 2));


      itinerary.imageUrl = await fetchImage(itinerary.destination);

      // Fetch images for each landmark
      for (const day of itinerary.itineraries) {
          for (let i = 0; i < day.landmarks.length; i++) {
              const landmark = day.landmarks[i];
              const imageUrl = await fetchImage(landmark.name);
              day.landmarks[i] = { ...day.landmarks[i], imageUrl: imageUrl };

              // day.landmarks[i] = { name: landmark.name, description: landmark.description, imageUrl: imageUrl };
          }
      }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin":  "https://villysiu.github.io",
      },
      body: JSON.stringify(itinerary)
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin":  "https://villysiu.github.io",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: error.message || "Something went wrong." }),
    };
  }
};
