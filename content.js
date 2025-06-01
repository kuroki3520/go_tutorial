// content.js

// Function to create and show a translation button
function showTranslateButton(selectedText, x, y) {
  removeTranslateButton(); // Remove any existing button

  const button = document.createElement('button');
  button.id = 'geminiTranslateButtonInPage'; // Use the ID defined in CSS
  button.textContent = 'Translate with Gemini';
  // Styles are now in style.css
  // Basic styling, can be moved to style.css
  // button.style.position = 'absolute'; // Removed
  // button.style.left = `${x}px`; // Removed
  // button.style.top = `${y}px`; // Removed
  // button.style.zIndex = '10000'; // Removed, but defined in CSS
  // button.style.backgroundColor = '#4285F4'; // Removed
  // button.style.color = 'white'; // Removed
  // button.style.border = 'none'; // Removed
  // button.style.padding = '5px 10px'; // Removed
  // button.style.borderRadius = '3px'; // Removed
  // button.style.cursor = 'pointer'; // Removed

  document.body.appendChild(button);

  button.onclick = function() {
    // For now, let's default to 'en' or get from storage if set
    // A more advanced version could let the user pick the target language here
    const targetLang = 'en'; // Default target language
    console.log(`Sending to background: '${selectedText}' to ${targetLang}`);

    chrome.runtime.sendMessage(
      { type: 'translate', text: selectedText, targetLang: targetLang },
      (response) => {
        removeTranslateButton(); // Remove button after attempting translation
        if (chrome.runtime.lastError) {
          console.error('Content Script Error:', chrome.runtime.lastError.message);
          alert('Error translating: Could not connect to the extension.');
          return;
        }
        if (response && response.error) {
          console.error('Translation Error:', response.error);
          alert(`Translation Error: ${response.error}`);
        } else if (response && response.translatedText) {
          // Display the translation - simple alert for now, could be a modal or overlay
          alert(`Translation:
${response.translatedText}`);
        } else {
          alert('Error: No translation received from background.');
        }
      }
    );
  };

  // Remove button if user clicks elsewhere
  document.addEventListener('mousedown', handleClickOutside, true);
}

// Function to remove the translation button
function removeTranslateButton() {
  const existingButton = document.getElementById('geminiTranslateButtonInPage');
  if (existingButton) {
    existingButton.remove();
  }
  document.removeEventListener('mousedown', handleClickOutside, true);
}

function handleClickOutside(event) {
  const button = document.getElementById('geminiTranslateButtonInPage');
  // If the click is outside the button, remove the button
  if (button && !button.contains(event.target)) {
    removeTranslateButton();
  }
}

// Listen for mouseup event to detect text selection
document.addEventListener('mouseup', function (event) {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    // Position the button near the selection
    // clientX/Y gives mouse position relative to viewport
    showTranslateButton(selectedText, event.clientX + window.scrollX + 5, event.clientY + window.scrollY + 5);
  } else {
    // If no text is selected (e.g., just a click), ensure any existing button is removed
    // This is partially handled by handleClickOutside, but good as a fallback
    removeTranslateButton();
  }
});

console.log('Gemini Translate content script loaded.');
