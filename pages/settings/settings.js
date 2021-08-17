function onSubmit(e) {
  const storage = browser.storage.sync;
  const data = new FormData(e.target);

  const blockedSites = data.get("blocked-sites").split("\n");

  storage.set({ blockedSites });
  browser.runtime.reload();

  return true;
}

const settingsForm = document.getElementById("settings-form");
settingsForm.addEventListener("submit", onSubmit);
