chrome.storage.sync.get('fileRegex', function(data) {
  var regex = new RegExp(data.fileRegex)
  var elements = document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("#container");
  var childElements = elements.children

  var removedFiles = []

  for (elementPos = childElements.length - 1; elementPos >= 0; elementPos--) {
    let element = childElements[elementPos]
    if (element.className !== "stickyArea") {
      continue
    }

    let filePath = JSON.parse(element.children[0].getAttribute("data-file")).path

    if (regex.test(filePath)) {
      removedFiles.push(filePath)
      elements.removeChild(element)
    }
  }

  console.log("Filtered the following files from being shown:", "\n------\n", removedFiles.join("\n "))
});
