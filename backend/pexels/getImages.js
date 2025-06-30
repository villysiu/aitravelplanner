
// Initialize Pexels client
// console.log('Pexels Key:', process.env.PEXELS_API_KEY);
const {createClient} = require("pexels");
const {fetchSecret} = require("../google/getSecret");

// in-memory cache for landmark images
const imageCache = new Map(); // In-memory cache

let pexelsClient = null;

// Get Pexels api key
async function initPexelsClient() {
    if (!pexelsClient) {
        const pexelsApiKey = await fetchSecret('PEXELS_API_KEY');
        pexelsClient = createClient(pexelsApiKey);
    }
}



async function fetchImage(landmark) {
    await initPexelsClient();

    // Check if image is already cached
    if (imageCache.has(landmark)) {
        console.log(`Cache hit for: ${landmark}`);
        return imageCache.get(landmark);
    }


    // Not cached, fetch from Pexels
    console.log(`Cache miss. Fetching from Pexels: ${landmark}`);
    try {
        const response = await pexelsClient.photos.search({ query: landmark, per_page: 1 });

        const photo = response.photos[0];

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
module.exports = { fetchImage };