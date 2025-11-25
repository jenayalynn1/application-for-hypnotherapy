import React, { useState } from "react";
import "./App.css";

type SectionNumber = 1 | 2 | 3 | 4 | 5;

interface ApplicationFormData {
  // SECTION 1 – Framework + Consent
  email: string;
  metaphysicalConsent: boolean;

  // SECTION 2 – Support / Boundaries / Self-image
  q1DamagingExperience: string;
  q2BeforeSelf: string;
  q3NowSelf: string;
  q4HasTrustedPerson: "yes" | "no" | "";
  q4TrustedPersonDescription: string;
  q5HasFirmBoundaries: "yes" | "no" | "";
  q6HasWeakBoundaries: "yes" | "no" | "";
  q6WeakBoundariesProtection: string;
  q7HealedSelfAndBoundaries: string;
  privateSpaceAccess: "yes" | "no" | "";
  q8FaultVsResponsibility: string;
  q9UnderneathSelf: string;
  q10AgreesPrivateSpace: boolean;

  // SECTION 4 – Practical Demographics (old Section 5)
  hopeOutcome: string;
  referred: "yes" | "no" | "";
  referredBy: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  pronouns: "she" | "he" | "they" | "";
  zipCode: string;

  // SECTION 5 – Readiness & Membership (old Section 4)
  readinessLevel: "small" | "steady" | "deep" | "";
  membershipLevel: "light" | "moderate" | "high" | "";
}

const initialFormData: ApplicationFormData = {
  email: "",
  metaphysicalConsent: false,

  q1DamagingExperience: "",
  q2BeforeSelf: "",
  q3NowSelf: "",
  q4HasTrustedPerson: "",
  q4TrustedPersonDescription: "",
  q5HasFirmBoundaries: "",
  q6HasWeakBoundaries: "",
  q6WeakBoundariesProtection: "",
  q7HealedSelfAndBoundaries: "",
  privateSpaceAccess: "",
  q8FaultVsResponsibility: "",
  q9UnderneathSelf: "",
  q10AgreesPrivateSpace: false,

  hopeOutcome: "",
  referred: "",
  referredBy: "",
  phone: "",
  firstName: "",
  lastName: "",
  birthdate: "",
  pronouns: "",
  zipCode: "",

  readinessLevel: "",
  membershipLevel: "",
};

const MultiSectionApplication: React.FC = () => {
  const [section, setSection] = useState<SectionNumber>(1);
  const [form, setForm] = useState<ApplicationFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof ApplicationFormData>(
    key: K,
    value: ApplicationFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => {
    setSection((prev) => (prev < 5 ? ((prev + 1) as SectionNumber) : prev));
  };

  const goBack = () => {
    setSection((prev) => (prev > 1 ? ((prev - 1) as SectionNumber) : prev));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const bodyLines: string[] = [];

    bodyLines.push("NEW HYPNOTHERAPY APPLICATION");
    bodyLines.push("");
    bodyLines.push("SECTION 1 — Framework + Consent");
    bodyLines.push(`Email: ${form.email}`);
    bodyLines.push(
      `Metaphysical / symbolic framework consent: ${
        form.metaphysicalConsent ? "Yes" : "No"
      }`
    );
    bodyLines.push("");

    bodyLines.push("SECTION 2 — Support, Boundaries, Self-Image");
    bodyLines.push(
      `❶ Damaging experience(s) seeking support for:\n${form.q1DamagingExperience}`
    );
    bodyLines.push(
      `❷ Before this experience, I would describe myself as:\n${form.q2BeforeSelf}`
    );
    bodyLines.push(
      `❸ I would describe myself now as:\n${form.q3NowSelf}`
    );
    bodyLines.push(
      `❹ Do you have at least one trusted person you can confide in?: ${
        form.q4HasTrustedPerson || "N/A"
      }`
    );
    bodyLines.push(
      `   If yes, how would this person describe who you are today?\n${form.q4TrustedPersonDescription}`
    );
    bodyLines.push(
      `❺ Do you currently have any firm boundaries in your life?: ${
        form.q5HasFirmBoundaries || "N/A"
      }`
    );
    bodyLines.push(
      `❻ Do you have any boundaries you feel are weak or inconsistent?: ${
        form.q6HasWeakBoundaries || "N/A"
      }`
    );
    bodyLines.push(
      `   If yes, how do these boundaries protect you?\n${form.q6WeakBoundariesProtection}`
    );
    bodyLines.push(
      `❼ When I imagine a healed version of myself, I / my boundaries are:\n${form.q7HealedSelfAndBoundaries}`
    );
    bodyLines.push(
      `Access to private indoor space for virtual sessions: ${
        form.privateSpaceAccess || "N/A"
      }`
    );
    bodyLines.push(
      `❽ My understanding of the difference between fault and responsibility:\n${form.q8FaultVsResponsibility}`
    );
    bodyLines.push(
      `❾ The person I am underneath / the person I want to be:\n${form.q9UnderneathSelf}`
    );
    bodyLines.push(
      `❿ Agreement to meet from a quiet, private indoor space: ${
        form.q10AgreesPrivateSpace ? "Yes" : "No"
      }`
    );
    bodyLines.push("");

    bodyLines.push("SECTION 3 — Contradictions Quiz");
    bodyLines.push(
      "(Client completed quiz in app — see quiz results log / Sheets.)"
    );
    bodyLines.push("");

    bodyLines.push("SECTION 4 — Practical Demographics");
    bodyLines.push(
      `What I hope will be different by the end of this process:\n${form.hopeOutcome}`
    );
    bodyLines.push(`Were you referred to me?: ${form.referred || "N/A"}`);
    bodyLines.push(`If so, who?: ${form.referredBy}`);
    bodyLines.push(`Phone: ${form.phone}`);
    bodyLines.push(`First name: ${form.firstName}`);
    bodyLines.push(`Last name: ${form.lastName}`);
    bodyLines.push(`Birthdate: ${form.birthdate}`);
    bodyLines.push(
      `How you’d like me to address you (pronouns): ${
        form.pronouns === "she"
          ? "She / Her"
          : form.pronouns === "he"
          ? "He / Him"
          : form.pronouns === "they"
          ? "They"
          : "N/A"
      }`
    );
    bodyLines.push(`Zip code: ${form.zipCode}`);
    bodyLines.push("");

    bodyLines.push("SECTION 5 — Readiness & Membership");
    bodyLines.push(
      `Readiness to give time, focus, and emotional space: ${
        form.readinessLevel === "small"
          ? "I can set aside a small amount of time right now to begin."
          : form.readinessLevel === "steady"
          ? "I’m ready to make steady space each week for focused inner work."
          : form.readinessLevel === "deep"
          ? "I’m fully ready to center my growth and create room for deep change."
          : "N/A"
      }`
    );
    bodyLines.push(
      `Membership / support level that feels aligned: ${
        form.membershipLevel === "light"
          ? "Light to Moderate Support — $250–$450/month"
          : form.membershipLevel === "moderate"
          ? "Moderate to High Support — $300–$550/month"
          : form.membershipLevel === "high"
          ? "High-Contact, All-Inclusive Support — $600–$900/month"
          : "N/A"
      }`
    );
    bodyLines.push("");
    bodyLines.push(`Submitted at: ${new Date().toString()}`);

    const body = encodeURIComponent(bodyLines.join("\n"));
    const subject = encodeURIComponent("New Hypnotherapy Application");

    // Simple "drop into an email" via mailto. This opens the user's email client.
    window.location.href = `mailto:iamready@iamsafehypnosis.com?subject=${subject}&body=${body}`;

    setSubmitting(false);
  };

  // ─────────────────────────────
  // SECTION RENDERERS
  // ─────────────────────────────

  const renderSection1 = () => (
  <div className="card">
    <h2 className="section-title">
      Section 1 — Framework & Consent
    </h2>

    <div className="section-text">
      <p>
        🜂 <strong>My Framework and Approach</strong>
      </p>

      <p>
        When entering deep inner work, it’s important to understand the beliefs and education that guide your hypnotherapist.
        I received my foundational training through the Hypnosis Motivation Institute (HMI) and have since integrated that
        education into my own metaphysical framework, which strongly informs my practice.
      </p>

      <p>
        I operate from the understanding that each individual Self is composed of Consciousness, Subconscious, and Manifestation —
        all expressions of I Am, the pure creative awareness that gives rise to your reality. We access I Am through the divine
        inspiration of The Breath. Together, these five aspects form <strong>The Five-Fold Self</strong>.
      </p>

      <p>
        Each Self moves through its own states of mind, patterns of behavior, and movements of expression.
        Exploring and harmonizing these movements is the essence of this work.
      </p>

      <p>
        This is an existential framework — a lens through which to experience healing and self-realization. I am accepting of all
        spiritual and religious backgrounds and offer a neutral space for anyone seeking growth in the metaphysical and existential
        realms of human experience.
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
        onClick={() => nextSection()}
      >
        Next →

      <div className="question-block">
        <label className="question-text">
          Email<span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
          required
        />
      </div>

      <div className="question-block">
        <p className="question-text">
          I understand that this approach includes metaphysical and symbolic
          language as part of the healing process, and that I am comfortable
          with this perspective.
        </p>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={form.metaphysicalConsent}
            onChange={(e) => updateField("metaphysicalConsent", e.target.checked)}
          />
          <span>Yes, this framework resonates with me.</span>
        </label>
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="card">
      <h2 className="results-title">Section 2 — What You Need Support With</h2>

      <div className="question-block">
        <label className="question-text">
          ❶ What damaging experience(s) are you seeking support for?
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q1DamagingExperience}
          onChange={(e) => updateField("q1DamagingExperience", e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          ❷ Before this experience, how would you describe yourself?
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q2BeforeSelf}
          onChange={(e) => updateField("q2BeforeSelf", e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          ❸ How would you describe yourself now?
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q3NowSelf}
          onChange={(e) => updateField("q3NowSelf", e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <p className="question-text">
          ❹ Do you have at least one trusted person you can confide in?
          <span style={{ color: "#b91c1c" }}> *</span>
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <label>
            <input
              type="radio"
              name="trustedPerson"
              checked={form.q4HasTrustedPerson === "yes"}
              onChange={() => updateField("q4HasTrustedPerson", "yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="trustedPerson"
              checked={form.q4HasTrustedPerson === "no"}
              onChange={() => updateField("q4HasTrustedPerson", "no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div className="question-block">
        <label className="question-text">
          If yes, how would this person describe who you are today?
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q4TrustedPersonDescription}
          onChange={(e) =>
            updateField("q4TrustedPersonDescription", e.target.value)
          }
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <p className="question-text">
          ❺ Do you currently have any firm boundaries in your life?
          <span style={{ color: "#b91c1c" }}> *</span>
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <label>
            <input
              type="radio"
              name="firmBoundaries"
              checked={form.q5HasFirmBoundaries === "yes"}
              onChange={() => updateField("q5HasFirmBoundaries", "yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="firmBoundaries"
              checked={form.q5HasFirmBoundaries === "no"}
              onChange={() => updateField("q5HasFirmBoundaries", "no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div className="question-block">
        <p className="question-text">
          ❻ Do you have any boundaries you feel are weak or inconsistent?
          <span style={{ color: "#b91c1c" }}> *</span>
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <label>
            <input
              type="radio"
              name="weakBoundaries"
              checked={form.q6HasWeakBoundaries === "yes"}
              onChange={() => updateField("q6HasWeakBoundaries", "yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="weakBoundaries"
              checked={form.q6HasWeakBoundaries === "no"}
              onChange={() => updateField("q6HasWeakBoundaries", "no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div className="question-block">
        <label className="question-text">
          If yes, how do these boundaries protect you?
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q6WeakBoundariesProtection}
          onChange={(e) =>
            updateField("q6WeakBoundariesProtection", e.target.value)
          }
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          ❼ When you imagine a healed version of yourself, what are you like and
          what are your boundaries like?
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q7HealedSelfAndBoundaries}
          onChange={(e) =>
            updateField("q7HealedSelfAndBoundaries", e.target.value)
          }
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <p className="question-text">
          Do you have access to a private, indoor space for a 90-minute virtual
          session?
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <label>
            <input
              type="radio"
              name="privateSpaceAccess"
              checked={form.privateSpaceAccess === "yes"}
              onChange={() => updateField("privateSpaceAccess", "yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="privateSpaceAccess"
              checked={form.privateSpaceAccess === "no"}
              onChange={() => updateField("privateSpaceAccess", "no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div className="question-block">
        <label className="question-text">
          ❽ How do you understand the difference between fault and
          responsibility?
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q8FaultVsResponsibility}
          onChange={(e) =>
            updateField("q8FaultVsResponsibility", e.target.value)
          }
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          ❾ Describe the person you are underneath — or the person you want to
          be.
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.q9UnderneathSelf}
          onChange={(e) => updateField("q9UnderneathSelf", e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <p className="question-text">
          ❿ I agree to meet from a quiet, private indoor space.
          <span style={{ color: "#b91c1c" }}> *</span>
        </p>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={form.q10AgreesPrivateSpace}
            onChange={(e) =>
              updateField("q10AgreesPrivateSpace", e.target.checked)
            }
          />
          <span>Yes, I agree.</span>
        </label>
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="card">
      <h2 className="results-title">Section 3 — The Three Contradictions Quiz</h2>
      <p className="results-summary">
        This is where your existing contradictions quiz lives. For now, this is
        a placeholder so the application flow works.
      </p>
      <p className="results-summary">
        In the next pass, we’ll paste your current quiz JSX and logic into this
        section so it behaves exactly as it does now.
      </p>
    </div>
  );

  const renderSection4 = () => (
    <div className="card">
      <h2 className="results-title">Section 4 — Practical Demographics</h2>

      <div className="question-block">
        <label className="question-text">
          In one or two sentences, describe what you hope will be different
          about you — or about your life — by the end of this process.
          <span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <textarea
          value={form.hopeOutcome}
          onChange={(e) => updateField("hopeOutcome", e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <p className="question-text">
          Were you referred to me?<span style={{ color: "#b91c1c" }}> *</span>
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <label>
            <input
              type="radio"
              name="referred"
              checked={form.referred === "yes"}
              onChange={() => updateField("referred", "yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="referred"
              checked={form.referred === "no"}
              onChange={() => updateField("referred", "no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div className="question-block">
        <label className="question-text">If so, who?</label>
        <input
          type="text"
          value={form.referredBy}
          onChange={(e) => updateField("referredBy", e.target.value)}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          Phone Number<span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          First Name<span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <input
          type="text"
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          Last Name<span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <input
          type="text"
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <label className="question-text">
          Birthdate<span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <input
          type="date"
          value={form.birthdate}
          onChange={(e) => updateField("birthdate", e.target.value)}
          style={{ padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>

      <div className="question-block">
        <p className="question-text">
          How would you like me to address you?
          <span style={{ color: "#b91c1c" }}> *</span>
        </p>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <label>
            <input
              type="radio"
              name="pronouns"
              checked={form.pronouns === "she"}
              onChange={() => updateField("pronouns", "she")}
            />{" "}
            She / Her
          </label>
          <label>
            <input
              type="radio"
              name="pronouns"
              checked={form.pronouns === "he"}
              onChange={() => updateField("pronouns", "he")}
            />{" "}
            He / Him
          </label>
          <label>
            <input
              type="radio"
              name="pronouns"
              checked={form.pronouns === "they"}
              onChange={() => updateField("pronouns", "they")}
            />{" "}
            They
          </label>
        </div>
      </div>

      <div className="question-block">
        <label className="question-text">
          Your ZIP code<span style={{ color: "#b91c1c" }}> *</span>
        </label>
        <input
          type="text"
          value={form.zipCode}
          onChange={(e) => updateField("zipCode", e.target.value)}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 4, border: "1px solid #e0cda9" }}
        />
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="card">
      <h2 className="results-title">Section 5 — Readiness & Membership</h2>

      <div className="question-block">
        <p className="question-text">
          How ready are you to give time, focus, and emotional space to your
          healing journey?
          <span style={{ color: "#b91c1c" }}> *</span>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label>
            <input
              type="radio"
              name="readinessLevel"
              checked={form.readinessLevel === "small"}
              onChange={() => updateField("readinessLevel", "small")}
            />{" "}
            I can set aside a small amount of time right now to begin.
          </label>
          <label>
            <input
              type="radio"
              name="readinessLevel"
              checked={form.readinessLevel === "steady"}
              onChange={() => updateField("readinessLevel", "steady")}
            />{" "}
            I’m ready to make steady space each week for focused inner work.
          </label>
          <label>
            <input
              type="radio"
              name="readinessLevel"
              checked={form.readinessLevel === "deep"}
              onChange={() => updateField("readinessLevel", "deep")}
            />{" "}
            I’m fully ready to center my growth and create room for deep change.
          </label>
        </div>
      </div>

      <div className="question-block">
        <p className="question-text">
          I work with clients via membership commitments. This creates the
          opportunity for the best outcomes.  
          Which level of support feels most aligned for where you are right now?
          <span style={{ color: "#b91c1c" }}> *</span>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label>
            <input
              type="radio"
              name="membershipLevel"
              checked={form.membershipLevel === "light"}
              onChange={() => updateField("membershipLevel", "light")}
            />{" "}
            Light to Moderate Support — $250–$450/month
          </label>

          <label>
            <input
              type="radio"
              name="membershipLevel"
              checked={form.membershipLevel === "moderate"}
              onChange={() => updateField("membershipLevel", "moderate")}
            />{" "}
            Moderate to High Support — $300–$550/month
          </label>

          <label>
            <input
              type="radio"
              name="membershipLevel"
              checked={form.membershipLevel === "high"}
              onChange={() => updateField("membershipLevel", "high")}
            />{" "}
            High-Contact, All-Inclusive Support — $600–$900/month
          </label>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (section) {
      case 1:
        return renderSection1();
      case 2:
        return renderSection2();
      case 3:
        return renderSection3(); // placeholder for your current quiz
      case 4:
        return renderSection4();
      case 5:
        return renderSection5();
      default:
        return null;
    }
  };

  return (
    <div className="app-root">
      <div className="page quiz-container quiz-card">
        <header className="header">
          <h1 className="title">Application for Hypnotherapy</h1>
          <p className="subtitle">
            This process is designed for individuals ready to work at depth —
            to understand their patterns, reconnect with their rhythm, and
            invite lasting change.
          </p>
          <p className="results-note">
            Section {section} of 5
          </p>
        </header>

        <form onSubmit={handleFinalSubmit}>
          {renderCurrentSection()}

          <div className="button-row" style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
            {section > 1 ? (
              <button
                type="button"
                className="secondary-button"
                onClick={goBack}
              >
                ← Back
              </button>
            ) : (
              <span />
            )}

            {section < 5 ? (
              <button
                type="button"
                className="primary-button"
                onClick={goNext}
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="primary-button"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiSectionApplication;
