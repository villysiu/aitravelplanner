# 🧠✈️ AI Travel Planner

A smart travel planning app that uses AI (OpenAI's ChatGPT) to generate personalized itineraries based on user input. Select your destination, number of days, and travel themes — and get a detailed day-by-day itinerary, complete with landmarks and images.

🌍 **Live App**: [https://villysiu.github.io/aitravelplanner/](https://villysiu.github.io/aitravelplanner/)

---

## ✨ Features

- 🔍 **City Autocomplete**: Start typing a city name and receive smart suggestions after 3 characters.
- 📅 **Flexible Trip Duration**: Choose how many days you'd like to travel.
- 🎯 **Custom Themes**: Pick vacation styles like *relax*, *family*, *adventure*, etc.
- 🤖 **AI-Generated Itineraries**: Uses ChatGPT to generate structured, informative travel plans.
- 🖼️ **Image Integration**: Landmark photos are pulled from the Pexels API and displayed alongside your plan.
- ⚡ **Fast and Serverless**: All backend processing is handled via Netlify Functions.

---

## 🧰 Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | [React](https://reactjs.org/)       |
| API Requests | [Axios](https://axios-http.com/)    |
| AI Engine    | [OpenAI ChatGPT](https://openai.com/) via `gpt-3.5-turbo` |
| Images       | [Pexels API](https://www.pexels.com/api/) |
| Serverless   | [Netlify Functions](https://docs.netlify.com/functions/overview/) |
| Hosting      | [GitHub Pages](https://villysiu.github.io/aitravelplanner/) |

---

## 🧠 Model Context Protocol (MCP)

This project uses a lightweight version of **Model Context Protocol (MCP)** — a standardized structure for sending and receiving contextual data between the application and an AI model.

The MCP-style structure includes:

```json
{
  "user": {
    "location": null,
    "language": "en"
  },
  "input": {
    "destination": "Paris",
    "dayCount": 3,
    "themes": ["romantic", "culture"]
  },
  "aiOutput": {
    "... populated with AI response ..."
  },
  "metadata": {
    "generatedAt": "ISO timestamp",
    "imageSources": ["pexels.com"]
  }
}
