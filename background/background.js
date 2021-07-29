function onBeforeRequest(_details) {
  console.log("Entering blocked page!");

  return {
    redirectUrl: browser.runtime.getURL("html/blocked_page.html"),
  };
}

function allUrlsInDomain(domain) {
  return `*://${domain}/*`;
}

function getBlockedWebsites() {
  const storage = browser.storage.sync;

  const defaultBlockedSites = [
    allUrlsInDomain("www.facebook.com"),
    allUrlsInDomain("www.youtube.com"),
    allUrlsInDomain("www.twitch.tv"),
  ];

  return storage.get({ blockedSites: defaultBlockedSites });
}

getBlockedWebsites().then((data) => {
  browser.webRequest.onBeforeRequest.addListener(
    onBeforeRequest,
    {
      urls: data.blockedSites,
    },
    ["blocking"]
  );
});
