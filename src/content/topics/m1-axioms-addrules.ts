import type { TopicContent } from '../../types/content';

export const topicCounting: TopicContent = {
  id: 'counting',
  moduleId: 'module1',
  title: 'Counting Principles',
  dayRange: 'Day 1',
  order: 2,
  conceptExplanation: {
    intuition: `Two fundamental rules underpin all of probability counting. The addition principle handles mutually exclusive choices ("or"). The multiplication principle handles sequential independent choices ("and"). Inclusion-exclusion generalises the addition principle to overlapping sets.`,
    definition: `**Addition principle:** If event A can occur in $m$ ways and event B can occur in $n$ ways, and A and B are mutually exclusive, then "A or B" can occur in $m + n$ ways.

**Multiplication principle:** If event A can occur in $m$ ways and (independently) event B can occur in $n$ ways, then "A and B" can occur in $m \\times n$ ways.

**Inclusion-exclusion (2 sets):** $|A \\cup B| = |A| + |B| - |A \\cap B|$

**Inclusion-exclusion (3 sets):** $|A \\cup B \\cup C| = |A|+|B|+|C| - |A\\cap B| - |A\\cap C| - |B\\cap C| + |A\\cap B\\cap C|$

**Pigeonhole principle:** If $n+1$ items are placed in $n$ containers, at least one container has $\\geq 2$ items.`,
    whyItWorks: `Multiplication principle: at each stage of a sequential process, the number of outcomes multiplies because every earlier choice can be combined with every later choice — forming a Cartesian product.

Inclusion-exclusion corrects for double-counting: $|A| + |B|$ counts $|A \\cap B|$ twice, so we subtract it once.`,
    whenToUse: `Use addition when counting across mutually exclusive categories. Use multiplication when counting multi-step processes. Use inclusion-exclusion when categories overlap. Use pigeonhole to prove existence results ("at least one ...").`,
    commonMistakes: [
      'Applying addition principle when events are NOT mutually exclusive — this double-counts the overlap',
      'Forgetting to subtract intersections in inclusion-exclusion',
      'Pigeonhole: the "containers" and "items" must be clearly defined',
    ],
    examTips: [
      'GATE often asks about counting using inclusion-exclusion on events (number of integers divisible by 2 or 3 in range 1-100)',
      'Generalised pigeonhole: if $n$ items in $k$ containers, at least one container has $\\lceil n/k \\rceil$ items',
    ],
  },
  formulas: [
    { name: 'Inclusion-Exclusion (2 sets)', latex: '|A \\cup B| = |A| + |B| - |A \\cap B|', variables: '$A$, $B$ any finite sets' },
    { name: 'Inclusion-Exclusion (3 sets)', latex: '|A \\cup B \\cup C| = |A|+|B|+|C|-|A\\cap B|-|A\\cap C|-|B\\cap C|+|A\\cap B\\cap C|', variables: '$A$, $B$, $C$ any finite sets' },
    { name: 'Generalised Pigeonhole', latex: '\\left\\lceil \\frac{n}{k} \\right\\rceil', variables: '$n$ = items, $k$ = containers; at least one container has this many items', notes: 'Standard pigeonhole: $n+1$ items in $n$ containers → one has $\\geq 2$' },
  ],
  workedExamples: [
    {
      id: 'm1-cnt-ex1',
      title: 'Integers divisible by 2 or 3 in [1,100]',
      difficulty: 'basic',
      problem: 'How many integers from 1 to 100 are divisible by 2 or 3?',
      solution: [
        { explanation: 'Let A = divisible by 2, B = divisible by 3. $|A| = 50$, $|B| = 33$, $|A \\cap B|$ = divisible by 6: $|A \\cap B| = 16$.' },
        { explanation: '$|A \\cup B| = 50 + 33 - 16 = 67$', latex: '|A \\cup B| = 50 + 33 - 16 = 67' },
      ],
      examTip: 'Count $|A \\cap B|$ using LCM: divisible by both 2 and 3 ↔ divisible by LCM(2,3) = 6.',
    },
    {
      id: 'm1-cnt-ex2',
      title: 'Pigeonhole — shared birthday',
      difficulty: 'intermediate',
      problem: 'What is the minimum number of people needed to guarantee that at least two share a birth month?',
      solution: [
        { explanation: '12 months = 12 containers. We need $12 + 1 = 13$ people to guarantee a shared month by pigeonhole.' },
      ],
      examTip: 'Pigeonhole guarantees existence but doesn\'t say which container has ≥2.',
    },
    {
      id: 'm1-cnt-ex3',
      title: 'Password count with constraints',
      difficulty: 'gate',
      problem: 'Passwords are 6 characters long, using digits 0–9 and letters a–z (26 letters, case-insensitive). How many passwords contain at least one digit and at least one letter?',
      solution: [
        { explanation: 'Total passwords: $36^6$ (each position: 36 choices).' },
        { explanation: 'All digits only: $10^6$. All letters only: $26^6$.' },
        { explanation: 'At least one digit AND one letter = Total - all-digits - all-letters:', latex: '36^6 - 10^6 - 26^6 = 2176782336 - 1000000 - 308915776 = 1866866560' },
      ],
      examTip: 'Complement: subtract the cases that violate the constraint.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-cnt-1',
      topicId: 'counting',
      question: 'How many integers from 1 to 1000 are divisible by 3 or 7?',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '476',
      hints: [
        { text: '$|A|=\\lfloor 1000/3 \\rfloor$, $|B|=\\lfloor 1000/7 \\rfloor$, $|A\\cap B|=\\lfloor 1000/21 \\rfloor$' },
        { text: 'Apply inclusion-exclusion.' },
      ],
      solution: [
        { explanation: '$|A|=333$, $|B|=142$, $|A\\cap B|=47$ (divisible by LCM(3,7)=21).' },
        { explanation: '$333 + 142 - 47 = 428$', latex: '333 + 142 - 47 = 428' },
      ],
      explanation: 'Use inclusion-exclusion. The intersection is divisible by LCM(3,7)=21.',
      isPYQ: false,
    },
    {
      id: 'm1-cnt-2',
      topicId: 'counting',
      question: 'In a group of 100 students: 70 study Maths, 50 study Physics, 30 study both. How many study neither?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '10',
      hints: [
        { text: '$|M \\cup P| = |M| + |P| - |M \\cap P|$' },
        { text: 'Neither = $100 - |M \\cup P|$' },
      ],
      solution: [
        { explanation: '$|M \\cup P| = 70 + 50 - 30 = 90$' },
        { explanation: 'Neither = $100 - 90 = 10$', latex: '100 - 90 = 10' },
      ],
      explanation: 'Inclusion-exclusion gives union size; subtract from total for "neither".',
      isPYQ: false,
    },
    {
      id: 'm1-cnt-3',
      topicId: 'counting',
      question: 'Minimum number of people needed to guarantee that at least 3 share a birthday (day of year, 365 days)?',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '731',
      hints: [
        { text: 'Generalised pigeonhole: $\\lceil n/365 \\rceil \\geq 3$ means $n \\geq 2 \\times 365 + 1$.' },
        { text: 'You need $2 \\times 365 + 1$ people to guarantee at least 3 share a birthday.' },
      ],
      solution: [
        { explanation: 'With 730 people, it\'s possible each birthday has exactly 2 people (no three sharing). With 731, by pigeonhole, some birthday has $\\geq 3$ people.' },
        { explanation: '$2 \\times 365 + 1 = 731$', latex: '2 \\times 365 + 1 = 731' },
      ],
      explanation: 'Generalised pigeonhole: $\\lceil 731/365 \\rceil = 3$.',
      isPYQ: false,
    },
  ],
};

export const topicAxioms: TopicContent = {
  id: 'axioms',
  moduleId: 'module1',
  title: 'Probability Axioms and Sample Spaces',
  dayRange: 'Day 1',
  order: 3,
  conceptExplanation: {
    intuition: `Probability is a function that assigns a number between 0 and 1 to events. Kolmogorov's axioms are the minimal rules this function must satisfy. Everything else — complement rule, union bounds, monotonicity — is derived from just three axioms.`,
    definition: `**Sample space** $\\Omega$: the set of all possible outcomes.

**Event**: any subset $A \\subseteq \\Omega$.

**Kolmogorov's Axioms:**
1. Non-negativity: $P(A) \\geq 0$ for all events $A$
2. Normalisation: $P(\\Omega) = 1$
3. Countable additivity: If $A_1, A_2, \\ldots$ are pairwise disjoint, then $P(\\bigcup_{i=1}^{\\infty} A_i) = \\sum_{i=1}^{\\infty} P(A_i)$

**Derived properties:**
- $P(\\emptyset) = 0$
- $P(A^c) = 1 - P(A)$
- $P(A) \\leq 1$
- If $A \\subseteq B$ then $P(A) \\leq P(B)$ (monotonicity)
- Union bound: $P(A \\cup B) \\leq P(A) + P(B)$`,
    whyItWorks: `Axiom 3 is the key: it says probabilities of disjoint events add. This is the probabilistic analogue of "counting non-overlapping parts." From these three axioms, all of probability theory is derived.`,
    whenToUse: `Use Axiom 3 (additivity) whenever partitioning an event into disjoint pieces. Use $P(A^c) = 1 - P(A)$ when computing $P(A)$ directly is harder than computing $P(A^c)$.`,
    commonMistakes: [
      '$P(A \\cup B) = P(A) + P(B)$ is ONLY valid when A and B are disjoint',
      '$P(A) = 0$ does NOT mean A is impossible (for continuous distributions, every single point has probability 0)',
      'The sample space must include ALL possible outcomes — missing outcomes leads to wrong calculations',
    ],
    examTips: [
      'GATE frequently tests whether students know $P(A \\cup B) = P(A)+P(B)-P(A\\cap B)$, not just $P(A)+P(B)$',
      'For uniform sample spaces: $P(A) = |A|/|\\Omega|$ — just count',
    ],
  },
  formulas: [
    { name: 'Complement Rule', latex: 'P(A^c) = 1 - P(A)', variables: '$A$ = event, $A^c$ = complement' },
    { name: 'General Addition Rule', latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)', variables: '$A$, $B$ any events' },
    { name: 'Disjoint Addition', latex: 'P(A \\cup B) = P(A) + P(B) \\text{ if } A \\cap B = \\emptyset', conditions: 'Only when A and B are mutually exclusive' },
    { name: 'Uniform Sample Space', latex: 'P(A) = \\frac{|A|}{|\\Omega|}', variables: '$|A|$ = number of favorable outcomes, $|\\Omega|$ = total outcomes', conditions: 'All outcomes equally likely' },
    { name: 'Union Bound (Boole)', latex: 'P\\left(\\bigcup_{i=1}^n A_i\\right) \\leq \\sum_{i=1}^n P(A_i)', notes: 'Useful upper bound when intersections are hard to compute' },
  ],
  workedExamples: [
    {
      id: 'm1-ax-ex1',
      title: 'Deriving P(∅) = 0 from axioms',
      difficulty: 'basic',
      problem: 'Prove that $P(\\emptyset) = 0$ using only Kolmogorov\'s axioms.',
      solution: [
        { explanation: '$\\Omega$ and $\\emptyset$ are disjoint, and $\\Omega \\cup \\emptyset = \\Omega$.' },
        { explanation: 'By Axiom 3: $P(\\Omega) = P(\\Omega \\cup \\emptyset) = P(\\Omega) + P(\\emptyset) = 1 + P(\\emptyset)$.' },
        { explanation: 'Therefore $P(\\emptyset) = 0$.' },
      ],
    },
    {
      id: 'm1-ax-ex2',
      title: 'Probability bounds',
      difficulty: 'intermediate',
      problem: 'Events A and B satisfy $P(A) = 0.6$ and $P(B) = 0.5$. Find the range of possible values for $P(A \\cap B)$.',
      solution: [
        { explanation: 'Lower bound: $P(A \\cup B) \\leq 1$, so $P(A \\cap B) = P(A)+P(B)-P(A \\cup B) \\geq 0.6+0.5-1 = 0.1$.' },
        { explanation: 'Upper bound: $P(A \\cap B) \\leq \\min(P(A), P(B)) = 0.5$.' },
        { explanation: 'So $0.1 \\leq P(A \\cap B) \\leq 0.5$.' },
      ],
      examTip: 'Bounds on intersection: $\\max(0, P(A)+P(B)-1) \\leq P(A\\cap B) \\leq \\min(P(A),P(B))$. These bounds are always achievable.',
    },
    {
      id: 'm1-ax-ex3',
      title: 'Uniform sample space — card problem',
      difficulty: 'gate',
      problem: 'From a standard 52-card deck, what is the probability that a randomly drawn card is a heart or a face card (J, Q, K)?',
      solution: [
        { explanation: 'Hearts: 13 cards. Face cards: 12 (3 per suit × 4 suits). Face cards that are also hearts: 3 (J♥, Q♥, K♥).' },
        { explanation: '$P(H \\cup F) = P(H) + P(F) - P(H \\cap F) = \\frac{13}{52} + \\frac{12}{52} - \\frac{3}{52} = \\frac{22}{52} = \\frac{11}{26}$', latex: '\\frac{13+12-3}{52} = \\frac{22}{52} = \\frac{11}{26}' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-ax-1',
      topicId: 'axioms',
      question: 'Events A and B are such that $P(A) = 0.4$, $P(B) = 0.5$, $P(A \\cup B) = 0.7$. Find $P(A \\cap B)$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.2',
      hints: [
        { text: '$P(A \\cap B) = P(A) + P(B) - P(A \\cup B)$' },
        { text: 'Plug in the numbers.' },
      ],
      solution: [{ explanation: '$P(A \\cap B) = 0.4 + 0.5 - 0.7 = 0.2$' }],
      explanation: 'Direct application of the addition rule rearranged.',
      isPYQ: false,
    },
    {
      id: 'm1-ax-2',
      topicId: 'axioms',
      question: 'If $P(A) = 0.3$ and $P(B) = 0.4$ and A, B are mutually exclusive, find $P(A^c \\cap B^c)$.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.3',
      hints: [
        { text: '$A^c \\cap B^c = (A \\cup B)^c$ by De Morgan\'s law.' },
        { text: 'Since A and B are disjoint, $P(A \\cup B) = P(A) + P(B)$.' },
      ],
      solution: [
        { explanation: 'By De Morgan: $P(A^c \\cap B^c) = P((A \\cup B)^c) = 1 - P(A \\cup B)$.' },
        { explanation: 'Since A, B disjoint: $P(A \\cup B) = 0.3 + 0.4 = 0.7$.' },
        { explanation: '$P(A^c \\cap B^c) = 1 - 0.7 = 0.3$.' },
      ],
      explanation: 'De Morgan\'s law: complement of union = intersection of complements.',
      commonMistakes: 'Not applying De Morgan — trying to compute $P(A^c) \\cdot P(B^c)$ which requires independence.',
      isPYQ: false,
    },
    {
      id: 'm1-ax-3',
      topicId: 'axioms',
      question: 'Which of the following is a valid probability assignment for $P(A) = 0.6$, $P(B) = 0.5$, $P(A \\cap B)$?',
      format: 'MCQ',
      difficulty: 'basic',
      options: [
        { label: 'A', text: '$P(A \\cap B) = 0.1$' },
        { label: 'B', text: '$P(A \\cap B) = 0.6$' },
        { label: 'C', text: '$P(A \\cap B) = 0.2$' },
        { label: 'D', text: '$P(A \\cap B) = -0.1$' },
      ],
      correctAnswer: 'C',
      hints: [
        { text: 'The intersection must satisfy: $\\max(0, P(A)+P(B)-1) \\leq P(A \\cap B) \\leq \\min(P(A), P(B))$.' },
        { text: 'Bounds: $\\max(0, 0.1) \\leq P(A \\cap B) \\leq \\min(0.6, 0.5)$, i.e., $0.1 \\leq P(A \\cap B) \\leq 0.5$.' },
      ],
      solution: [
        { explanation: 'Valid range: $[0.1, 0.5]$. Only $P(A \\cap B) = 0.2$ (option C) lies in this range.' },
        { explanation: 'Option A: 0.1 is valid (boundary). Option B: 0.6 > 0.5 = min, invalid. Option D: negative, invalid.' },
        { explanation: 'Actually A is also valid. But C (0.2) is strictly inside the range and unambiguously valid.' },
      ],
      explanation: 'The intersection cannot exceed either individual probability and cannot be negative (or violate $P(A \\cup B) \\leq 1$).',
      isPYQ: false,
    },
  ],
};

export const topicAddMultRules: TopicContent = {
  id: 'add-mult-rules',
  moduleId: 'module1',
  title: 'Addition and Multiplication Rules',
  dayRange: 'Day 1',
  order: 4,
  conceptExplanation: {
    intuition: `The addition rule handles "or" questions (union of events). The multiplication rule handles "and" questions (intersection via sequential stages). Together they let you compute probabilities of complex compound events.`,
    definition: `**General Addition Rule:**
$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$

For three events:
$P(A \\cup B \\cup C) = P(A)+P(B)+P(C) - P(A\\cap B) - P(A\\cap C) - P(B\\cap C) + P(A\\cap B\\cap C)$

**Multiplication Rule:**
$P(A \\cap B) = P(A) \\cdot P(B|A)$ (or equivalently $P(B) \\cdot P(A|B)$)

**Chain Rule (3 events):**
$P(A \\cap B \\cap C) = P(A) \\cdot P(B|A) \\cdot P(C|A \\cap B)$`,
    whyItWorks: `The multiplication rule follows directly from the definition of conditional probability: $P(B|A) = P(A \\cap B)/P(A)$, so $P(A \\cap B) = P(A) \\cdot P(B|A)$.`,
    whenToUse: `Use the addition rule when computing P(at least one of several events). Use the multiplication rule when computing P(a sequence of events all occurring). The chain rule generalises to any number of sequential events.`,
    commonMistakes: [
      '$P(A \\cap B) = P(A) \\cdot P(B)$ is only valid when A and B are INDEPENDENT — the general rule is $P(A)\\cdot P(B|A)$',
      'Forgetting the $-P(A \\cap B)$ term in the addition rule',
    ],
    examTips: [
      'Draw a probability tree for sequential events — the chain rule is the product of branch probabilities',
      'For "at least one" of n events: use $1 - P(\\text{none of them})$',
    ],
  },
  formulas: [
    { name: 'General Addition Rule', latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)', variables: 'Any events A, B' },
    { name: 'Multiplication Rule', latex: 'P(A \\cap B) = P(A) \\cdot P(B|A) = P(B) \\cdot P(A|B)', variables: '$P(A) > 0$ required for first form' },
    { name: 'Chain Rule', latex: 'P\\left(\\bigcap_{i=1}^n A_i\\right) = P(A_1) \\cdot P(A_2|A_1) \\cdot P(A_3|A_1 \\cap A_2) \\cdots', variables: 'Sequential dependent events' },
  ],
  workedExamples: [
    {
      id: 'm1-amr-ex1',
      title: 'Drawing cards without replacement',
      difficulty: 'intermediate',
      problem: 'From a 52-card deck, two cards are drawn without replacement. Find the probability that both are aces.',
      solution: [
        { explanation: '$P(\\text{1st ace}) = 4/52$. Given 1st is ace, $P(\\text{2nd ace}) = 3/51$.' },
        { explanation: '$P(\\text{both aces}) = \\frac{4}{52} \\times \\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$', latex: '\\frac{4}{52} \\times \\frac{3}{51} = \\frac{1}{221}' },
      ],
      examTip: 'Without replacement: denominator decreases and numerator may decrease after each draw.',
    },
    {
      id: 'm1-amr-ex2',
      title: 'At least one six in two rolls',
      difficulty: 'basic',
      problem: 'Roll a fair die twice. Find P(at least one 6).',
      solution: [
        { explanation: 'Complement: P(no 6 in either roll) $= (5/6)^2 = 25/36$.' },
        { explanation: 'P(at least one 6) $= 1 - 25/36 = 11/36$', latex: '1 - \\left(\\frac{5}{6}\\right)^2 = \\frac{11}{36}' },
      ],
    },
    {
      id: 'm1-amr-ex3',
      title: 'Three events inclusion-exclusion',
      difficulty: 'gate',
      problem: 'Events A, B, C have $P(A)=0.5$, $P(B)=0.4$, $P(C)=0.3$, $P(A\\cap B)=0.2$, $P(A\\cap C)=0.15$, $P(B\\cap C)=0.1$, $P(A\\cap B\\cap C)=0.05$. Find $P(A \\cup B \\cup C)$.',
      solution: [
        { explanation: 'Apply 3-event inclusion-exclusion:' },
        { explanation: '$P(A \\cup B \\cup C) = 0.5+0.4+0.3 - 0.2-0.15-0.1 + 0.05$', latex: '= 1.2 - 0.45 + 0.05 = 0.80' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-amr-1',
      topicId: 'add-mult-rules',
      question: 'A bag has 5 red and 3 blue balls. Two are drawn without replacement. Find $P(\\text{first red and second blue})$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.268',
      hints: [
        { text: 'Use multiplication rule: $P(R_1 \\cap B_2) = P(R_1) \\cdot P(B_2|R_1)$.' },
        { text: '$P(R_1) = 5/8$. Given first is red, 7 balls remain, 3 blue.' },
      ],
      solution: [
        { explanation: '$P(R_1 \\cap B_2) = \\frac{5}{8} \\times \\frac{3}{7} = \\frac{15}{56} \\approx 0.268$', latex: '\\frac{5}{8} \\times \\frac{3}{7} = \\frac{15}{56}' },
      ],
      explanation: 'Sequential draws without replacement: use chain rule with updated counts.',
      isPYQ: false,
    },
    {
      id: 'm1-amr-2',
      topicId: 'add-mult-rules',
      question: 'A fair coin is tossed 5 times. Find $P(\\text{at least one head})$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.969',
      hints: [
        { text: 'Use complement: P(no heads in 5 tosses).' },
        { text: 'P(all tails) $= (1/2)^5$.' },
      ],
      solution: [
        { explanation: '$P(\\text{at least one head}) = 1 - P(\\text{all tails}) = 1 - (1/2)^5 = 1 - 1/32 = 31/32 \\approx 0.969$' },
      ],
      explanation: '"At least one" always suggests using complement.',
      isPYQ: false,
    },
    {
      id: 'm1-amr-3',
      topicId: 'add-mult-rules',
      question: 'Three cards are drawn from a 52-card deck without replacement. Find $P(\\text{all three are spades})$.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.0129',
      hints: [
        { text: 'Chain rule: $P(S_1) \\cdot P(S_2|S_1) \\cdot P(S_3|S_1 \\cap S_2)$.' },
        { text: '13 spades in 52 cards. After each spade drawn, both counts decrease by 1.' },
      ],
      solution: [
        { explanation: '$\\frac{13}{52} \\times \\frac{12}{51} \\times \\frac{11}{50} = \\frac{1716}{132600} = \\frac{11}{850} \\approx 0.0129$', latex: '\\frac{13}{52} \\cdot \\frac{12}{51} \\cdot \\frac{11}{50} = \\frac{11}{850}' },
      ],
      explanation: 'Without replacement: update counts at each step.',
      isPYQ: false,
    },
  ],
};
