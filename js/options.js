function listURLs(urls) {
  var urlArray = urls.split(',');
  var whitespace_urls = urlArray.map(e => e.trim()).filter(e => e.length > 0);
  return whitespace_urls;
}

function constructOptions() {
    let button = document.getElementById('url-button');
    let devURLsTextArea = document.getElementById('dev-urls');
    let prodURLsTextArea = document.getElementById('prod-urls');

    chrome.storage.sync.get(null, function(result) {
      if (result.devURLs != undefined) {
        devURLsTextArea.value = result.devURLs;
      }
      if (result.prodURLs != undefined) {
        prodURLsTextArea.value = result.prodURLs;
      }
    });

    button.addEventListener('click', function() {
      devURLsTextArea = listURLs(devURLsTextArea.value);
      prodURLsTextArea = listURLs(prodURLsTextArea.value);
      chrome.storage.sync.set({"devURLs": devURLsTextArea, "prodURLs": prodURLsTextArea,}, function() {
        console.log(devURLsTextArea);
        console.log(prodURLsTextArea);
      })
    });
  }

  window.onload = constructOptions();