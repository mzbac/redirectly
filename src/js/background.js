import "../img/icon.png";
const map = {
  target: "",
  destination: "",
  headers: ""
};
const callback = e => {
  if (map.target && map.destination && e.url === map.target) {
    return {
      redirectUrl: map.destination
    };
  }
};
const filter = { urls: ["<all_urls>"] };
const opt_extraInfoSpec = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(
  callback,
  filter,
  opt_extraInfoSpec
);
chrome.webRequest.onBeforeSendHeaders.addListener(
  e => {
    if (map.target && map.headers && e.url === map.target) {
      const headerPair = map.headers.split(",");
      const headers = headerPair.reduce((acc, cur) => {
        const pair = cur.split("=");
        const header = {
          name: pair[0],
          value: pair[1]
        };
        acc.push(header);
        return acc;
      }, []);

      e.requestHeaders = [...e.requestHeaders, ...headers];

      return { requestHeaders: e.requestHeaders };
    }
  },
  filter,
  ["blocking", "requestHeaders"]
);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!sender.tab) {
    if (request.redirctly) {
      map.target = request.redirctly.target;
      map.destination = request.redirctly.destination;
      map.headers = request.redirctly.headers;
    }
    sendResponse({ success: true });
  }
});
