'use strict';

function setupOptions() {
  saveButton.onclick = function(element) {
    chrome.storage.sync.set({fileRegex: "abc"});
    alert("Settings saved.");
  }
}
setupOptions();
