import type { TopicContent } from '../../types/content';

export const topicBayes: TopicContent = {
  id: 'bayes',
  moduleId: 'module1',
  title: "Bayes' Theorem",
  dayRange: 'Day 2',
  order: 7,
  conceptExplanation: {
    intuition: `Bayes' theorem answers "how does new evidence update our belief?" You start with a prior belief $P(H)$, observe evidence $E$, and compute the posterior $P(H|E)$.

The diagnostic test is the classic example: a rare disease means even a good test gives lots of false positives — counterintuitive until you apply Bayes.`,
    definition: `**Bayes' Theorem:**
$$P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}$$

where $P(E) = \\sum_i P(E|H_i)P(H_i)$ by the Law of Total Probability.

**General form (partition $\\{H_1, H_2, \\ldots, H_n\\}$ of $\\Omega$):**
$$P(H_k|E) = \\frac{P(E|H_k)P(H_k)}{\\sum_{i=1}^{n} P(E|H_i)P(H_i)}$$`,
    whyItWorks: `Start from conditional probability definition: $P(H|E) = P(H \\cap E)/P(E)$. The numerator is $P(E|H)P(H)$ (multiplication rule). The denominator $P(E)$ is expanded using total probability. Combining gives Bayes.`,
    whenToUse: `Whenever you know the "forward" conditional $P(E|H)$ but want the "reverse" $P(H|E)$. Classic setups: diagnostic tests, spam filters, quality control, source identification.`,
    commonMistakes: [
      'Forgetting to compute $P(E)$ using total probability — it\'s the sum over ALL hypotheses, not just one',
      'Base rate neglect: ignoring the prior $P(H)$ — the smaller the prior, the more evidence needed to get a high posterior',
      'Confusing $P(E|H)$ (sensitivity) with $P(H|E)$ (positive predictive value)',
    ],
    examTips: [
      'Draw a probability tree: left branches are hypotheses ($H_1, H_2, \\ldots$), right branches are evidence ($E$ or $E^c$). Leaf = joint probability = numerator. Sum of same-evidence leaves = $P(E)$.',
      'Base rate neglect is GATE-tested: a 95% accurate test for a 1% prevalence disease gives <50% PPV.',
    ],
  },
  formulas: [
    {
      name: "Bayes' Theorem",
      latex: "P(H_k|E) = \\frac{P(E|H_k)P(H_k)}{\\sum_{i=1}^{n} P(E|H_i)P(H_i)}",
      variables: '$\\{H_1,\\ldots,H_n\\}$ = mutually exclusive exhaustive hypotheses; $E$ = evidence',
    },
    {
      name: 'Two-hypothesis Bayes',
      latex: 'P(H|E) = \\frac{P(E|H)P(H)}{P(E|H)P(H) + P(E|H^c)P(H^c)}',
      variables: '$H$ = hypothesis, $H^c$ = complement',
    },
  ],
  workedExamples: [
    {
      id: 'm1-bay-ex1',
      title: 'GATE DA 2024 — Diagnostic Test',
      difficulty: 'gate',
      problem: 'A diagnostic test detects a disease affecting 1% of the population. Test sensitivity: 0.95 (true positive rate). False positive rate: 0.02. Given a person tests positive, what is P(disease)?',
      solution: [
        { explanation: 'Let D = has disease, T⁺ = positive test. Given: $P(D)=0.01$, $P(T^+|D)=0.95$, $P(T^+|D^c)=0.02$.' },
        { explanation: '$P(T^+) = P(T^+|D)P(D) + P(T^+|D^c)P(D^c) = 0.95(0.01) + 0.02(0.99) = 0.0095 + 0.0198 = 0.0293$' },
        { explanation: '$P(D|T^+) = \\frac{P(T^+|D)P(D)}{P(T^+)} = \\frac{0.0095}{0.0293} = \\frac{95}{293}$', latex: 'P(D|T^+) = \\frac{95}{293} \\approx 0.3242' },
        { explanation: 'Despite 95% accuracy, only ~32% of positives actually have the disease — because the disease is rare.' },
      ],
      examTip: 'Base rate matters enormously. A 1% prevalence means 99 non-diseased for every 1 diseased. Even 2% false positive rate on 99 people gives ~2 false positives vs 0.95 true positives.',
    },
    {
      id: 'm1-bay-ex2',
      title: 'GATE DA 2025 — Three boxes',
      difficulty: 'gate',
      problem: 'Boxes B₁ (3R,2B), B₂ (2R,3B), B₃ (4R,1B). P(B₁)=0.2, P(B₂)=0.3, P(B₃)=0.5. Two balls drawn without replacement are both red. Find P(B₃ | both red).',
      solution: [
        { explanation: 'Each box has 5 balls. P(2 red | Bᵢ) = $\\binom{r_i}{2}/\\binom{5}{2}$ where $r_i$ = red balls in box i.' },
        { explanation: '$P(2R|B_1) = \\binom{3}{2}/\\binom{5}{2} = 3/10$. $P(2R|B_2) = \\binom{2}{2}/\\binom{5}{2} = 1/10$. $P(2R|B_3) = \\binom{4}{2}/\\binom{5}{2} = 6/10$.' },
        { explanation: '$P(2R) = 0.2(0.3)+0.3(0.1)+0.5(0.6) = 0.06+0.03+0.30 = 0.39$' },
        { explanation: '$P(B_3|2R) = \\frac{0.5 \\times 0.6}{0.39} = \\frac{0.30}{0.39} = \\frac{10}{13} \\approx 0.769$', latex: 'P(B_3|2R) = \\frac{0.30}{0.39} \\approx 0.77' },
      ],
    },
    {
      id: 'm1-bay-ex3',
      title: 'Email spam classifier',
      difficulty: 'intermediate',
      problem: '40% of emails are spam. A spam filter correctly identifies spam 90% of the time (sensitivity), and correctly identifies non-spam 85% of the time (specificity). What is P(spam | classified as spam)?',
      solution: [
        { explanation: '$P(S)=0.4$, $P(\\text{flag}|S)=0.9$, $P(\\text{flag}|S^c)=1-0.85=0.15$.' },
        { explanation: '$P(\\text{flag}) = 0.9(0.4)+0.15(0.6) = 0.36+0.09=0.45$.' },
        { explanation: '$P(S|\\text{flag}) = 0.36/0.45 = 0.8 = 80\\%$', latex: 'P(S|\\text{flag}) = \\frac{0.36}{0.45} = 0.8' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-bay-pyq3',
      topicId: 'bayes',
      question: 'A diagnostic test is used to detect a rare disease that affects 1% of a population. If a person has the disease, the test returns a positive result with probability 0.95. If a person does not have the disease, the test returns a positive result (false positive) with probability 0.02. Given that a randomly selected person tests positive, what is the probability that the person actually has the disease?\n(A) $\\frac{95}{293}$ (B) $\\frac{95}{198}$ (C) $\\frac{19}{40}$ (D) $\\frac{95}{295}$',
      format: 'MCQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: '$\\dfrac{95}{293}$' },
        { label: 'B', text: '$\\dfrac{95}{198}$' },
        { label: 'C', text: '$\\dfrac{19}{40}$' },
        { label: 'D', text: '$\\dfrac{95}{295}$' },
      ],
      correctAnswer: 'A',
      hints: [
        { text: 'Set up: $P(D)=0.01$, $P(T^+|D)=0.95$, $P(T^+|D^c)=0.02$. Apply Bayes.' },
        { text: '$P(T^+) = 0.95(0.01) + 0.02(0.99) = 0.0095 + 0.0198 = 0.0293$.' },
      ],
      solution: [
        { explanation: '$P(T^+) = 0.0095 + 0.0198 = 0.0293$.' },
        { explanation: '$P(D|T^+) = 0.0095/0.0293 = 95/293$', latex: '\\frac{0.0095}{0.0293} = \\frac{95}{293}' },
      ],
      explanation: 'Base rate neglect: despite 95% sensitivity, only 32% of positives have the disease because prevalence is only 1%.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 2, verified: true },
    },
    {
      id: 'm1-bay-pyq4',
      topicId: 'bayes',
      question: 'Three boxes $B_1$, $B_2$, $B_3$ contain colored balls as follows: $B_1$: 3 Red, 2 Blue; $B_2$: 2 Red, 3 Blue; $B_3$: 4 Red, 1 Blue. A box is selected with probabilities $P(B_1) = 0.2$, $P(B_2) = 0.3$, $P(B_3) = 0.5$. Two balls are drawn sequentially without replacement from the selected box. If both drawn balls are Red, what is the probability that they came from box $B_3$? (Round off to two decimal places.)',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '0.77',
      hints: [
        { text: 'Compute $P(\\text{2 red} | B_i)$ for each box. Each box has 5 balls.' },
        { text: '$P(\\text{2 red} | B_i) = \\binom{r_i}{2}/\\binom{5}{2}$ where $r_1=3, r_2=2, r_3=4$.' },
      ],
      solution: [
        { explanation: '$P(2R|B_1)=3/10$, $P(2R|B_2)=1/10$, $P(2R|B_3)=6/10$.' },
        { explanation: '$P(2R)=0.2(0.3)+0.3(0.1)+0.5(0.6)=0.06+0.03+0.30=0.39$.' },
        { explanation: '$P(B_3|2R)=\\frac{0.5 \\times 0.6}{0.39}=\\frac{0.30}{0.39}=\\frac{10}{13}\\approx 0.769$', latex: 'P(B_3|2R) = \\frac{10}{13} \\approx 0.77' },
      ],
      explanation: 'Box B₃ has the most red balls (4/5) and the highest prior (0.5), so it dominates the posterior.',
      isPYQ: true,
      pyqMeta: { year: 2025, marks: 2, verified: true },
    },
    {
      id: 'm1-bay-3',
      topicId: 'bayes',
      question: 'A factory has 3 machines producing 50%, 30%, and 20% of output respectively. Defect rates: 1%, 2%, 3%. A randomly selected product is defective. Find P(it came from machine 3).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.353',
      hints: [
        { text: 'Find P(defective) using total probability theorem.' },
        { text: 'P(defective) = 0.5(0.01) + 0.3(0.02) + 0.2(0.03).' },
      ],
      solution: [
        { explanation: '$P(D)=0.5(0.01)+0.3(0.02)+0.2(0.03)=0.005+0.006+0.006=0.017$.' },
        { explanation: '$P(M_3|D)=\\frac{0.2 \\times 0.03}{0.017}=\\frac{0.006}{0.017}=\\frac{6}{17}\\approx 0.353$', latex: 'P(M_3|D) = \\frac{0.006}{0.017} \\approx 0.353' },
      ],
      explanation: 'Even though machine 3 produces the least (20%), its high defect rate (3%) means it contributes 35% of defective products.',
      isPYQ: false,
    },
    {
      id: 'm1-bay-4',
      topicId: 'bayes',
      question: 'A test for a disease has sensitivity 0.99 and specificity 0.95. Disease prevalence is 0.1%. If you test positive, what is P(you have the disease)?',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '0.0194',
      hints: [
        { text: '$P(D)=0.001$, $P(T^+|D)=0.99$, $P(T^+|D^c)=1-0.95=0.05$.' },
        { text: '$P(T^+)=0.99(0.001)+0.05(0.999)$.' },
      ],
      solution: [
        { explanation: '$P(T^+)=0.00099+0.04995=0.05094$.' },
        { explanation: '$P(D|T^+)=0.00099/0.05094\\approx 0.0194$', latex: 'P(D|T^+) = \\frac{0.00099}{0.05094} \\approx 0.0194' },
      ],
      explanation: 'Even with 99% sensitivity and 95% specificity, only 2% of positives have the disease when prevalence is 0.1%. Base rate is crucial.',
      isPYQ: false,
    },
  ],
};

export const topicTotalProbability: TopicContent = {
  id: 'total-probability',
  moduleId: 'module1',
  title: 'Total Probability Theorem',
  dayRange: 'Day 2',
  order: 8,
  conceptExplanation: {
    intuition: `The law of total probability says: if you know $P(B|A_i)$ for each "cause" $A_i$, and you know the probability of each cause, you can compute the overall probability of $B$.

It's the denominator in Bayes' theorem — the marginalisation step that removes the conditioning on specific hypotheses.`,
    definition: `**Law of Total Probability:**

If $\\{A_1, A_2, \\ldots, A_n\\}$ is a partition of $\\Omega$ (mutually exclusive and exhaustive), then for any event $B$:

$$P(B) = \\sum_{i=1}^{n} P(B|A_i) \\cdot P(A_i)$$

**Two-event case:**
$$P(B) = P(B|A)P(A) + P(B|A^c)P(A^c)$$`,
    whyItWorks: `The events $A_i$ partition the sample space, so $B = (B \\cap A_1) \\cup (B \\cap A_2) \\cup \\cdots \\cup (B \\cap A_n)$ where these are disjoint. By additivity: $P(B) = \\sum P(B \\cap A_i) = \\sum P(B|A_i)P(A_i)$.`,
    whenToUse: `When you can compute "conditional on each cause" but not the marginal directly. Always used as the denominator in Bayes' theorem. Common when: sampling from multiple populations, staged experiments, mixture models.`,
    commonMistakes: [
      'The $A_i$ must partition $\\Omega$: they must be mutually exclusive AND exhaustive',
      'Forgetting to include all cases — if you omit one $A_i$, your $P(B)$ will be wrong',
    ],
    examTips: [
      'Tree diagram: probabilities along any root-to-leaf path multiply. Sum all leaf-probabilities for the same event B to get $P(B)$.',
      'The total probability theorem is always steps 1 of Bayes\' theorem.',
    ],
  },
  formulas: [
    {
      name: 'Law of Total Probability',
      latex: 'P(B) = \\sum_{i=1}^{n} P(B|A_i) P(A_i)',
      variables: '$\\{A_1,\\ldots,A_n\\}$ partition of $\\Omega$; $B$ any event',
      conditions: 'All $A_i$ pairwise disjoint, $\\bigcup_i A_i = \\Omega$',
    },
  ],
  workedExamples: [
    {
      id: 'm1-tp-ex1',
      title: 'Urn model',
      difficulty: 'basic',
      problem: 'Urn 1 has 3 red, 2 white. Urn 2 has 1 red, 4 white. Pick an urn at random (50/50), then draw one ball. Find P(red).',
      solution: [
        { explanation: '$P(R) = P(R|U_1)P(U_1) + P(R|U_2)P(U_2) = \\frac{3}{5}(0.5) + \\frac{1}{5}(0.5) = 0.3 + 0.1 = 0.4$', latex: 'P(R) = \\frac{3}{5} \\cdot \\frac{1}{2} + \\frac{1}{5} \\cdot \\frac{1}{2} = 0.4' },
      ],
    },
    {
      id: 'm1-tp-ex2',
      title: 'Quality control across shifts',
      difficulty: 'intermediate',
      problem: 'Morning shift (60% of production) has 2% defect rate. Evening shift (40%) has 5% defect rate. Find the overall defect rate.',
      solution: [
        { explanation: '$P(D) = P(D|M)P(M) + P(D|E)P(E) = 0.02(0.6) + 0.05(0.4) = 0.012 + 0.020 = 0.032 = 3.2\\%$', latex: 'P(D) = 0.02(0.6)+0.05(0.4) = 0.032' },
      ],
      examTip: 'Total probability gives the marginal (unconditional) probability when you have conditional probabilities across a partition.',
    },
    {
      id: 'm1-tp-ex3',
      title: 'Network reliability',
      difficulty: 'gate',
      problem: 'Router A is working with probability 0.9. If A works, message reaches server with probability 0.95. If A fails, there\'s a backup path with probability 0.6. Find P(message reaches server).',
      solution: [
        { explanation: '$P(S) = P(S|A)P(A) + P(S|A^c)P(A^c) = 0.95(0.9) + 0.6(0.1) = 0.855 + 0.06 = 0.915$', latex: 'P(S) = 0.95(0.9)+0.6(0.1) = 0.915' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-tp-1',
      topicId: 'total-probability',
      question: 'Box A has 2 red, 3 green. Box B has 4 red, 1 green. Pick box A with probability 0.6, box B with probability 0.4. Draw one ball. Find P(red).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.56',
      hints: [
        { text: '$P(R) = P(R|A)P(A) + P(R|B)P(B)$.' },
        { text: '$P(R|A)=2/5=0.4$, $P(R|B)=4/5=0.8$.' },
      ],
      solution: [
        { explanation: '$P(R) = 0.4(0.6) + 0.8(0.4) = 0.24 + 0.32 = 0.56$' },
      ],
      explanation: 'Weighted average of conditional probabilities by prior probability of each condition.',
      isPYQ: false,
    },
    {
      id: 'm1-tp-2',
      topicId: 'total-probability',
      question: 'Company produces 40% from Plant 1 (5% defective) and 60% from Plant 2 (3% defective). What is the overall defect probability?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.038',
      hints: [
        { text: '$P(D) = P(D|P_1)P(P_1) + P(D|P_2)P(P_2)$' },
        { text: '$= 0.05(0.4) + 0.03(0.6)$' },
      ],
      solution: [
        { explanation: '$P(D) = 0.05(0.4) + 0.03(0.6) = 0.02 + 0.018 = 0.038$' },
      ],
      explanation: 'Weighted average defect rate across two plants.',
      isPYQ: false,
    },
    {
      id: 'm1-tp-3',
      topicId: 'total-probability',
      question: 'A student passes an exam with probability 0.7 if they study, and 0.3 if they don\'t. They study with probability 0.6. Find P(passes).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.54',
      hints: [
        { text: 'Partition: {studies, doesn\'t study}. Apply total probability.' },
        { text: '$P(\\text{pass}) = P(\\text{pass}|\\text{study})P(\\text{study}) + P(\\text{pass}|\\text{no study})P(\\text{no study})$' },
      ],
      solution: [
        { explanation: '$P(\\text{pass}) = 0.7(0.6) + 0.3(0.4) = 0.42 + 0.12 = 0.54$' },
      ],
      explanation: 'Direct application of total probability with a 2-element partition.',
      isPYQ: false,
    },
  ],
};
