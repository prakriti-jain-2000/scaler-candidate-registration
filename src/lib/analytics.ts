const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxZg3tGvxjq3oRZ29MrfY4UuS7tmwRWlRveFMQNTY3a-aasn3Wr7RavhRCCwyU_9GcP/exec";

const SESSION_KEY = "scaler_funnel_session_id";
const SOURCE = "landing";

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "no-session";
  }
}

export interface TrackOptions {
  email?: string | null;
  props?: Record<string, unknown>;
}

export function track(event: string, opts: TrackOptions = {}): void {
  const payload = {
    action: "logEvent",
    event,
    email: opts.email ?? null,
    source: SOURCE,
    sessionId: getSessionId(),
    url: typeof window !== "undefined" ? window.location.href : "",
    timestamp: new Date().toISOString(),
    props: opts.props ?? {},
  };
  try {
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
