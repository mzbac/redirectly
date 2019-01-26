import "../img/icon.png";
let redirctlyConfig = {};

const onBeforeRequestCallback = e => {
  if (redirctlyConfig.enable) {
    const match = redirctlyConfig.overrides.find(element => {
      return element.from === e.url;
    });
    if (match)
      return {
        redirectUrl: match.to
      };
  }
};
const filter = { urls: ["<all_urls>"] };

const onBeforeSendHeadersCallback = e => {
  if (redirctlyConfig.enable) {
    e.requestHeaders = [...e.requestHeaders, ...redirctlyConfig.headers];

    return { requestHeaders: e.requestHeaders };
  }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!sender.tab) {
    if (request.redirctly) {
      redirctlyConfig = { ...request.redirctly };
      chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestCallback);
      chrome.webRequest.onBeforeSendHeaders.removeListener(
        onBeforeSendHeadersCallback
      );

      if (request.redirctly.enable) {
        chrome.webRequest.onBeforeRequest.addListener(
          onBeforeRequestCallback,
          filter,
          ["blocking"]
        );
        chrome.webRequest.onBeforeSendHeaders.addListener(
          onBeforeSendHeadersCallback,
          filter,
          ["blocking", "requestHeaders"]
        );
      }
    }
    sendResponse({ success: true });
  }
});
