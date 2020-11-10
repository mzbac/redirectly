import "../img/icon.png";
let redirctlyConfig = {};

const onBeforeRequestCallback = e => {
  if (redirctlyConfig.enable) {
    const match = redirctlyConfig.overrides
      .filter(override => override.enabled)
      .find(element => {
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
    const newHeaders = redirctlyConfig.headers
      .filter(header => header.enabled)
      .map(h => {
        const { enabled, ...rest } = h;
        return rest;
      });
    const map = {};
    e.requestHeaders.forEach(kv => (map[kv.name] = kv.value));
    newHeaders.forEach(kv => (map[kv.name] = kv.value));
    const headers = [];
    Object.keys(map).map(key => {
      headers.push({
        name: key,
        value: map[key]
      });
    });
    return { requestHeaders: headers };
  }
};

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!sender.tab) {
    if (request.redirctly) {
      redirctlyConfig = { ...request.redirctly };
      browser.webRequest.onBeforeRequest.removeListener(onBeforeRequestCallback);
      browser.webRequest.onBeforeSendHeaders.removeListener(
        onBeforeSendHeadersCallback
      );

      if (request.redirctly.enable) {
        browser.webRequest.onBeforeRequest.addListener(
          onBeforeRequestCallback,
          filter,
          ["blocking"]
        );
        browser.webRequest.onBeforeSendHeaders.addListener(
          onBeforeSendHeadersCallback,
          filter,
          ["blocking", "requestHeaders"]
        );
      }
    }
    sendResponse({ success: true });
  }
});
