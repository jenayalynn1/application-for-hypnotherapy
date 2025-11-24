import React, { useEffect, useState } from 'react';
import './App.css';

type Trait = 'Being' | 'Flowing' | 'Trusting';

interface Option {
  text: string;
  trait: Trait;
}

interface Question {
  text: string;
  options: Option[];
}

interface AnswerRecord {
  index: number;
  question: string;
  answer: string;
  trait: Trait;
}

interface FlightProfile {
  coreMovement: string;
  alignedPractices: string[];
  aspireTo: string;
  mantra: string;
}

interface SheetPayload {
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  breathingRhythmType: string;
  inhaleType: string;
  exhaleType: string;
  customTypeLabel: string;
  rawScoresJson: string;
  quizTitle: string;
  quizDescription: string;
  phoneNumber: string;
  sessionInterest: string;
  referralSource: string;
  notes: string;
  adminEmailBody: string;
  quizType: string;
  beingScore: number;
  flowingScore: number;
  trustingScore: number;
}

const QUESTIONS: Question[] = [
  {
    text: 'When something goes wrong',
    options: [
      {
        text: 'I think about it a lot and wonder what it means about me.',
        trait: 'Being',
      },
      {
        text: 'I hurry to fix it or make everyone feel better.',
        trait: 'Flowing',
      },
      {
        text: 'I plan what to do next so it won’t happen again.',
        trait: 'Trusting',
      },
    ],
  },
  {
    text: 'When someone is upset with me',
    options: [
      {
        text: 'I explain what I meant and take charge to fix it.',
        trait: 'Trusting',
      },
      {
        text: 'I go over what I said and worry how it sounded.',
        trait: 'Being',
      },
      {
        text: 'I say sorry fast and try to make peace.',
        trait: 'Flowing',
      },
    ],
  },
  {
    text: 'When I feel nervous or off balance',
    options: [
      {
        text: 'I stay busy helping others.',
        trait: 'Flowing',
      },
      {
        text: 'I clean up or plan to feel in control again.',
        trait: 'Trusting',
      },
      {
        text: 'I think about every reason I might feel this way.',
        trait: 'Being',
      },
    ],
  },
  {
    text: 'When I make a mistake',
    options: [
      {
        text: 'I feel bad and think hard about why it happened.',
        trait: 'Being',
      },
      {
        text: 'I try even harder to make up for it.',
        trait: 'Flowing',
      },
      {
        text: 'I set new rules so it won’t happen again.',
        trait: 'Trusting',
      },
    ],
  },
  {
    text: 'When someone lets me down',
    options: [
      {
        text: 'I make new rules or step back to stay safe.',
        trait: 'Trusting',
      },
      {
        text: 'I wonder why they did that.',
        trait: 'Being',
      },
      {
        text: 'I forgive them and do the extra work myself.',
        trait: 'Flowing',
      },
    ],
  },
  {
    text: 'When life slows down',
    options: [
      {
        text: 'I look for someone or something that still needs me.',
        trait: 'Flowing',
      },
      {
        text: 'I get restless and find something to do.',
        trait: 'Trusting',
      },
      {
        text: 'I start thinking deeply and lose track of time.',
        trait: 'Being',
      },
    ],
  },
  {
    text: 'When people don’t understand me',
    options: [
      {
        text: 'I wonder what I did wrong.',
        trait: 'Being',
      },
      {
        text: 'I explain myself again and again to make peace.',
        trait: 'Flowing',
      },
      {
        text: 'I set things straight so it won’t happen next time.',
        trait: 'Trusting',
      },
    ],
  },
  {
    text: 'When there is conflict',
    options: [
      {
        text: 'I set clear limits to stop the fight.',
        trait: 'Trusting',
      },
      {
        text: 'I try to understand everyone’s side first.',
        trait: 'Being',
      },
      {
        text: 'I make peace, even if it costs me.',
        trait: 'Flowing',
      },
    ],
  },
  {
    text: 'When I succeed at something',
    options: [
      {
        text: 'I think about how to use it to help others.',
        trait: 'Flowing',
      },
      {
        text: 'I make a new goal to keep going.',
        trait: 'Trusting',
      },
      {
        text: 'I ask myself what this says about me.',
        trait: 'Being',
      },
    ],
  },
  {
    text: 'When change is coming',
    options: [
      {
        text: 'I look for the lesson in it.',
        trait: 'Being',
      },
      {
        text: 'I go along and help others feel okay.',
        trait: 'Flowing',
      },
      {
        text: 'I plan ahead for what might happen.',
        trait: 'Trusting',
      },
    ],
  },
  {
    text: 'My thoughts when I’m stressed',
    options: [
      {
        text: '“I need to take control right now.”',
        trait: 'Trusting',
      },
      {
        text: '“Why am I like this? I should know better.”',
        trait: 'Being',
      },
      {
        text: '“I can fix this if I keep trying.”',
        trait: 'Flowing',
      },
    ],
  },
  {
    text: 'Deep down, when things are hard',
    options: [
      {
        text: 'I feel worried until everyone else is okay.',
        trait: 'Flowing',
      },
      {
        text: 'I feel tight and under pressure to hold things together.',
        trait: 'Trusting',
      },
      {
        text: 'I feel sad or ashamed I can’t fix it.',
        trait: 'Being',
      },
    ],
  },
];

const FLIGHT_PROFILES: Record<string, FlightProfile> = {
  'Being > Flowing': {
    coreMovement:
      'Your flight direction is toward Being and Flowing. You grow by understanding that simply being is an honest expression of your identity. When you flow with inspiration instead of forcing outcomes, being yourself becomes more natural.',
    alignedPractices: [
      'Lean into choices that you are inspired to make.',
      'Express yourself with simplicity instead of overthinking.',
      'Choose small areas of your life to go with the flow.',
      'Before you try doing, allow yourself to just be.',
    ],
    aspireTo: 'A steady, relaxed openness that allows clarity and ease to work together.',
    mantra: '“My truth moves naturally when I let myself be.”',
  },

  'Being > Trusting': {
    coreMovement:
      'Your flight direction is toward Being and Trusting. Your growth lies in first trusting yourself to simply be who you are. Support becomes easier to receive when you’re rooted in who you are.',
    alignedPractices: [
      'Embrace moments that confirm your sense of self.',
      'Invite small experiences of safe connection.',
      'Choose trust at a pace that feels grounded and real.',
      'Let yourself rely on others one step at a time.',
    ],
    aspireTo: 'Grounded openness that doesn’t rush or force itself.',
    mantra: '“When I stand in my truth, trust grows naturally.”',
  },

  'Trusting > Being': {
    coreMovement:
      'Your flight direction is toward Trusting and Being. Your growth lies in opening yourself to experiences, and letting that openness help you understand who you’re becoming. Your identity grows from the moments you allow in.',
    alignedPractices: [
      'Lean into curiosity about what feels true for you.',
      'Invite new experiences without pressure to commit.',
      'Choose reflection after exploration, not before.',
      'Let identity form from honest lived moments.',
    ],
    aspireTo: 'Gentle courage that welcomes new information about yourself.',
    mantra: '“I discover myself through what I let in.”',
  },

  'Trusting > Flowing': {
    coreMovement:
      'Your flight direction is toward Trusting and Flowing. Your growth is in letting yourself trust the moment, and allowing your energy to soften and move more freely. Ease shows up when you stop bracing and follow what feels aligned.',
    alignedPractices: [
      'Trust your instincts when something feels right.',
      'Invite small moments of ease throughout your day.',
      'Choose expression without worrying about perfection.',
      'Let trust support the pace of your movement.',
    ],
    aspireTo: 'Calm confidence that lets rhythm develop naturally.',
    mantra: '“Ease finds me when I trust the moment I’m in.”',
  },

  'Flowing > Being': {
    coreMovement:
      'Your flight direction is toward Flowing and Being. Your growth lies in sensing your way forward and then letting that rhythm help you understand yourself more clearly. Your identity settles naturally when you listen to what feels true.',
    alignedPractices: [
      'Lean into the movements and choices that inspire you.',
      'Invite stillness afterward to understand their meaning.',
      'Choose identity from experiences, not expectations.',
      'Let your rhythm guide what becomes real for you.',
    ],
    aspireTo: 'Attuned presence that listens inwardly.',
    mantra: '“My rhythm reveals who I am.”',
  },

  'Flowing > Trusting': {
    coreMovement:
      'Your flight direction is toward Flowing and Trusting. Your growth lies in following the rhythm of your own movement, and allowing trust to grow once something feels aligned in your body. You open up at the pace that fits your inner rhythm.',
    alignedPractices: [
      'Lean into embodied decisions that feel steady.',
      'Invite support after you feel the internal yes.',
      'Choose connection that respects your natural pace.',
      'Let trust emerge from your felt sense, not pressure.',
    ],
    aspireTo: 'Intuitive openness guided by bodily alignment.',
    mantra: '“I trust what aligns with my rhythm.”',
  },

  'Being = Flowing': {
    coreMovement:
      'Your flight direction balances Being and Flowing. You feel most like yourself when your clarity and your ease work together. Who you are and how you move don’t need to be separate steps.',
    alignedPractices: [
      'Lean into decisions that feel both true and light.',
      'Invite simple expression without rehearsing it.',
      'Choose a pace that honors your energy.',
      'Let authenticity guide your presence and movement equally.',
    ],
    aspireTo: 'Relaxed alignment between identity and expression.',
    mantra: '“I move as myself without effort.”',
  },

  'Being = Trusting': {
    coreMovement:
      'Your flight direction balances Being and Trusting. Your self-awareness supports your openness, and your openness strengthens your sense of self. Trust becomes simpler when it grows from your own clarity.',
    alignedPractices: [
      'Lean into clarity that comes from honest reflection.',
      'Invite connection slowly and meaningfully.',
      'Choose presence instead of prediction.',
      'Let trust build from what feels internally true.',
    ],
    aspireTo: 'Grounded receptivity.',
    mantra: '“I trust in ways that honor who I am.”',
  },

  'Flowing = Trusting': {
    coreMovement:
      'Your flight direction balances Flowing and Trusting. When you trust the moment, your expression becomes easier and more natural. You stay open while letting your energy move in a way that feels right for you.',
    alignedPractices: [
      'Lean into reciprocity in relationships.',
      'Invite softness instead of guarding.',
      'Choose expression without overthinking.',
      'Let trust give your movement its rhythm.',
    ],
    aspireTo: 'Relaxed receptivity with gentle momentum.',
    mantra: '“I express myself more easily when I trust where I am.”',
  },

  'Being = Flowing = Trusting': {
    coreMovement:
      'Your flight direction holds Being, Flowing, and Trusting together. All three movements are active in you, which means you carry identity, ease, and openness at the same time. Your work is learning which one needs to lead in each moment without abandoning the others.',
    alignedPractices: [
      'Notice which movement is speaking the loudest—Being, Flowing, or Trusting—before you act.',
      'Invite small experiments where one movement leads and the other two support.',
      'Reflect afterward: “Did I let one part run the show, or did they work together?”',
      'Let yourself shift roles gently instead of trying to be everything at once.',
    ],
    aspireTo:
      'Integrated curiosity — willing to rotate leadership among your inner movements while staying whole.',
    mantra: '“All of my movements belong; I choose which one leads right now.”',
  },
};

function computeFlightDirection(
  answers: AnswerRecord[],
): { code: string; being: number; flowing: number; trusting: number } {
  let being = 0;
  let flowing = 0;
  let trusting = 0;

  // Count how many times each movement shows up
  answers.forEach((a) => {
    if (a.trait === 'Being') being++;
    if (a.trait === 'Flowing') flowing++;
    if (a.trait === 'Trusting') trusting++;
  });

  const scores: Record<Trait, number> = {
    Being: being,
    Flowing: flowing,
    Trusting: trusting,
  };
  const traits: Trait[] = ['Being', 'Flowing', 'Trusting'];

  const max = Math.max(being, flowing, trusting);
  const topTraits = traits.filter((t) => scores[t] === max);

  // Triple tie — all equal
  if (topTraits.length === 3) {
    return { code: 'Being = Flowing = Trusting', being, flowing, trusting };
  }

  // Double tie — order does NOT matter for "="
  if (topTraits.length === 2) {
    // Normalize so it always matches your profile keys:
    // Being + Flowing   -> "Being = Flowing"
    // Being + Trusting  -> "Being = Trusting"
    // Flowing + Trusting-> "Flowing = Trusting"
    const sorted = [...topTraits].sort(); // alphabetical: Being, Flowing, Trusting
    const [a, b] = sorted;
    const code = `${a} = ${b}`;
    return { code, being, flowing, trusting };
  }

  // One clear leader — order DOES matter for ">"
  const primary = topTraits[0];
  const remaining = traits.filter((t) => t !== primary);
  const secondMax = Math.max(scores[remaining[0]], scores[remaining[1]]);
  const secondCandidates = remaining.filter((t) => scores[t] === secondMax);

  // Break tie for secondary using a stable order
  const order: Trait[] = ['Being', 'Flowing', 'Trusting'];
  const secondary =
    secondCandidates.length === 1
      ? secondCandidates[0]
      : (order.find((t) => secondCandidates.includes(t)) as Trait);

  const code = `${primary} > ${secondary}`;
  return { code, being, flowing, trusting };
}

const App: React.FC = () => {
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
    const id = 'sofia-google-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Sofia&display=swap';
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
        setError('Please answer all questions before seeing your result.');
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
      firstName: '',
      lastName: '',
      email: '',
      breathingRhythmType: '',
      inhaleType: '',
      exhaleType: '',
      customTypeLabel: '',
      rawScoresJson: JSON.stringify(records),
      quizTitle: 'The Three Contradictions Quiz',
      quizDescription: 'Measures how Being, Flowing, and Trusting move together in your system.',
      phoneNumber: '',
      sessionInterest: '',
      referralSource: '',
      notes: '',
      adminEmailBody: '',
      quizType: 'threeContradictions',
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

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setAnswers({});
    setResults(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            For each statement, select the one that feels most true for you right now.
          </p>
          <p className="subtitle">
            There are no wrong answers — each response reflects a pattern of energy within the Self.
          </p>
          <p className="signature">Jenayalynn</p>
        </header>

        {!results && (
          <main>
            <form className="card">
              {QUESTIONS.map((q, idx) => (
                <div key={idx} className="question-block">
                  <div className="question-text">
                    <span className="question-number">{idx + 1}.</span> {q.text}
                  </div>
                  <div>
                    {q.options.map((opt, oIdx) => {
                      const selected = answers[idx] === opt.trait;
                      return (
                        <div
                          key={oIdx}
                          className={`option-row ${selected ? 'option-selected' : ''}`}
                          onClick={() => handleSelect(idx, opt.trait)}
                        >
                          <div className={`radio ${selected ? 'radio-selected' : ''}`}>
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
              <button type="button" className="primary-button" onClick={handleSubmit}>
                🔥 See My Flight Direction
              </button>
            </div>
          </main>
        )}

        {results && (
          <main>
            <div className="card results-card">
              <h2 className="results-title">Your Flight Direction</h2>
              <p className="results-code">🔥 Flight Direction: {results.code}</p>

              {results.profile ? (
                <>
                  <h3 className="results-section-heading">🌬 Core Movement</h3>
                  <p className="results-summary">{results.profile.coreMovement}</p>

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
                  This result does not have a full profile yet, but your scores still show how your
                  Being, Flowing, and Trusting movements show up together.
                </p>
              )}

              <p className="results-scores">
                🧮 <strong>Being:</strong> {results.being} • <strong>Flowing:</strong>{' '}
                {results.flowing} • <strong>Trusting:</strong> {results.trusting}
              </p>
              <p className="results-note">
                These numbers show how often each movement appeared in your answers.
              </p>

              <div className="button-row results-buttons">
                <button type="button" className="secondary-button" onClick={handleRestart}>
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
  // This is a stub so the app compiles.
  // Wire this to your actual Google Apps Script / endpoint when you're ready.
  console.log('Submitting to Google Sheet:', payload);
}

export default App;
