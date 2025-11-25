import React, { useState } from "react";
import "./App.css";
import QuizSection from "./QuizSection";

type SectionNumber = 1 | 2 | 3 | 4 | 5;

interface ApplicationFormData {
  // SECTION 1 — Framework & Consent
  metaphysicalConsent: boolean;

  // SECTION 2 — Support / Boundaries / Self-Image
  q1DamagingExperience: string;
  q2BeforeSelf: string;
  q3NowSelf: string;

  // SECTION 4 — History / Finances / Membership + Readiness
  therapyHistory: string;
  mentalHealthSupports: string;
  incomeRange: string;
  membershipPreference: string;
  financialNotes: string;
  email: string;
  readinessNotes: string;

  // SECTION 5 — Practical Demographics
  referredYesNo: "yes" | "no" | "";
  referredBy: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  addressAs: "she/her" | "he/him" | "they" | "";
  zipCode: string;
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
  referredYesNo: "",
  referredBy: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  birthdate: "",
  addressAs: "",
  zipCode: "",
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
    lines.push(`Damaging / defining experience: ${form.q1DamagingExperience}`);
    lines.push(`Before this experience I saw myself as: ${form.q2BeforeSelf}`);
    lines.push(`Now I tend to see myself as: ${form.q3NowSelf}`);
    lines.push("");

    lines.push("SECTION 4 — History, Finances, Membership, Readiness");
    lines.push(`Therapy / support history: ${form.therapyHistory}`);
    lines.push(
      `Current mental-health supports / diagnoses: ${form.mentalHealthSupports}`
    );
    lines.push(`Income range: ${form.incomeRange || "Not specified"}`);
    lines.push(
      `Preferred membership: ${
        form.membershipPreference || "Not specified yet"
      }`
    );
    lines.push(`Financial / access notes: ${form.financialNotes}`);
    lines.push("");
    lines.push(`Contact email: ${form.email}`);
    lines.push(
      `Why now feels like the right time: ${form.readinessNotes || "(not filled)"}`
    );
    lines.push("");

    lines.push("SECTION 5 — Practical Demographics");
    lines.push(
      `Referred: ${
        form.referredYesNo === "yes"
          ? `Yes — ${form.referredBy || "no name given"}`
          : form.referredYesNo === "no"
          ? "No"
          : "Not answered"
      }`
    );
    lines.push(`Phone: ${form.phoneNumber}`);
    lines.push(`First name: ${form.firstName}`);
    lines.push(`Last name: ${form.lastName}`);
    lines.push(`Birthdate: ${form.birthdate}`);
    lines.push(
      `How to address: ${
        form.addressAs === "she/her"
          ? "She / Her"
          : form.addressAs === "he/him"
          ? "He / Him"
          : form.addressAs === "they"
          ? "They"
          : "Not specified"
      }`
    );
    lines.push(`Zip code: ${form.zipCode}`);
    lines.push("");

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
          and movements of expression. Exploring and harmonizing these movements
          is the essence of this work.
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
          type="button"
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
        <button
          className="secondary-button"
          onClick={prevSection}
          type="button"
        >
          ← Back
        </button>
        <button
          className="primary-button"
          onClick={nextSection}
          type="button"
        >
          Next →
        </button>
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="card">
      <h2 className="section-title">Section 3 — The Three Contradictions</h2>
      <p className="section-intro">
        This quiz maps how Being, Flowing, and Trusting are moving together in
        your system right now. Answer from your current reality, not how you
        wish things were.
      </p>

      {/* Full quiz component */}
      <QuizSection />

      <div className="button-row" style={{ marginTop: "1.5rem" }}>
        <button
          className="secondary-button"
          onClick={prevSection}
          type="button"
        >
          ← Back
        </button>
        <button
          className="primary-button"
          onClick={nextSection}
          type="button"
        >
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
          Which membership range feels most aligned and comfortable right now?
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

      <label className="field">
        <span>Email *</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
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
        <button
          className="secondary-button"
          onClick={prevSection}
          type="button"
        >
          ← Back
        </button>
        <button
          className="primary-button"
          onClick={nextSection}
          type="button"
        >
          Next →
        </button>
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="card">
      <h2 className="section-title">Section 5 — Practical Demographics</h2>

      <p className="results-summary">Were you referred to me?</p>
      <div
        className="option-row"
        onClick={() => setForm((prev) => ({ ...prev, referredYesNo: "yes" }))}
      >
        <div
          className={`radio ${
            form.referredYesNo === "yes" ? "radio-selected" : ""
          }`}
        >
          {form.referredYesNo === "yes" && <div className="radio-dot" />}
        </div>
        <div className="option-text">Yes</div>
      </div>
      <div
        className="option-row"
        onClick={() => setForm((prev) => ({ ...prev, referredYesNo: "no" }))}
      >
        <div
          className={`radio ${
            form.referredYesNo === "no" ? "radio-selected" : ""
          }`}
        >
          {form.referredYesNo === "no" && <div className="radio-dot" />}
        </div>
        <div className="option-text">No</div>
      </div>

      {form.referredYesNo === "yes" && (
        <label className="field">
          <span>If so, who?</span>
          <input
            type="text"
            value={form.referredBy}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, referredBy: e.target.value }))
            }
          />
        </label>
      )}

      <label className="field" style={{ marginTop: "1.5rem" }}>
        <span>Phone Number *</span>
        <input
          type="text"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
        />
      </label>

      <label className="field">
        <span>First Name *</span>
        <input
          type="text"
          value={form.firstName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
      </label>

      <label className="field">
        <span>Last Name *</span>
        <input
          type="text"
          value={form.lastName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
      </label>

      <label className="field">
        <span>Birthdate *</span>
        <input
          type="text"
          placeholder="January 7, 2019"
          value={form.birthdate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, birthdate: e.target.value }))
          }
        />
      </label>

      <p className="results-summary" style={{ marginTop: "1.5rem" }}>
        How would you like me to address you?
      </p>

      <div
        className="option-row"
        onClick={() => setForm((prev) => ({ ...prev, addressAs: "she/her" }))}
      >
        <div
          className={`radio ${
            form.addressAs === "she/her" ? "radio-selected" : ""
          }`}
        >
          {form.addressAs === "she/her" && <div className="radio-dot" />}
        </div>
        <div className="option-text">She / Her</div>
      </div>

      <div
        className="option-row"
        onClick={() => setForm((prev) => ({ ...prev, addressAs: "he/him" }))}
      >
        <div
          className={`radio ${
            form.addressAs === "he/him" ? "radio-selected" : ""
          }`}
        >
          {form.addressAs === "he/him" && <div className="radio-dot" />}
        </div>
        <div className="option-text">He / Him</div>
      </div>

      <div
        className="option-row"
        onClick={() => setForm((prev) => ({ ...prev, addressAs: "they" }))}
      >
        <div
          className={`radio ${
            form.addressAs === "they" ? "radio-selected" : ""
          }`}
        >
          {form.addressAs === "they" && <div className="radio-dot" />}
        </div>
        <div className="option-text">They</div>
      </div>

      <label className="field" style={{ marginTop: "1.5rem" }}>
        <span>Your Zip Code *</span>
        <input
          type="text"
          value={form.zipCode}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, zipCode: e.target.value }))
          }
        />
      </label>

      <div className="button-row">
        <button
          className="secondary-button"
          onClick={prevSection}
          type="button"
        >
          ← Back
        </button>
        <button
          className="primary-button"
          type="button"
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
        {/* Global header shown on all sections */}
        <header className="header">
          <img
            src="https://i.postimg.cc/fLLWZBrp/egg_portrait.png"
            alt="Jenayalynn Riojas, CCHt"
            className="portrait"
          />
          <h1 className="title">The Three Contradictions Application</h1>
          <p className="subtitle">
            This process is for individuals ready to do deep inner work using a
            metaphysical and symbolic framework.
          </p>
          <p className="signature">Jenayalynn</p>
        </header>

        <p className="section-indicator">Step {section} of 5</p>

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
