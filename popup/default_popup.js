function onSubmit(e) {
  const storage = browser.storage.sync;
  const data = new FormData(e.target);

  const startTimeString = `${data.get("start-hour")}:${data.get(
    "start-minute"
  )}`;
  const endTimeString = `${data.get("end-hour")}:${data.get("end-minute")}`;

  const startTime = new Date("1970-01-01T" + startTimeString);
  const endTime = new Date("1970-01-01T" + endTimeString);

  // Validation
  let isInvalid = false;

  if (startTime.toString() === "Invalid Date") {
    document.getElementById("start-hour").classList.add("uk-form-danger");
    document.getElementById("start-minute").classList.add("uk-form-danger");

    isInvalid = true;
  }

  if (endTime.toString() === "Invalid Date") {
    document.getElementById("end-hour").classList.add("uk-form-danger");
    document.getElementById("end-minute").classList.add("uk-form-danger");

    isInvalid = true;
  }

  if (isInvalid) {
    e.preventDefault();
    return false;
  }

  storage.set({
    startTime,
    endTime,
  });

  browser.runtime.reload();

  return true;
}

const timeForm = document.getElementById("time-form");
timeForm.addEventListener("submit", onSubmit);
