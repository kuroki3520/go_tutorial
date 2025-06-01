document.addEventListener('DOMContentLoaded', function () {
  const inputText = document.getElementById('inputText');
  const targetLanguage = document.getElementById('targetLanguage');
  const translateButton = document.getElementById('translateButton');
  const outputText = document.getElementById('outputText');

  translateButton.addEventListener('click', function () {
    const text = inputText.value;
    const language = targetLanguage.value;
    outputText.textContent = 'Translating...'; // Show loading message

    if (text.trim() === '') {
      outputText.textContent = 'Please enter text to translate.';
      return;
    }

    // Send a message to the background script to perform the translation
    chrome.runtime.sendMessage(
      { type: 'translate', text: text, targetLang: language },
      function (response) {
        if (chrome.runtime.lastError) {
          // Handle errors, e.g., if the background script is not available
          console.error(chrome.runtime.lastError.message);
          outputText.textContent = 'Error: Could not connect to background script.';
          return;
        }
        if (response && response.error) {
          console.error('Translation Error:', response.error);
          outputText.textContent = 'Error: ' + response.error;
        } else if (response && response.translatedText) {
          outputText.textContent = response.translatedText;
        } else {
          outputText.textContent = 'Error: No translation received.';
        }
      }
    );
  });
});
