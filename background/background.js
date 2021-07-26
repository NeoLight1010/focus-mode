function onBeforeRequest(_details) {
  console.log("Entering blocked page!");

  return {
    redirectUrl: browser.runtime.getURL("html/blocked_page.html"),
  };
}

browser.webRequest.onBeforeRequest.addListener(
  onBeforeRequest,
  {
    urls: ["*://*.facebook.com/*"],
  },
  ["blocking"]
);
