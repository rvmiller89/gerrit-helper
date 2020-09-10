/**
 * paginationControlRow: the row which contains the controls/buttons to show more files if the number of files
 * in the current patch set is paginated.
 */
var paginationControlRow = document
  .querySelector('#app')
  .shadowRoot.querySelector('#app-element')
  .shadowRoot.querySelector('main > gr-change-view')
  .shadowRoot.querySelector('#fileList')
  .shadowRoot.querySelector('div.row.controlRow')

/**
 * showAllButton: the button element that enables the user to fetch all files that were changed in the current
 * patch set.
 */
var showAllButton = document
  .querySelector('#app')
  .shadowRoot.querySelector('#app-element')
  .shadowRoot.querySelector('main > gr-change-view')
  .shadowRoot.querySelector('#fileList')
  .shadowRoot.querySelector('#showAllButton')

/**
 * showAllFiles: triggers a backend call to grab the full list of files that were modified in the currently
 * viewed patch set if the current list is being paginated.
 * @return {Promise<Void>} An empty promise to indicate all files are now displayed on the frontend.
 */
function showAllFiles() {
  // All files already shown if the control row is invisible
  if (paginationControlRow.classList.contains('invisible') === true) {
    return Promise.resolve()
  }

  showAllButton.click()

  return waitForAllFiles()
}

/**
 * waitForAllFiles: watches the pagination control row using a mutation observer and returns once the control row is invisible to the user.
 * This indicates that the paginated data is now completely received by the frontend and ready for us to filter.
 * @return {Promise<Void>} An empty promise to indicate all data from the backend has been received.
 */
async function waitForAllFiles() {
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName == 'class') {
        if (mutation.target.classList.contains('invisible') === true) {
          return Promise.resolve()
        }
      }
    })
  })

  observer.observe(paginationControlRow, { attributes: true })
}

/**
 * getFileList: obtains all HTML row elements that is a file in the current patch set.
 * @return {HTMLCollection} An interface containing all HTML elements that holds the files being changed in the current patch set.
 */
function getFileList() {
  var elements = document
    .querySelector('#app')
    .shadowRoot.querySelector('#app-element')
    .shadowRoot.querySelector('main > gr-change-view')
    .shadowRoot.querySelector('#fileList')
    .shadowRoot.querySelector('#container')

  return elements.children
}

/**
 * toggleFiles: flips the hidden state for any file in the current patch set that matches the provided regex filter.
 * @param {HTMLCollection} elementList An HTMLCollection containing children elements which hold information about the files modified in the current patch set.
 * @param {RegExp} regex A regex filter to filter a list of files on.
 * @return {Array<string>} An array containing the file names that have been toggled by the filter.
 */
function toggleFiles(elementList, regex) {
  var hiddenFiles = []
  for (elementPos = elementList.length - 1; elementPos >= 0; elementPos--) {
    let element = elementList[elementPos]
    if (element.className !== 'stickyArea') {
      continue
    }

    let filePath = JSON.parse(element.children[0].getAttribute('data-file'))
      .path

    if (regex.test(filePath)) {
      hiddenFiles.push(filePath)
      element.hidden = !element.hidden
    }
  }

  return hiddenFiles
}

/**
 * main: triggers the filtering of files within the current patch set.
 */
function main() {
  chrome.storage.sync.get('fileRegex', function (data) {
    var regex = new RegExp(data.fileRegex)

    showAllFiles()
      .then(() => toggleFiles(getFileList(), regex))
      .then((files) => {
        console.log(
          'The following files were affected by the filter: `'
            .concat(data.fileRegex)
            .concat('`'),
          '\n------\n',
          files.join('\n ')
        )
        chrome.runtime.sendMessage({ message: 'finishedToggle' })
      })
  })
}

main()
