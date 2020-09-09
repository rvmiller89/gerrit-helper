chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == 'finishedToggle') {
    document.getElementById('progressBar').hidden = true
  } else {
    console.warn('unknown message received: ' + request)
  }
})

toggleHide.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    document.getElementById('progressBar').hidden = false
    chrome.tabs.executeScript(tabs[0].id, { file: 'js/content_script.js' })
  })
}

function updateCurrentRegexHTMLMessage() {
  chrome.storage.sync.get('fileRegex', function (data) {
    document.getElementById('currentRegex').value = data.fileRegex
  })
}

optionsButton.onclick = function (element) {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('options.html'))
  }
}

updateCurrentRegexHTMLMessage()
