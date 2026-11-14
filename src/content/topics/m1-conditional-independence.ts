import type { TopicContent } from '../../types/content';

export const topicConditionalProb: TopicContent = {
  id: 'conditional-prob',
  moduleId: 'module1',
  title: 'Conditional Probability',
  dayRange: 'Day 2',
  order: 5,
  conceptExplanation: {
    intuition: `Conditional probability $P(A|B)$ is the probability of A given that B has already occurred. The occurrence of B shrinks the sample space from $\\Omega$ to $B$ — now we only care about outcomes inside B.

Think of it as: "Among all scenarios where B happened, what fraction also had A?"`,
    definition: `**Definition:** $P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}$, provided $P(B) > 0$

**Multiplication rule (from definition):** $P(A \\cap B) = P(A|B) \\cdot P(B) = P(B|A) \\cdot P(A)$

**Chain rule:**
$P(A_1 \\cap A_2 \\cap \\cdots \\cap A_n) = P(A_1) \\cdot P(A_2|A_1) \\cdot P(A_3|A_1,A_2) \\cdots P(A_n|A_1,\\ldots,A_{n-1})$`,
    whyItWorks: `The formula $P(A|B) = P(A \\cap B)/P(B)$ renormalises: within the restricted space $B$, the probability of $A \\cap B$ scaled up so the total probability (of $B$) becomes 1 again.`,
    whenToUse: `Whenever you have partial information — "given that this happened" — use conditional probability. It's the foundation of Bayes' theorem and the total probability theorem.`,
    commonMistakes: [
      '$P(A|B) \\neq P(B|A)$ — this confusion is called the "prosecutor\'s fallacy" and appears in GATE questions',
      '$P(A|B) + P(A|B^c) = 1$ is WRONG. The correct identity is $P(A|B) + P(A^c|B) = 1$',
      'Conditioning on a zero-probability event is undefined — avoid dividing by 0',
    ],
    examTips: [
      'If asked for $P(A|B)$ and you know $P(B|A)$ and priors, use Bayes\' theorem',
      'Draw a probability tree: each branch represents a conditional probability; leaves are joint probabilities (multiply along path)',
    ],
  },
  formulas: [
    { name: 'Conditional Probability', latex: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}', variables: '$P(B) > 0$', notes: 'Restricts sample space to B' },
    { name: 'Multiplication Rule', latex: 'P(A \\cap B) = P(A|B)\\cdot P(B) = P(B|A)\\cdot P(A)', variables: 'Requires $P(A)>0$ or $P(B)>0$ respectively' },
    { name: 'Chain Rule', latex: 'P\\left(\\bigcap_{i=1}^n A_i\\right) = \\prod_{k=1}^n P\\left(A_k \\,\\middle|\\, \\bigcap_{j=1}^{k-1} A_j\\right)', variables: 'Sequential events' },
  ],
  workedExamples: [
    {
      id: 'm1-cp-ex1',
      title: 'Two dice — given sum is 8, find P(both even)',
      difficulty: 'intermediate',
      problem: 'Two fair dice are rolled. Given that their sum is 8, what is the probability that both dice show even numbers?',
      solution: [
        { explanation: 'B = {sum is 8}: pairs (2,6),(3,5),(4,4),(5,3),(6,2) → 5 outcomes, $P(B) = 5/36$.' },
        { explanation: 'A∩B = {sum 8 AND both even}: (2,6),(4,4),(6,2) → 3 outcomes, $P(A\\cap B) = 3/36$.' },
        { explanation: '$P(A|B) = \\frac{3/36}{5/36} = \\frac{3}{5}$', latex: 'P(A|B) = \\frac{3}{5}' },
      ],
      examTip: 'Enumerate B first. Then find A∩B within B. The ratio is the conditional probability.',
    },
    {
      id: 'm1-cp-ex2',
      title: 'Prosecutor\'s fallacy',
      difficulty: 'gate',
      problem: 'A rare genetic marker is present in 1 in 10,000 people. A suspect tests positive. The test has no false positives. The prosecutor argues: P(innocent | positive) = P(no marker) = 0.9999. Is this correct?',
      solution: [
        { explanation: 'The prosecutor confuses $P(\\text{no marker} | \\text{positive})$ with $P(\\text{no marker})$.' },
        { explanation: 'If the test has no false positives, then testing positive means you HAVE the marker, so $P(\\text{no marker} | \\text{positive}) = 0$, not 0.9999.' },
        { explanation: 'The correct question is: given you have the marker, are you the guilty party? That requires knowing how many people with the marker are in the suspect pool.' },
      ],
      examTip: '$P(A|B) \\neq P(B|A)$. This reversal error is conceptually tested in GATE DA.',
    },
    {
      id: 'm1-cp-ex3',
      title: 'Chain rule application',
      difficulty: 'intermediate',
      problem: 'A box has 3 red and 2 blue balls. Draw 3 without replacement. Find P(R, B, R) in that order.',
      solution: [
        { explanation: '$P(R_1) = 3/5$' },
        { explanation: '$P(B_2|R_1) = 2/4 = 1/2$' },
        { explanation: '$P(R_3|R_1,B_2) = 2/3$' },
        { explanation: '$P(R,B,R) = \\frac{3}{5} \\cdot \\frac{1}{2} \\cdot \\frac{2}{3} = \\frac{6}{30} = \\frac{1}{5} = 0.2$', latex: '\\frac{3}{5} \\cdot \\frac{2}{4} \\cdot \\frac{2}{3} = \\frac{1}{5}' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-cp-1',
      topicId: 'conditional-prob',
      question: 'A fair die is rolled. Given that the result is even, find $P(\\text{result} > 3 \\mid \\text{even})$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.667',
      hints: [
        { text: 'B = {2,4,6}. A = {4,5,6}. A∩B = {4,6}.' },
        { text: '$P(A|B) = |A \\cap B|/|B| = 2/3$.' },
      ],
      solution: [
        { explanation: '$B = \\{2,4,6\\}$, $|B|=3$. $A \\cap B = \\{4,6\\}$, $|A \\cap B|=2$.' },
        { explanation: '$P(A|B) = 2/3 \\approx 0.667$' },
      ],
      explanation: 'Even outcomes are {2,4,6}. Of these, greater than 3 are {4,6}.',
      isPYQ: false,
    },
    {
      id: 'm1-cp-2',
      topicId: 'conditional-prob',
      question: 'If $P(A)=0.4$, $P(B)=0.3$, $P(A \\cap B)=0.1$, find $P(A|B)$ and $P(B|A)$.',
      format: 'MCQ',
      difficulty: 'basic',
      options: [
        { label: 'A', text: '$P(A|B) = 1/3$, $P(B|A) = 1/4$' },
        { label: 'B', text: '$P(A|B) = 1/4$, $P(B|A) = 1/3$' },
        { label: 'C', text: '$P(A|B) = P(B|A) = 1/4$' },
        { label: 'D', text: '$P(A|B) = P(B|A) = 1/3$' },
      ],
      correctAnswer: 'A',
      hints: [
        { text: '$P(A|B) = P(A \\cap B)/P(B) = 0.1/0.3$' },
        { text: '$P(B|A) = P(A \\cap B)/P(A) = 0.1/0.4$' },
      ],
      solution: [
        { explanation: '$P(A|B) = 0.1/0.3 = 1/3$. $P(B|A) = 0.1/0.4 = 1/4$.' },
      ],
      explanation: '$P(A|B) \\neq P(B|A)$ in general — this is a key point.',
      isPYQ: false,
    },
    {
      id: 'm1-cp-3',
      topicId: 'conditional-prob',
      question: 'A family has 2 children. Given that at least one is a boy, what is the probability that both are boys?',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.333',
      hints: [
        { text: 'Sample space: {BB, BG, GB, GG}. Event B = at least one boy = {BB, BG, GB}.' },
        { text: 'A = both boys = {BB}. Find P(A|B).' },
      ],
      solution: [
        { explanation: 'B = {BB, BG, GB}, P(B) = 3/4. A∩B = {BB}, P(A∩B) = 1/4.' },
        { explanation: '$P(A|B) = (1/4)/(3/4) = 1/3 \\approx 0.333$' },
      ],
      explanation: 'Classic problem. Note: "given at least one boy" is different from "given the first child is a boy" (which gives 1/2).',
      commonMistakes: 'Thinking the answer is 1/2. The conditional sample space has 3 outcomes, only 1 is BB.',
      isPYQ: false,
    },
  ],
};

export const topicIndependence: TopicContent = {
  id: 'independence',
  moduleId: 'module1',
  title: 'Independence and Mutual Exclusivity',
  dayRange: 'Day 2',
  order: 6,
  conceptExplanation: {
    intuition: `Independence means knowing B happened gives you no information about A. Mutual exclusivity means A and B cannot both happen. These two concepts are almost opposites — mutually exclusive events (with nonzero probability) are always DEPENDENT.

GATE loves testing whether students confuse these two concepts.`,
    definition: `**Independence:** A and B are independent if and only if $P(A \\cap B) = P(A) \\cdot P(B)$.

Equivalently: $P(A|B) = P(A)$ (knowing B doesn't change A's probability).

**Mutual Exclusivity:** $P(A \\cap B) = 0$ (they cannot both occur).

**Key relationship:** If $P(A) > 0$ and $P(B) > 0$, then:
- If A and B are mutually exclusive: $P(A \\cap B) = 0 \\neq P(A)P(B)$ → they are **dependent**.
- Mutually exclusive events with positive probability are NEVER independent.

**Pairwise vs Mutual Independence (3 events):**
Pairwise: $P(A \\cap B) = P(A)P(B)$, $P(A \\cap C) = P(A)P(C)$, $P(B \\cap C) = P(B)P(C)$
Mutual: additionally $P(A \\cap B \\cap C) = P(A)P(B)P(C)$

Pairwise independence does NOT imply mutual independence!`,
    whyItWorks: `Independence: the joint probability factors into a product, meaning the events have no "coupling." For conditional probability: $P(A|B) = P(A \\cap B)/P(B) = P(A)P(B)/P(B) = P(A)$ — B tells us nothing.`,
    whenToUse: `Use independence when events are physically unrelated (separate coin flips, independent experiments). Check independence algebraically by verifying $P(A \\cap B) = P(A)P(B)$.`,
    commonMistakes: [
      'Confusing mutually exclusive ($P(A \\cap B)=0$) with independent ($P(A \\cap B)=P(A)P(B)$)',
      'Assuming pairwise independence implies mutual independence',
      'Assuming $P(A|B) = P(A)$ means A cannot affect B — independence is symmetric',
    ],
    examTips: [
      'To check independence: verify $P(A \\cap B) = P(A) \\cdot P(B)$. No shortcut.',
      'For the exam: "independent trials" or "independent draws with replacement" = events are independent',
      'GATE 2024 tested this directly (Q1 in the PYQ set)',
    ],
  },
  formulas: [
    { name: 'Independence', latex: 'P(A \\cap B) = P(A) \\cdot P(B)', variables: 'A, B independent', notes: 'Equivalent to $P(A|B) = P(A)$ when $P(B)>0$' },
    { name: 'Mutual Exclusivity', latex: 'P(A \\cap B) = 0', variables: 'A, B mutually exclusive', notes: 'If $P(A)>0, P(B)>0$: mutually exclusive → dependent' },
    { name: 'Mutual Independence (3 events)', latex: 'P(A \\cap B \\cap C) = P(A)P(B)P(C) \\text{ AND all pairwise products hold}', notes: 'Pairwise independence does NOT imply this' },
  ],
  workedExamples: [
    {
      id: 'm1-ind-ex1',
      title: 'GATE DA 2024 — Die rolled twice',
      difficulty: 'gate',
      problem: 'A fair six-sided die is rolled twice independently. $E_1$: first roll < second roll. $E_2$: sum = 7. Find $P(E_1)$, $P(E_2)$, $P(E_1 \\cap E_2)$, and check independence.',
      solution: [
        { explanation: '$E_1$: by symmetry, $P(E_1) = P(E_2^\\prime)$ where $E_2^\\prime$ is "first > second." Since $P(E_1) + P(\\text{equal}) + P(\\text{first>second}) = 1$ and by symmetry $P(E_1) = P(\\text{first>second})$, and $P(\\text{equal}) = 6/36 = 1/6$:', latex: 'P(E_1) = \\frac{1-1/6}{2} = \\frac{5}{12}' },
        { explanation: '$E_2 = \\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\\}$: 6 pairs, $P(E_2) = 6/36 = 1/6$.' },
        { explanation: '$E_1 \\cap E_2$: sum 7 AND first < second: $\\{(1,6),(2,5),(3,4)\\}$ → 3 outcomes.', latex: 'P(E_1 \\cap E_2) = \\frac{3}{36} = \\frac{1}{12}' },
        { explanation: 'Check independence: $P(E_1)P(E_2) = \\frac{5}{12} \\cdot \\frac{1}{6} = \\frac{5}{72} \\neq \\frac{1}{12} = \\frac{6}{72}$. Not independent.' },
        { explanation: 'Check $P(E_1|E_2) = P(E_1 \\cap E_2)/P(E_2) = (1/12)/(1/6) = 1/2$. So option (B) is also true.' },
        { explanation: 'The correct single-answer option is (C): $P(E_1 \\cap E_2) = 1/12$. ✓' },
      ],
      examTip: 'In GATE MCQ, verify ALL options. Here both (B) and (C) are mathematically true, but the official key is (C).',
    },
    {
      id: 'm1-ind-ex2',
      title: 'Mutually exclusive ≠ independent',
      difficulty: 'intermediate',
      problem: 'Events A and B are mutually exclusive with $P(A) = 0.3$ and $P(B) = 0.4$. Are they independent?',
      solution: [
        { explanation: '$P(A \\cap B) = 0$ (mutually exclusive).' },
        { explanation: '$P(A) \\cdot P(B) = 0.3 \\times 0.4 = 0.12 \\neq 0$.' },
        { explanation: 'Since $P(A \\cap B) \\neq P(A)P(B)$, they are NOT independent.' },
        { explanation: 'Intuition: if A occurs, B definitely cannot (they\'re mutually exclusive) — so A gives complete information about B. That\'s the opposite of independence.' },
      ],
      examTip: 'Never confuse mutually exclusive with independent. They are almost opposite concepts.',
    },
    {
      id: 'm1-ind-ex3',
      title: 'Pairwise but not mutually independent',
      difficulty: 'challenging',
      problem: 'Roll two fair dice. A={first is even}, B={second is even}, C={sum is odd}. Show pairwise independence but not mutual independence.',
      solution: [
        { explanation: '$P(A)=P(B)=P(C)=1/2$.' },
        { explanation: '$A \\cap B$ = {both even}: 9/36 = 1/4 = P(A)P(B). ✓ Independent.' },
        { explanation: '$A \\cap C$ = {first even, sum odd} = {first even, second odd}: 3×3=9 outcomes, P=9/36=1/4=P(A)P(C). ✓' },
        { explanation: '$B \\cap C$: similarly 1/4. ✓ All pairwise independent.' },
        { explanation: '$A \\cap B \\cap C$ = {both even, sum odd}: impossible (even+even=even). $P(A \\cap B \\cap C)=0 \\neq P(A)P(B)P(C)=1/8$. NOT mutually independent.' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-ind-pyq1',
      topicId: 'independence',
      question: 'A fair six-sided die is rolled twice independently. Let $E_1$ be the event that the outcome of the first roll is strictly less than the outcome of the second roll, and let $E_2$ be the event that the sum of the two outcomes is equal to 7. Which one of the following statements is TRUE?\n(A) $E_1$ and $E_2$ are independent events.\n(B) $P(E_1 | E_2) = \\frac{1}{2}$\n(C) $P(E_1 \\cap E_2) = \\frac{1}{12}$\n(D) $P(E_1 \\cup E_2) = \\frac{7}{12}$',
      format: 'MCQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: '$E_1$ and $E_2$ are independent events.' },
        { label: 'B', text: '$P(E_1 | E_2) = \\frac{1}{2}$' },
        { label: 'C', text: '$P(E_1 \\cap E_2) = \\frac{1}{12}$' },
        { label: 'D', text: '$P(E_1 \\cup E_2) = \\frac{7}{12}$' },
      ],
      correctAnswer: 'C',
      hints: [
        { text: 'Compute $P(E_1)$, $P(E_2)$, and $P(E_1 \\cap E_2)$ carefully. $P(E_1) = 15/36 = 5/12$. $P(E_2) = 6/36 = 1/6$.' },
        { text: '$E_1 \\cap E_2$: pairs summing to 7 with first < second: (1,6),(2,5),(3,4) → 3 pairs. $P(E_1 \\cap E_2) = 3/36 = 1/12$.' },
      ],
      solution: [
        { explanation: 'Sample space: 36 equally likely pairs.' },
        { explanation: '$E_1$ (first < second): 15 pairs (by symmetry: $(36-6)/2=15$). $P(E_1)=15/36=5/12$.' },
        { explanation: '$E_2$ (sum=7): (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 pairs. $P(E_2)=6/36=1/6$.' },
        { explanation: '$E_1 \\cap E_2$ (sum=7 AND first<second): (1,6),(2,5),(3,4) → 3 pairs. $P(E_1 \\cap E_2)=3/36=1/12$. This is option (C). ✓' },
        { explanation: 'Check (A): $P(E_1)P(E_2) = (5/12)(1/6) = 5/72 \\neq 1/12$. Not independent.' },
        { explanation: 'Check (B): $P(E_1|E_2) = (1/12)/(1/6) = 1/2$. This is ALSO true!' },
        { explanation: 'Check (D): $P(E_1 \\cup E_2) = 5/12+1/6-1/12 = 5/12+2/12-1/12 = 6/12 = 1/2 \\neq 7/12$. False.' },
        { explanation: 'Official answer: (C). Note that (B) is also numerically true.' },
      ],
      explanation: 'This question tests careful computation. Enumerate the sample space and verify each option systematically.',
      commonMistakes: 'Assuming independence because the rolls are independent trials. The EVENTS E1 and E2 are defined on the same sample space and are dependent.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 1, verified: true },
    },
    {
      id: 'm1-ind-pyq2',
      topicId: 'independence',
      question: 'Suppose a dataset contains 10 distinct data points, of which 4 are labeled as Class A and 6 are labeled as Class B. A subset of 4 data points is chosen uniformly at random without replacement. What is the probability that the chosen subset contains at least 2 data points from Class A? (Round off to two decimal places.)',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '0.55',
      hints: [
        { text: 'Total ways to choose 4 from 10: $\\binom{10}{4}=210$. Let X = number of Class A points selected.' },
        { text: 'Find P(X=2) + P(X=3) + P(X=4) using hypergeometric-style counting.' },
      ],
      solution: [
        { explanation: 'Total: $\\binom{10}{4} = 210$.' },
        { explanation: '$P(X=2)$: choose 2 from Class A (4), 2 from Class B (6): $\\binom{4}{2}\\binom{6}{2} = 6 \\times 15 = 90$' },
        { explanation: '$P(X=3)$: $\\binom{4}{3}\\binom{6}{1} = 4 \\times 6 = 24$' },
        { explanation: '$P(X=4)$: $\\binom{4}{4}\\binom{6}{0} = 1 \\times 1 = 1$' },
        { explanation: 'Total favorable: $90+24+1=115$. $P(X \\geq 2) = 115/210 = 23/42 \\approx 0.5476$', latex: 'P(X \\geq 2) = \\frac{115}{210} = \\frac{23}{42} \\approx 0.55' },
      ],
      explanation: 'Hypergeometric counting: choose some from each group, multiply, divide by total.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 2, verified: true },
    },
    {
      id: 'm1-ind-3',
      topicId: 'independence',
      question: 'Events A and B satisfy $P(A)=0.5$, $P(B)=0.4$. If A and B are independent, find $P(A \\cup B)$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.7',
      hints: [
        { text: 'Independence: $P(A \\cap B) = P(A) \\cdot P(B)$.' },
        { text: '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.' },
      ],
      solution: [
        { explanation: '$P(A \\cap B) = 0.5 \\times 0.4 = 0.2$.' },
        { explanation: '$P(A \\cup B) = 0.5 + 0.4 - 0.2 = 0.7$.' },
      ],
      explanation: 'Independence allows computing the intersection as a product.',
      isPYQ: false,
    },
    {
      id: 'm1-ind-4',
      topicId: 'independence',
      question: 'Which of the following statements is TRUE about mutually exclusive events A and B with $P(A) > 0$ and $P(B) > 0$?',
      format: 'MCQ',
      difficulty: 'intermediate',
      options: [
        { label: 'A', text: 'A and B are independent' },
        { label: 'B', text: '$P(A|B) = P(A)$' },
        { label: 'C', text: '$P(A|B) = 0$' },
        { label: 'D', text: '$P(A \\cup B) = P(A) \\cdot P(B)$' },
      ],
      correctAnswer: 'C',
      hints: [
        { text: 'If A and B are mutually exclusive, $P(A \\cap B) = 0$.' },
        { text: '$P(A|B) = P(A \\cap B)/P(B) = 0/P(B) = 0$.' },
      ],
      solution: [
        { explanation: '$P(A|B) = P(A \\cap B)/P(B) = 0/P(B) = 0$. Option (C). ✓' },
        { explanation: 'Option (A) is false: mutually exclusive → dependent.' },
        { explanation: 'Option (B): $P(A|B) = 0 \\neq P(A) > 0$. False.' },
        { explanation: 'Option (D): $P(A \\cup B) = P(A) + P(B)$ for disjoint events, not the product.' },
      ],
      explanation: 'If B occurs, A cannot occur (mutually exclusive), so $P(A|B)=0$.',
      isPYQ: false,
    },
  ],
};
