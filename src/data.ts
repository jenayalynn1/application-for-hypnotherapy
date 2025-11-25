// src/data.ts
// Temporary data + types for The Three Contradictions Quiz.
// This is a placeholder so the app compiles and runs.
// Replace QUESTIONS and FLIGHT_PROFILES with your real content when you're ready.

export type Trait = "being" | "flowing" | "trusting";

export interface QuestionOption {
  text: string;
  trait: Trait;
}

export interface Question {
  text: string;
  options: QuestionOption[];
}

export interface AnswerRecord {
  index: number;
  question: string;
  answer: string;
  trait: Trait;
}

export interface FlightProfile {
  coreMovement: string;
  alignedPractices: string[];
  aspireTo: string;
  mantra: string;
}

export interface SheetPayload {
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

// 🔸 PLACEHOLDER QUESTIONS 🔸
// Replace these with your real Three Contradictions questions later.
// Structure MUST stay: text + options with trait = "being" | "flowing" | "trusting".
export const QUESTIONS: Question[] = [
  {
    text:
      "When life feels challenging, which experience feels most familiar to you?",
    options: [
      {
        text: "I question who I am and whether I’m enough.",
        trait: "being",
      },
      {
        text: "I try to adjust, fix, or do more so things feel smoother.",
        trait: "flowing",
      },
      {
        text: "I scan for what might go wrong and try to stay prepared.",
        trait: "trusting",
      },
    ],
  },
  {
    text: "When you imagine feeling truly safe in yourself, what stands out?",
    options: [
      {
        text: "Knowing deeply that who I am is already worthy.",
        trait: "being",
      },
      {
        text: "Feeling like my actions and relationships move with ease.",
        trait: "flowing",
      },
      {
        text: "Feeling like I can rest without waiting for the next problem.",
        trait: "trusting",
      },
    ],
  },
  {
    text: "When you feel stuck, what do you most often wrestle with?",
    options: [
      {
        text: "Feeling like I’m not allowed to be my full self.",
        trait: "being",
      },
      {
        text: "Feeling like I have to keep managing everyone and everything.",
        trait: "flowing",
      },
      {
        text: "Feeling like if I let go, everything will fall apart.",
        trait: "trusting",
      },
    ],
  },
];

// 🔸 Simple helper: count traits in the answers 🔸
function countTrait(records: AnswerRecord[], target: Trait): number {
  return records.reduce(
    (sum, rec) => (rec.trait === target ? sum + 1 : sum),
    0
  );
}

// 🔸 Compute a simple “flight direction” code from trait counts 🔸
// This is a placeholder logic — you can replace with your original mapping later.
export function computeFlightDirection(records: AnswerRecord[]): {
  code: string;
  being: number;
  flowing: number;
  trusting: number;
} {
  const being = countTrait(records, "being");
  const flowing = countTrait(records, "flowing");
  const trusting = countTrait(records, "trusting");

  // Find which trait(s) are strongest
  const max = Math.max(being, flowing, trusting);
  const active: Trait[] = [];
  if (being === max) active.push("being");
  if (flowing === max) active.push("flowing");
  if (trusting === max) active.push("trusting");

  // Build a code like "B", "F", "T", "BF", "BT", "FT", or "BFT"
  const code =
    active
      .map((t) =>
        t === "being" ? "B" : t === "flowing" ? "F" : "T"
      )
      .join("") || "NONE";

  return { code, being, flowing, trusting };
}

// 🔸 Minimal placeholder profiles for each code 🔸
// Replace coreMovement, alignedPractices, aspireTo, and mantra with your real text later.
export const FLIGHT_PROFILES: Record<string, FlightProfile> = {
  B: {
    coreMovement:
      "Your growth leans toward Being — remembering who you are beneath roles, expectations, and pressure.",
    alignedPractices: [
      "Spend time naming what is true about you that does not depend on performance.",
      "Stay close to environments where your presence feels welcomed, not earned.",
    ],
    aspireTo:
      "Let your identity feel less conditional and more like a steady inner presence.",
    mantra: "I’m allowed to exist as I am, even before I improve.",
  },
  F: {
    coreMovement:
      "Your growth leans toward Flowing — letting action come from alignment instead of pressure.",
    alignedPractices: [
      "Notice where you push yourself to move faster than your nervous system can hold.",
      "Experiment with doing less while staying more honest in what you do.",
    ],
    aspireTo:
      "Let movement feel like an honest extension of your truth, not a constant performance.",
    mantra: "I move at the pace of my real capacity.",
  },
  T: {
    coreMovement:
      "Your growth leans toward Trusting — loosening your grip on control and hypervigilance.",
    alignedPractices: [
      "Let small, low-stakes parts of life be imperfect and unresolved.",
      "Practice naming what is already working instead of scanning only for threat.",
    ],
    aspireTo:
      "Let trust feel like a gentle resting place inside, not a test you have to pass.",
    mantra: "I do not have to guard everything all the time.",
  },
  BF: {
    coreMovement:
      "You are learning to let your sense of self (Being) and your expression (Flowing) support each other.",
    alignedPractices: [
      "Let your actions come from a more honest sense of who you are.",
      "Soften the urge to perform for safety, and move from authenticity instead.",
    ],
    aspireTo:
      "Let your real self and your visible actions feel more like the same person.",
    mantra: "My presence and my expression belong to the same self.",
  },
  BT: {
    coreMovement:
      "You are learning to let your identity feel safe enough that trust does not require constant proof.",
    alignedPractices: [
      "Gently question old stories that say you are only safe when you are perfect.",
      "Let your worth feel less tied to how well you prevent problems.",
    ],
    aspireTo:
      "Let your sense of self feel held, even when life is uncertain.",
    mantra: "I can be who I am without watching everything at once.",
  },
  FT: {
    coreMovement:
      "You are learning to let your movement and your trust work together, instead of living in constant management mode.",
    alignedPractices: [
      "Let some actions be guided by curiosity instead of fear.",
      "Notice where you over-manage and gently step back for a breath.",
    ],
    aspireTo:
      "Let life move through you with less gripping and more partnership.",
    mantra: "I can move and still let go a little.",
  },
  BFT: {
    coreMovement:
      "All three contradictions are active — Being, Flowing, and Trusting are all in the mix.",
    alignedPractices: [
      "Choose one small area of life to practice safety in who you are, how you move, and how you let go.",
      "Treat this as a layered journey, not something to fix in one leap.",
    ],
    aspireTo:
      "Let the different parts of you learn to work together instead of competing.",
    mantra: "All of my movements are welcome in this process.",
  },
  NONE: {
    coreMovement:
      "Not enough answers were recorded to map a clear flight direction yet.",
    alignedPractices: [
      "Come back to the quiz when you have the capacity to reflect more fully.",
    ],
    aspireTo:
      "Let this be a starting point, not a verdict on who you are.",
    mantra: "I can return to this when I’m ready.",
  },
};
