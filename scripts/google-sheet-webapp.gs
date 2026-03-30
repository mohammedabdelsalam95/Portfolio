/**
 * ============================================================
 * PORTFOLIO LEADS → GOOGLE SHEET (Google Apps Script)
 * ============================================================
 *
 * Your Vite app POSTs JSON (Content-Type: text/plain) with:
 *   _ts, form, name, email, phone, subject, message, extras
 *
 * ----------------------------------------------------------
 * SETUP (bind script to the spreadsheet — recommended)
 * ----------------------------------------------------------
 * 1. Google Drive → New → Google Sheets → Blank spreadsheet.
 * 2. (Optional) Rename first tab to: Leads
 *    The script uses sheet "Leads" if it exists; otherwise the first tab.
 * 3. In the spreadsheet menu: Extensions → Apps Script.
 * 4. Delete default Code.gs content; paste this entire file (all lines).
 * 5. Save project (disk icon). Name it e.g. "Portfolio Leads".
 *
 * ----------------------------------------------------------
 * FIRST AUTHORIZATION
 * ----------------------------------------------------------
 * 6. Click Run ▶ , select doGet (or first save triggers no run).
 * 7. Deploy → New deployment → Select type: Web app
 *    - Execute as: Me (your@email.com)
 *    - Who has access: Anyone
 *      (Required so your public site / Lovable can POST without Google login.)
 * 8. Deploy → Authorize access → Google account → Continue →
 *    If you see “Google hasn’t verified this app”: Advanced → Go to … (unsafe) → Allow.
 * 9. Copy the Web app URL. It looks like:
 *      https://script.google.com/macros/s/AKfycb.../exec
 *    Put it in Lovable / .env as:
 *      VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *
 * ----------------------------------------------------------
 * AFTER YOU CHANGE THIS CODE
 * ----------------------------------------------------------
 * Deploy → Manage deployments → pencil (edit) on Active
 *   → Version: New version → Deploy
 * (Old URLs keep working; they just need a new version to pick up code changes.)
 *
 * ----------------------------------------------------------
 * TEST
 * ----------------------------------------------------------
 * Paste Web app URL in a browser tab → you should see JSON:
 *   {"ok":true,"message":"Portfolio leads endpoint is running..."}
 * Submit your Contact / Start a project form → a new row should appear.
 *
 * ----------------------------------------------------------
 * STANDALONE SCRIPT (optional)
 * ----------------------------------------------------------
 * If you created the project at script.google.com (not from the Sheet),
 * set SPREADSHEET_ID below from your Sheet URL:
 *   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 */

// Common sheet ID: long string between /d/ and /edit
var SPREADSHEET_ID = "";

function getSpreadsheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss && SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  if (!ss) {
    throw new Error(
      "Open the Sheet → Extensions → Apps Script (bind script). Or set SPREADSHEET_ID for standalone."
    );
  }
  return ss;
}

function getLeadsSheet_() {
  var ss = getSpreadsheet_();
  var byName = ss.getSheetByName("Leads");
  return byName || ss.getSheets()[0];
}

/** If the sheet is completely empty, add header row once. */
function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() !== 0) {
    return;
  }
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
 * GET → quick health check (open /exec URL in browser).
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "Portfolio leads endpoint is running. Use POST from your site.",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST → body is JSON string (your app sends Content-Type: text/plain).
 */
function doPost(e) {
  try {
    if (!e || !e.postData || e.postData.contents === undefined || e.postData.contents === null) {
      throw new Error("Missing POST body");
    }

    var raw = e.postData.contents;
    var data = JSON.parse(raw);

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
