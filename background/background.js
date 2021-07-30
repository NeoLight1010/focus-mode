function onBeforeRequest(_details) {
  console.log("Entering blocked page!");

  return {
    redirectUrl: browser.runtime.getURL("html/blocked_page.html"),
  };
}

function allUrlsInDomain(domain) {
  return `*://${domain}/*`;
}

function dateAsTimeSeconds(date) {
  /*
   * Returns the time as seconds after midnight. Ignores the date.
   */
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return hours * 3600 + minutes * 60 + seconds;
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

function getBlockedTimes() {
  const storage = browser.storage.sync;

  return storage.get(["startTime", "endTime"]);
}

getBlockedTimes().then((timeData) => {
  const { startTime, endTime } = timeData;
  const nowTime = new Date();

  let startInSeconds = dateAsTimeSeconds(new Date(startTime));
  let endInSeconds = dateAsTimeSeconds(new Date(endTime));
  let nowInSeconds = dateAsTimeSeconds(nowTime);

  if (endInSeconds < startInSeconds) {
    endInSeconds += 24 * 3600;
    nowInSeconds += 24 * 3600;
  }

  const isNowBlocked =
    nowInSeconds - startInSeconds <= endInSeconds - startInSeconds &&
    nowInSeconds - startInSeconds >= 0;

  if (isNowBlocked) {
    getBlockedWebsites().then((data) => {
      browser.webRequest.onBeforeRequest.addListener(
        onBeforeRequest,
        {
          urls: data.blockedSites,
        },
        ["blocking"]
      );
    });
  }
});
