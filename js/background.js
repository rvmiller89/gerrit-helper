'use strict';

const DefaultRegex = "\/?vendor\/";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({fileRegex: DefaultRegex});
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {pathContains: '/c/'},
          css: ["div.file-row"]
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
