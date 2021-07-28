function onSubmit(form) {
  console.log(form);

  const data = new FormData(form.target);
  console.log(...data);
}

const timeForm = document.getElementById("time-form");
timeForm.addEventListener("submit", onSubmit);
