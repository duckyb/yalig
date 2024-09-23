function insertText(text) {
  var element = document.activeElement;
  if (!element) return false;
  if (typeof element.value != "undefined")
    return insertIntoValueElement(element, text);
}

function getType() {
  var element = document.activeElement;
  if (element && typeof element.value != "undefined")
    return element.getAttribute("type");
}

function insertIntoValueElement(element, text) {
  var start = element.selectionStart;
  var end = element.selectionEnd;
  if (!start) start = 0;
  if (!end) end = 0;
  var prefix = element.value.substring(0, start);
  var suffix = element.value.substring(end, element.value.length);
  element.value = prefix + text + suffix;
  start = start + text.length;
  element.selectionStart = start;
  element.selectionEnd = start;
  element.focus();
  element.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "insertText") {
    insertTextIntoPage(message.text);
    sendResponse({ success: true });
  }
});

function insertTextIntoPage(text) {
  const activeElement = document.activeElement;
  if (
    activeElement &&
    (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
  ) {
    activeElement.value += text;
  } else {
    console.warn("No suitable element to insert text into.");
  }
}
