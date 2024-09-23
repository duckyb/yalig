function saveOptions() {
  browser.extension
    .getBackgroundPage()
    .settings.setMail(document.getElementById("mail").value);
  browser.extension
    .getBackgroundPage()
    .settings.setURL(document.getElementById("url").value);
  browser.extension
    .getBackgroundPage()
    .settings.setContextMenu(document.getElementById("contextMenu").checked);
  browser.extension
    .getBackgroundPage()
    .settings.setInsertIntoPage(
      document.getElementById("insertIntoPage").checked
    );
  browser.extension
    .getBackgroundPage()
    .settings.setCopyToClipboard(
      document.getElementById("copyToClipboard").checked
    );
  browser.extension
    .getBackgroundPage()
    .settings.setDateFormat(document.getElementById("dateFormat").value);
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function () {
    status.innerHTML = "&nbsp;";
  }, 1500);
}

// Restores select box state to saved value from localStorage.
function restoreOptions() {
  document.getElementById("mail").value = browser.extension
    .getBackgroundPage()
    .settings.getMail();
  document.getElementById("url").value = browser.extension
    .getBackgroundPage()
    .settings.getURL();
  document.getElementById("contextMenu").checked = browser.extension
    .getBackgroundPage()
    .settings.isContextMenu();
  document.getElementById("insertIntoPage").checked = browser.extension
    .getBackgroundPage()
    .settings.isInsertIntoPage();
  document.getElementById("copyToClipboard").checked = browser.extension
    .getBackgroundPage()
    .settings.isCopyToClipboard();
  document.getElementById("dateFormat").value = browser.extension
    .getBackgroundPage()
    .settings.getDateFormat();
}
function setDateFormat(format) {
  document.getElementById("dateFormat").value = format;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#dateFormatUs")
    .addEventListener("click", function () {
      setDateFormat("MM/dd/yyyy");
      return false;
    });
  document
    .querySelector("#dateFormatEu")
    .addEventListener("click", function () {
      setDateFormat("dd.MM.yyyy");
      return false;
    });
  document.querySelector("#saveButton").addEventListener("click", saveOptions);
  restoreOptions();
});
