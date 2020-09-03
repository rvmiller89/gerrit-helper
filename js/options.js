'use strict'

function updateCurrentRegexHTMLMessage() {
  chrome.storage.sync.get('fileRegex', function (data) {
    document.getElementById('currentRegex').innerHTML = data.fileRegex
  })
}

function setupOptions() {
  saveButton.onclick = function () {
    let newRegexString = document.getElementById('fileRegex').value

    if (!isRegexValid(newRegexString)) {
      alert('Error! Please insert a valid regex')
      return
    }

    chrome.storage.sync.set({ fileRegex: newRegexString })
    updateCurrentRegexHTMLMessage()
  }
}

function isRegexValid(regexString) {
  if (regexString === '') {
    return false
  }

  try {
    new RegExp(regexString)
  } catch (e) {
    return false
  }

  return true
}

updateCurrentRegexHTMLMessage()
setupOptions()
