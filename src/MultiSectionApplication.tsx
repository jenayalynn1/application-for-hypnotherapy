import React, { useState } from "react";
import "./App.css";

// Types + quiz logic are shared with your other quiz
import type {
  Trait,
  FlightProfile,
  AnswerRecord,
  SheetPayload,
} from "./data";
import { QUESTIONS, FLIGHT_PROFILES, computeFlightDirection } from "./data";

type SectionNumber = 1 | 2 | 3 | 4 | 5;

interface ApplicationFormData {
  // SECTION 1 — Framework & Consent
  metaphysicalConsent: boolean;

  // SECTION 2 — Support / Boundaries / Self-image
  q1DamagingExperience: string;
  q2BeforeSelf: string;
  q3NowSelf: string;
  q4HasTrustedPerson: "yes" | "no" | "";
  q4TrustedPersonDescription: string; // OPTIONAL
  q5HasFirmBoundaries: "yes" | "no" | "";
  q6HasWeakBoundaries: "yes" | "no" | "";
  q6WeakBoundariesProtection: string;
  q7HealedSelfAndBoundaries: string;
  q8FaultVsResponsibility: string;
  q9AgreesPrivateSpace: "yes" | "no" | "";
  q10HonestyWillingness: "yes" | "unsure" | "no";

  // SECTION 4 — Readiness & Commitment
  q11Readiness: "small" | "steady" | "allIn" | "";
  investmentRange: "light" | "moderateHigh" | "highContact" | "";

  // SECTION 5 — Personal Details
  firstName: string;
  lastName: string;
  birthdate: string;
  pronouns: "she/her" | "he/him" | "they/them" | "";
  referredToMe: "yes" | "no" | "";
  referrerName: string;
  phoneNumber: string;
  contactEmail: string;
  preferredContact: "text" | "call" | "email" | "";
  timeZone: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

const initialForm: ApplicationFormData = {
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
  q8FaultVsResponsibility: "",
  q9AgreesPrivateSpace: "",
  q10HonestyWillingness: "yes",

  q11Readiness: "",
  investmentRange: "",

  firstName: "",
  lastName: "",
  birthdate: "",
  pronouns: "",
  referredToMe: "",
  referrerName: "",
  phoneNumber: "",
  contactEmail: "",
  preferredContact: "",
  timeZone: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

interface QuizResultsState {
  code: string;
  profile: FlightProfile | null;
  details: AnswerRecord[];
  being: number;
  flowing: number;
  trusting: number;
}

const MultiSectionApplication: React.FC = () => {
  const [section, setSection] = useState<SectionNumber>(1);
  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, Trait | null>>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResultsState | null>(null);

  // ---------- helpers ----------

  const updateField = <K extends keyof ApplicationFormData>(
    key: K,
    value: ApplicationFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateSection = (s: SectionNumber): string | null => {
    switch (s) {
      case 1: {
        if (!form.metaphysicalConsent) {
          return "Please confirm that this metaphysical framework resonates with you before continuing.";
        }
        return null;
      }

      case 2: {
        if (!form.q1DamagingExperience.trim())
          return "Please describe the experience you are seeking support for.";
        if (!form.q2BeforeSelf.trim())
          return "Please describe how you saw yourself before this experience.";
        if (!form.q3NowSelf.trim())
          return "Please describe how you see yourself today.";

        if (!form.q4HasTrustedPerson)
          return "Please indicate whether you have a trusted person to confide in.";
        // q4TrustedPersonDescription is consciously OPTIONAL

        if (!form.q5HasFirmBoundaries)
          return "Please answer whether you currently have firm boundaries.";
        if (!form.q6HasWeakBoundaries)
          return "Please answer whether you have weak or inconsistent boundaries.";
        if (!form.q6WeakBoundariesProtection.trim())
          return "Please explain your answers about boundaries.";
        if (!form.q7HealedSelfAndBoundaries.trim())
          return "Please describe your healed self and healed boundaries.";
        if (!form.q8FaultVsResponsibility.trim())
          return "Please share your understanding of fault vs responsibility.";
        if (!form.q9AgreesPrivateSpace)
          return "Please confirm whether you have access to a quiet, private indoor space.";
        if (!form.q10HonestyWillingness)
          return "Please answer how willing you are to explore your patterns honestly.";
        return null;
      }

      case 3: {
        for (let i = 0; i < QUESTIONS.length; i++) {
          if (!quizAnswers[i]) {
            return "Please answer all questions in The Flight Direction Quiz.";
          }
        }
        return null;
      }

      case 4: {
        if (!form.q11Readiness)
          return "Please select how ready you feel to give time and focus to this work.";
        if (!form.investmentRange)
          return "Please choose the investment range that feels most aligned right now.";
        return null;
      }

      case 5: {
        if (!form.firstName.trim()) return "Please enter your first name.";
        if (!form.lastName.trim()) return "Please enter your last name.";
        if (!form.birthdate.trim()) return "Please enter your birthdate.";
        if (!form.pronouns) return "Please select your pronouns.";
        if (!form.phoneNumber.trim())
          return "Please enter a phone number for contact.";
        if (!form.contactEmail.trim())
          return "Please enter an email address for contact.";
        if (!form.preferredContact)
          return "Please select your preferred method of communication.";
        if (!form.timeZone.trim())
          return "Please enter your time zone.";
        if (!form.city.trim()) return "Please enter your city.";
        if (!form.state.trim()) return "Please enter your state.";
        if (!form.country.trim()) return "Please enter your country.";
        if (!form.zipCode.trim()) return "Please enter your zip code.";

        if (!form.referredToMe)
          return "Please indicate whether you were referred to me.";
        if (form.referredToMe === "yes" && !form.referrerName.trim()) {
          return "Please share who referred you.";
        }
        return null;
      }

      default:
        return null;
    }
  };

  const handleNext = () => {
    const message = validateSection(section);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    if (section < 5) setSection((prev) => (prev + 1) as SectionNumber);
  };

  const handlePrevious = () => {
    setError(null);
    if (section > 1) setSection((prev) => (prev - 1) as SectionNumber);
  };

  const handleQuizSelect = (qIndex: number, trait: Trait) => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: trait }));
    if (section === 3) setError(null);
  };

  const buildAdminEmailBody = (
    records: AnswerRecord[],
    code: string,
    profile: FlightProfile | null,
    being: number,
    flowing: number,
    trusting: number
  ): string => {
    const lines: string[] = [];

    lines.push("New hypnotherapy application + Three Contradictions profile");
    lines.push("");
    lines.push("Client details:");
    lines.push(`Name: ${form.firstName} ${form.lastName}`);
    lines.push(`Email: ${form.contactEmail}`);
    lines.push(`Phone: ${form.phoneNumber}`);
    lines.push(
      `Location: ${form.city}, ${form.state}, ${form.country} ${form.zipCode}`
    );
    lines.push(`Time Zone: ${form.timeZone}`);
    lines.push("");
    lines.push("Section 2 — Support / Boundaries / Self-image:");
    lines.push(`1) Damaging experience: ${form.q1DamagingExperience}`);
    lines.push(`2) Before self: ${form.q2BeforeSelf}`);
    lines.push(`3) Now self: ${form.q3NowSelf}`);
    lines.push(
      `4) Has trusted person: ${form.q4HasTrustedPerson || "not answered"}`
    );
    if (form.q4TrustedPersonDescription.trim()) {
      lines.push(
        `   How they would describe client: ${form.q4TrustedPersonDescription}`
      );
    }
    lines.push(`5) Firm boundaries: ${form.q5HasFirmBoundaries}`);
    lines.push(`6) Weak boundaries: ${form.q6HasWeakBoundaries}`);
    lines.push(
      `   Explanation (5 & 6): ${form.q6WeakBoundariesProtection || "—"}`
    );
    lines.push(
      `7) Healed self & boundaries: ${form.q7HealedSelfAndBoundaries}`
    );
    lines.push(
      `8) Fault vs responsibility: ${form.q8FaultVsResponsibility}`
    );
    lines.push(
      `9) Private space: ${
        form.q9AgreesPrivateSpace === "yes"
          ? "Has private indoor space"
          : form.q9AgreesPrivateSpace === "no"
          ? "Does NOT have private indoor space"
          : "not answered"
      }`
    );
    lines.push(`10) Honesty willingness: ${form.q10HonestyWillingness}`);
    lines.push("");
    lines.push("Section 4 — Readiness & Commitment:");
    lines.push(`Readiness: ${form.q11Readiness}`);
    lines.push(`Investment range: ${form.investmentRange}`);
    lines.push("");
    lines.push("Section 5 — Additional info:");
    lines.push(`Pronouns: ${form.pronouns}`);
    lines.push(`Referred: ${form.referredToMe}`);
    if (form.referredToMe === "yes") {
      lines.push(`Referred by: ${form.referrerName}`);
    }
    lines.push("");
    lines.push("Three Contradictions quiz:");
    lines.push(`Flight direction: ${code}`);
    lines.push(
      `Scores — Being: ${being}, Flowing: ${flowing}, Trusting: ${trusting}`
    );
    if (profile) {
      lines.push("");
      lines.push("Core movement:");
      lines.push(profile.coreMovement);
      lines.push("");
      lines.push("Aligned practices:");
      profile.alignedPractices.forEach((p) => lines.push(`• ${p}`));
      lines.push("");
      lines.push("Aspire to:");
      lines.push(profile.aspireTo);
      lines.push("");
      lines.push("Momentum mantra:");
      lines.push(profile.mantra);
    }
    lines.push("");
    lines.push("Raw answer records:");
    records.forEach((r, idx) => {
      lines.push(
        `${idx + 1}. ${r.question} — [${r.trait}] ${r.answer}`
      );
    });

    return lines.join("\n");
  };

  const handleFinalSubmit = () => {
    // Validate all sections in order; bounce to first failing one
    for (let s = 1 as SectionNumber; s <= 5; s = (s + 1) as SectionNumber) {
      const message = validateSection(s);
      if (message) {
        setSection(s);
        setError(message);
        return;
      }
    }

    // Build quiz records
    const records: AnswerRecord[] = QUESTIONS.map((q, idx) => {
      const trait = quizAnswers[idx] as Trait;
      const option = q.options.find((o) => o.trait === trait)!;
      return {
        index: idx,
        question: q.text,
        answer: option.text,
        trait,
      };
    });

    const { code, being, flowing, trusting } =
      computeFlightDirection(records);
    const profile = FLIGHT_PROFILES[code] ?? null;

    const adminEmailBody = buildAdminEmailBody(
      records,
      code,
      profile,
      being,
      flowing,
      trusting
    );

    const payload: SheetPayload = {
      timestamp: new Date().toISOString(),
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.contactEmail,
      breathingRhythmType: "",
      inhaleType: "",
      exhaleType: "",
      customTypeLabel: "",
      rawScoresJson: JSON.stringify(records),
      quizTitle:
        "Hypnotherapy Application + The Three Contradictions Quiz",
      quizDescription:
        "Full application (framework, support history, readiness, personal details) plus inner movement profile.",
      phoneNumber: form.phoneNumber,
      sessionInterest: "",
      referralSource:
        form.referredToMe === "yes" ? form.referrerName : "",
      notes: "",
      adminEmailBody,
      quizType: "applicationWithThreeContradictions",
      beingScore: being,
      flowingScore: flowing,
      trustingScore: trusting,
    };

    submitToGoogleSheet(payload);

    setResults({
      code,
      profile,
      details: records,
      being,
      flowing,
      trusting,
    });

    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- render helpers ----------

  const renderTabs = () => {
    const labels: Record<SectionNumber, string> = {
      1: "Section 1: Framework & Consent",
      2: "Section 2: Support & Boundaries",
      3: "Section 3: Inner Movements Quiz",
      4: "Section 4: Readiness & Commitment",
      5: "Section 5: Personal Details",
    };

    return (
      <div className="section-tabs">
        {(Object.keys(labels) as unknown as SectionNumber[]).map((s) => (
          <button
            key={s}
            type="button"
            className={
              "section-tab" + (s === section ? " section-tab--active" : "")
            }
            onClick={() => setSection(s)}
          >
            {labels[s]}
          </button>
        ))}
      </div>
    );
  };

  const renderSection1 = () => (
    <div className="card">
      <h2 className="results-title">Section 1 — Framework &amp; Consent</h2>

      <p className="results-summary">
        When entering deep inner work, it’s important to understand the
        beliefs and education that guide your hypnotherapist.
      </p>
      <p className="results-summary">
        I received my foundational training through the Hypnosis Motivation
        Institute (HMI) and have since integrated that education into my own
        metaphysical framework, which strongly informs my practice.
      </p>
      <p className="results-summary">
        I operate from the understanding that each individual Self is
        composed of Consciousness, Subconscious, and Manifestation — all
        expressions of I Am, the pure creative awareness that gives rise to
        your reality. We access I Am through the divine inspiration of The
        Breath. Together, these five aspects form what I call The Five-Fold
        Self.
      </p>
      <p className="results-summary">
        Each Self moves through its own states of mind, patterns of behavior,
        and movements of expression. Exploring and harmonizing these
        movements is the essence of this work.
      </p>
      <p className="results-summary">
        This is an existential framework — a lens through which to experience
        healing and self-realization. I am accepting of all spiritual and
        religious backgrounds and offer a neutral space for anyone seeking
        growth in the metaphysical and existential realms of human
        experience.
      </p>

      <div style={{ marginTop: "1.75rem" }}>
        <label className="option-row">
          <input
            type="checkbox"
            checked={form.metaphysicalConsent}
            onChange={(e) =>
              updateField("metaphysicalConsent", e.target.checked)
            }
          />
          <span className="option-text">
            Yes, this metaphysical and symbolic framework resonates with me,
            and I am comfortable working within it.
          </span>
        </label>
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="card">
      <h2 className="results-title">
        Section 2 — Support, Boundaries &amp; Self-image
      </h2>

      <div className="question-block">
        <div className="question-text">
          1. What damaging experience(s) are you seeking support for?
        </div>
        <textarea
          className="text-area"
          value={form.q1DamagingExperience}
          onChange={(e) =>
            updateField("q1DamagingExperience", e.target.value)
          }
        />
      </div>

      <div className="question-block">
        <div className="question-text">
          2. Before this experience, how would you describe yourself?
        </div>
        <textarea
          className="text-area"
          value={form.q2BeforeSelf}
          onChange={(e) => updateField("q2BeforeSelf", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">
          3. How would you describe yourself today?
        </div>
        <textarea
          className="text-area"
          value={form.q3NowSelf}
          onChange={(e) => updateField("q3NowSelf", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">
          4. Do you have a trusted person you can confide in?
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q4HasTrustedPerson"
              checked={form.q4HasTrustedPerson === "yes"}
              onChange={() => updateField("q4HasTrustedPerson", "yes")}
            />{" "}
            Yes
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q4HasTrustedPerson"
              checked={form.q4HasTrustedPerson === "no"}
              onChange={() => updateField("q4HasTrustedPerson", "no")}
            />{" "}
            No
          </label>
        </div>

        <div style={{ marginTop: "0.75rem" }}>
          <div className="question-text" style={{ fontSize: "0.95rem" }}>
            If yes, how would this person describe who you are today?{" "}
            <span style={{ fontStyle: "italic" }}>(optional)</span>
          </div>
          <textarea
            className="text-area"
            value={form.q4TrustedPersonDescription}
            onChange={(e) =>
              updateField("q4TrustedPersonDescription", e.target.value)
            }
          />
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">
          5. Do you currently have any firm boundaries in your life?
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q5HasFirmBoundaries"
              checked={form.q5HasFirmBoundaries === "yes"}
              onChange={() => updateField("q5HasFirmBoundaries", "yes")}
            />{" "}
            Yes
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q5HasFirmBoundaries"
              checked={form.q5HasFirmBoundaries === "no"}
              onChange={() => updateField("q5HasFirmBoundaries", "no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">
          6. Do you have any weak or inconsistent boundaries?
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q6HasWeakBoundaries"
              checked={form.q6HasWeakBoundaries === "yes"}
              onChange={() => updateField("q6HasWeakBoundaries", "yes")}
            />{" "}
            Yes
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q6HasWeakBoundaries"
              checked={form.q6HasWeakBoundaries === "no"}
              onChange={() => updateField("q6HasWeakBoundaries", "no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">
          Explain your answers to questions 5 and 6.
        </div>
        <textarea
          className="text-area"
          value={form.q6WeakBoundariesProtection}
          onChange={(e) =>
            updateField("q6WeakBoundariesProtection", e.target.value)
          }
        />
      </div>

      <div className="question-block">
        <div className="question-text">
          7. When you imagine the healed version of yourself, what are you like
          then and what are your boundaries like?
        </div>
        <textarea
          className="text-area"
          value={form.q7HealedSelfAndBoundaries}
          onChange={(e) =>
            updateField("q7HealedSelfAndBoundaries", e.target.value)
          }
        />
      </div>

      <div className="question-block">
        <div className="question-text">
          8. What is the difference between fault and responsibility?
        </div>
        <textarea
          className="text-area"
          value={form.q8FaultVsResponsibility}
          onChange={(e) =>
            updateField("q8FaultVsResponsibility", e.target.value)
          }
        />
      </div>

      <div className="question-block">
        <div className="question-text">
          9. Do you agree to meet from a quiet, private indoor space?
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q9AgreesPrivateSpace"
              checked={form.q9AgreesPrivateSpace === "yes"}
              onChange={() => updateField("q9AgreesPrivateSpace", "yes")}
            />{" "}
            Yes, I have access to a private, indoor space for a 90-minute
            virtual session.
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q9AgreesPrivateSpace"
              checked={form.q9AgreesPrivateSpace === "no"}
              onChange={() => updateField("q9AgreesPrivateSpace", "no")}
            />{" "}
            No, I don't have access to a private indoor space at any time. (It’s
            okay.)
          </label>
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">
          10. Personal growth sometimes asks us to look at uncomfortable truths
          about personal behavior, thoughts, and emotions. How willing are you
          to explore your patterns honestly?
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q10HonestyWillingness"
              checked={form.q10HonestyWillingness === "yes"}
              onChange={() => updateField("q10HonestyWillingness", "yes")}
            />{" "}
            Yes, I'm willing — even if it is uncomfortable.
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q10HonestyWillingness"
              checked={form.q10HonestyWillingness === "unsure"}
              onChange={() => updateField("q10HonestyWillingness", "unsure")}
            />{" "}
            I'm not sure, but I want to try.
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q10HonestyWillingness"
              checked={form.q10HonestyWillingness === "no"}
              onChange={() => updateField("q10HonestyWillingness", "no")}
            />{" "}
            I prefer to stay comfortable right now.
          </label>
        </div>
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="card">
      <h2 className="results-title">
        Section 3 — Inner Movements (The Three Contradictions Quiz)
      </h2>
      <p className="subtitle" style={{ marginTop: "0.75rem" }}>
        For each statement, select the one that feels most true for you right
        now. There are no wrong answers — each response reflects a pattern of
        energy within the Self.
      </p>

      {QUESTIONS.map((q, idx) => (
        <div key={idx} className="question-block">
          <div className="question-text">
            <span className="question-number">{idx + 1}.</span> {q.text}
          </div>
          <div>
            {q.options.map((opt, oIdx) => {
              const selected = quizAnswers[idx] === opt.trait;
              return (
                <div
                  key={oIdx}
                  className={`option-row ${
                    selected ? "option-selected" : ""
                  }`}
                  onClick={() => handleQuizSelect(idx, opt.trait)}
                >
                  <div
                    className={`radio ${
                      selected ? "radio-selected" : ""
                    }`}
                  >
                    {selected && <div className="radio-dot" />}
                  </div>
                  <div className="option-text">{opt.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSection4 = () => (
    <div className="card">
      <h2 className="results-title">
        Section 4 — Readiness &amp; Commitment
      </h2>
      <p className="results-summary">
        Transformation asks for more than curiosity — it asks for time,
        energy, and devotion to your own becoming. This section helps me
        understand how ready you are to enter that kind of partnership.
      </p>

      <div className="question-block">
        <div className="question-text">
          11. How ready are you to give time, focus, and emotional space to
          your healing journey?
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q11Readiness"
              checked={form.q11Readiness === "small"}
              onChange={() => updateField("q11Readiness", "small")}
            />{" "}
            I can set aside a small amount of time right now to begin.
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q11Readiness"
              checked={form.q11Readiness === "steady"}
              onChange={() => updateField("q11Readiness", "steady")}
            />{" "}
            I’m ready to make steady space each week for focused inner work.
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="q11Readiness"
              checked={form.q11Readiness === "allIn"}
              onChange={() => updateField("q11Readiness", "allIn")}
            />{" "}
            I’m fully ready to center my growth and create room for deep change.
          </label>
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">Investment in Your Transformation</div>
        <p className="results-summary">
          I promise to take the time that is required to prepare for our work
          together and give you my full attention. Every transformation also
          asks for an investment of energy — including financial energy.
        </p>
        <p className="results-summary">
          Which range feels most aligned and comfortable for where you are
          right now?
        </p>

        <div className="option-row">
          <label>
            <input
              type="radio"
              name="investmentRange"
              checked={form.investmentRange === "light"}
              onChange={() => updateField("investmentRange", "light")}
            />{" "}
            Light to Moderate Support — $250–$450/month
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="investmentRange"
              checked={form.investmentRange === "moderateHigh"}
              onChange={() =>
                updateField("investmentRange", "moderateHigh")
              }
            />{" "}
            Moderate to High Support — $300–$550/month
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="investmentRange"
              checked={form.investmentRange === "highContact"}
              onChange={() =>
                updateField("investmentRange", "highContact")
              }
            />{" "}
            High-Contact, All-Inclusive Support — $600–$900/month
          </label>
        </div>
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="card">
      <h2 className="results-title">Section 5 — Personal Details</h2>

      <div className="question-block">
        <div className="question-text">First Name</div>
        <input
          className="text-input"
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">Last Name</div>
        <input
          className="text-input"
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">Birthdate</div>
        <input
          className="text-input"
          type="date"
          value={form.birthdate}
          onChange={(e) => updateField("birthdate", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">What are your pronouns?</div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="pronouns"
              checked={form.pronouns === "she/her"}
              onChange={() => updateField("pronouns", "she/her")}
            />{" "}
            She / Her
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="pronouns"
              checked={form.pronouns === "he/him"}
              onChange={() => updateField("pronouns", "he/him")}
            />{" "}
            He / Him
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="pronouns"
              checked={form.pronouns === "they/them"}
              onChange={() => updateField("pronouns", "they/them")}
            />{" "}
            Non-binary / They / Them
          </label>
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">Phone number</div>
        <input
          className="text-input"
          value={form.phoneNumber}
          onChange={(e) => updateField("phoneNumber", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">Email</div>
        <input
          className="text-input"
          type="email"
          value={form.contactEmail}
          onChange={(e) => updateField("contactEmail", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">
          Preferred method of communication?
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="preferredContact"
              checked={form.preferredContact === "text"}
              onChange={() => updateField("preferredContact", "text")}
            />{" "}
            Text
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="preferredContact"
              checked={form.preferredContact === "call"}
              onChange={() => updateField("preferredContact", "call")}
            />{" "}
            Call
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="preferredContact"
              checked={form.preferredContact === "email"}
              onChange={() => updateField("preferredContact", "email")}
            />{" "}
            Email
          </label>
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">Were you referred to me?</div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="referredToMe"
              checked={form.referredToMe === "yes"}
              onChange={() => updateField("referredToMe", "yes")}
            />{" "}
            Yes
          </label>
        </div>
        <div className="option-row">
          <label>
            <input
              type="radio"
              name="referredToMe"
              checked={form.referredToMe === "no"}
              onChange={() => updateField("referredToMe", "no")}
            />{" "}
            No
          </label>
        </div>

        {form.referredToMe === "yes" && (
          <div style={{ marginTop: "0.75rem" }}>
            <div className="question-text">If so, by who?</div>
            <input
              className="text-input"
              value={form.referrerName}
              onChange={(e) =>
                updateField("referrerName", e.target.value)
              }
            />
          </div>
        )}
      </div>

      <div className="question-block">
        <div className="question-text">Your Time Zone</div>
        <input
          className="text-input"
          value={form.timeZone}
          onChange={(e) => updateField("timeZone", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">City</div>
        <input
          className="text-input"
          value={form.city}
          onChange={(e) => updateField("city", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">State</div>
        <input
          className="text-input"
          value={form.state}
          onChange={(e) => updateField("state", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">Country</div>
        <input
          className="text-input"
          value={form.country}
          onChange={(e) => updateField("country", e.target.value)}
        />
      </div>

      <div className="question-block">
        <div className="question-text">Zip code</div>
        <input
          className="text-input"
          value={form.zipCode}
          onChange={(e) => updateField("zipCode", e.target.value)}
        />
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="card results-card">
        <h2 className="results-title">Your Flight Direction</h2>
        <p className="results-code">
          🔥 Flight Direction: {results.code}
        </p>

        {results.profile ? (
          <>
            <h3 className="results-section-heading">🌬 Core Movement</h3>
            <p className="results-summary">
              {results.profile.coreMovement}
            </p>

            <h3 className="results-section-heading">🕊️ Aligned Practices</h3>
            <ul className="results-list">
              {results.profile.alignedPractices.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="results-section-heading">💛 Aspire to...</h3>
            <p className="results-summary">
              {results.profile.aspireTo}
            </p>

            <h3 className="results-section-heading">🔥 Momentum Mantra</h3>
            <p className="results-mantra">{results.profile.mantra}</p>
          </>
        ) : (
          <p className="results-summary">
            This result does not have a full profile yet, but your scores
            still show how your Being, Flowing, and Trusting movements show
            up together.
          </p>
        )}

        <p className="results-scores">
          🧮 <strong>Being:</strong> {results.being} •{" "}
          <strong>Flowing:</strong> {results.flowing} •{" "}
          <strong>Trusting:</strong> {results.trusting}
        </p>
        <p className="results-note">
          These numbers show how often each movement appeared in your
          answers.
        </p>
      </div>
    );
  };

  return (
    <>
      {renderTabs()}

      {section === 1 && renderSection1()}
      {section === 2 && renderSection2()}
      {section === 3 && renderSection3()}
      {section === 4 && renderSection4()}
      {section === 5 && renderSection5()}

      {error && <div className="error">{error}</div>}

      <div className="button-row" style={{ marginTop: "1.75rem" }}>
        {section > 1 && (
          <button
            type="button"
            className="secondary-button"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}

        {section < 5 && (
          <button
            type="button"
            className="primary-button"
            onClick={handleNext}
          >
            Next
          </button>
        )}

        {section === 5 && (
          <button
            type="button"
            className="primary-button"
            onClick={handleFinalSubmit}
          >
            🔥 See My Flight Direction
          </button>
        )}
      </div>

      {renderResults()}
    </>
  );
};

function submitToGoogleSheet(payload: SheetPayload) {
  // Wire this to your Apps Script / backend when you're ready.
  console.log("Submitting full application:", payload);
}

export default MultiSectionApplication;
