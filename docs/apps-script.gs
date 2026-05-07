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
  'College','Degree','Specialisation','Percentage','Graduation Year',
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

// Returns the (auto-created if needed) Drive folder used to store uploaded resumes.
function _resumeFolder() {
  var folders = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(RESUME_FOLDER_NAME);
}

// Saves a base64-encoded PDF to Drive and returns a publicly viewable URL, or '' if no payload.
function _uploadResume(base64, fileName, mimeType, candidateName) {
  if (!base64) return '';
  try {
    var bytes = Utilities.base64Decode(base64);
    var safeName = (candidateName || 'candidate').replace(/[^\w\-]+/g, '_');
    var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
    var finalName = safeName + '_' + stamp + '_' + (fileName || 'resume.pdf');
    var blob = Utilities.newBlob(bytes, mimeType || 'application/pdf', finalName);
    var file = _resumeFolder().createFile(blob);
    // Anyone with the link can view (so ops dashboard / sheet click-through works without sharing manually).
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    return 'UPLOAD_FAILED: ' + err.toString();
  }
}

// ============================================================
// CREDENTIALS EMAIL
// ============================================================
function _sendCredentialsEmail(toEmail, ccEmail, fullName, password) {
  if (!toEmail || !password) return false;
  try {
    var firstName = String(fullName || '').split(' ')[0] || 'there';
  var subject = "Scaler Candidate Dashboard credentials";
    var loginUrl = 'https://candidate-dashboard-campus.lovable.app/login';
    var html = ''
      + '<div style="font-family:Arial,sans-serif;background:#f7f7f8;padding:24px;color:#111">'
      + '<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #eee">'
      + '<div style="padding:28px 28px 8px"><h1 style="margin:0;font-size:24px;color:#111">Hello ' + firstName + ',</h1>'
      + '<p style="color:#555;font-size:14px;line-height:1.55;margin:10px 0 0">Your application has been received and your candidate profile is ready. Here are your login credentials:</p></div>'
      + '<div style="margin:18px 28px;padding:16px 18px;background:#fff7ef;border:1px solid #ffd9b8;border-radius:12px">'
      + '<p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7a5535">Your dashboard credentials</p>'
      + '<p style="margin:0;font-size:14px;color:#111"><strong>Email:</strong> <span style="font-family:monospace">' + toEmail + '</span></p>'
      + '<p style="margin:4px 0 0;font-size:14px;color:#111"><strong>Password:</strong> <span style="font-family:monospace;color:#1e62e6;font-weight:700">' + password + '</span></p>'
      + '<p style="margin:10px 0 0;font-size:12px;color:#7a5535">Please save these — you\'ll need them to access your dashboard.</p>'
      + '</div>'
      + '<div style="margin:0 28px;padding:16px 18px;background:#fafafa;border:1px solid #eee;border-radius:12px">'
      + '<h3 style="margin:0 0 6px;font-size:16px;color:#111">What\'s next?</h3>'
      + '<p style="margin:0 0 8px;font-size:13px;color:#555;line-height:1.55">You\'ve completed <strong>Step 1 of 5 — Application</strong>.</p>'
      + '<p style="margin:0;font-size:13px;color:#555;line-height:1.55">Log in to your Candidate Dashboard to unlock <strong>Step 2 — Dashboard Access</strong>, where you\'ll find your training material and the AI assessment. Completing the assessment is what moves your application forward.</p>'
      + '</div>'
      + '<div style="text-align:center;padding:24px 28px 32px">'
      + '<a href="' + loginUrl + '" style="display:inline-block;background:#1e62e6;color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px">Login to Candidate Dashboard →</a>'
      + '</div>'
      + '<div style="padding:12px 28px 24px;border-top:1px solid #eee;color:#999;font-size:11px;text-align:center">Scaler Campus Hiring · Please do not reply to this email</div>'
      + '</div></div>';
    var opts = { htmlBody: html, name: 'Scaler Campus Hiring' };
    if (ccEmail && ccEmail !== toEmail) opts.cc = ccEmail;
    MailApp.sendEmail(toEmail, subject, 'Your dashboard password is: ' + password + '. Login: ' + loginUrl, opts);
    return true;
  } catch (err) {
    return false;
  }
}

// ============================================================
// OTP HELPERS (Email + Phone)
// ============================================================
function _otpCode() {
  var n = Math.floor(100000 + Math.random() * 900000);
  return String(n);
}
function _cache() { return CacheService.getScriptCache(); }
function _otpKey(kind, target) {
  return 'otp_' + kind + '_' + String(target).toLowerCase().replace(/[^a-z0-9+@.]/g, '');
}
function _otpRateKey(kind, target) { return _otpKey(kind, target) + '_rate'; }

// Returns { allowed, remainingMs }
function _checkOtpRate(kind, target) {
  var key = _otpRateKey(kind, target);
  var raw = _cache().get(key);
  var now = Date.now();
  var arr = raw ? JSON.parse(raw) : [];
  arr = arr.filter(function(t){ return now - t < 15 * 60 * 1000; });
  if (arr.length >= 3) {
    return { allowed: false, message: 'Too many attempts. Please wait a few minutes and try again.' };
  }
  arr.push(now);
  _cache().put(key, JSON.stringify(arr), 900); // 15 min
  return { allowed: true };
}

function _sendOtpEmail(toEmail, code) {
  var subject = 'Your Scaler verification code: ' + code;
  var html = '<div style="font-family:Arial,sans-serif;padding:24px;color:#111">'
    + '<h2 style="margin:0 0 12px">Verify your email</h2>'
    + '<p style="color:#555;font-size:14px">Use this code to verify your email address:</p>'
    + '<p style="font-size:32px;font-weight:700;letter-spacing:6px;color:#1e62e6;margin:16px 0">' + code + '</p>'
    + '<p style="color:#888;font-size:12px">This code expires in 10 minutes. If you didn\'t request it, ignore this email.</p>'
    + '</div>';
  MailApp.sendEmail(toEmail, subject, 'Your verification code is: ' + code + ' (valid for 10 minutes).', { htmlBody: html, name: 'Scaler Campus Hiring' });
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action || 'register';

    // ----- OTP: send email code -----
    if (action === 'sendEmailOtp') {
      var email = String(data.email || '').trim();
      if (!email || email.indexOf('@') === -1) return _json({ status: 'error', message: 'Invalid email' });
      var rate = _checkOtpRate('email', email);
      if (!rate.allowed) return _json({ status: 'error', message: rate.message });
      var code = _otpCode();
      _cache().put(_otpKey('email', email), code, 600); // 10 min
      try { _sendOtpEmail(email, code); }
      catch (err) { return _json({ status: 'error', message: 'Could not send email: ' + err.toString() }); }
      return _json({ status: 'success' });
    }

    // ----- OTP: verify email code -----
    if (action === 'verifyEmailOtp') {
      var email = String(data.email || '').trim();
      var otp = String(data.otp || '').trim();
      var key = _otpKey('email', email);
      var stored = _cache().get(key);
      if (!stored) return _json({ status: 'error', message: 'Code expired. Please request a new one.' });
      if (stored !== otp) return _json({ status: 'error', message: 'Invalid code.' });
      _cache().remove(key);
      // Mark verified for 30 min so register can trust it (optional)
      _cache().put('verified_email_' + email.toLowerCase(), '1', 1800);
      return _json({ status: 'success' });
    }

    if (action === 'register') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      var rows = _rows(sh);
      var dupRow = null;
      var personalEmailLc = String(data.personalEmail || '').trim().toLowerCase();
      var collegeEmailLc = String(data.collegeEmail || '').trim().toLowerCase();
      for (var i = 0; i < rows.length; i++) {
        var rowPersonalLc = String(rows[i]['Personal Email'] || '').trim().toLowerCase();
        var rowCollegeLc = String(rows[i]['College Email'] || '').trim().toLowerCase();
        if (rowPersonalLc === personalEmailLc || rowCollegeLc === collegeEmailLc) {
          dupRow = rows[i];
          break;
        }
      }
      if (dupRow) {
        var dupEmailSent = false;
        if (dupRow['Dashboard Password']) {
          dupEmailSent = _sendCredentialsEmail(
            dupRow['College Email'], dupRow['Personal Email'], dupRow['Full Name'], dupRow['Dashboard Password']
          );
        }
        return _json({
          status: 'duplicate',
          eligible: String(dupRow['Eligible']) === 'Yes',
          collegeEmail: dupRow['College Email'] || '',
          password: dupRow['Dashboard Password'] || '',
          emailSent: dupEmailSent
        });
      }

      var eligible = _isEligible(data);
      var password = eligible ? _genPassword() : '';
      var stage = eligible ? 'Dashboard Unlocked' : 'Disqualified';
      var locs = (data.joiningLocations || []).join(', ');

      var resumeUrl = _uploadResume(
        data.resumeBase64, data.resumeFileName, data.resumeMimeType, data.fullName
      );

      sh.appendRow([
        new Date(),
        data.fullName, data.personalEmail, data.collegeEmail, data.mobile,
        data.college, data.degree, data.specialisation, data.score, data.graduationYear,
        data.yearsExperience, data.hasSalesExp, data.salesExpDetails || '',
        data.hasBacklogs, locs, data.immediateJoining,
        data.resumeFileName, resumeUrl, eligible ? 'Yes' : 'No', stage, password
      ]);

      var emailSent = false;
      if (eligible && password) {
        emailSent = _sendCredentialsEmail(data.collegeEmail, data.personalEmail, data.fullName, password);
      }
      return _json({ status: 'success', eligible: eligible, password: password, resumeUrl: resumeUrl, emailSent: emailSent });
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
