

## Root cause
`RegistrationForm.tsx` line 197-202 short-circuits submission when `hasBacklogs === "Yes"` — it sets the rejection screen and **returns before calling `fetch`**. So Apps Script never sees these leads. This contradicts your "record all leads" requirement and explains zero `doPost` executions for rejected candidates.

For eligible candidates who also see no row, the cause is different: stale Apps Script deployment URL (the `/exec` URL changes if you create a new deployment instead of a new version of the existing one).

## Fix plan

### 1. Frontend: stop client-side rejection (`src/components/RegistrationForm.tsx`)
- Remove the `if (formData.hasBacklogs === "Yes") { setRejected(true); return; }` block in `handleNext` (step 4 → 5).
- Always advance to step 5 (resume upload) and always submit to Apps Script.
- Apps Script already returns `{ eligible: false }` for backlog candidates → the existing `if (!json.eligible) setRejected(true)` branch will show the rejection screen *after* the row is written.

### 2. Frontend: surface real errors instead of generic toast
- In the `catch` block, show the actual error message (`e.message`) in the toast so next time we can see HTTP/network failures immediately.
- Add `console.log` for the raw response text before `res.json()` so we can detect HTML error pages (auth failures from Apps Script return HTML, not JSON, which crashes `.json()` silently).

### 3. Verify Apps Script deployment is live
After the code fix, you must confirm the URL works. Open in browser:
```
https://script.google.com/macros/s/AKfycbxZg3tGvxjq3oRZ29MrfY4UuS7tmwRWlRveFMQNTY3a-aasn3Wr7RavhRCCwyU_9GcP/exec?action=getAllCandidates
```
- **JSON response** → URL is live, code fix alone solves the problem.
- **Google login page / "Authorization required"** → deployment access is not "Anyone". Re-deploy with correct access.
- **404** → URL is stale. Redeploy and paste the new `/exec` URL into `APPS_SCRIPT_URL`.

### 4. After redeploy reminder
Any time `docs/apps-script.gs` changes, in Apps Script editor go to **Deploy → Manage deployments → pencil icon → Version: New version → Deploy**. Do NOT click "New deployment" (that creates a new URL).

## Files to change
- `src/components/RegistrationForm.tsx` — remove client-side backlog rejection in `handleNext`, improve error logging in `handleSubmit`.

No other files need changes. The Apps Script (`docs/apps-script.gs`) is already correct from the previous edit.

