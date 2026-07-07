/**
 * 3 Block — Starter Grant applications
 *
 * Receives POSTs from js/apply.js and appends each application as a row
 * in the Google Sheet this script is bound to.
 *
 * Setup instructions: see docs/readme.md in the project repo.
 */

var SHEET_NAME = "Applications";

var HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Neighborhood",
  "Group description",
  "Grant amount ($)"
];

function doPost(e) {
  try {
    var sheet = getSheet_();
    var p = (e && e.parameter) || {};

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.email || "",
      p.phone || "",
      p.location || "",
      p.description || "",
      p.amount || ""
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/** Visiting the web app URL in a browser confirms the deployment works. */
function doGet() {
  return jsonResponse_({ ok: true, service: "3 Block grant applications" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
