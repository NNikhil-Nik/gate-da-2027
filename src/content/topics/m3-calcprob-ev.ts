import type { TopicContent } from '../../types/content';

export const topicCalculatingProbabilities: TopicContent = {
  id: 'calculating-probabilities',
  moduleId: 'module3',
  title: 'Calculating Probabilities with RVs',
  dayRange: 'Day 6',
  order: 7,
  conceptExplanation: {
    intuition: `Computing probabilities with random variables means translating events like "X > 5" or "X in [a,b]" into CDF or integral expressions, then evaluating. The strategy depends on whether X is discrete, continuous, or follows a named distribution.`,
    definition: `**General method:**
1. Identify the distribution and its parameters
2. Write the event in terms of CDF values or integrals
3. Evaluate using known formulas or integration

**Conditional probability for RVs:**
$P(X \\in A | X \\in B) = \\frac{P(X \\in A \\cap B)}{P(X \\in B)}$

**Memoryless property (Exponential):**
$P(X > s+t | X > s) = P(X > t)$

The Exponential distribution is the ONLY continuous distribution with this property.

**Standard distributions:**
- Uniform $[a,b]$: $P(c \\leq X \\leq d) = (d-c)/(b-a)$
- Exponential $\\text{Exp}(\\lambda)$: $P(X > t) = e^{-\\lambda t}$
- Normal: use Z-score + standard normal table
- Binomial: $P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}$`,
    whyItWorks: `Named distributions have known formulas derived from their PDFs/PMFs. Knowing these formulas and the memoryless property saves significant computation on GATE.`,
    whenToUse: `Whenever a problem specifies a distribution (Exponential, Uniform, Normal, Binomial, Poisson) — use the distribution's formulas directly rather than integrating from scratch.`,
    commonMistakes: [
      'For Exponential: confusing the parameter. $\\text{Exp}(\\lambda)$ has mean $1/\\lambda$. If mean=4, then $\\lambda=1/4$.',
      'The memoryless property applies to the TAIL: $P(X > s+t | X > s) = P(X > t)$. It says "having survived s, the remaining lifetime is fresh."',
      'For Uniform $[a,b]$: $P(X > c) = (b-c)/(b-a)$ only when $a \\leq c \\leq b$. Check bounds.',
    ],
    examTips: [
      'If a GATE question says "time between events" or "lifetime" and asks conditional probability — immediately think memoryless property.',
      '$P(X > t) = e^{-\\lambda t}$ for Exponential. With mean $\\mu = 1/\\lambda$: $P(X > t) = e^{-t/\\mu}$.',
    ],
  },
  formulas: [
    { name: 'Exponential survival', latex: 'P(X > t) = e^{-\\lambda t}, \\quad t > 0', variables: '$\\lambda > 0$ = rate, mean = $1/\\lambda$' },
    { name: 'Memoryless property', latex: 'P(X > s+t \\mid X > s) = P(X > t) = e^{-\\lambda t}', notes: 'Only for Exponential (continuous) and Geometric (discrete)' },
    { name: 'Uniform probability', latex: 'P(a \\leq X \\leq b) = \\frac{b-a}{\\beta - \\alpha}', variables: '$X \\sim \\text{Uniform}[\\alpha, \\beta]$' },
    { name: 'Conditional RV probability', latex: 'P(X \\in A \\mid X \\in B) = \\frac{P(X \\in A \\cap B)}{P(X \\in B)}', notes: 'General conditional probability formula' },
  ],
  workedExamples: [
    {
      id: 'm3-calcprob-ex1',
      title: 'GATE DA 2024 — Memoryless property of Exponential',
      difficulty: 'gate',
      problem: 'X ~ Exponential with mean 4. Find P(X > 10 | X > 6).',
      solution: [
        { explanation: 'Mean = 4, so rate $\\lambda = 1/4$.' },
        { explanation: 'Using memoryless property: $P(X > 10 | X > 6) = P(X > 10-6) = P(X > 4)$.' },
        { explanation: '$P(X > 4) = e^{-\\lambda \\cdot 4} = e^{-4/4} = e^{-1} \\approx 0.3679$', latex: 'P(X > 10 \\mid X > 6) = e^{-1} \\approx 0.368' },
      ],
      examTip: 'Key: Exponential is memoryless. P(X > s+t | X > s) = P(X > t) = e^{-λt}. Here s=6, t=4, λ=1/4, so e^{-1/4 · 4} = e^{-1}.',
    },
    {
      id: 'm3-calcprob-ex2',
      title: 'Conditional probability for Uniform',
      difficulty: 'intermediate',
      problem: 'X ~ Uniform[0,10]. Find P(X > 7 | X > 5).',
      solution: [
        { explanation: '$P(X > 7 | X > 5) = P(X > 7 \\text{ and } X > 5)/P(X > 5) = P(X > 7)/P(X > 5)$.' },
        { explanation: '$P(X > 7) = 3/10$. $P(X > 5) = 5/10 = 1/2$.' },
        { explanation: '$P(X > 7 | X > 5) = (3/10)/(1/2) = 3/5 = 0.6$.' },
        { explanation: 'Note: Uniform is NOT memoryless! $P(X > 7-5) = P(X > 2) = 8/10 \\neq 3/5$.', latex: 'P(X > 7 \\mid X > 5) = \\frac{3}{5}' },
      ],
      examTip: 'Only the Exponential has the memoryless property. For Uniform, compute directly.',
    },
    {
      id: 'm3-calcprob-ex3',
      title: 'Binomial tail probability',
      difficulty: 'intermediate',
      problem: 'X ~ Binomial(5, 0.4). Find P(X ≥ 3).',
      solution: [
        { explanation: '$P(X \\geq 3) = P(X=3)+P(X=4)+P(X=5)$.' },
        { explanation: '$P(X=3) = \\binom{5}{3}(0.4)^3(0.6)^2 = 10 \\cdot 0.064 \\cdot 0.36 = 0.2304$.' },
        { explanation: '$P(X=4) = \\binom{5}{4}(0.4)^4(0.6)^1 = 5 \\cdot 0.0256 \\cdot 0.6 = 0.0768$.' },
        { explanation: '$P(X=5) = (0.4)^5 = 0.01024$.' },
        { explanation: '$P(X \\geq 3) = 0.2304+0.0768+0.01024 = 0.31744$', latex: 'P(X \\geq 3) \\approx 0.317' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-calcprob-pyq14',
      topicId: 'calculating-probabilities',
      question: 'Let $X$ be an exponentially distributed random variable with mean $4$. What is the value of $P(X > 10 \\mid X > 6)$? (Round to three decimal places.)',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '0.368',
      hints: [
        { text: 'Mean = 4 means rate $\\lambda = 1/4$. The Exponential distribution is memoryless.' },
        { text: 'Memoryless property: $P(X > 10 | X > 6) = P(X > 4) = e^{-\\lambda \\cdot 4} = e^{-1}$.' },
      ],
      solution: [
        { explanation: '$\\lambda = 1/4$. By memoryless property: $P(X > 10 | X > 6) = P(X > 4)$.' },
        { explanation: '$P(X > 4) = e^{-4/4} = e^{-1} \\approx 0.3679$', latex: 'P(X > 10 \\mid X > 6) = e^{-1} \\approx 0.368' },
      ],
      explanation: 'GATE 2024: Exponential is the only continuous memoryless distribution. The key insight is P(X>10|X>6) = P(X>4), then apply the survival function.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 2, verified: true },
    },
    {
      id: 'm3-calcprob-1',
      topicId: 'calculating-probabilities',
      question: 'X ~ Exponential(λ=2). Find P(1 < X < 3).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.133',
      hints: [
        { text: '$P(1 < X < 3) = P(X > 1) - P(X > 3) = e^{-2} - e^{-6}$.' },
      ],
      solution: [
        { explanation: '$P(1<X<3) = e^{-2}-e^{-6} \\approx 0.1353-0.0025 = 0.1328 \\approx 0.133$.' },
        { explanation: '$P(1<X<3) = e^{-2}-e^{-6} \\approx 0.133$', latex: 'P(1 < X < 3) = e^{-2} - e^{-6} \\approx 0.133' },
      ],
      explanation: 'Use the exponential CDF or complement of survival function.',
      isPYQ: false,
    },
    {
      id: 'm3-calcprob-2',
      topicId: 'calculating-probabilities',
      question: 'X ~ Uniform[2, 8]. Find P(X > 5 | X > 4).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.75',
      hints: [
        { text: '$P(X > 5 | X > 4) = P(X > 5)/P(X > 4) = (3/6)/(4/6) = 3/4$.' },
      ],
      solution: [
        { explanation: '$P(X>5) = (8-5)/(8-2) = 3/6$. $P(X>4) = (8-4)/(8-2) = 4/6$.' },
        { explanation: '$P(X>5|X>4) = (3/6)/(4/6) = 3/4 = 0.75$.' },
      ],
      explanation: 'Conditional probability: ratio of probabilities. Uniform is NOT memoryless.',
      isPYQ: false,
    },
  ],
};

export const topicRVExpectationVariance: TopicContent = {
  id: 'rv-expectation-variance',
  moduleId: 'module3',
  title: 'Expectation and Variance of Random Variables',
  dayRange: 'Day 7',
  order: 8,
  conceptExplanation: {
    intuition: `Expectation is the probability-weighted average of all possible values — the "center of mass" of the distribution. Variance measures how spread out the values are around the mean. Together, they summarise an entire distribution with just two numbers.`,
    definition: `**Expectation:**
Discrete: $E[X] = \\sum_x x \\cdot P(X=x)$
Continuous: $E[X] = \\int_{-\\infty}^{\\infty} x f(x)\\,dx$

**LOTUS (Law of Unconscious Statistician):**
$E[g(X)] = \\sum_x g(x) P(X=x)$ (discrete)
$E[g(X)] = \\int g(x) f(x)\\,dx$ (continuous)

**Variance:**
$\\text{Var}(X) = E[(X-\\mu)^2] = E[X^2] - (E[X])^2$

**Standard Deviation:** $\\sigma = \\sqrt{\\text{Var}(X)}$

**Key properties (from Module 2 — also apply to RVs):**
$E[aX+b] = aE[X]+b$
$\\text{Var}(aX+b) = a^2\\text{Var}(X)$
$\\text{Var}(X+Y) = \\text{Var}(X)+\\text{Var}(Y)+2\\text{Cov}(X,Y)$

**Standard distribution moments:**
$\\text{Uniform}[a,b]$: $E = (a+b)/2$, $\\text{Var} = (b-a)^2/12$
$\\text{Exp}(\\lambda)$: $E = 1/\\lambda$, $\\text{Var} = 1/\\lambda^2$
$\\text{Binomial}(n,p)$: $E = np$, $\\text{Var} = np(1-p)$
$\\text{Poisson}(\\lambda)$: $E = \\lambda$, $\\text{Var} = \\lambda$`,
    whyItWorks: `The expectation is linear, which makes it computationally powerful. Variance uses E[X²]-(E[X])² because it's often easier to compute E[X²] via LOTUS than to work with the squared deviations directly.`,
    whenToUse: `These are core quantities asked in almost every GATE DA statistics question. Always know the moments of standard distributions.`,
    commonMistakes: [
      '$E[X^2] \\neq (E[X])^2$ — they are equal only if Var(X)=0 (constant RV)',
      '$E[X^2] = \\text{Var}(X) + (E[X])^2$ — rearrange the variance formula to get this',
      'For independent X,Y: $E[XY] = E[X]E[Y]$. This does NOT hold in general for dependent RVs.',
    ],
    examTips: [
      'GATE frequently asks: given distribution, find E[g(X)] — use LOTUS directly',
      'Shortcut: $E[X^2] = \\text{Var}(X) + (E[X])^2$. If you know the distribution, plug in known Var and E directly.',
    ],
  },
  formulas: [
    { name: 'LOTUS (discrete)', latex: 'E[g(X)] = \\sum_x g(x) P(X=x)', notes: 'No need to find distribution of g(X)' },
    { name: 'LOTUS (continuous)', latex: 'E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) f(x)\\,dx', notes: 'Direct integration' },
    { name: 'Variance formula', latex: '\\text{Var}(X) = E[X^2] - (E[X])^2', notes: 'Computational shortcut' },
    { name: 'Var of linear transform', latex: '\\text{Var}(aX+b) = a^2 \\text{Var}(X)', notes: 'b drops out' },
    { name: 'E[X²] shortcut', latex: 'E[X^2] = \\text{Var}(X) + (E[X])^2', notes: 'Rearranged variance formula' },
  ],
  workedExamples: [
    {
      id: 'm3-ev-ex1',
      title: 'LOTUS with continuous distribution',
      difficulty: 'intermediate',
      problem: 'X ~ Uniform[0,4]. Find $E[X^2]$ and $E[\\sqrt{X}]$.',
      solution: [
        { explanation: '$f(x) = 1/4$ on $[0,4]$.' },
        { explanation: '$E[X^2] = \\int_0^4 x^2 \\cdot (1/4)dx = (1/4)[x^3/3]_0^4 = (1/4)(64/3) = 16/3$' },
        { explanation: '$E[\\sqrt{X}] = \\int_0^4 \\sqrt{x} \\cdot (1/4)dx = (1/4)[\\frac{2}{3}x^{3/2}]_0^4 = (1/4)(\\frac{2}{3} \\cdot 8) = (1/4)(16/3) = 4/3$', latex: 'E[\\sqrt{X}] = \\frac{4}{3}' },
      ],
      examTip: 'LOTUS: multiply g(x) by f(x) and integrate. No need to transform the distribution.',
    },
    {
      id: 'm3-ev-ex2',
      title: 'Variance of sum of independent RVs',
      difficulty: 'intermediate',
      problem: 'X ~ Binomial(10, 0.3), Y ~ Poisson(2), independent. Find Var(X-Y).',
      solution: [
        { explanation: 'Var(X) = np(1-p) = 10(0.3)(0.7) = 2.1.' },
        { explanation: 'Var(Y) = λ = 2.' },
        { explanation: 'Var(X-Y) = Var(X) + Var(-Y) = Var(X) + (-1)²Var(Y) = 2.1 + 2 = 4.1', latex: '\\text{Var}(X-Y) = \\text{Var}(X) + \\text{Var}(Y) = 4.1' },
      ],
      examTip: 'For independent RVs: Var(X±Y) = Var(X) + Var(Y) always (note: +, not ±).',
    },
    {
      id: 'm3-ev-ex3',
      title: 'Conditional expectation intuition',
      difficulty: 'gate',
      problem: 'X ~ Exponential(rate=1). Using $E[X] = 1$, find $E[X | X > 1]$ using the memoryless property.',
      solution: [
        { explanation: 'By memoryless property: given X>1, the remaining lifetime follows the same Exponential(1) distribution.' },
        { explanation: 'So $X | (X>1)$ has the distribution of $1 + Y$ where $Y$ ~ Exponential(1).' },
        { explanation: '$E[X | X > 1] = 1 + E[Y] = 1 + 1 = 2$', latex: 'E[X | X > 1] = 1 + E[X] = 2' },
      ],
      examTip: 'Memoryless property + conditional expectation: E[X|X>s] = s + E[X]. This is a standard GATE pattern.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-ev-1',
      topicId: 'rv-expectation-variance',
      question: 'X ~ Exponential(rate=0.5). Find Var(X).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '4',
      hints: [
        { text: 'For Exp(λ): Var(X) = 1/λ². With λ=0.5: Var = 1/0.25 = 4.' },
      ],
      solution: [
        { explanation: '$\\text{Var}(X) = 1/\\lambda^2 = 1/(0.5)^2 = 4$.' },
      ],
      explanation: 'Standard result: for Exp(λ), mean = 1/λ and variance = 1/λ².',
      isPYQ: false,
    },
    {
      id: 'm3-ev-2',
      topicId: 'rv-expectation-variance',
      question: 'X has PDF $f(x) = 2x$ for $0 \\leq x \\leq 1$. Find $E[X^2]$.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.5',
      hints: [
        { text: 'Use LOTUS: $E[X^2] = \\int_0^1 x^2 \\cdot 2x\\,dx = \\int_0^1 2x^3\\,dx$.' },
      ],
      solution: [
        { explanation: '$E[X^2] = \\int_0^1 2x^3 dx = 2[x^4/4]_0^1 = 2/4 = 1/2 = 0.5$.' },
      ],
      explanation: 'LOTUS directly: integrate x² × f(x) over the support.',
      isPYQ: false,
    },
    {
      id: 'm3-ev-3',
      topicId: 'rv-expectation-variance',
      question: 'X ~ Binomial(20, 0.6). Find E[X(X-1)].',
      format: 'NAT',
      difficulty: 'challenging',
      correctAnswer: '136.8',
      hints: [
        { text: '$E[X(X-1)] = E[X^2] - E[X]$. Use $E[X^2] = \\text{Var}(X) + (E[X])^2$.' },
        { text: '$E[X]=12$, $\\text{Var}(X)=4.8$, so $E[X^2]=148.8$. Subtract $E[X]=12$.' },
      ],
      solution: [
        { explanation: '$E[X]=np=12$, $\\text{Var}(X)=np(1-p)=4.8$.' },
        { explanation: '$E[X^2] = 4.8+144 = 148.8$.' },
        { explanation: '$E[X(X-1)] = 148.8-12 = 136.8$', latex: 'E[X(X-1)] = 148.8 - 12 = 136.8' },
      ],
      explanation: 'Factoring approach: E[X(X-1)] = E[X²] - E[X]. Use known Binomial moments.',
      isPYQ: false,
    },
    {
      id: 'm3-ev-4',
      topicId: 'rv-expectation-variance',
      question: 'X and Y are independent, each Uniform[0,1]. Find Var(X+2Y).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.417',
      hints: [
        { text: 'Var(X+2Y) = Var(X) + 4Var(Y) for independent X,Y (since Cov=0).' },
        { text: 'Var(Uniform[0,1]) = (1-0)²/12 = 1/12 ≈ 0.0833.' },
      ],
      solution: [
        { explanation: '$\\text{Var}(X) = \\text{Var}(Y) = 1/12$.' },
        { explanation: '$\\text{Var}(X+2Y) = \\text{Var}(X)+4\\text{Var}(Y) = 1/12+4/12 = 5/12 \\approx 0.417$.' },
      ],
      explanation: 'For independent RVs: Var(aX+bY) = a²Var(X) + b²Var(Y).',
      isPYQ: false,
    },
    {
      id: 'm3-ev-5',
      topicId: 'rv-expectation-variance',
      question: 'X ~ Poisson(3). Find E[X(X-1)(X-2)] (the third factorial moment).',
      format: 'NAT',
      difficulty: 'challenging',
      correctAnswer: '27',
      hints: [
        { text: 'For Poisson(λ): the kth factorial moment $E[X(X-1)\\cdots(X-k+1)] = \\lambda^k$.' },
        { text: 'Third factorial moment = $\\lambda^3 = 3^3 = 27$.' },
      ],
      solution: [
        { explanation: 'For Poisson($\\lambda$): $E[X(X-1)(X-2)] = \\lambda^3 = 27$. This follows from the MGF/factorial moments of the Poisson distribution.' },
      ],
      explanation: 'Standard result: Poisson(λ) has factorial moments = powers of λ.',
      isPYQ: false,
    },
  ],
};
