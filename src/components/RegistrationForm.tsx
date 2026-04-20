import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";

/**
 * ============================================================
 * SETUP REQUIRED — Google Sheets integration via Apps Script
 * ============================================================
 * 1. Open the target Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1BfQakI2i87vdQO5Jruka-Mq8os2gsVA2dQB59Bd6eEY/edit
 * 2. Extensions → Apps Script → paste the FULL script from the
 *    comment block at the BOTTOM of this file.
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployment URL and paste it below in APPS_SCRIPT_URL.
 * 5. Re-deploy after any script change (or use "Manage deployments").
 * ------------------------------------------------------------
 */
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxZg3tGvxjq3oRZ29MrfY4UuS7tmwRWlRveFMQNTY3a-aasn3Wr7RavhRCCwyU_9GcP/exec";

interface FormData {
  // Step 1
  fullName: string;
  personalEmail: string;
  collegeEmail: string;
  mobile: string;
  // Step 2
  college: string;
  degree: string;
  specialisation: string;
  scoreType: "CGPA" | "Percentage";
  score: string;
  graduationYear: string;
  // Step 3
  yearsExperience: string;
  hasSalesExp: string;
  salesExpDetails: string;
  // Step 4
  hasBacklogs: string;
  joiningLocations: string[];
  immediateJoining: string;
  // Step 5
  resumeFileName: string;
  resumeBase64: string; // not persisted to localStorage (stripped on save)
  resumeMimeType: string;
}

const initialFormData: FormData = {
  fullName: "",
  personalEmail: "",
  collegeEmail: "",
  mobile: "",
  college: "",
  degree: "",
  specialisation: "",
  scoreType: "CGPA",
  score: "",
  graduationYear: "",
  yearsExperience: "",
  hasSalesExp: "",
  salesExpDetails: "",
  hasBacklogs: "",
  joiningLocations: [],
  immediateJoining: "",
  resumeFileName: "",
};

const STORAGE_KEY = "scaler_registration_form_v2";

// Validation schemas per step
const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
const mobileRegex = /^[6-9]\d{9}$/;

const step1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(80, "Name too long")
    .regex(nameRegex, "Enter at least 2 words; letters only, no numbers or symbols"),
  personalEmail: z.string().trim().email("Invalid personal email").max(255),
  collegeEmail: z.string().trim().email("Invalid college email").max(255),
  mobile: z.string().regex(mobileRegex, "Enter a valid 10-digit Indian mobile number"),
});

const step2Schema = z
  .object({
    college: z.string().trim().min(2, "College name is required").max(120),
    degree: z.string().min(1, "Select a degree"),
    specialisation: z.string().trim().min(2, "Specialisation is required").max(80),
    scoreType: z.enum(["CGPA", "Percentage"]),
    score: z.string().min(1, "Score is required"),
    graduationYear: z.string().min(1, "Select graduation year"),
  })
  .superRefine((data, ctx) => {
    const n = Number(data.score);
    if (Number.isNaN(n)) {
      ctx.addIssue({ code: "custom", path: ["score"], message: "Must be a number" });
      return;
    }
    if (data.scoreType === "CGPA" && (n < 0 || n > 10)) {
      ctx.addIssue({ code: "custom", path: ["score"], message: "CGPA must be between 0 and 10" });
    }
    if (data.scoreType === "Percentage" && (n < 0 || n > 100)) {
      ctx.addIssue({ code: "custom", path: ["score"], message: "Percentage must be between 0 and 100" });
    }
  });

const step3Schema = z.object({
  yearsExperience: z.string().min(1, "Select your experience"),
  hasSalesExp: z.enum(["Yes", "No"], { message: "Required" }),
  salesExpDetails: z.string().max(200, "Max 200 characters").optional(),
});

const step4Schema = z.object({
  hasBacklogs: z.enum(["Yes", "No"], { message: "Required" }),
  joiningLocations: z.array(z.string()).min(1, "Select at least one location"),
  immediateJoining: z.enum(["Yes", "No"], { message: "Required" }),
});

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...initialFormData, ...JSON.parse(saved) } : initialFormData;
    } catch {
      return initialFormData;
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [submitEligible, setSubmitEligible] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const update = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field as string]) return prev;
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  }, []);

  const toggleLocation = (loc: string) => {
    setFormData((prev) => {
      const has = prev.joiningLocations.includes(loc);
      return {
        ...prev,
        joiningLocations: has ? prev.joiningLocations.filter((l) => l !== loc) : [...prev.joiningLocations, loc],
      };
    });
    setErrors((prev) => {
      if (!prev.joiningLocations) return prev;
      const next = { ...prev };
      delete next.joiningLocations;
      return next;
    });
  };

  const validateStep = (s: number): boolean => {
    let result;
    if (s === 1) result = step1Schema.safeParse(formData);
    else if (s === 2) result = step2Schema.safeParse(formData);
    else if (s === 3)
      result = step3Schema.safeParse({
        yearsExperience: formData.yearsExperience,
        hasSalesExp: formData.hasSalesExp,
        salesExpDetails: formData.salesExpDetails,
      });
    else if (s === 4) result = step4Schema.safeParse(formData);
    else return true;

    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const key = i.path[0] as string;
        if (!errs[key]) errs[key] = i.message;
      });
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = (s: number) => {
    if (!validateStep(s)) return;
    // Always advance — eligibility is decided server-side after submit so every lead is recorded.
    setStep(s + 1);
  };

  const handleSubmit = async () => {
    if (!formData.resumeFileName) {
      setErrors({ resumeFileName: "Resume is required" });
      return;
    }
    if ((APPS_SCRIPT_URL as string) === "PASTE_DEPLOYED_URL_HERE") {
      toast.error("Setup incomplete: deploy Apps Script and set APPS_SCRIPT_URL.");
      return;
    }
    setLoading(true);
    try {
      // Apps Script web apps don't honour preflight; use text/plain to bypass CORS preflight.
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "register",
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });
      const rawText = await res.text();
      console.log("Apps Script raw response:", rawText);

      let json: { status?: string; eligible?: boolean; password?: string; message?: string };
      try {
        json = JSON.parse(rawText);
      } catch {
        throw new Error(
          `Apps Script returned non-JSON (HTTP ${res.status}). Likely the deployment URL is stale or access isn't set to "Anyone". First 120 chars: ${rawText.slice(0, 120)}`
        );
      }

      if (json.status === "duplicate") {
        setErrors({ personalEmail: "This email has already been used to apply." });
        setStep(1);
        setLoading(false);
        return;
      }

      if (json.status !== "success") {
        throw new Error(json.message || "Unknown error from Apps Script");
      }

      setSubmitEligible(!!json.eligible);
      setGeneratedPassword(json.password || "");

      if (!json.eligible) {
        setRejected(true);
      } else {
        setSubmitted(true);
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Submission error:", e);
      toast.error(msg, { duration: 10000 });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3.5 rounded-xl bg-input border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";
  const errorInputClasses = "border-destructive focus:ring-destructive/40 focus:border-destructive";
  const labelClasses = "block text-sm font-medium text-foreground/70 mb-1.5";
  const errorTextClasses = "text-destructive text-xs mt-1.5";

  const FieldError = ({ name }: { name: string }) =>
    errors[name] ? <p className={errorTextClasses}>{errors[name]}</p> : null;

  const ToggleButton = ({
    value,
    selected,
    onSelect,
  }: {
    value: string;
    selected: string;
    onSelect: (v: string) => void;
  }) => (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
        selected === value
          ? "bg-primary text-primary-foreground"
          : "card-surface text-foreground hover:border-primary/50"
      }`}
    >
      {value}
    </button>
  );

  const YesNoCard = ({ question, field }: { question: string; field: keyof FormData }) => (
    <div>
      <div className="card-surface rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-foreground">{question}</p>
        <div className="flex gap-2 shrink-0">
          {["Yes", "No"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => update(field, v as never)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                formData[field] === v
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <FieldError name={field as string} />
    </div>
  );

  if (submitted) {
    return (
      <section id="apply" className="py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
            <svg className="w-24 h-24 mx-auto mb-8" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--scaler-orange))"
                strokeWidth="3"
                opacity="0.2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--scaler-orange))"
                strokeWidth="3"
                strokeDasharray="283"
                strokeDashoffset="0"
                style={{ animation: "draw-check 0.8s ease-out forwards" }}
              />
              <path
                d="M30 52 L45 67 L72 35"
                fill="none"
                stroke="hsl(var(--scaler-orange))"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw-check"
              />
            </svg>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">You're shortlisted!</h2>
          <p className="text-muted-foreground mb-6">
            Your login credentials have been sent to your college email. Use them to access your candidate dashboard.
          </p>

          {generatedPassword && (
            <div className="card-surface rounded-xl p-5 mb-8 text-left max-w-md mx-auto">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Your dashboard credentials</p>
              <div className="space-y-1.5 text-sm">
                <p className="text-foreground">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-mono">{formData.collegeEmail}</span>
                </p>
                <p className="text-foreground">
                  <span className="text-muted-foreground">Password:</span>{" "}
                  <span className="font-mono font-bold text-primary">{generatedPassword}</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Save this password — you'll need it to log in.</p>
            </div>
          )}

          <a
            href="https://candidate-dashboard-campus.lovable.app/login"
            className="inline-block px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold mb-10 glow-orange-hover transition-all"
          >
            Open candidate dashboard →
          </a>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["Apply", "Dashboard", "AI Assessment", "Interview", "Offer"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i === 0 ? "✓" : i + 1}
                </div>
                <span className="text-xs text-muted-foreground hidden sm:inline">{s}</span>
                {i < 4 && <div className="w-4 h-0.5 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Top-level disqualification screen (triggered by backend eligibility check OR backlogs gate after submit attempt)
  if (rejected && step === 5) {
    return (
      <section id="apply" className="py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-surface rounded-2xl p-8 border-l-4 border-l-primary text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">Thanks for applying.</h2>
            <p className="text-muted-foreground">
              Based on your responses, this role isn't the right fit at the moment. We'll keep your profile on file for
              future openings that match your background.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const TOTAL_STEPS = 5;

  return (
    <section id="apply" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Start your application</h2>
          <p className="text-muted-foreground">Takes under 3 minutes. Saved automatically as you go.</p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {Math.min(step, TOTAL_STEPS)} of {TOTAL_STEPS}
            </span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${(Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 — Personal Details */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <label className={labelClasses}>Full name</label>
                <input
                  className={`${inputClasses} ${errors.fullName ? errorInputClasses : ""}`}
                  value={formData.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                />
                <FieldError name="fullName" />
              </div>
              <div>
                <label className={labelClasses}>Personal email</label>
                <input
                  className={`${inputClasses} ${errors.personalEmail ? errorInputClasses : ""}`}
                  type="email"
                  value={formData.personalEmail}
                  onChange={(e) => update("personalEmail", e.target.value)}
                  placeholder="you@gmail.com"
                />
                <FieldError name="personalEmail" />
              </div>
              <div>
                <label className={labelClasses}>
                  College email{" "}
                  <span className="text-muted-foreground font-normal">(used as login post-shortlisting)</span>
                </label>
                <input
                  className={`${inputClasses} ${errors.collegeEmail ? errorInputClasses : ""}`}
                  type="email"
                  value={formData.collegeEmail}
                  onChange={(e) => update("collegeEmail", e.target.value)}
                  placeholder="you@college.edu"
                />
                <FieldError name="collegeEmail" />
              </div>
              <div>
                <label className={labelClasses}>Mobile number</label>
                <input
                  className={`${inputClasses} ${errors.mobile ? errorInputClasses : ""}`}
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                />
                <FieldError name="mobile" />
              </div>
              <button
                onClick={() => handleNext(1)}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base glow-orange-hover transition-all"
              >
                Continue →
              </button>
            </motion.div>
          )}

          {/* Step 2 — Academic Details */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <label className={labelClasses}>College name</label>
                <input
                  className={`${inputClasses} ${errors.college ? errorInputClasses : ""}`}
                  value={formData.college}
                  onChange={(e) => update("college", e.target.value)}
                  placeholder="Your college or university"
                />
                <FieldError name="college" />
              </div>
              <div>
                <label className={labelClasses}>Degree</label>
                <select
                  className={`${inputClasses} ${errors.degree ? errorInputClasses : ""}`}
                  value={formData.degree}
                  onChange={(e) => update("degree", e.target.value)}
                >
                  <option value="">Select degree</option>
                  {["BBA", "MBA", "B.Tech", "B.Com", "Other"].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <FieldError name="degree" />
              </div>
              <div>
                <label className={labelClasses}>Specialisation</label>
                <input
                  className={`${inputClasses} ${errors.specialisation ? errorInputClasses : ""}`}
                  value={formData.specialisation}
                  onChange={(e) => update("specialisation", e.target.value)}
                  placeholder="e.g. Marketing, Finance, Computer Science"
                />
                <FieldError name="specialisation" />
              </div>
              <div>
                <label className={labelClasses}>Current score</label>
                <div className="flex gap-3 mb-3">
                  {(["CGPA", "Percentage"] as const).map((t) => (
                    <ToggleButton
                      key={t}
                      value={t}
                      selected={formData.scoreType}
                      onSelect={(v) => update("scoreType", v as "CGPA" | "Percentage")}
                    />
                  ))}
                </div>
                <input
                  className={`${inputClasses} ${errors.score ? errorInputClasses : ""}`}
                  type="number"
                  step="0.01"
                  value={formData.score}
                  onChange={(e) => update("score", e.target.value)}
                  placeholder={formData.scoreType === "CGPA" ? "e.g. 8.4 (out of 10)" : "e.g. 78 (out of 100)"}
                />
                <FieldError name="score" />
              </div>
              <div>
                <label className={labelClasses}>Graduation year</label>
                <div className="flex gap-3">
                  {["2024", "2025", "2026"].map((y) => (
                    <ToggleButton
                      key={y}
                      value={y}
                      selected={formData.graduationYear}
                      onSelect={(v) => update("graduationYear", v)}
                    />
                  ))}
                </div>
                <FieldError name="graduationYear" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-xl card-surface text-foreground font-bold"
                >
                  ← Back
                </button>
                <button
                  onClick={() => handleNext(2)}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold glow-orange-hover transition-all"
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Professional Background */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <label className={labelClasses}>Years of experience</label>
                <select
                  className={`${inputClasses} ${errors.yearsExperience ? errorInputClasses : ""}`}
                  value={formData.yearsExperience}
                  onChange={(e) => update("yearsExperience", e.target.value)}
                >
                  <option value="">Select experience</option>
                  {["Fresher (0)", "Less than 1 year", "1–2 years", "2+ years"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <FieldError name="yearsExperience" />
              </div>
              <YesNoCard question="Any prior BD or sales experience?" field="hasSalesExp" />
              <AnimatePresence>
                {formData.hasSalesExp === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <textarea
                      className={`${inputClasses} min-h-[100px] ${errors.salesExpDetails ? errorInputClasses : ""}`}
                      value={formData.salesExpDetails}
                      onChange={(e) => update("salesExpDetails", e.target.value.slice(0, 200))}
                      placeholder="Briefly describe the role and duration (max 200 chars)"
                    />
                    <div className="flex justify-between">
                      <FieldError name="salesExpDetails" />
                      <p className="text-xs text-muted-foreground mt-1.5 ml-auto">
                        {formData.salesExpDetails.length}/200
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-4 rounded-xl card-surface text-foreground font-bold"
                >
                  ← Back
                </button>
                <button
                  onClick={() => handleNext(3)}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold glow-orange-hover transition-all"
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Eligibility */}
          {step === 4 && !rejected && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <YesNoCard question="Do you have any active backlogs?" field="hasBacklogs" />
              <div>
                <label className={labelClasses}>Preferred joining location</label>
                <div className="flex flex-wrap gap-3">
                  {["Delhi", "Bangalore", "Both"].map((loc) => {
                    const active = formData.joiningLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleLocation(loc)}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "card-surface text-foreground hover:border-primary/50"
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
                <FieldError name="joiningLocations" />
              </div>
              <YesNoCard question="Available for immediate joining?" field="immediateJoining" />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-4 rounded-xl card-surface text-foreground font-bold"
                >
                  ← Back
                </button>
                <button
                  onClick={() => handleNext(4)}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold glow-orange-hover transition-all"
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Rejected */}
          {step === 4 && rejected && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-surface rounded-2xl p-6 border-l-4 border-l-primary"
            >
              <p className="text-foreground">
                Thanks for your interest — this role requires candidates without active backlogs. We'll keep your
                profile on file for future openings.
              </p>
            </motion.div>
          )}

          {/* Step 5 — Resume */}
          {step === 5 && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <label className={labelClasses}>Upload resume (PDF only, max 10MB)</label>
                <label
                  className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed cursor-pointer transition-colors card-surface ${errors.resumeFileName ? "border-destructive" : "border-border hover:border-primary/50"}`}
                >
                  {formData.resumeFileName ? (
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="text-scaler-green text-xl">✓</span>
                      <span className="font-medium">{formData.resumeFileName}</span>
                    </div>
                  ) : (
                    <div className="text-center px-4">
                      <span className="text-sm text-muted-foreground">Drag & drop or click to upload PDF</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.type !== "application/pdf") {
                        setErrors({ resumeFileName: "Only PDF files are allowed" });
                        return;
                      }
                      if (file.size > 10 * 1024 * 1024) {
                        setErrors({ resumeFileName: "File must be under 10MB" });
                        return;
                      }
                      update("resumeFileName", file.name);
                    }}
                  />
                </label>
                <FieldError name="resumeFileName" />
                <p className="text-xs text-muted-foreground mt-2">
                  Your resume will be requested again post-shortlisting via email.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-4 rounded-xl card-surface text-foreground font-bold"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.resumeFileName || loading}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed glow-orange-hover transition-all"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit application →"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RegistrationForm;

/* ============================================================
 * COMPLETE GOOGLE APPS SCRIPT — paste into Apps Script editor
 * Sheet ID: 1BfQakI2i87vdQO5Jruka-Mq8os2gsVA2dQB59Bd6eEY
 * Tabs used (auto-created if missing): Candidates, Attempts, Verdicts
 * Deploy as: Web app | Execute as: Me | Who has access: Anyone
 * ============================================================

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
  var noBacklogs = String(data.hasBacklogs).toLowerCase() === 'no';
  var immediate  = String(data.immediateJoining).toLowerCase() === 'yes';
  var locs = data.joiningLocations || [];
  var validLoc = locs.some(function(l){
    var v = String(l).toLowerCase();
    return v === 'delhi' || v === 'bangalore' || v === 'both';
  });
  return noBacklogs && immediate && validLoc;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action || 'register';

    if (action === 'register') {
      var sh = _sheet('Candidates', CANDIDATE_HEADERS);
      // Duplicate check on personal email
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

* ============================================================ */
