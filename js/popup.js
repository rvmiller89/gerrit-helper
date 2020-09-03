'use strict';

toggleHide.onclick = function (element) {
  console.log("Clicked");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { file: 'js/content_script.js' }
    );
  });
};

function updateCurrentRegexHTMLMessage() {
  chrome.storage.sync.get("fileRegex", function (data) {
    document.getElementById("currentRegex").innerHTML = data.fileRegex
  })
}

updateCurrentRegexHTMLMessage()