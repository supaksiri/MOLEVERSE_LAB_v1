/** MOLEVERSE LAB — Google Apps Script web-app endpoint.
 * Create a spreadsheet, open Extensions > Apps Script, paste this file.
 * Set SPREADSHEET_ID to the spreadsheet ID, then deploy as Web app.
 * Access: anyone with the link, because Github Pages is unauthenticated.
 * IMPORTANT: Treat untrusted submissions as unverified and do not store sensitive student data.
 */
const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'MoleverseResults';
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const raw = (e && e.parameter && e.parameter.payload) || '{}';
    if (raw.length > 3000) throw Error('Payload too large');
    const p = JSON.parse(raw);
    if (p.source !== 'MOLEVERSE_LAB') throw Error('Unknown source');
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) { sheet = ss.insertSheet(SHEET_NAME); sheet.appendRow(['ReceivedAt','Student','Type','Correct','Score','Detail','ClientTime']); sheet.setFrozenRows(1); }
    function safe(x,max=150) { const s=String(x==null?'':x).slice(0,max); return /^[=+\-@\t\r]/.test(s)?"'"+s:s; }
    const score = Number(p.score);
    sheet.appendRow([new Date(),safe(p.student,60),safe(p.type,40),p.correct===true,Number.isFinite(score)?Math.min(1000,Math.max(0,score)):0,safe(p.detail,300),safe(p.date,35)]);
    return ContentService.createTextOutput('OK');
  } catch(err) { return ContentService.createTextOutput('ERROR: '+err.message); }
  finally { lock.releaseLock(); }
}
function doGet() {return ContentService.createTextOutput('MOLEVERSE LAB endpoint is active');}
