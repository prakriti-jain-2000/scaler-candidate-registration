# Copy-paste prompt → scaler-ops-campus

Paste this into the chat of your **scaler-ops-campus** Lovable project.

---

Wire the ops dashboard to read live candidate data from a Google Apps Script web app backed by the campus hiring Google Sheet. **Do not use Lovable Cloud — only `fetch` to the Apps Script URL.**

## Setup constant

```ts
export const APPS_SCRIPT_URL = "PASTE_DEPLOYED_URL_HERE";
```

(Same URL used by the registration site and candidate dashboard.)

## Data load

On dashboard mount, GET `${APPS_SCRIPT_URL}?action=getAllCandidates`. Response shape:

```json
{
  "status": "success",
  "candidates": [
    {
      "Timestamp": "...", "Full Name": "...", "Personal Email": "...",
      "College Email": "...", "Mobile": "...", "College": "...",
      "Degree": "...", "Specialisation": "...", "CGPA": "...",
      "Graduation Year": "...", "Years of Experience": "...",
      "Has Sales Experience": "...", "Sales Experience Details": "...",
      "Has Active Backlogs": "...", "Preferred Location": "...",
      "Available for Immediate Joining": "...", "Resume Filename": "...",
      "Eligible": "Yes" | "No",
      "Stage": "Dashboard Unlocked" | "Assessment In Progress" | "Interview — BDM" | "Interview — AVP" | "Offer Rolled" | "Rejected" | "Disqualified",
      "Dashboard Password": "..."
    }
  ]
}
```

For each candidate, also GET `${APPS_SCRIPT_URL}?action=getAttempts&email=${collegeEmail}` to compute `Attempts Used` (returns `{ count }`). Run these in parallel with `Promise.all`.

## Pipeline table columns

- Name (`Full Name`)
- College
- Stage (color-coded pill — same palette as candidate dashboard)
- Eligible (Yes/No badge)
- Attempts Used (e.g. `2 / 4`)
- Applied Date (formatted from `Timestamp`)

## Filters (all wired against the loaded data, no API refetch)

- Stage: dropdown of all distinct stage values
- College: dropdown of all distinct colleges
- Eligible: Yes / No / All
- Attempts: 0, 1, 2, 3, 4

## Summary metric cards (4, top of page)

Computed live from the loaded array:

1. **Total Applications** → `candidates.length`
2. **Eligible** → `candidates.filter(c => c.Eligible === 'Yes').length`
3. **Cleared Assessment** → `candidates.filter(c => attemptCount[c['College Email']] >= 4).length` (proxy: used all attempts; refine later when verdicts are tracked)
4. **Offers Rolled** → `candidates.filter(c => c.Stage === 'Offer Rolled').length`

## Row click → side drawer

Clicking a row opens a right-side drawer (use shadcn `Sheet` or `Drawer`) showing the full candidate profile: every field from the row, organised into Personal / Academic / Professional / Eligibility / Resume sections. Include a "Stage" dropdown in the drawer that, on change, POSTs to `APPS_SCRIPT_URL` with `{ action: 'updateStage', email: collegeEmail, stage: newStage }` (use `Content-Type: text/plain;charset=utf-8`). On success, optimistically update the row in local state.

## Notes

- For all POST requests use `Content-Type: text/plain;charset=utf-8` to bypass Apps Script's CORS preflight rejection.
- Add a "Refresh" button that re-runs `getAllCandidates` + attempt fetches.
- Style: light or dark — your call — but keep Scaler orange (#E8470A) as the accent and use semantic Tailwind tokens.
  PASTE_DEPLOYED_URL_HERE is https://script.google.com/macros/s/AKfycbxZg3tGvxjq3oRZ29MrfY4UuS7tmwRWlRveFMQNTY3a-aasn3Wr7RavhRCCwyU_9GcP/exec
