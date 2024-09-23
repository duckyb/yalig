function updateSelected(event) {
  var element = this;
  var coords = getCoor(event, element);
  var w = coords[0];
  var h = coords[1];
  var rows = element.querySelectorAll(".parrow");
  for (var iy = 0; iy < rows.length; iy++) {
    var cols = rows[iy].querySelectorAll(".parcol");
    for (var ix = 0; ix < cols.length; ix++) {
      if (iy < h && ix < w) {
        cols[ix].style.backgroundColor = "#B4CCED";
      } else {
        cols[ix].style.backgroundColor = "";
      }
    }
  }
}

function clearSelected(event) {
  var entry = this;
  var entries = entry.querySelectorAll(".parcol");
  for (var i = 0; i < entries.length; i++) {
    entries[i].style.backgroundColor = "";
  }
}

function clickSelectedParagraphs(event) {
  var element = this;
  var coords = getCoor(event, element);
  browser.extension
    .getBackgroundPage()
    .insertParagraphs(coords[1], coords[0], handleResponse);
}

function clickSelectedTitle(event) {
  var element = this;
  var coords = getCoor(event, element);
  browser.extension.getBackgroundPage().insertTitle(coords[0], handleResponse);
}

function getCoor(event, element) {
  var x = event.x - element.offsetLeft;
  var y = event.y - element.offsetTop;
  var h = Math.ceil(y / 24);
  var w = Math.ceil(x / 48);
  return [w, h];
}

function insertText(text) {
  browser.extension.getBackgroundPage().insertText(text, handleResponse);
}

function handleResponse(response) {
  window.close();
}

var todayString = browser.extension.getBackgroundPage().createTodayString();
var yesterdayString = browser.extension
  .getBackgroundPage()
  .createYesterdayString();
var tomorrowString = browser.extension
  .getBackgroundPage()
  .createTomorrowString();
var randomDateString = browser.extension
  .getBackgroundPage()
  .createRandomDateString();
var randomDatePattern = browser.extension
  .getBackgroundPage()
  .createRandomDatePattern();
var url = browser.extension.getBackgroundPage().createURL();
var mail = browser.extension.getBackgroundPage().createMail();

function toggleOptionInsertIntoPage() {
  var val = browser.extension.getBackgroundPage().settings.isInsertIntoPage();
  browser.extension.getBackgroundPage().settings.setInsertIntoPage(!val);
  updateOptionInsertIntoPage();
}

function toggleOptionCopyToClipboard() {
  browser.extension
    .getBackgroundPage()
    .settings.setCopyToClipboard(
      !browser.extension.getBackgroundPage().settings.isCopyToClipboard()
    );
  updateOptionCopyToClipboard();
}

function updateOptionInsertIntoPage() {
  document.getElementById("optionInsertIntoPage").checked = browser.extension
    .getBackgroundPage()
    .settings.isInsertIntoPage();
}

function updateOptionCopyToClipboard() {
  document.getElementById("optionCopyToClipboard").checked = browser.extension
    .getBackgroundPage()
    .settings.isCopyToClipboard();
}

function makeTextInsertButton(id, text) {
  var el = document.querySelector("#" + id);
  var parser = new DOMParser();
  var doc = parser.parseFromString(text, "text/html");
  el.innerHTML = doc.body.textContent || "";
  el.addEventListener("click", function () {
    insertText(text);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var title = document.querySelectorAll(".title");
  for (var i = 0; i < title.length; i++) {
    title[i].addEventListener("mousemove", updateSelected);
    title[i].addEventListener("mouseout", clearSelected);
    title[i].addEventListener("click", clickSelectedTitle);
  }
  var paragraph = document.querySelectorAll(".paragraph");
  for (var i = 0; i < paragraph.length; i++) {
    paragraph[i].addEventListener("mousemove", updateSelected);
    paragraph[i].addEventListener("mouseout", clearSelected);
    paragraph[i].addEventListener("click", clickSelectedParagraphs);
  }
  makeTextInsertButton("yesterday", yesterdayString);
  makeTextInsertButton("today", todayString);
  makeTextInsertButton("tomorrow", tomorrowString);
  makeTextInsertButton("randomDate", randomDateString);
  makeTextInsertButton("mail", mail);
  makeTextInsertButton("url", url);

  document
    .querySelector("#optionInsertIntoPage")
    .addEventListener("click", toggleOptionInsertIntoPage);
  document
    .querySelector("#optionCopyToClipboard")
    .addEventListener("click", toggleOptionCopyToClipboard);

  updateOptionInsertIntoPage();
  updateOptionCopyToClipboard();
});
