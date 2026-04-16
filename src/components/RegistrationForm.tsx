import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE";

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  college: string;
  degree: string;
  graduationYear: string;
  roleApplying: string;
  cgpa: string;
  hasBacklogs: string;
  willingToRelocate: string;
  canJoinIn30Days: string;
  hasSalesExp: string;
  salesExpDetails: string;
  resumeFileName: string;
}

const initialFormData: FormData = {
  fullName: "", email: "", mobile: "", college: "",
  degree: "", graduationYear: "", roleApplying: "", cgpa: "",
  hasBacklogs: "", willingToRelocate: "", canJoinIn30Days: "",
  hasSalesExp: "", salesExpDetails: "", resumeFileName: "",
};

const STORAGE_KEY = "scaler_registration_form";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...initialFormData, ...JSON.parse(saved) } : initialFormData;
    } catch { return initialFormData; }
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const update = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, submittedAt: new Date().toISOString() }),
        mode: "no-cors",
      });
    } catch (e) {
      console.error("Submission error:", e);
    }
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
    }, 1500);
  };

  const checkEligibility = () => {
    if (formData.hasBacklogs === "Yes" || formData.willingToRelocate === "No" || formData.canJoinIn30Days === "No") {
      setRejected(true);
    } else {
      setStep(4);
    }
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl bg-input border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";
  const labelClasses = "block text-sm font-medium text-foreground/70 mb-1.5";

  const ToggleButton = ({ value, selected, onSelect }: { value: string; selected: string; onSelect: (v: string) => void }) => (
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
    <div className="card-surface rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <p className="text-sm text-foreground">{question}</p>
      <div className="flex gap-2 shrink-0">
        {["Yes", "No"].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => update(field, v)}
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
  );

  if (submitted) {
    return (
      <section id="apply" className="py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
            <svg className="w-24 h-24 mx-auto mb-8" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--scaler-orange))" strokeWidth="3" opacity="0.2" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--scaler-orange))" strokeWidth="3"
                strokeDasharray="283" strokeDashoffset="0"
                style={{ animation: "draw-check 0.8s ease-out forwards" }} />
              <path d="M30 52 L45 67 L72 35" fill="none" stroke="hsl(var(--scaler-orange))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                className="animate-draw-check" />
            </svg>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">You're in the pipeline.</h2>
          <p className="text-muted-foreground mb-10">
            We've received your application. If shortlisted, you'll get an email with your dashboard access within 48 hours. Check your spam folder too.
          </p>
          {/* Mini process */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["Apply", "Dashboard", "AI Assessment", "Interview", "Offer"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
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

  return (
    <section id="apply" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Start your application</h2>
          <p className="text-muted-foreground">Takes under 3 minutes. Saved automatically as you go.</p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div>
                <label className={labelClasses}>Full name</label>
                <input className={inputClasses} value={formData.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <label className={labelClasses}>Personal email</label>
                <input className={inputClasses} type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
              </div>
              <div>
                <label className={labelClasses}>Mobile number</label>
                <input className={inputClasses} type="tel" value={formData.mobile} onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" />
              </div>
              <div>
                <label className={labelClasses}>College name</label>
                <input className={inputClasses} value={formData.college} onChange={(e) => update("college", e.target.value)} placeholder="Your college or university" />
              </div>
              <button onClick={() => setStep(2)} disabled={!formData.fullName || !formData.email || !formData.mobile || !formData.college}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed glow-orange-hover transition-all">
                Continue →
              </button>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div>
                <label className={labelClasses}>Degree & specialisation</label>
                <input className={inputClasses} value={formData.degree} onChange={(e) => update("degree", e.target.value)} placeholder="e.g. MBA Finance, BBA Marketing" />
              </div>
              <div>
                <label className={labelClasses}>Graduation year</label>
                <div className="flex gap-3">
                  {["2024", "2025"].map((y) => (
                    <ToggleButton key={y} value={y} selected={formData.graduationYear} onSelect={(v) => update("graduationYear", v)} />
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClasses}>Current CGPA / percentage</label>
                <input className={inputClasses} value={formData.cgpa} onChange={(e) => update("cgpa", e.target.value)} placeholder="e.g. 7.5 or 75%" />
              </div>
              <div>
                <label className={labelClasses}>Applying for</label>
                <div className="flex gap-3">
                  {["BDA", "Senior BDA"].map((r) => (
                    <ToggleButton key={r} value={r} selected={formData.roleApplying} onSelect={(v) => update("roleApplying", v)} />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl card-surface text-foreground font-bold">← Back</button>
                <button onClick={() => setStep(3)} disabled={!formData.degree || !formData.graduationYear || !formData.cgpa || !formData.roleApplying}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed glow-orange-hover transition-all">
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && !rejected && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <YesNoCard question="Do you have any active backlogs?" field="hasBacklogs" />
              <YesNoCard question="Are you willing to relocate to Bangalore?" field="willingToRelocate" />
              <YesNoCard question="Can you join within 30 days of receiving an offer?" field="canJoinIn30Days" />
              <YesNoCard question="Any prior sales, BD, or counselling experience?" field="hasSalesExp" />
              <AnimatePresence>
                {formData.hasSalesExp === "Yes" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <textarea className={inputClasses + " min-h-[100px]"} value={formData.salesExpDetails} onChange={(e) => update("salesExpDetails", e.target.value)} placeholder="Briefly describe the role and duration" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl card-surface text-foreground font-bold">← Back</button>
                <button onClick={checkEligibility}
                  disabled={!formData.hasBacklogs || !formData.willingToRelocate || !formData.canJoinIn30Days || !formData.hasSalesExp}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed glow-orange-hover transition-all">
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Rejected */}
          {step === 3 && rejected && (
            <motion.div key="rejected" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="card-surface rounded-2xl p-6 border-l-4 border-l-primary">
              <p className="text-foreground">
                Thanks for your interest — this role requires candidates without active backlogs who are ready to relocate to Bangalore and join within 30 days. We'll keep your profile on file for future openings.
              </p>
            </motion.div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div>
                <label className={labelClasses}>Upload resume (PDF only, max 10MB)</label>
                <label className="flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors card-surface">
                  {formData.resumeFileName ? (
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="text-scaler-green text-xl">✓</span>
                      <span className="font-medium">{formData.resumeFileName}</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">📄</span>
                      <span className="text-sm text-muted-foreground">Drag & drop or click to upload</span>
                    </div>
                  )}
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size <= 10 * 1024 * 1024) update("resumeFileName", file.name);
                  }} />
                </label>
                <p className="text-xs text-muted-foreground mt-2">Your resume will be requested again post-shortlisting via email.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="px-6 py-4 rounded-xl card-surface text-foreground font-bold">← Back</button>
                <button onClick={handleSubmit} disabled={!formData.resumeFileName || loading}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed glow-orange-hover transition-all">
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : "Submit application →"}
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

/*
=== GOOGLE APPS SCRIPT CODE ===

Paste this into a Google Apps Script project and deploy as a Web App:

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set up headers on first run
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Full Name', 'Email', 'Mobile', 'College',
      'Degree', 'Graduation Year', 'Role Applying', 'CGPA',
      'Has Backlogs', 'Willing to Relocate', 'Can Join in 30 Days',
      'Has Sales Exp', 'Sales Exp Details', 'Resume File Name', 'Submitted At'
    ]);
  }
  
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.fullName,
    data.email,
    data.mobile,
    data.college,
    data.degree,
    data.graduationYear,
    data.roleApplying,
    data.cgpa,
    data.hasBacklogs,
    data.willingToRelocate,
    data.canJoinIn30Days,
    data.hasSalesExp,
    data.salesExpDetails,
    data.resumeFileName,
    data.submittedAt
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
*/
