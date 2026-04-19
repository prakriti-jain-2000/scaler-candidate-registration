# Copy-paste prompt → candidate-dashboard-campus

Paste this into the chat of your **candidate-dashboard-campus** Lovable project.

---

Build a complete login + dashboard flow that reads/writes to a Google Apps Script web app backed by a Google Sheet. **Do not use Lovable Cloud — use only `fetch` calls to the Apps Script URL.**

## Setup constant

At the top of any file that calls the backend, declare:

```ts
// Same Apps Script web-app URL used by the registration site and ops dashboard
export const APPS_SCRIPT_URL = "PASTE_DEPLOYED_URL_HERE";
```

## Part 1 — `/login` route

Build a page at `/login` with:

- College email input
- Password input with show/hide eye toggle
- "Login" submit button (loading spinner while in flight, disabled to prevent double submit)
- "Forgot password?" link below button

On submit, GET `${APPS_SCRIPT_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`.

- `status === 'success'` → save `json.candidate` to `localStorage` under key `candidateData` and redirect to `/`
- `status === 'error'` → show "Invalid email or password" below the button
- network failure → toast "Something went wrong. Please try again."

## Part 2 — Forgot password

Clicking "Forgot password?" toggles to a single-email-input view. On submit, GET `${APPS_SCRIPT_URL}?action=getPassword&email=${encodeURIComponent(email)}`. On success, show the message: "Your password has been sent to your registered college email." (Email service is not yet wired — for now, simply display this confirmation message; do NOT show the actual password on screen.)

## Part 3 — Dashboard home

On load, read `candidateData` from localStorage. If absent, redirect to `/login`.

Render at the top:

- Candidate's full name (large)
- College name (muted)
- A pill showing `Stage` (color-coded: Dashboard Unlocked = blue, Assessment In Progress = orange, Interview — BDM/AVP = purple, Offer Rolled = green, Rejected = red)

5-step progress indicator with steps: **Apply → Dashboard → AI Assessment → Interview → Offer**. Active step derived from `Stage`:

- `Dashboard Unlocked` → step 2
- `Assessment In Progress` → step 3
- `Interview — BDM` or `Interview — AVP` → step 4
- `Offer Rolled` → step 5
- `Rejected` → render a separate rejected state UI (no progress bar)

Top-right "Logout" button → clears `localStorage` and redirects to `/login`.

## Part 4 — Training & Mimic Assessment section

Three training cards: **About Scaler**, **The BDA Role**, **How to Pitch**. Each card has:

- "Open" button (opens content in a modal/drawer with placeholder copy)
- "Mark as Read" toggle button (persists per-card read state in localStorage under key `trainingRead`, e.g. `{ aboutScaler: true, bdaRole: false, howToPitch: false }`)

Below the cards: **Mimic Assessment** button.

- Disabled until all 3 cards are marked read.
- Once unlocked: clicking it first POSTs to `APPS_SCRIPT_URL` with body `{ action: 'logAttempt', email: candidateData['College Email'], attemptNumber: currentAttemptCount + 1 }` (use `Content-Type: text/plain;charset=utf-8` to bypass CORS preflight), then opens `https://www.toughtongueai.com/` in a new tab.

Below the button render an attempt tracker: 4 circles, filled (primary color) for used attempts, empty (border only) for remaining.

On dashboard mount, GET `${APPS_SCRIPT_URL}?action=getAttempts&email=${encodeURIComponent(candidateData['College Email'])}` to fetch `count`. Use that to drive the tracker and to disable the Mimic button when `count >= 4`. When fully used, replace the button with the message: **"You've used all 4 attempts. Our team will review your sessions and get back to you within 3 working days."**

## Notes

- The Apps Script handles all 5 GET actions (`login`, `getCandidate`, `getAllCandidates`, `getAttempts`, `getPassword`) and 4 POST actions (`register`, `logAttempt`, `logVerdict`, `updateStage`). Don't change the script.
- For all POST requests use `Content-Type: text/plain;charset=utf-8` — Apps Script web apps reject CORS preflight, so JSON content-type breaks browser POSTs.
- Style: dark mode, Scaler orange accent (#E8470A), DM Sans, semantic Tailwind tokens.

  PASTE_DEPLOYED_URL_HERE is https://script.google.com/macros/s/AKfycbxZg3tGvxjq3oRZ29MrfY4UuS7tmwRWlRveFMQNTY3a-aasn3Wr7RavhRCCwyU_9GcP/exec
