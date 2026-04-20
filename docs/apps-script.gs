/**
 * Scaler Campus Hiring — Google Apps Script backend
 *
 * Sheet: https://docs.google.com/spreadsheets/d/1BfQakI2i87vdQO5Jruka-Mq8os2gsVA2dQB59Bd6eEY
 *
 * DEPLOY:
 *   1. Open the sheet → Extensions → Apps Script
 *   2. Replace Code.gs with the contents of this file (DO NOT keep duplicate doPost/doGet)
 *   3. Deploy → Manage deployments → pencil → Version: New version → Deploy
 *   4. Keep the same /exec URL
 *
 * Tabs (auto-created with headers if missing): Candidates, Attempts, Verdicts
 * Colleges tab must be created manually with headers:
 *   id | name | city | driveDate | pocName | pocContact | status | applicationsReceived | notes | createdAt
 */

const SHEET_ID = '1BfQakI2i87vdQO5Jruka-Mq8os2gsVA2dQB59Bd6eEY';

// Folder in your Drive where uploaded resumes will be stored.
// First run will auto-create a folder named "Scaler Campus Resumes" at the root of My Drive.
const RESUME_FOLDER_NAME = 'Scaler Campus Resumes';

const CANDIDATE_HEADERS = [
  'Timestamp','Full Name','Personal Email','College Email','Mobile',
  'College','Degree','Specialisation','CGPA','Graduation Year',
  'Years of Experience','Has Sales Experience','Sales Experience Details',
  'Has Active Backlogs','Preferred Location','Available for Immediate Joining',
  'Resume Filename','Resume Link','Eligible','Stage','Dashboard Password'
];
const ATTEMPT_HEADERS = ['Timestamp','Email','Attempt Number'];
const VERDICT_HEADERS = ['Timestamp','Email','Stage','Verdict','Notes'];
const COLLEGES_SHEET_NAME = 'Colleges';
const CANDIDATES_SHEET_NAME = 'Candidates';

function _ss() { return SpreadsheetApp.openById(SHEET_ID); }
function _sheet(name, headers) {
  var ss = _ss();
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(headers);
  return sh;
}
function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
function _rows(sh) {
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  var headers = values[0];
  return values.slice(1).map(function(r){
    var o = {}; headers.forEach(function(h,i){ o[h] = r[i]; }); return o;
  });
}
function _genPassword() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var s = ''; for (var i=0;i<6;i++) s += chars.charAt(Math.floor(Math.random()*chars.length));
  return s;
}
function _isEligible(data) {
  return String(data.hasBacklogs).toLowerCase() === 'no';
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action || 'register';

    if (action === 'register') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      var rows = _rows(sh);
      var dup = rows.some(function(r){
        return String(r['Personal Email']).toLowerCase() === String(data.personalEmail).toLowerCase();
      });
      if (dup) return _json({ status: 'duplicate' });

      var eligible = _isEligible(data);
      var password = eligible ? _genPassword() : '';
      var stage = eligible ? 'Dashboard Unlocked' : 'Disqualified';
      var locs = (data.joiningLocations || []).join(', ');

      sh.appendRow([
        new Date(),
        data.fullName, data.personalEmail, data.collegeEmail, data.mobile,
        data.college, data.degree, data.specialisation, data.score, data.graduationYear,
        data.yearsExperience, data.hasSalesExp, data.salesExpDetails || '',
        data.hasBacklogs, locs, data.immediateJoining,
        data.resumeFileName, eligible ? 'Yes' : 'No', stage, password
      ]);
      return _json({ status: 'success', eligible: eligible, password: password });
    }

    if (action === 'logAttempt') {
      var sh = _sheet('Attempts', ATTEMPT_HEADERS);
      sh.appendRow([new Date(), data.email, data.attemptNumber]);
      return _json({ status: 'success' });
    }

    if (action === 'logVerdict') {
      var sh = _sheet('Verdicts', VERDICT_HEADERS);
      sh.appendRow([new Date(), data.email, data.stage, data.verdict, data.notes || '']);
      return _json({ status: 'success' });
    }

    if (action === 'updateStage') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      var values = sh.getDataRange().getValues();
      var headers = values[0];
      var emailCol = headers.indexOf('College Email');
      var stageCol = headers.indexOf('Stage');
      for (var i = 1; i < values.length; i++) {
        if (String(values[i][emailCol]).toLowerCase() === String(data.email).toLowerCase()) {
          sh.getRange(i + 1, stageCol + 1).setValue(data.stage);
          return _json({ status: 'success' });
        }
      }
      return _json({ status: 'error', message: 'Candidate not found' });
    }

    if (action === 'addCollege')    return _json(addCollege_(data));
    if (action === 'updateCollege') return _json(updateCollege_(data));
    if (action === 'deleteCollege') return _json(deleteCollege_(data));

    return _json({ status: 'error', message: 'Unknown action: ' + action });
  } catch (err) {
    return _json({ status: 'error', message: err.toString() });
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;

    if (action === 'login') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      var match = _rows(sh).find(function(r){
        return String(r['College Email']).toLowerCase() === String(e.parameter.email).toLowerCase()
            && String(r['Dashboard Password']) === String(e.parameter.password);
      });
      if (!match) return _json({ status: 'error', message: 'Invalid credentials' });
      return _json({ status: 'success', candidate: match });
    }

    if (action === 'getCandidate') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      var match = _rows(sh).find(function(r){
        return String(r['College Email']).toLowerCase() === String(e.parameter.email).toLowerCase();
      });
      if (!match) return _json({ status: 'error', message: 'Not found' });
      return _json({ status: 'success', candidate: match });
    }

    if (action === 'getAllCandidates') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      return _json({ status: 'success', candidates: _rows(sh) });
    }

    if (action === 'getAttempts') {
      var sh = _sheet('Attempts', ATTEMPT_HEADERS);
      var rows = _rows(sh).filter(function(r){
        return String(r['Email']).toLowerCase() === String(e.parameter.email).toLowerCase();
      });
      return _json({ status: 'success', count: rows.length, attempts: rows });
    }

    if (action === 'getPassword') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      var match = _rows(sh).find(function(r){
        return String(r['College Email']).toLowerCase() === String(e.parameter.email).toLowerCase();
      });
      if (!match) return _json({ status: 'error', message: 'No account found for this email' });
      return _json({ status: 'success', password: match['Dashboard Password'] });
    }

    if (action === 'getColleges') return _json(getColleges_());

    return _json({ status: 'error', message: 'Unknown action: ' + action });
  } catch (err) {
    return _json({ status: 'error', message: err.toString() });
  }
}

// ============================================================
// COLLEGES MODULE
// ============================================================

function getCollegesSheet_() {
  const sheet = _ss().getSheetByName(COLLEGES_SHEET_NAME);
  if (!sheet) throw new Error('Colleges sheet not found');
  return sheet;
}

function rowsToObjects_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1)
    .filter(row => row.some(cell => cell !== '' && cell !== null))
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });
}

function countApplicationsByCollege_(collegeName) {
  const sheet = _ss().getSheetByName(CANDIDATES_SHEET_NAME);
  if (!sheet) return 0;
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return 0;
  const headers = values[0];
  const collegeIdx = headers.indexOf('College');
  if (collegeIdx === -1) return 0;
  let count = 0;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][collegeIdx]).trim().toLowerCase() === String(collegeName).trim().toLowerCase()) {
      count++;
    }
  }
  return count;
}

function getColleges_() {
  const sheet = getCollegesSheet_();
  const colleges = rowsToObjects_(sheet).map(c => ({
    id: String(c.id || ''),
    name: String(c.name || ''),
    city: String(c.city || ''),
    driveDate: c.driveDate instanceof Date
      ? Utilities.formatDate(c.driveDate, Session.getScriptTimeZone(), 'yyyy-MM-dd')
      : String(c.driveDate || ''),
    pocName: String(c.pocName || ''),
    pocContact: String(c.pocContact || ''),
    status: String(c.status || 'Targeted'),
    applicationsReceived: countApplicationsByCollege_(c.name),
    notes: String(c.notes || ''),
  }));
  return { status: 'success', colleges: colleges };
}

function addCollege_(payload) {
  const sheet = getCollegesSheet_();
  const id = 'col_' + new Date().getTime();
  const createdAt = new Date().toISOString();
  sheet.appendRow([
    id, payload.name || '', payload.city || '', payload.driveDate || '',
    payload.pocName || '', payload.pocContact || '', payload.status || 'Targeted',
    0, payload.notes || '', createdAt,
  ]);
  return {
    status: 'success',
    college: {
      id: id, name: payload.name || '', city: payload.city || '',
      driveDate: payload.driveDate || '', pocName: payload.pocName || '',
      pocContact: payload.pocContact || '', status: payload.status || 'Targeted',
      applicationsReceived: 0, notes: payload.notes || '',
    },
  };
}

function updateCollege_(payload) {
  const sheet = getCollegesSheet_();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idIdx = headers.indexOf('id');
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idIdx]) === String(payload.id)) {
      ['name','city','driveDate','pocName','pocContact','status','notes'].forEach(field => {
        if (payload[field] !== undefined) {
          const colIdx = headers.indexOf(field);
          if (colIdx !== -1) sheet.getRange(i + 1, colIdx + 1).setValue(payload[field]);
        }
      });
      return { status: 'success' };
    }
  }
  return { status: 'error', message: 'College not found' };
}

function deleteCollege_(payload) {
  const sheet = getCollegesSheet_();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idIdx = headers.indexOf('id');
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idIdx]) === String(payload.id)) {
      sheet.deleteRow(i + 1);
      return { status: 'success' };
    }
  }
  return { status: 'error', message: 'College not found' };
}
