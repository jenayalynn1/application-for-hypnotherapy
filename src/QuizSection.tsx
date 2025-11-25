import type {
  Trait,
  FlightProfile,
  AnswerRecord,
  SheetPayload
} from "./data";

import {
  QUESTIONS,
  FLIGHT_PROFILES,
  computeFlightDirection
} from "./data";

const QuizSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, Trait | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    code: string;
    profile: FlightProfile | null;
    details: AnswerRecord[];
    being: number;
    flowing: number;
    trusting: number;
  } | null>(null);

  useEffect(() => {
    const id = "sofia-google-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Sofia&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const handleSelect = (qIndex: number, trait: Trait) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: trait,
    }));
    setError(null);
  };

  const handleSubmit = () => {
    for (let i = 0; i < QUESTIONS.length; i++) {
      if (!answers[i]) {
        setError("Please answer all questions before seeing your result.");
        return;
      }
    }

    const records: AnswerRecord[] = QUESTIONS.map((q, idx) => {
      const trait = answers[idx] as Trait;
      const option = q.options.find((o) => o.trait === trait)!;
      return {
        index: idx,
        question: q.text,
        answer: option.text,
        trait,
      };
    });

    const { code, being, flowing, trusting } = computeFlightDirection(records);
    const profile = FLIGHT_PROFILES[code] ?? null;

    const payload: SheetPayload = {
      timestamp: new Date().toISOString(),
      firstName: "",
      lastName: "",
      email: "",
      breathingRhythmType: "",
      inhaleType: "",
      exhaleType: "",
      customTypeLabel: "",
      rawScoresJson: JSON.stringify(records),
      quizTitle: "The Three Contradictions Quiz",
      quizDescription:
        "Measures how Being, Flowing, and Trusting move together in your system.",
      phoneNumber: "",
      sessionInterest: "",
      referralSource: "",
      notes: "",
      adminEmailBody: "",
      quizType: "threeContradictions",
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setAnswers({});
    setResults(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        {!results && (
          <main>
            <form className="card">
              {QUESTIONS.map((q, idx) => (
                <div key={idx} className="question-block">
                  <div className="question-text">
                    <span className="question-number">{idx + 1}.</span>{" "}
                    {q.text}
                  </div>
                  <div>
                    {q.options.map((opt, oIdx) => {
                      const selected = answers[idx] === opt.trait;
                      return (
                        <div
                          key={oIdx}
                          className={`option-row ${
                            selected ? "option-selected" : ""
                          }`}
                          onClick={() => handleSelect(idx, opt.trait)}
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
            </form>

            {error && <div className="error">{error}</div>}

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleSubmit}
              >
                🔥 See My Flight Direction
              </button>
            </div>
          </main>
        )}

        {results && (
          <main>
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
                  <p className="results-summary">{results.profile.aspireTo}</p>

                  <h3 className="results-section-heading">🔥 Momentum Mantra</h3>
                  <p className="results-mantra">{results.profile.mantra}</p>
                </>
              ) : (
                <p className="results-summary">
                  This result does not have a full profile yet, but your scores
                  still show how your Being, Flowing, and Trusting movements
                  show up together.
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

              <div className="button-row results-buttons">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleRestart}
                >
                  🔁 Retake Quiz
                </button>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

function submitToGoogleSheet(payload: SheetPayload) {
  // You already had this stub — nothing changes here
  console.log("Submitting to Google Sheet:", payload);
}

export default QuizSection;
