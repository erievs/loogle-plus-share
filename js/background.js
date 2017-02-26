/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function openPopup() {
  getCurrentTabUrl(function(url) {
    var fullurl = 'https://plus.google.com/share?url=' + encodeURIComponent(url);
    var leftPosition = (window.screen.width / 2) - 400/2;
    var topPosition = 460/2;

    var windowName = 'Share on Google+'
    var windowSpecs = `left=${leftPosition},top=${topPosition},width=400,height=460,menubar=no,location=no,status=no,resizable=no`;

    window.open(fullurl, windowName, windowSpecs);
  });
}

chrome.browserAction.onClicked.addListener(openPopup);
