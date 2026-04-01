/**
 * PORTFOLIO LEADS → GOOGLE SHEET
 *
 * CRITICAL SETTINGS (Deployments → pencil on active deployment):
 *   - Execute as: Me
 *   - Who has access: **Anyone**   ← must be “Anyone”, not “Only myself”
 *
 * CRITICAL: Open Apps Script FROM the spreadsheet:
 *   Sheet menu → Extensions → Apps Script
 *   (If this project was created only at script.google.com, set SPREADSHEET_ID below.)
 *
 * After editing: Deploy → Manage deployments → edit → Version “New version” → Deploy
 *
 * DEBUG: Apps Script → Executions — run the site form, refresh Executions to see errors.
 */

// Only if script is NOT bound to a sheet: paste ID from
// https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
var SPREADSHEET_ID = "";

function getSpreadsheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss && SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  if (!ss) {
    throw new Error(
      "No spreadsheet: open your Sheet → Extensions → Apps Script and paste code there, OR fill SPREADSHEET_ID in this script."
    );
  }
  return ss;
}

function getLeadsSheet_() {
  var ss = getSpreadsheet_();
  var byName = ss.getSheetByName("Leads");
  return byName || ss.getSheets()[0];
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() !== 0) return;
  sheet.appendRow([
    "Timestamp",
    "Form",
    "Name",
    "Email",
    "Phone",
    "Subject",
    "Message",
    "Extras",
  ]);
}

/**
 * Parses lead JSON from the website.
 * Supports:
 *   - Form POST: payload=<urlencoded json>  (what the portfolio site sends)
 *   - Raw JSON string in post body (legacy)
 */
function parseLeadPayload_(e) {
  if (e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }
  if (!e.postData || e.postData.contents == null || e.postData.contents === "") {
    throw new Error(
      "No payload — Web app must allow 'Anyone'. Redeploy if you changed the script."
    );
  }
  var contents = String(e.postData.contents).trim();
  if (contents.indexOf("{") === 0) {
    return JSON.parse(contents);
  }
  if (contents.indexOf("payload=") !== -1) {
    var match = contents.match(/(?:^|&)payload=([^&]*)/);
    if (match) {
      return JSON.parse(decodeURIComponent(match[1].replace(/\+/g, " ")));
    }
  }
  throw new Error("Unrecognized POST body — expected payload=… or JSON.");
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "Portfolio leads endpoint is running. POST from the site sends payload=…",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = parseLeadPayload_(e);
    var sheet = getLeadsSheet_();
    ensureHeaderRow_(sheet);

    sheet.appendRow([
      data._ts || new Date().toISOString(),
      data.form || "",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.subject || "",
      data.message || "",
      data.extras || "",
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Run once from the editor (▶) to confirm the sheet accepts rows.
 */
function testAppendRow() {
  var sheet = getLeadsSheet_();
  ensureHeaderRow_(sheet);
  sheet.appendRow([
    new Date().toISOString(),
    "test",
    "Tester",
    "test@example.com",
    "",
    "Manual test",
    "If you see this row, the spreadsheet is wired correctly.",
    "",
  ]);
}
