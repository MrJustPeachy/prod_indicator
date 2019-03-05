function getURL(){
  chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    return tablink;
  });
}

function makeIndicator(color) {
  if (color == "green") {
    return html = '<div id="prod-indicator" style="position: fixed; width: 50px;top: 50px;right: 10px;height: 50px;border-style: inset;border: solid;border-width: 3px;z-index: 100000;border-color: rgba(255,255,255,0.5);background-color: green;"></div>';
  }
  else {
    return html = '<div id="prod-indicator" style="position: fixed; width: 50px;top: 50px;right: 10px;height: 50px;border-style: inset;border: solid;border-width: 3px;z-index: 100000;border-color: rgba(255,255,255,0.5);background-color: #861616;"></div>';
  }
}

function addWildCardsToURL(domainArray) {
  return domainArray.map(e => '*://' + e + '/*');
}

if (chrome.tabs != undefined) {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
      chrome.storage.sync.get(null, function(result) {
        if (result.devURLs != undefined || result.prodURLs != undefined)
        {
          chrome.tabs.query({active: true, currentWindow: true, url: addWildCardsToURL(result.devURLs)}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'window.onload = document.body.insertAdjacentHTML(\'afterbegin\', \'' + makeIndicator('green') + '\');'});
          });
          chrome.tabs.query({active: true, currentWindow: true, url: addWildCardsToURL(result.prodURLs)}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'window.onload = document.body.insertAdjacentHTML(\'afterbegin\', \'' + makeIndicator('not hotdog') + '\');'});
          });
        }
      });

    }
  });
}

