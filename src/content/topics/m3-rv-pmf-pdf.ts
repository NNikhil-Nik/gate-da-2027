import type { TopicContent } from '../../types/content';

export const topicRandomVariables: TopicContent = {
  id: 'random-variables',
  moduleId: 'module3',
  title: 'Random Variables',
  dayRange: 'Day 5',
  order: 1,
  conceptExplanation: {
    intuition: `A random variable is not a variable in the algebraic sense — it's a function that maps each outcome in the sample space to a real number. This abstraction lets us do analysis on numbers instead of abstract outcomes.`,
    definition: `A **random variable** $X$ is a function $X: \\Omega \\rightarrow \\mathbb{R}$.

For each outcome $\\omega \\in \\Omega$, $X(\\omega)$ is a real number.

$P(X = x) = P(\\{\\omega \\in \\Omega : X(\\omega) = x\\})$

$P(X \\leq x) = P(\\{\\omega \\in \\Omega : X(\\omega) \\leq x\\})$

**Discrete RV:** countable range $\\{x_1, x_2, \\ldots\\}$

**Continuous RV:** uncountable range (interval or union of intervals)`,
    whyItWorks: `The power of RVs: instead of reasoning about abstract events, we reason about real numbers. This enables calculus (integration, differentiation) to be applied to probability.`,
    whenToUse: `Whenever you model a numerical outcome of a random experiment. The RV is the tool that connects probability theory to real-world measurement.`,
    commonMistakes: [
      'A random variable is not "random" in the sense of being unknown — it\'s a well-defined function; the randomness comes from the input $\\omega$',
      'Two RVs can be defined on the same sample space and may be dependent',
    ],
    examTips: [
      'GATE rarely asks about the formal definition — focus on how to compute $P(X \\in A)$ using PMF/PDF/CDF',
    ],
  },
  formulas: [
    { name: 'RV definition', latex: 'X: \\Omega \\rightarrow \\mathbb{R}', variables: '$\\Omega$ = sample space' },
    { name: 'Event from RV', latex: 'P(a < X \\leq b) = P(\\{\\omega : a < X(\\omega) \\leq b\\})', variables: 'Computed via PMF or CDF' },
  ],
  workedExamples: [
    {
      id: 'm3-rv-ex1',
      title: 'Defining a RV on coin tosses',
      difficulty: 'basic',
      problem: 'Toss a fair coin twice. Define X = number of heads. What is the range of X and find P(X=1)?',
      solution: [
        { explanation: 'Sample space: {HH, HT, TH, TT}. X(HH)=2, X(HT)=1, X(TH)=1, X(TT)=0.' },
        { explanation: 'Range of X: {0, 1, 2}. P(X=1) = P({HT, TH}) = 2/4 = 1/2.' },
      ],
    },
    {
      id: 'm3-rv-ex2',
      title: 'RV on die roll',
      difficulty: 'basic',
      problem: 'Roll a die. Y = 1 if result is even, Y = 0 if odd. Find E[Y].',
      solution: [
        { explanation: 'P(Y=1) = 3/6 = 1/2, P(Y=0) = 1/2.' },
        { explanation: 'E[Y] = 1(1/2) + 0(1/2) = 1/2.' },
      ],
      examTip: 'Y is an indicator random variable. E[Y] = P(Y=1). This is a key shortcut.',
    },
    {
      id: 'm3-rv-ex3',
      title: 'Multiple RVs on the same space',
      difficulty: 'intermediate',
      problem: 'Roll two dice. X = sum, Y = |difference|. Are X and Y independent?',
      solution: [
        { explanation: 'P(X=2) = 1/36 (only (1,1)). P(Y=0) = 6/36 = 1/6.' },
        { explanation: 'P(X=2, Y=0) = P({(1,1)}) = 1/36.' },
        { explanation: 'P(X=2)P(Y=0) = (1/36)(1/6) = 1/216 ≠ 1/36. Not independent.' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-rv-1',
      topicId: 'random-variables',
      question: 'Toss a fair coin 3 times. X = number of heads. Find P(X ≥ 2).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.5',
      hints: [
        { text: 'Sample space has $2^3=8$ equally likely outcomes. Count those with ≥ 2 heads.' },
        { text: 'X=2: HHT,HTH,THH = 3. X=3: HHH = 1. Total: 4 outcomes.' },
      ],
      solution: [
        { explanation: 'P(X≥2) = P(X=2)+P(X=3) = 3/8+1/8 = 4/8 = 0.5.' },
      ],
      explanation: 'Enumerate outcomes or use binomial coefficients.',
      isPYQ: false,
    },
    {
      id: 'm3-rv-2',
      topicId: 'random-variables',
      question: 'X takes values in {-2, -1, 0, 1, 2} with equal probability. Find P(X² ≤ 1).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.6',
      hints: [
        { text: 'X² ≤ 1 means |X| ≤ 1, so X ∈ {-1, 0, 1}.' },
      ],
      solution: [
        { explanation: 'Each value has probability 1/5. X² ≤ 1 ↔ X ∈ {-1, 0, 1}: 3 values.' },
        { explanation: 'P(X² ≤ 1) = 3/5 = 0.6.' },
      ],
      explanation: 'Transform the event: X² ≤ 1 ↔ -1 ≤ X ≤ 1.',
      isPYQ: false,
    },
  ],
};

export const topicDiscreteVsContinuous: TopicContent = {
  id: 'discrete-vs-continuous',
  moduleId: 'module3',
  title: 'Discrete vs Continuous Random Variables',
  dayRange: 'Day 5',
  order: 2,
  conceptExplanation: {
    intuition: `The key difference: for a discrete RV, individual values have positive probability. For a continuous RV, every individual value has probability zero — probabilities are only meaningful over intervals.`,
    definition: `**Discrete RV:** Range is countable. Described by PMF: $P(X=x)$.

$P(a \\leq X \\leq b) = \\sum_{x \\in [a,b]} P(X=x)$

**Continuous RV:** Range is uncountable (interval). Described by PDF: $f(x) \\geq 0$.

$P(a \\leq X \\leq b) = \\int_a^b f(x)\\,dx$

$P(X=x) = 0$ for every specific $x$.

**Mixed RV:** Has both discrete and continuous parts (e.g., probability 0.5 of being exactly 0, and 0.5 of being uniformly distributed on [0,1]).`,
    whyItWorks: `Continuous RVs take uncountably many values, so assigning any positive probability to each point would make the total probability infinite. The PDF represents probability density — rate of probability per unit length.`,
    whenToUse: `Discrete: countable outcomes (number of events, dice, counts). Continuous: measurements (height, time, temperature). The distinction determines which mathematical tool (summation vs integration) you use.`,
    commonMistakes: [
      '$P(X = 1.5) = 0$ for a continuous RV — this is not a mistake, it\'s a feature. Only $P(X \\in [a,b])$ is nonzero.',
      'For continuous RVs: $P(a \\leq X \\leq b) = P(a < X < b) = P(a \\leq X < b)$ (single endpoints don\'t matter)',
    ],
    examTips: [
      'GATE frequently uses continuous distributions — always integrate PDF, never sum it',
      'If f(x) is given and you need P(X>c), integrate f from c to the upper bound',
    ],
  },
  formulas: [
    { name: 'Discrete probability', latex: 'P(a \\leq X \\leq b) = \\sum_{x=a}^{b} P(X=x)', conditions: 'Only for discrete X' },
    { name: 'Continuous probability', latex: 'P(a \\leq X \\leq b) = \\int_a^b f(x)\\,dx', conditions: 'Only for continuous X' },
    { name: 'Single point (continuous)', latex: 'P(X = x) = 0 \\text{ for all } x', notes: 'Probabilities only make sense over intervals' },
  ],
  workedExamples: [
    {
      id: 'm3-dc-ex1',
      title: 'Identifying discrete vs continuous',
      difficulty: 'basic',
      problem: 'Classify: (a) X = number of emails in an hour; (b) Y = time until next email arrives; (c) Z = number on a die.',
      solution: [
        { explanation: '(a) X: discrete (integer values 0,1,2,...) — Poisson distribution.' },
        { explanation: '(b) Y: continuous (can be any positive real) — Exponential distribution.' },
        { explanation: '(c) Z: discrete (values 1-6).' },
      ],
    },
    {
      id: 'm3-dc-ex2',
      title: 'Computing P(a ≤ X ≤ b) for continuous',
      difficulty: 'intermediate',
      problem: 'X ~ Uniform[0,4]. Find P(1 ≤ X ≤ 3).',
      solution: [
        { explanation: 'PDF: f(x) = 1/4 for 0 ≤ x ≤ 4.' },
        { explanation: '$P(1 \\leq X \\leq 3) = \\int_1^3 \\frac{1}{4}dx = \\frac{1}{4}(3-1) = \\frac{1}{2}$', latex: 'P(1 \\leq X \\leq 3) = \\frac{3-1}{4} = \\frac{1}{2}' },
      ],
    },
    {
      id: 'm3-dc-ex3',
      title: 'P(X=x) = 0 for continuous',
      difficulty: 'basic',
      problem: 'X ~ Uniform[0,1]. What is P(X = 0.5)?',
      solution: [
        { explanation: 'For any continuous RV, P(X = any specific value) = 0.' },
        { explanation: 'P(X = 0.5) = ∫_{0.5}^{0.5} f(x)dx = 0 (integral over a single point).' },
      ],
      examTip: 'Zero probability ≠ impossible. X can equal 0.5 — but the probability of EXACTLY 0.5 (vs 0.4999...9 or 0.5000...01) is zero.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-dc-1',
      topicId: 'discrete-vs-continuous',
      question: 'X is continuous with PDF $f(x) = 3x^2$ for $0 \\leq x \\leq 1$. Find P(X ≤ 0.5).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.125',
      hints: [
        { text: '$P(X \\leq 0.5) = \\int_0^{0.5} 3x^2\\, dx$.' },
      ],
      solution: [
        { explanation: '$\\int_0^{0.5} 3x^2 dx = [x^3]_0^{0.5} = (0.5)^3 = 0.125$', latex: '\\int_0^{0.5} 3x^2 dx = (0.5)^3 = 0.125' },
      ],
      explanation: 'Integrate the PDF up to the desired value.',
      isPYQ: false,
    },
    {
      id: 'm3-dc-2',
      topicId: 'discrete-vs-continuous',
      question: 'For a continuous RV X, P(X < 2) = 0.7. Find P(X ≥ 2).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.3',
      hints: [{ text: 'For continuous RVs, P(X < 2) = P(X ≤ 2). Use complement.' }],
      solution: [
        { explanation: 'P(X ≥ 2) = 1 - P(X < 2) = 1 - 0.7 = 0.3. For continuous RVs, the single point P(X=2)=0 so P(X<2)=P(X≤2).' },
      ],
      explanation: 'For continuous RVs, strict and non-strict inequalities give the same probability.',
      isPYQ: false,
    },
  ],
};

export const topicPMF: TopicContent = {
  id: 'pmf',
  moduleId: 'module3',
  title: 'Probability Mass Function (PMF)',
  dayRange: 'Day 5',
  order: 3,
  conceptExplanation: {
    intuition: `The PMF assigns a probability to each individual value that a discrete RV can take. It's the complete description of a discrete distribution — from it, you can compute any probability involving X.`,
    definition: `**PMF:** $p(x) = P(X=x)$ for discrete X.

**Properties:**
1. $p(x) \\geq 0$ for all $x$
2. $\\sum_{x \\in \\text{support}} p(x) = 1$

**Support:** $\\{x : p(x) > 0\\}$

**Computing probabilities:**
$P(a \\leq X \\leq b) = \\sum_{x=a}^{b} p(x)$

$P(X \\in A) = \\sum_{x \\in A} p(x)$`,
    whyItWorks: `The PMF encodes all the probability mass on the real line for a discrete distribution. The normalisation condition $\\sum p(x)=1$ ensures total probability is 1.`,
    whenToUse: `Whenever X is discrete. Given a table of values and their probabilities, that IS the PMF.`,
    commonMistakes: [
      'A PMF must sum to exactly 1 — always verify this when checking if a function is a valid PMF',
      'PMF values are probabilities (not densities), so they must be in [0,1]',
    ],
    examTips: [
      'To find a normalising constant $k$ in a PMF like $p(x) = kx$: set $\\sum kx = 1$ and solve',
    ],
  },
  formulas: [
    { name: 'PMF normalisation', latex: '\\sum_{x} P(X=x) = 1', notes: 'Must hold for any valid PMF' },
    { name: 'Expectation from PMF', latex: 'E[X] = \\sum_x x \\cdot P(X=x)', variables: 'Sum over support of X' },
    { name: 'Variance from PMF', latex: '\\text{Var}(X) = \\sum_x x^2 P(X=x) - \\left(\\sum_x x P(X=x)\\right)^2', notes: 'Use computational formula' },
  ],
  workedExamples: [
    {
      id: 'm3-pmf-ex1',
      title: 'Verifying a PMF',
      difficulty: 'basic',
      problem: 'Is $p(x) = x/10$ for $x \\in \\{1,2,3,4\\}$ a valid PMF?',
      solution: [
        { explanation: 'Check: $\\sum_{x=1}^{4} x/10 = (1+2+3+4)/10 = 10/10 = 1$. ✓' },
        { explanation: 'Each value: $p(1)=0.1, p(2)=0.2, p(3)=0.3, p(4)=0.4$. All in [0,1]. ✓' },
        { explanation: 'Valid PMF.' },
      ],
    },
    {
      id: 'm3-pmf-ex2',
      title: 'GATE DA 2024 — Variance of PMF',
      difficulty: 'gate',
      problem: 'X has PMF $P(X=k) = k/10$, $k \\in \\{1,2,3,4\\}$. Find Var(3X-2).',
      solution: [
        { explanation: '$E[X] = \\sum k \\cdot (k/10) = (1+4+9+16)/10 = 30/10 = 3$.' },
        { explanation: '$E[X^2] = \\sum k^2 \\cdot (k/10) = (1+8+27+64)/10 = 100/10 = 10$.' },
        { explanation: '$\\text{Var}(X) = E[X^2]-(E[X])^2 = 10-9 = 1$.' },
        { explanation: '$\\text{Var}(3X-2) = 3^2 \\text{Var}(X) = 9 \\times 1 = 9$', latex: '\\text{Var}(3X-2) = 9 \\times 1 = 9' },
      ],
      examTip: 'Use Var(aX+b)=a²Var(X). The constant -2 disappears. Compute E[X] and E[X²] using LOTUS.',
    },
    {
      id: 'm3-pmf-ex3',
      title: 'Finding normalisation constant',
      difficulty: 'intermediate',
      problem: 'PMF: $P(X=k) = ck^2$ for $k \\in \\{1,2,3\\}$. Find $c$ and then find $E[X]$.',
      solution: [
        { explanation: 'Normalisation: $c(1+4+9) = 1 \\Rightarrow 14c = 1 \\Rightarrow c = 1/14$.' },
        { explanation: '$E[X] = \\sum k \\cdot ck^2 = c(1+8+27) = (36/14) = 18/7 \\approx 2.57$', latex: 'E[X] = \\frac{1}{14}(1 \\cdot 1 + 2 \\cdot 4 + 3 \\cdot 9) = \\frac{36}{14} = \\frac{18}{7}' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-pmf-pyq12',
      topicId: 'pmf',
      question: 'Let $X$ be a discrete random variable taking values in $\\{1, 2, 3, 4\\}$ with probability mass function (PMF): $P(X = k) = \\frac{k}{10}$, $k \\in \\{1, 2, 3, 4\\}$. Find the variance of $Y = 3X - 2$, i.e., $\\text{Var}(3X - 2)$.',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '9',
      hints: [
        { text: 'Compute E[X] = Σk·(k/10) and E[X²] = Σk²·(k/10).' },
        { text: 'Var(X) = E[X²] - (E[X])². Then Var(3X-2) = 9·Var(X).' },
      ],
      solution: [
        { explanation: '$E[X] = (1 \\cdot 1 + 2 \\cdot 2 + 3 \\cdot 3 + 4 \\cdot 4)/10 = 30/10 = 3$.' },
        { explanation: '$E[X^2] = (1^3+2^3+3^3+4^3)/10 = (1+8+27+64)/10 = 100/10 = 10$.' },
        { explanation: '$\\text{Var}(X) = 10 - 9 = 1$.' },
        { explanation: '$\\text{Var}(3X-2) = 9 \\times 1 = 9$', latex: '\\text{Var}(3X-2) = 3^2 \\cdot \\text{Var}(X) = 9' },
      ],
      explanation: 'Key steps: (1) E[X]=3, (2) E[X²]=10, (3) Var(X)=1, (4) scale by 9.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 2, verified: true },
    },
    {
      id: 'm3-pmf-1',
      topicId: 'pmf',
      question: 'A fair coin is tossed 3 times. X = number of heads. Find P(X ≤ 2).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.875',
      hints: [
        { text: 'P(X=0)=1/8, P(X=1)=3/8, P(X=2)=3/8, P(X=3)=1/8.' },
        { text: 'P(X≤2) = 1 - P(X=3).' },
      ],
      solution: [
        { explanation: 'P(X≤2) = 1 - P(X=3) = 1 - 1/8 = 7/8 = 0.875.' },
      ],
      explanation: 'Complement is easier than summing three terms.',
      isPYQ: false,
    },
    {
      id: 'm3-pmf-2',
      topicId: 'pmf',
      question: 'PMF: P(X=-1)=1/3, P(X=0)=1/3, P(X=1)=1/3. Find Var(X).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.667',
      hints: [
        { text: 'E[X] = (-1+0+1)/3 = 0. E[X²] = (1+0+1)/3 = 2/3.' },
      ],
      solution: [
        { explanation: '$E[X]=0$. $E[X^2]=(1+0+1)/3=2/3$. $\\text{Var}(X)=2/3-0=2/3 \\approx 0.667$.' },
      ],
      explanation: 'Symmetric distribution: mean is 0, variance equals E[X²].',
      isPYQ: false,
    },
  ],
};

export const topicPDF: TopicContent = {
  id: 'pdf',
  moduleId: 'module3',
  title: 'Probability Density Function (PDF)',
  dayRange: 'Day 5',
  order: 4,
  conceptExplanation: {
    intuition: `The PDF is not a probability — it's a probability density. The area under the PDF curve over an interval gives the probability that X falls in that interval. The PDF can exceed 1; probabilities cannot.`,
    definition: `**PDF:** $f_X(x) \\geq 0$ with $\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1$

**Probabilities:**
$P(a \\leq X \\leq b) = \\int_a^b f(x)\\,dx$

**Single point:** $P(X=x) = 0$ for all $x$

**Normalisation:** Given $f(x) = cg(x)$, find $c$ by: $c \\int g(x)\\,dx = 1$

**Relationship to CDF:** $F(x) = \\int_{-\\infty}^x f(t)\\,dt$, so $f(x) = F'(x)$`,
    whyItWorks: `The PDF represents probability per unit length. Multiplying by a small width $dx$ gives the probability that X falls in a tiny interval $[x, x+dx]$: approximately $f(x)dx$.`,
    whenToUse: `All continuous distributions are described by PDFs. Finding normalisation constants, computing E[X], Var(X), and probabilities all involve integration of the PDF.`,
    commonMistakes: [
      '$f(x)$ can be greater than 1 (it\'s a density, not a probability). E.g., $f(x)=3$ on $[0, 1/3]$ is valid.',
      'Always verify the support before integrating — integrating over the wrong range gives wrong answers',
      'The PDF must be non-negative everywhere — check this for every proposed PDF',
    ],
    examTips: [
      'To find c in $f(x)=cx^n$: $c \\int x^n dx = 1$. For power functions on $[0,a]$: $c \\cdot a^{n+1}/(n+1) = 1$',
      'GATE frequently gives $f(x)=cx(a-x)$ type PDFs — set up the integral, solve for c, then compute requested probability',
    ],
  },
  formulas: [
    { name: 'PDF normalisation', latex: '\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1', notes: 'Also $f(x) \\geq 0$ everywhere' },
    { name: 'Probability from PDF', latex: 'P(a \\leq X \\leq b) = \\int_a^b f(x)\\,dx', notes: 'For continuous X' },
    { name: 'Expectation', latex: 'E[X] = \\int_{-\\infty}^{\\infty} x f(x)\\,dx', variables: 'Integrate over entire support' },
    { name: 'Variance', latex: '\\text{Var}(X) = \\int x^2 f(x)\\,dx - \\left(\\int x f(x)\\,dx\\right)^2', notes: 'LOTUS for E[X²], then subtract (E[X])²' },
  ],
  workedExamples: [
    {
      id: 'm3-pdf-ex1',
      title: 'GATE DA 2024 — P(X > 1.5) for quadratic PDF',
      difficulty: 'gate',
      problem: 'X has PDF $f(x) = cx(2-x)$ for $0 \\leq x \\leq 2$. Find $c$ and $P(X > 1.5)$.',
      solution: [
        { explanation: 'Find c: $\\int_0^2 cx(2-x)dx = c\\int_0^2 (2x-x^2)dx = c\\left[x^2 - x^3/3\\right]_0^2 = c(4-8/3) = c(4/3) = 1 \\Rightarrow c = 3/4$.' },
        { explanation: '$P(X>1.5) = \\frac{3}{4}\\int_{1.5}^2 x(2-x)dx = \\frac{3}{4}\\left[x^2 - \\frac{x^3}{3}\\right]_{1.5}^2$' },
        { explanation: 'At $x=2$: $4 - 8/3 = 4/3$. At $x=1.5$: $2.25 - 1.125 = 1.125 = 9/8$.', latex: 'P(X>1.5) = \\frac{3}{4}\\left(\\frac{4}{3} - \\frac{9}{8}\\right) = \\frac{3}{4} \\cdot \\frac{32-27}{24} = \\frac{3}{4} \\cdot \\frac{5}{24} = \\frac{5}{32} = 0.15625' },
      ],
      examTip: 'Steps: (1) find c via normalisation integral, (2) integrate from the threshold to upper bound.',
    },
    {
      id: 'm3-pdf-ex2',
      title: 'GATE DA 2025 — Transformed PDF (Y=X²)',
      difficulty: 'gate',
      problem: 'X ~ Uniform(-1,3). Y = X². Find $f_Y(y)$ for $0 < y < 1$.',
      solution: [
        { explanation: '$f_X(x) = 1/4$ for $x \\in [-1,3]$.' },
        { explanation: 'For $0 < y < 1$: $P(Y \\leq y) = P(X^2 \\leq y) = P(-\\sqrt{y} \\leq X \\leq \\sqrt{y})$.' },
        { explanation: 'Both $-\\sqrt{y}$ and $\\sqrt{y}$ lie in $[-1,3]$ when $0<y<1$.' },
        { explanation: '$F_Y(y) = \\int_{-\\sqrt{y}}^{\\sqrt{y}} \\frac{1}{4}dx = \\frac{2\\sqrt{y}}{4} = \\frac{\\sqrt{y}}{2}$.' },
        { explanation: '$f_Y(y) = \\frac{d}{dy}F_Y(y) = \\frac{1}{2} \\cdot \\frac{1}{2\\sqrt{y}} = \\frac{1}{4\\sqrt{y}}$', latex: 'f_Y(y) = \\frac{1}{4\\sqrt{y}}, \\quad 0 < y < 1' },
      ],
      examTip: 'Transformation technique: (1) find CDF of Y using P(Y≤y) = P(X in some set), (2) differentiate to get PDF. Always check which branch of $\\sqrt{y}$ lies in the support of X.',
    },
    {
      id: 'm3-pdf-ex3',
      title: 'Uniform distribution',
      difficulty: 'basic',
      problem: 'X ~ Uniform[a,b]. Find E[X] and Var(X).',
      solution: [
        { explanation: '$f(x) = 1/(b-a)$ for $a \\leq x \\leq b$.' },
        { explanation: '$E[X] = \\int_a^b \\frac{x}{b-a}dx = \\frac{1}{b-a}\\cdot\\frac{b^2-a^2}{2} = \\frac{a+b}{2}$', latex: 'E[X] = \\frac{a+b}{2}' },
        { explanation: '$E[X^2] = \\int_a^b \\frac{x^2}{b-a}dx = \\frac{a^2+ab+b^2}{3}$. $\\text{Var}(X)=E[X^2]-(E[X])^2 = \\frac{(b-a)^2}{12}$', latex: '\\text{Var}(X) = \\frac{(b-a)^2}{12}' },
      ],
      examTip: 'Standard results for Uniform: mean = midpoint, variance = $(b-a)^2/12$. Memorise these.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-pdf-pyq10',
      topicId: 'pdf',
      question: 'Let $X$ be a continuous random variable with probability density function (PDF): $f_X(x) = cx(2-x)$ for $0 \\leq x \\leq 2$, and $0$ otherwise. What is the value of $P(X > 1.5)$? (Round off to three decimal places.)',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '0.156',
      hints: [
        { text: 'First find $c$ using $\\int_0^2 cx(2-x)dx = 1$. The integral = $4c/3$, so $c = 3/4$.' },
        { text: 'Then compute $P(X>1.5) = \\frac{3}{4}\\int_{1.5}^2 x(2-x)dx$.' },
      ],
      solution: [
        { explanation: '$\\int_0^2 x(2-x)dx = [x^2-x^3/3]_0^2 = 4-8/3 = 4/3$. So $c=3/4$.' },
        { explanation: '$P(X>1.5) = \\frac{3}{4}\\int_{1.5}^2 (2x-x^2)dx = \\frac{3}{4}[x^2-x^3/3]_{1.5}^2$.' },
        { explanation: 'At 2: $4-8/3=4/3$. At 1.5: $2.25-1.125=9/8$.', latex: 'P(X>1.5) = \\frac{3}{4}\\cdot\\frac{5}{24} = \\frac{5}{32} = 0.15625 \\approx 0.156' },
      ],
      explanation: 'This is a GATE 2024 question. Steps: normalise, then integrate over the desired range.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 1, verified: true },
    },
    {
      id: 'm3-pdf-pyq13',
      topicId: 'pdf',
      question: 'Let $X$ be a continuous random variable uniformly distributed on $[-1, 3]$, i.e., $X \\sim \\text{Uniform}(-1, 3)$. Define $Y = X^2$. What is the probability density function $f_Y(y)$ for $0 < y < 1$?',
      format: 'MCQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: '$\\dfrac{1}{4\\sqrt{y}}$' },
        { label: 'B', text: '$\\dfrac{1}{2\\sqrt{y}}$' },
        { label: 'C', text: '$\\dfrac{1}{8\\sqrt{y}}$' },
        { label: 'D', text: '$\\dfrac{1}{\\sqrt{y}}$' },
      ],
      correctAnswer: 'A',
      hints: [
        { text: 'Use the CDF method: $F_Y(y) = P(Y \\leq y) = P(X^2 \\leq y) = P(-\\sqrt{y} \\leq X \\leq \\sqrt{y})$.' },
        { text: 'For $0<y<1$, both $\\pm\\sqrt{y}$ lie in $[-1,3]$. So $F_Y(y) = \\int_{-\\sqrt{y}}^{\\sqrt{y}} \\frac{1}{4}dx = \\frac{\\sqrt{y}}{2}$.' },
      ],
      solution: [
        { explanation: '$f_X(x)=1/4$ on $[-1,3]$. For $0<y<1$: $F_Y(y)=P(-\\sqrt{y} \\leq X \\leq \\sqrt{y}) = \\frac{2\\sqrt{y}}{4} = \\frac{\\sqrt{y}}{2}$.' },
        { explanation: '$f_Y(y) = \\frac{d}{dy}\\frac{\\sqrt{y}}{2} = \\frac{1}{2} \\cdot \\frac{1}{2\\sqrt{y}} = \\frac{1}{4\\sqrt{y}}$', latex: 'f_Y(y) = \\frac{1}{4\\sqrt{y}}' },
      ],
      explanation: 'PDF of transformed variable: use CDF method. Important: check that both ±√y lie in support of X for 0<y<1.',
      commonMistakes: 'For y>1, the lower bound -√y falls outside [-1,3], changing the formula. Always check ranges.',
      isPYQ: true,
      pyqMeta: { year: 2025, marks: 2, verified: true },
    },
    {
      id: 'm3-pdf-1',
      topicId: 'pdf',
      question: 'PDF: $f(x) = 2(1-x)$ for $0 \\leq x \\leq 1$. Verify this is a valid PDF and find E[X].',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.333',
      hints: [
        { text: '$\\int_0^1 2(1-x)dx = 2[x-x^2/2]_0^1 = 2(1/2) = 1$. Valid.' },
        { text: '$E[X] = \\int_0^1 x \\cdot 2(1-x)dx$.' },
      ],
      solution: [
        { explanation: 'Verify: $\\int_0^1 2(1-x)dx = 1$. ✓' },
        { explanation: '$E[X] = \\int_0^1 2x(1-x)dx = 2[x^2/2-x^3/3]_0^1 = 2(1/2-1/3) = 2(1/6) = 1/3 \\approx 0.333$', latex: 'E[X] = \\frac{1}{3}' },
      ],
      explanation: 'Integration practice: power rule for each term.',
      isPYQ: false,
    },
  ],
};
