chrome.storage.sync.get({
  fileRegex: "\/?vendor\/"
}, function (data) {
  var regex = new RegExp(data.fileRegex)

  // Expand all files if necessary
  showAllFiles()

  hiddenFiles = hideFiles(getFileList(), regex)

  console.log("Filtered the following files from being shown:", "\n------\n", hiddenFiles.join("\n "))
});

function showAllFiles() {
  if (
    document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("div.row.controlRow.invisible") !== null
  ) {
    return
  }

  document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("div.row.controlRow > gr-tooltip-content").click()
}

function getFileList() {
  var elements = document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("#container");

  return elements.children
}

function hideFiles(elementList, regex) {
  hiddenFiles = []
  for (elementPos = elementList.length - 1; elementPos >= 0; elementPos--) {
    let element = elementList[elementPos]
    if (element.className !== "stickyArea") {
      continue
    }

    let filePath = JSON.parse(element.children[0].getAttribute("data-file")).path

    if (regex.test(filePath)) {
      hiddenFiles.push(filePath)
      element.hidden = true
    }
  }

  return hiddenFiles
}