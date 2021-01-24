chrome.runtime.onInstalled.addListener(function() {
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.fingerprinting.result == true){
        alert("This website " + request.fingerprinting.url +" was marked suspicious of canvas fingerprinting and prevented.");   
    }
    return true;
  }
);