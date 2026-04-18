/**
 * Scaler Campus Hiring — Google Apps Script backend
 *
 * Sheet: https://docs.google.com/spreadsheets/d/1BfQakI2i87vdQO5Jruka-Mq8os2gsVA2dQB59Bd6eEY
 *
 * DEPLOY:
 *   1. Open the sheet → Extensions → Apps Script
 *   2. Replace Code.gs with the contents of this file
 *   3. Deploy → New deployment → Type: Web app
 *      Execute as: Me   |   Who has access: Anyone
 *   4. Authorise on first run
 *   5. Copy the /exec URL and paste it into:
 *        - Registration site:  src/components/RegistrationForm.tsx → APPS_SCRIPT_URL
 *        - Candidate dashboard: APPS_SCRIPT_URL constant
 *        - Ops dashboard:      APPS_SCRIPT_URL constant
 *
 * Tabs (auto-created with headers if missing): Candidates, Attempts, Verdicts
 */

const SHEET_ID = '1BfQakI2i87vdQO5Jruka-Mq8os2gsVA2dQB59Bd6eEY';

const CANDIDATE_HEADERS = [
  'Timestamp','Full Name','Personal Email','College Email','Mobile',
  'College','Degree','Specialisation','CGPA','Graduation Year',
  'Years of Experience','Has Sales Experience','Sales Experience Details',
  'Has Active Backlogs','Preferred Location','Available for Immediate Joining',
  'Resume Filename','Eligible','Stage','Dashboard Password'
];
const ATTEMPT_HEADERS  = ['Timestamp','Email','Attempt Number'];
const VERDICT_HEADERS  = ['Timestamp','Email','Stage','Verdict','Notes'];

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
  // Only validation: candidate must have NO active backlogs.
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
      var rows = _rows(sh);
      var match = rows.find(function(r){
        return String(r['College Email']).toLowerCase() === String(e.parameter.email).toLowerCase()
            && String(r['Dashboard Password']) === String(e.parameter.password);
      });
      if (!match) return _json({ status: 'error', message: 'Invalid credentials' });
      return _json({ status: 'success', candidate: match });
    }

    if (action === 'getCandidate') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      var rows = _rows(sh);
      var match = rows.find(function(r){
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
      var rows = _rows(sh);
      var match = rows.find(function(r){
        return String(r['College Email']).toLowerCase() === String(e.parameter.email).toLowerCase();
      });
      if (!match) return _json({ status: 'error', message: 'No account found for this email' });
      return _json({ status: 'success', password: match['Dashboard Password'] });
    }

    return _json({ status: 'error', message: 'Unknown action: ' + action });
  } catch (err) {
    return _json({ status: 'error', message: err.toString() });
  }
}
