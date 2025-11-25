import React, { useState } from "react";
import "./App.css";
import QuizSection from "./QuizSection";

type SectionNumber = 1 | 2 | 3 | 4 | 5;

interface ApplicationFormData {
  // SECTION 1 — Framework & Consent
  metaphysicalConsent: boolean;

  // SECTION 2 — Support / Boundaries / Self-image (summary for now)
  q1DamagingExperience: string;
  q2BeforeSelf: string;
  q3NowSelf: string;

  // SECTION 3 — Quiz has its own state (we don’t store answers here)

  // SECTION 4 — History / Finances / Membership preference
  therapyHistory: string;
  mentalHealthSupports: string;
  incomeRange: string;
  membershipPreference: string;
  financialNotes: string;

  // SECTION 5 — Readiness + contact
  email: string;
  readinessNotes: string;
}

const initialForm: ApplicationFormData = {
  metaphysicalConsent: false,
  q1DamagingExperience: "",
  q2BeforeSelf: "",
  q3NowSelf: "",
  therapyHistory: "",
  mentalHealthSupports: "",
  incomeRange: "",
  membershipPreference: "",
  financialNotes: "",
  email: "",
  readinessNotes: "",
};

const MultiSectionApplication: React.FC = () => {
  const [section, setSection] = useState<SectionNumber>(1);
  const [form, setForm] = useState<ApplicationFormData>(initialForm);

  const nextSection = () => {
    setSection((prev) => (prev < 5 ? ((prev + 1) as SectionNumber) : prev));
  };

  const prevSection = () => {
    setSection((prev) => (prev > 1 ? ((prev - 1) as SectionNumber) : prev));
  };

  const handleSubmit = () => {
    const lines: string[] = [];

    lines.push("🌀 APPLICATION FOR HYPNOTHERAPY");
    lines.push("");
    lines.push("SECTION 1 — Framework & Consent");
    lines.push(
      `Metaphysical framework consent: ${
        form.metaphysicalConsent ? "Yes" : "No"
      }`
    );
    lines.push("");

    lines.push("SECTION 2 — Support / Boundaries / Self-Image");
    lines.push(`Q1 — Damaging experience: ${form.q1DamagingExperience}`);
    lines.push(`Q2 — Before this experience I felt: ${form.q2BeforeSelf}`);
    lines.push(`Q3 — Now I see myself as: ${form.q3NowSelf}`);
    lines.push("");

    lines.push("SECTION 4 — History / Finances / Membership Preference");
    lines.push(`Therapy / mental health history: ${form.therapyHistory}`);
    lines.push(
      `Current mental-health supports or diagnoses: ${form.mentalHealthSupports}`
    );
    lines.push(`Household income range: ${form.incomeRange}`);
    lines.push(
      `Preferred membership level: ${form.membershipPreference || "Not chosen"}`
    );
    lines.push(`Financial / access notes: ${form.financialNotes}`);
    lines.push("");

    lines.push("SECTION 5 — Readiness & Contact");
    lines.push(`Email: ${form.email}`);
    lines.push(`Readiness notes: ${form.readinessNotes}`);

    const body = lines.join("\n");
    const subject = "Application for Hypnotherapy";

    const mailto = `mailto:iamready@iamsafehypnosis.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  // ---------- SECTION RENDERERS ----------

  const renderSection1 = () => (
    <div className="card">
      <h2 className="section-title">Section 1 — Framework & Consent</h2>

      <div className="section-text">
        <p>
          🜂 <strong>My Framework and Approach</strong>
        </p>

        <p>
          When entering deep inner work, it’s important to understand the
          beliefs and education that guide your hypnotherapist. I received my
          foundational training through the Hypnosis Motivation Institute (HMI)
          and have since integrated that education into my own metaphysical
          framework, which strongly informs my practice.
        </p>

        <p>
          I operate from the understanding that each individual Self is composed
          of Consciousness, Subconscious, and Manifestation — all expressions of
          I Am, the pure creative awareness that gives rise to your reality. We
          access I Am through the divine inspiration of The Breath. Together,
          these five aspects form <strong>The Five-Fold Self</strong>.
        </p>

        <p>
          Each Self moves through its own states of mind, patterns of behavior,
          and movements of expression. Exploring and harmonizing these
          movements is the essence of this work.
        </p>

        <p>
          This is an existential framework — a lens through which to experience
          healing and self-realization. I am accepting of all spiritual and
          religious backgrounds and offer a neutral space for anyone seeking
          growth in the metaphysical and existential realms of human
          experience.
        </p>
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.metaphysicalConsent}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              metaphysicalConsent: e.target.checked,
            }))
          }
        />
        <span>Yes, this framework resonates with me.</span>
      </label>

      <div className="button-row">
        <button
          className="primary-button"
          disabled={!form.metaphysicalConsent}
          onClick={nextSection}
        >
          Next →
        </button>
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="card">
      <h2 className="section-title">
        Section 2 — Support, Boundaries, and Self-Image
      </h2>

      <label className="field">
        <span>
          Briefly describe a damaging or defining experience that still shapes
          how you see yourself.
        </span>
        <textarea
          value={form.q1DamagingExperience}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              q1DamagingExperience: e.target.value,
            }))
          }
        />
      </label>

      <label className="field">
        <span>Before this experience, how did you tend to see yourself?</span>
        <textarea
          value={form.q2BeforeSelf}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, q2BeforeSelf: e.target.value }))
          }
        />
      </label>

      <label className="field">
        <span>Today, how do you tend to see yourself?</span>
        <textarea
          value={form.q3NowSelf}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, q3NowSelf: e.target.value }))
          }
        />
      </label>

      <div className="button-row">
        <button className="secondary-button" onClick={prevSection}>
          ← Back
        </button>
        <button className="primary-button" onClick={nextSection}>
          Next →
        </button>
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="card">
      <h2 className="section-title">Section 3 — Three Contradictions Quiz</h2>
      <p className="section-intro">
        This quiz maps how Being, Flowing, and Trusting are currently moving
        together in your system. Answer from how things feel <em>right now</em>,
        not how you wish they were.
      </p>
      <QuizSection />
      <div className="button-row" style={{ marginTop: "1.5rem" }}>
        <button className="secondary-button" onClick={prevSection}>
          ← Back
        </button>
        <button className="primary-button" onClick={nextSection}>
          Next →
        </button>
      </div>
    </div>
  );

  const renderSection4 = () => (
    <div className="card">
      <h2 className="section-title">
        Section 4 — History, Finances, and Membership Fit
      </h2>

      <label className="field">
        <span>
          Have you worked with therapists, coaches, or healers before? What
          helped, and what didn’t?
        </span>
        <textarea
          value={form.therapyHistory}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, therapyHistory: e.target.value }))
          }
        />
      </label>

      <label className="field">
        <span>
          Are there any current mental-health diagnoses, medications, or safety
          concerns you’d like me to be aware of?
        </span>
        <textarea
          value={form.mentalHealthSupports}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              mentalHealthSupports: e.target.value,
            }))
          }
        />
      </label>

      <label className="field">
        <span>Approximate household income range (optional)</span>
        <select
          value={form.incomeRange}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, incomeRange: e.target.value }))
          }
        >
          <option value="">Prefer not to say</option>
          <option value="under-40k">Under $40,000</option>
          <option value="40-80k">$40,000–$80,000</option>
          <option value="80-120k">$80,000–$120,000</option>
          <option value="120k-plus">Over $120,000</option>
        </select>
      </label>

      <fieldset className="field">
        <legend>
          Membership range that feels most aligned and comfortable right now:
        </legend>

        <label className="radio-row">
          <input
            type="radio"
            name="membershipPreference"
            value="Light to Moderate Support — $250–$450/month"
            checked={
              form.membershipPreference ===
              "Light to Moderate Support — $250–$450/month"
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                membershipPreference: e.target.value,
              }))
            }
          />
          <span>Light to Moderate Support — $250–$450/month</span>
        </label>

        <label className="radio-row">
          <input
            type="radio"
            name="membershipPreference"
            value="Moderate to High Support — $300–$550/month"
            checked={
              form.membershipPreference ===
              "Moderate to High Support — $300–$550/month"
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                membershipPreference: e.target.value,
              }))
            }
          />
          <span>Moderate to High Support — $300–$550/month</span>
        </label>

        <label className="radio-row">
          <input
            type="radio"
            name="membershipPreference"
            value="High-Contact, All-Inclusive Support — $600–$900/month"
            checked={
              form.membershipPreference ===
              "High-Contact, All-Inclusive Support — $600–$900/month"
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                membershipPreference: e.target.value,
              }))
            }
          />
          <span>High-Contact, All-Inclusive Support — $600–$900/month</span>
        </label>
      </fieldset>

      <label className="field">
        <span>
          Anything else you’d like me to know about your financial reality or
          access needs?
        </span>
        <textarea
          value={form.financialNotes}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              financialNotes: e.target.value,
            }))
          }
        />
      </label>

      <div className="button-row">
        <button className="secondary-button" onClick={prevSection}>
          ← Back
        </button>
        <button className="primary-button" onClick={nextSection}>
          Next →
        </button>
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="card">
      <h2 className="section-title">
        Section 5 — Readiness, Timing, and Contact
      </h2>

      <label className="field">
        <span>Email *</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </label>

      <label className="field">
        <span>
          In your own words, why does <em>now</em> feel like the right time to
          begin this work?
        </span>
        <textarea
          value={form.readinessNotes}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              readinessNotes: e.target.value,
            }))
          }
        />
      </label>

      <div className="button-row">
        <button className="secondary-button" onClick={prevSection}>
          ← Back
        </button>
        <button
          className="primary-button"
          disabled={!form.email}
          onClick={handleSubmit}
        >
          Submit Application ✉️
        </button>
      </div>
    </div>
  );

  // ---------- MAIN RENDER ----------

  return (
    <div className="page">
      <div className="quiz-container">
 <header className="header">
          <img
            src="https://i.postimg.cc/fLLWZBrp/egg_portrait.png"
            alt="Jenayalynn Riojas, CCHt"
            className="portrait"
          />
          <h1 className="title">The Three Contradictions Quiz</h1>
          <p className="subtitle">
            For each statement, select the one that feels most true for you
            right now.
          </p>
          <p className="subtitle">
            There are no wrong answers — each response reflects a pattern of
            energy within the Self.
          </p>
          <p className="signature">Jenayalynn</p>
        </header>
        {/* Simple step indicator */}
        <p className="section-indicator">
          Step {section} of 5
        </p>

        {section === 1 && renderSection1()}
        {section === 2 && renderSection2()}
        {section === 3 && renderSection3()}
        {section === 4 && renderSection4()}
        {section === 5 && renderSection5()}
      </div>
    </div>
  );
};

export default MultiSectionApplication;
