chrome.storage.sync.get("fileRegex", async function (data) {
  var regex = new RegExp(data.fileRegex)

  // Expand all files if necessary
  await showAllFiles()

  files = toggleFiles(getFileList(), regex)

  console.log("The following files are affected by the filter: ".concat(data.fileRegex), "\n------\n", files.join("\n "))
});

function showAllFiles() {
  if (
    document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("div.row.controlRow.invisible") !== null
  ) {
    return
  }
  document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("#showAllButton").click()

  while (document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("div.row.controlRow.invisible") === null) {
   continue 
  }
}

function getFileList() {
  var elements = document.querySelector("#app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#fileList").shadowRoot.querySelector("#container");

  return elements.children
}

function toggleFiles(elementList, regex) {
  hiddenFiles = []
  for (elementPos = elementList.length - 1; elementPos >= 0; elementPos--) {
    let element = elementList[elementPos]
    if (element.className !== "stickyArea") {
      continue
    }

    let filePath = JSON.parse(element.children[0].getAttribute("data-file")).path

    if (regex.test(filePath)) {
      hiddenFiles.push(filePath)
      element.hidden = !element.hidden
    }
  }

  return hiddenFiles
}
