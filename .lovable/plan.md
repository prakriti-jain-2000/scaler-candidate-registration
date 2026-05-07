
## Goal

1. Email the candidate their login credentials (email + password) automatically after a successful registration.
2. Verify the candidate's **college email** and **mobile number** via OTP **before** the application is submitted.

All email sending stays on the existing Apps Script backend (Gmail `MailApp`). SMS OTP uses **Twilio Verify** via a small serverless proxy.

---

## Part 1 — Credentials email (Apps Script / Gmail)

Inside `docs/apps-script.gs`, in the `register` action, right after the new candidate row is appended:

- Build an HTML email styled to match the success screen (Scaler branding, credentials card, "What's next" section, CTA button to the candidate dashboard).
- Send it with `MailApp.sendEmail({ to: collegeEmail, subject, htmlBody })`.
- Send to the **college email** (primary). Optionally CC the personal email.
- Wrap the send in a `try/catch` so a Gmail failure doesn't break registration — return an `emailSent: true/false` flag in the response.

Same email is re-sent on the `duplicate` path (so re-registering also re-delivers credentials), gated by a "resend" flag to avoid spamming on every duplicate hit — instead, always include the credentials in the duplicate response (already done) and only send mail on first registration.

No frontend change needed for this part beyond a small "We've also emailed these to you" line on the success screen.

> Note: Gmail/Apps Script free tier = ~100 emails/day. Fine for a campus drive; if volume grows we'd switch to Brevo/Resend later.

---

## Part 2 — OTP verification (before submit)

### 2a. Flow in `RegistrationForm.tsx`

Add a new step between "fill form" and "submit":

```
Fill form  →  [Verify Email + Phone]  →  Submit  →  Success screen
```

UI:
- After the user clicks **Submit Application**, instead of posting to Apps Script immediately, open a **Verification modal** with two sections:
  - **Email OTP** — shows masked college email, "Send code" button, 6-digit input, "Verify" button, 30s resend cooldown.
  - **Phone OTP** — shows masked mobile, same controls.
- The final **Submit Application** button inside the modal is enabled only when both `emailVerified` and `phoneVerified` are `true`.
- On success, the existing `submitApplication()` runs (post to Apps Script).

State additions: `emailOtpSent`, `emailVerified`, `phoneOtpSent`, `phoneVerified`, `emailCooldown`, `phoneCooldown`.

### 2b. Email OTP — Apps Script

Add three new actions to `docs/apps-script.gs`:

- `sendEmailOtp` → generate 6-digit code, store `{ email, code, expiresAt }` in a new `EmailOtps` sheet (or `CacheService` for 10 min), email it via `MailApp`.
- `verifyEmailOtp` → check code + not expired + not already used; mark used; return `{ status: 'success' }`.
- Cleanup: on verify success, delete the row.

Rate limit: max 5 sends per email per hour (count rows in the sheet within the last hour).

### 2c. Phone OTP — Twilio Verify

We **cannot call Twilio directly from the browser** (would expose the API key). Two options:

**Option A (recommended): Apps Script proxy**
- Add `sendPhoneOtp` and `verifyPhoneOtp` actions to `docs/apps-script.gs`.
- Apps Script calls Twilio Verify REST API using `UrlFetchApp` with the Account SID + Auth Token stored in Apps Script **Script Properties** (never in code, never in the frontend).
  - `POST https://verify.twilio.com/v2/Services/{VerifyServiceSid}/Verifications` with `To`, `Channel=sms`
  - `POST .../VerificationCheck` with `To`, `Code`
- Frontend calls Apps Script the same way it calls every other action.

**Option B: Lovable Cloud edge function + Twilio connector**
- More secure and rate-limit-friendly long-term, but requires enabling Lovable Cloud and wiring the Twilio connector. Bigger change to current Apps Script-only architecture.

Going with **Option A** to stay consistent with the current backend. User will need to:
1. Create a Twilio account, get **Account SID**, **Auth Token**, and create a **Verify Service** (gets a `VerifyServiceSid`).
2. In Apps Script: **Project Settings → Script properties** → add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SID`.
3. Redeploy the web app.

### 2d. Phone number formatting

`mobile` is currently free text. Before sending OTP we'll normalise to E.164:
- Strip spaces/dashes.
- If it starts with `+`, keep as-is.
- Else assume India (`+91`) and prepend.
- Validate: must match `^\+\d{10,15}$` before enabling "Send code".

### 2e. Security guards (Apps Script side)

- Verify codes expire in **10 minutes**.
- Max **5 attempts** per code, then invalidated.
- Max **3 OTP sends** per email/phone per **15 minutes** (basic abuse guard — Twilio Verify also enforces its own).
- All OTP state in sheets (`EmailOtps`, `PhoneOtps`) so it survives Apps Script restarts.

---

## Files that will change

- `docs/apps-script.gs` — add `sendEmailOtp`, `verifyEmailOtp`, `sendPhoneOtp`, `verifyPhoneOtp`, send credentials email on register success.
- `src/components/RegistrationForm.tsx` — verification modal, gating logic, phone number normalisation, calls to the new actions.
- (new) `src/components/VerificationModal.tsx` — extracted modal component for clarity.
- Small copy update on success screen ("We've also emailed your credentials to your college email").

## Manual steps the user will do once

1. Create Twilio account → grab Account SID, Auth Token, create Verify Service → SID.
2. In Apps Script → Project Settings → Script Properties → add the 3 Twilio keys.
3. **Redeploy** the Apps Script web app (new version).
4. (Recommended) In Twilio console: enable **SMS Pumping Protection** and lock **SMS Geo Permissions** to India only to prevent fraud.

## Out of scope (for now)

- Switching email transport away from Gmail (can move to Brevo/Resend later if volume exceeds 100/day).
- Storing OTP attempts in a real DB — sheet is fine at campus-drive volume.
- Dashboard login OTP — only registration form is OTP-gated.
