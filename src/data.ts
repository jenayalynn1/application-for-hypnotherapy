// Quiz data and scoring logic for The Three Contradictions Quiz

export type Trait = "being" | "flowing" | "trusting";

export interface Option {
  text: string;
  trait: Trait;
}

export interface Question {
  text: string;
  options: Option[];
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

export const QUESTIONS: Question[] = [
  {
    text: "When something goes wrong",
    options: [
      {
        text: "I think about it a lot and wonder what it means about me.",
        trait: "being",
      },
      {
        text: "I hurry to fix it or make everyone feel better.",
        trait: "flowing",
      },
      {
        text: "I plan what to do next so it won't happen again.",
        trait: "trusting",
      },
    ],
  },
  {
    text: "When someone is upset with me",
    options: [
      {
        text: "I explain what I meant and take charge to fix it.",
        trait: "trusting",
      },
      {
        text: "I go over what I said and worry how it sounded.",
        trait: "being",
      },
      {
        text: "I say sorry fast and try to make peace.",
        trait: "flowing",
      },
    ],
  },
  {
    text: "When I feel nervous or off balance",
    options: [
      {
        text: "I stay busy helping others.",
        trait: "flowing",
      },
      {
        text: "I clean up or plan to feel in control again.",
        trait: "trusting",
      },
      {
        text: "I think about every reason I might feel this way.",
        trait: "being",
      },
    ],
  },
  {
    text: "When I make a mistake",
    options: [
      {
        text: "I feel bad and think hard about why it happened.",
        trait: "being",
      },
      {
        text: "I try even harder to make up for it.",
        trait: "flowing",
      },
      {
        text: "I set new rules so it won't happen again.",
        trait: "trusting",
      },
    ],
  },
  {
    text: "When someone lets me down",
    options: [
      {
        text: "I make new rules or step back to stay safe.",
        trait: "trusting",
      },
      {
        text: "I wonder why they did that.",
        trait: "being",
      },
      {
        text: "I forgive them and do the extra work myself.",
        trait: "flowing",
      },
    ],
  },
  {
    text: "When life slows down",
    options: [
      {
        text: "I look for someone or something that still needs me.",
        trait: "flowing",
      },
      {
        text: "I get restless and find something to do.",
        trait: "trusting",
      },
      {
        text: "I start thinking deeply and lose track of time.",
        trait: "being",
      },
    ],
  },
  {
    text: "When people don't understand me",
    options: [
      {
        text: "I wonder what I did wrong.",
        trait: "being",
      },
      {
        text: "I explain myself again and again to make peace.",
        trait: "flowing",
      },
      {
        text: "I set things straight so it won't happen next time.",
        trait: "trusting",
      },
    ],
  },
  {
    text: "When there is conflict",
    options: [
      {
        text: "I set clear limits to stop the fight.",
        trait: "trusting",
      },
      {
        text: "I try to understand everyone's side first.",
        trait: "being",
      },
      {
        text: "I make peace, even if it costs me.",
        trait: "flowing",
      },
    ],
  },
  {
    text: "When I succeed at something",
    options: [
      {
        text: "I think about how to use it to help others.",
        trait: "flowing",
      },
      {
        text: "I make a new goal to keep going.",
        trait: "trusting",
      },
      {
        text: "I ask myself what this says about me.",
        trait: "being",
      },
    ],
  },
  {
    text: "When change is coming",
    options: [
      {
        text: "I look for the lesson in it.",
        trait: "being",
      },
      {
        text: "I go along and help others feel okay.",
        trait: "flowing",
      },
      {
        text: "I plan ahead for what might happen.",
        trait: "trusting",
      },
    ],
  },
  {
    text: "My thoughts when I'm stressed",
    options: [
      {
        text: ""I need to take control right now."",
        trait: "trusting",
      },
      {
        text: ""Why am I like this? I should know better."",
        trait: "being",
      },
      {
        text: ""I can fix this if I keep trying."",
        trait: "flowing",
      },
    ],
  },
  {
    text: "Deep down, when things are hard",
    options: [
      {
        text: "I feel worried until everyone else is okay.",
        trait: "flowing",
      },
      {
        text: "I feel tight and under pressure to hold things together.",
        trait: "trusting",
      },
      {
        text: "I feel sad or ashamed I can't fix it.",
        trait: "being",
      },
    ],
  },
];

export const FLIGHT_PROFILES: Record<string, FlightProfile> = {
  "being > flowing": {
    coreMovement:
      "Your flight direction is toward being and flowing. You grow by understanding that simply being is an honest expression of your identity. When you flow with inspiration instead of forcing outcomes, being yourself becomes more natural.",
    alignedPractices: [
      "Lean into choices that you are inspired to make.",
      "Express yourself with simplicity instead of overthinking.",
      "Choose small areas of your life to go with the flow.",
      "Before you try doing, allow yourself to just be.",
    ],
    aspireTo:
      "A steady, relaxed openness that allows clarity and ease to work together.",
    mantra: ""My truth moves naturally when I let myself be."",
  },

  "being > trusting": {
    coreMovement:
      "Your flight direction is toward being and trusting. Your growth lies in first trusting yourself to simply be who you are. Support becomes easier to receive when you're rooted in who you are.",
    alignedPractices: [
      "Embrace moments that confirm your sense of self.",
      "Invite small experiences of safe connection.",
      "Choose trust at a pace that feels grounded and real.",
      "Let yourself rely on others one step at a time.",
    ],
    aspireTo: "Grounded openness that doesn't rush or force itself.",
    mantra: ""When I stand in my truth, trust grows naturally."",
  },

  "trusting > being": {
    coreMovement:
      "Your flight direction is toward trusting and being. Your growth lies in opening yourself to experiences, and letting that openness help you understand who you're becoming. Your identity grows from the moments you allow in.",
    alignedPractices: [
      "Lean into curiosity about what feels true for you.",
      "Invite new experiences without pressure to commit.",
      "Choose reflection after exploration, not before.",
      "Let identity form from honest lived moments.",
    ],
    aspireTo:
      "Gentle courage that welcomes new information about yourself.",
    mantra: ""I discover myself through what I let in."",
  },

  "trusting > flowing": {
    coreMovement:
      "Your flight direction is toward trusting and flowing. Your growth is in letting yourself trust the moment, and allowing your energy to soften and move more freely. Ease shows up when you stop bracing and follow what feels aligned.",
    alignedPractices: [
      "Trust your instincts when something feels right.",
      "Invite small moments of ease throughout your day.",
      "Choose expression without worrying about perfection.",
      "Let trust support the pace of your movement.",
    ],
    aspireTo: "Calm confidence that lets rhythm develop naturally.",
    mantra: ""Ease finds me when I trust the moment I'm in."",
  },

  "flowing > being": {
    coreMovement:
      "Your flight direction is toward flowing and being. Your growth lies in sensing your way forward and then letting that rhythm help you understand yourself more clearly. Your identity settles naturally when you listen to what feels true.",
    alignedPractices: [
      "Lean into the movements and choices that inspire you.",
      "Invite stillness afterward to understand their meaning.",
      "Choose identity from experiences, not expectations.",
      "Let your rhythm guide what becomes real for you.",
    ],
    aspireTo: "Attuned presence that listens inwardly.",
    mantra: ""My rhythm reveals who I am."",
  },

  "flowing > trusting": {
    coreMovement:
      "Your flight direction is toward flowing and trusting. Your growth lies in following the rhythm of your own movement, and allowing trust to grow once something feels aligned in your body. You open up at the pace that fits your inner rhythm.",
    alignedPractices: [
      "Lean into embodied decisions that feel steady.",
      "Invite support after you feel the internal yes.",
      "Choose connection that respects your natural pace.",
      "Let trust emerge from your felt sense, not pressure.",
    ],
    aspireTo: "Intuitive openness guided by bodily alignment.",
    mantra: ""I trust what aligns with my rhythm."",
  },

  "being = flowing": {
    coreMovement:
      "Your flight direction balances being and flowing. You feel most like yourself when your clarity and your ease work together. Who you are and how you move don't need to be separate steps.",
    alignedPractices: [
      "Lean into decisions that feel both true and light.",
      "Invite simple expression without rehearsing it.",
      "Choose a pace that honors your energy.",
      "Let authenticity guide your presence and movement equally.",
    ],
    aspireTo: "Relaxed alignment between identity and expression.",
    mantra: ""I move as myself without effort."",
  },

  "being = trusting": {
    coreMovement:
      "Your flight direction balances being and trusting. Your self-awareness supports your openness, and your openness strengthens your sense of self. Trust becomes simpler when it grows from your own clarity.",
    alignedPractices: [
      "Lean into clarity that comes from honest reflection.",
      "Invite connection slowly and meaningfully.",
      "Choose presence instead of prediction.",
      "Let trust build from what feels internally true.",
    ],
    aspireTo: "Grounded receptivity.",
    mantra: ""I trust in ways that honor who I am."",
  },

  "flowing = trusting": {
    coreMovement:
      "Your flight direction balances flowing and trusting. When you trust the moment, your expression becomes easier and more natural. You stay open while letting your energy move in a way that feels right for you.",
    alignedPractices: [
      "Lean into reciprocity in relationships.",
      "Invite softness instead of guarding.",
      "Choose expression without overthinking.",
      "Let trust give your movement its rhythm.",
    ],
    aspireTo: "Relaxed receptivity with gentle momentum.",
    mantra: ""I express myself more easily when I trust where I am."",
  },

  "being = flowing = trusting": {
    coreMovement:
      "Your flight direction holds being, flowing, and trusting together. All three movements are active in you, which means you carry identity, ease, and openness at the same time. Your work is learning which one needs to lead in each moment without abandoning the others.",
    alignedPractices: [
      "Notice which movement is speaking the loudest—being, flowing, or trusting—before you act.",
      "Invite small experiments where one movement leads and the other two support.",
      "Reflect afterward: "Did I let one part run the show, or did they work together?"",
      "Let yourself shift roles gently instead of trying to be everything at once.",
    ],
    aspireTo:
      "Integrated curiosity — willing to rotate leadership among your inner movements while staying whole.",
    mantra:
      ""All of my movements belong; I choose which one leads right now."",
  },
};

export function computeFlightDirection(
  answers: AnswerRecord[]
): { code: string; being: number; flowing: number; trusting: number } {
  let being = 0;
  let flowing = 0;
  let trusting = 0;

  answers.forEach((a) => {
    if (a.trait === "being") being++;
    if (a.trait === "flowing") flowing++;
    if (a.trait === "trusting") trusting++;
  });

  const scores: Record<Trait, number> = {
    being: being,
    flowing: flowing,
    trusting: trusting,
  };
  const traits: Trait[] = ["being", "flowing", "trusting"];

  const max = Math.max(being, flowing, trusting);
  const topTraits = traits.filter((t) => scores[t] === max);

  // Triple tie
  if (topTraits.length === 3) {
    return { code: "being = flowing = trusting", being, flowing, trusting };
  }

  // Double tie → use "=" ordering
  if (topTraits.length === 2) {
    const sorted = [...topTraits].sort(); // alphabetical
    const [a, b] = sorted;
    const code = `${a} = ${b}`;
    return { code, being, flowing, trusting };
  }

  // One clear leader → ">" code
  const primary = topTraits[0];
  const remaining = traits.filter((t) => t !== primary);
  const secondMax = Math.max(scores[remaining[0]], scores[remaining[1]]);
  const secondCandidates = remaining.filter((t) => scores[t] === secondMax);

  const order: Trait[] = ["being", "flowing", "trusting"];
  const secondary =
    secondCandidates.length === 1
      ? secondCandidates[0]
      : (order.find((t) => secondCandidates.includes(t)) as Trait);

  const code = `${primary} > ${secondary}`;
  return { code, being, flowing, trusting };
}
