

const samplePlan =
{
  "destination": "Tokyo",
  "description": "Japan is a fascinating blend of ancient traditions and modern innovation. The culture emphasizes respect, harmony, and community, which is evident in daily life and customs. Tokyo, its bustling capital, showcases both serene temples and towering skyscrapers. Visitors can enjoy sushi, tea ceremonies, and vibrant pop culture. Japan experiences four distinct seasons: spring offers cherry blossoms and mild weather, summer is hot with lively festivals, autumn brings cool air and vivid foliage, and winter is crisp with occasional snow. Tokyo in spring or fall is particularly pleasant, offering the best balance of climate and scenery for travelers.",
  "itineraries": [
    {
      "day": 1,
      "description": "Discover Tokyo's rich history and traditional landmarks.",
      "landmarks": [
        {
          "name": "Senso-ji Temple",
          "description": "Tokyo's oldest Buddhist temple, known for its vibrant shopping street, Nakamise-dori."
        },
        {
          "name": "Meiji Shrine",
          "description": "A serene Shinto shrine nestled in a lush forest near Harajuku."
        },
        {
          "name": "Ueno Park",
          "description": "A spacious public park with museums, a zoo, and cherry blossoms in spring."
        }
      ]
    },
    {
      "day": 2,
      "description": "Experience modern Tokyo’s energy and innovation.",
      "landmarks": [
        {
          "name": "Shibuya Crossing",
          "description": "The world’s busiest pedestrian crossing, symbolizing Tokyo's vibrant pace."
        },
        {
          "name": "Tokyo Skytree",
          "description": "A 634-meter tower offering panoramic views and shopping experiences."
        },
        {
          "name": "Akihabara",
          "description": "Tokyo’s tech and anime hub, filled with electronics shops and themed cafés."
        }
      ]
    },
    {
      "day": 3,
      "description": "Relax in scenic spots and explore cultural exhibits.",
      "landmarks": [
        {
          "name": "Shinjuku Gyoen National Garden",
          "description": "A peaceful garden combining Japanese, English, and French landscaping."
        },
        {
          "name": "TeamLab Planets",
          "description": "An immersive digital art museum where guests walk through water and light."
        },
        {
          "name": "Odaiba",
          "description": "A futuristic man-made island with shopping, entertainment, and waterfront views."
        }
      ]
    }
  ]
}

module.exports = { samplePlan };
// prompt
// Create a 3-day travel itinerary for Tokyo in JSON format.
// Include fields:
// - Destination
// - 100 words description of country, culture and weather
// - itineraries (array of { day in number, description, 2-4 landmarks (array of {name, description} ) }).
// Output only pure JSON without extra commentary.