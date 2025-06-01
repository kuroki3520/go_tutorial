// Placeholder for the Gemini API Key.
// In a real extension, this should be stored securely and ideally configured by the user.
const API_KEY = 'YOUR_GEMINI_API_KEY'; // <<< IMPORTANT: Replace with a real key for testing
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'translate') {
    const { text, targetLang } = request;

    // Construct the prompt for Gemini API
    // The exact prompt structure might need adjustment based on Gemini's best practices for translation.
    const prompt = `Translate the following text to ${targetLang}: "${text}"`;

    fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        // It's good practice to include generationConfig, even with defaults.
        // We might need to adjust these for translation tasks, e.g. temperature.
        generationConfig: {
          temperature: 0.7, // Adjust for creativity vs. literal translation
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        }
      }),
    })
    .then(response => {
      if (!response.ok) {
        // Try to get more detailed error from response body
        return response.json().then(errorBody => {
          console.error('Gemini API Error Response:', errorBody);
          throw new Error(`API request failed with status ${response.status}: ${errorBody?.error?.message || response.statusText}`);
        }).catch(() => {
          // If parsing error body fails, throw a generic error
          throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        });
      }
      return response.json();
    })
    .then(data => {
      // Process the response from Gemini API.
      // The exact path to the translated text will depend on the Gemini API response structure.
      // Assuming the translated text is in `data.candidates[0].content.parts[0].text`
      if (data.candidates && data.candidates.length > 0 &&
          data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const translatedText = data.candidates[0].content.parts[0].text;
        sendResponse({ translatedText: translatedText.trim() });
      } else {
        console.error('Unexpected Gemini API response structure:', data);
        sendResponse({ error: 'Could not parse translation from API response.' });
      }
    })
    .catch(error => {
      console.error('Error calling Gemini API:', error);
      sendResponse({ error: error.message || 'Failed to fetch translation.' });
    });

    return true; // Indicates that the response will be sent asynchronously.
  }
});

// Keep the service worker alive during API call (optional, but can help prevent premature termination)
chrome.runtime.onInstalled.addListener(() => {
  console.log('Gemini Translate Extension installed/updated.');
});
