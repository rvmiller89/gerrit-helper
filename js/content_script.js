'use strict';

chrome.storage.sync.get('fileRegex', function(data) {
  var regex = data.fileRegex;
  console.log("Page is using regex: " + regex);
});