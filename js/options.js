'use strict';

function setupOptions() {
  var saveButton = document.getElementById('saveButton');

  saveButton.onclick = function () {
    let newRegexString = document.getElementById("fileRegex").value

    if (!isRegexValid(newRegexString)) {
      alert("Error! Please insert a valid regex")
      return
    }

    chrome.storage.sync.set({ fileRegex: newRegexString });
    alert("Settings saved.");
  }
}

function isRegexValid(regexString) {
  if (regexString === "") {
    return false
  }

  try {
    new RegExp(regexString);
  } catch (e) {
    return false
  }

  return true
}

setupOptions();
