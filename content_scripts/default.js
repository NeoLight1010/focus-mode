const newHtml = "<html><h1>Hello World!!!!!</h1></html>";
const cleanNewHtml = DOMPurify.sanitize(newHtml);

document.getElementsByTagName("html")[0].innerHTML = cleanNewHtml;
