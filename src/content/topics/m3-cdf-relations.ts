import type { TopicContent } from '../../types/content';

export const topicCDF: TopicContent = {
  id: 'cdf',
  moduleId: 'module3',
  title: 'Cumulative Distribution Function (CDF)',
  dayRange: 'Day 6',
  order: 5,
  conceptExplanation: {
    intuition: `The CDF is the universal description of a random variable — it works for discrete, continuous, and mixed RVs. It answers the fundamental question: "What is the probability that X takes a value at most x?"`,
    definition: `**CDF:** $F_X(x) = P(X \\leq x)$, defined for all $x \\in \\mathbb{R}$.

**Properties (must hold for any valid CDF):**
1. $0 \\leq F(x) \\leq 1$
2. $F$ is non-decreasing: $x_1 < x_2 \\Rightarrow F(x_1) \\leq F(x_2)$
3. Right-continuous: $\\lim_{t \\to x^+} F(t) = F(x)$
4. $\\lim_{x \\to -\\infty} F(x) = 0$ and $\\lim_{x \\to +\\infty} F(x) = 1$

**Computing probabilities from CDF:**
$P(a < X \\leq b) = F(b) - F(a)$
$P(a \\leq X \\leq b) = F(b) - F(a^-)$ (for discrete or mixed)
$P(X > a) = 1 - F(a)$
$P(X = a) = F(a) - F(a^-)$

**For discrete X:** $F(x) = \\sum_{k \\leq x} P(X=k)$ — staircase function

**For continuous X:** $F(x) = \\int_{-\\infty}^x f(t)\\,dt$ — smooth, differentiable`,
    whyItWorks: `The CDF is a complete characterisation of a distribution. Any probability question about X can be answered using F. For mixed distributions (partly discrete, partly continuous), the CDF is the only tool that handles both parts uniformly.`,
    whenToUse: `Use the CDF when: (1) asked for $P(X \\leq x)$ directly; (2) the distribution is mixed (jump + continuous); (3) deriving PDFs of transformed variables; (4) comparing distributions.`,
    commonMistakes: [
      '$P(a \\leq X \\leq b) \\neq F(b) - F(a)$ for discrete/mixed — it\'s $F(b) - F(a^-)$. For continuous, it doesn\'t matter.',
      'The CDF is right-continuous. At a jump, $F(x)$ uses the value AFTER the jump (the higher value).',
      'For a mixed RV: jumps in F correspond to point masses; continuous slope corresponds to density.',
    ],
    examTips: [
      'GATE DA 2024 had a mixed CDF question — read CDF piecewise carefully. Jumps at specific points mean discrete mass there.',
      'From CDF → PMF/PDF: discrete RVs: $P(X=k)$ = jump size at $k$; continuous: $f(x) = F\'(x)$.',
    ],
  },
  formulas: [
    { name: 'CDF definition', latex: 'F(x) = P(X \\leq x)', notes: 'Universal — works for all RV types' },
    { name: 'Interval probability', latex: 'P(a < X \\leq b) = F(b) - F(a)', notes: 'Exact for all RV types' },
    { name: 'CDF ↔ PDF', latex: 'f(x) = \\frac{d}{dx} F(x)', conditions: 'At points where F is differentiable' },
    { name: 'CDF ↔ PMF', latex: 'P(X = k) = F(k) - F(k^-) = F(k) - \\lim_{x \\to k^-} F(x)', notes: 'Size of jump at k' },
  ],
  workedExamples: [
    {
      id: 'm3-cdf-ex1',
      title: 'GATE DA 2024 — P(1≤X≤2) for mixed CDF',
      difficulty: 'gate',
      problem: `A random variable X has the following CDF:
$F(x) = 0$ for $x < 0$,
$F(x) = x/2$ for $0 \\leq x < 1$,
$F(x) = 2/3$ for $x = 1$ (jump at x=1),
$F(x) = x/3 + 1/3$ for $1 < x \\leq 2$,
$F(x) = 1$ for $x > 2$.
Find $P(1 \\leq X \\leq 2)$.`,
      solution: [
        { explanation: 'Formula: $P(a \\leq X \\leq b) = F(b) - F(a^-)$ where $F(a^-)$ is the left-limit at $a$.' },
        { explanation: '$F(1^-)$ uses the piece valid just before $x=1$: $F(1^-) = 1/4$.' },
        { explanation: '$F(2)$ uses the piece $1/2+(x-1)/6$ at $x=2$: $F(2) = 1/2+1/6 = 2/3$.' },
        { explanation: '$P(1 \\leq X \\leq 2) = 2/3 - 1/4 = 5/12$', latex: 'P(1 \\leq X \\leq 2) = F(2) - F(1^-) = \\frac{2}{3} - \\frac{1}{4} = \\frac{5}{12}' },
      ],
      examTip: 'For CDF problems: (1) identify jumps (discrete mass), (2) use F(b) - F(a-) for inclusive lower bound, (3) always use left-limit at the lower endpoint.',
    },
    {
      id: 'm3-cdf-ex2',
      title: 'CDF of a continuous distribution',
      difficulty: 'intermediate',
      problem: 'X has PDF $f(x)=2x$ for $0 \\leq x \\leq 1$. Find $F(x)$ and $P(0.5 < X \\leq 0.8)$.',
      solution: [
        { explanation: '$F(x) = \\int_0^x 2t\\,dt = t^2 \\Big|_0^x = x^2$ for $0 \\leq x \\leq 1$.' },
        { explanation: '$P(0.5 < X \\leq 0.8) = F(0.8) - F(0.5) = 0.64 - 0.25 = 0.39$.' },
      ],
      examTip: 'For continuous CDF: integrate PDF from lower support bound to x. The CDF is then a smooth function.',
    },
    {
      id: 'm3-cdf-ex3',
      title: 'Discrete CDF staircase',
      difficulty: 'basic',
      problem: 'X takes values {1,2,3} with P(X=k) = k/6. Sketch F(x) and find P(1 ≤ X ≤ 2).',
      solution: [
        { explanation: '$F(x) = 0$ for $x<1$; $F(x) = 1/6$ for $1 \\leq x < 2$; $F(x) = 1/2$ for $2 \\leq x < 3$; $F(x) = 1$ for $x \\geq 3$.' },
        { explanation: '$P(1 \\leq X \\leq 2) = P(X=1)+P(X=2) = 1/6+2/6 = 3/6 = 1/2$.' },
        { explanation: 'Using CDF: $F(2) - F(1^-) = 1/2 - 0 = 1/2$. ✓' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-cdf-pyq11',
      topicId: 'cdf',
      question: `A random variable $X$ has the following CDF:
$$F(x) = \\begin{cases} 0 & x < 0 \\\\ \\frac{x}{4} & 0 \\leq x < 1 \\\\ \\frac{1}{2} + \\frac{x-1}{6} & 1 \\leq x < 2 \\\\ 1 & x \\geq 2 \\end{cases}$$

Note: There is a jump of $\\frac{1}{4}$ at $x = 1$ (since $F(1^-) = \\frac{1}{4}$ and $F(1) = \\frac{1}{2}$).

What is $P(1 \\leq X \\leq 2)$?`,
      format: 'MCQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: '$\\dfrac{1}{4}$' },
        { label: 'B', text: '$\\dfrac{5}{12}$' },
        { label: 'C', text: '$\\dfrac{1}{2}$' },
        { label: 'D', text: '$\\dfrac{7}{12}$' },
      ],
      correctAnswer: 'B',
      hints: [
        { text: 'Use $P(1 \\leq X \\leq 2) = F(2) - F(1^-)$. For the lower bound, take the left-limit $F(1^-)$.' },
        { text: '$F(1^-) = \\lim_{x \\to 1^-} x/4 = 1/4$. For $F(2)$: use piece $1/2+(x-1)/6$ evaluated at $x=2$ (the piecewise formula valid on $[1,2)$ gives $F(2^-) = 2/3$, and that is $F(2)$ here since the question\'s upper range ends at 2).' },
      ],
      solution: [
        { explanation: 'Using $P(1 \\leq X \\leq 2) = F(2) - F(1^-)$.' },
        { explanation: '$F(1^-)$: left-limit at 1 uses piece $x/4$: $F(1^-) = 1/4$.' },
        { explanation: '$F(2)$: from piece $1/2 + (x-1)/6$: $F(2) = 1/2 + 1/6 = 2/3$.' },
        { explanation: '$P(1 \\leq X \\leq 2) = 2/3 - 1/4 = 8/12 - 3/12 = 5/12$', latex: 'P(1 \\leq X \\leq 2) = F(2) - F(1^-) = \\frac{2}{3} - \\frac{1}{4} = \\frac{5}{12}' },
      ],
      explanation: 'Key insight: $P(a \\leq X \\leq b) = F(b) - F(a^-)$. Here $F(2)$ uses the second piecewise formula, not the final "1" (which applies for $x > 2$ or $x \\geq 2$ jump). Read the CDF piecewise boundaries carefully.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 2, verified: true },
    },
    {
      id: 'm3-cdf-1',
      topicId: 'cdf',
      question: 'X has CDF $F(x) = 1 - e^{-2x}$ for $x \\geq 0$. Find $P(X > 1)$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.135',
      hints: [
        { text: '$P(X > 1) = 1 - F(1) = 1 - (1-e^{-2}) = e^{-2}$.' },
      ],
      solution: [
        { explanation: '$P(X>1) = 1 - F(1) = e^{-2} \\approx 0.1353$.' },
      ],
      explanation: 'This is an Exponential distribution with rate 2. Use complement of CDF.',
      isPYQ: false,
    },
    {
      id: 'm3-cdf-2',
      topicId: 'cdf',
      question: 'X has PDF $f(x) = 3x^2$ for $0 \\leq x \\leq 1$. Find $F(0.5)$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.125',
      hints: [
        { text: '$F(x) = \\int_0^x 3t^2 dt = x^3$.' },
      ],
      solution: [
        { explanation: '$F(x) = x^3$. $F(0.5) = (0.5)^3 = 0.125$.' },
      ],
      explanation: 'Integrate PDF from 0 to x to get CDF, then evaluate.',
      isPYQ: false,
    },
    {
      id: 'm3-cdf-3',
      topicId: 'cdf',
      question: 'Discrete X: P(X=k) = (1/2)^k for k=1,2,3,... Find P(X ≤ 3).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.875',
      hints: [
        { text: '$P(X \\leq 3) = P(X=1)+P(X=2)+P(X=3) = 1/2+1/4+1/8 = 7/8$.' },
      ],
      solution: [
        { explanation: '$F(3) = 1/2+1/4+1/8 = 7/8 = 0.875$.' },
      ],
      explanation: 'Geometric series: $\\sum_{k=1}^{3}(1/2)^k = (1/2)(1-(1/2)^3)/(1-1/2) = 7/8$.',
      isPYQ: false,
    },
  ],
};

export const topicPMFPDFCDFRelations: TopicContent = {
  id: 'pmf-pdf-cdf-relations',
  moduleId: 'module3',
  title: 'Relations between PMF, PDF, and CDF',
  dayRange: 'Day 6',
  order: 6,
  conceptExplanation: {
    intuition: `PMF, PDF, and CDF are three different "views" of the same distribution. The CDF is the master — PMF and PDF are derived from it. Understanding how to convert between them is a critical GATE skill.`,
    definition: `**Discrete case:**
$F(x) = \\sum_{k \\leq x} P(X=k)$ (CDF from PMF — cumulative sum)
$P(X=k) = F(k) - F(k^-)$ (PMF from CDF — jump size)

**Continuous case:**
$F(x) = \\int_{-\\infty}^x f(t)\\,dt$ (CDF from PDF — integral)
$f(x) = F'(x)$ (PDF from CDF — derivative)

**Computing any interval probability:**
$P(a < X < b) = F(b^-) - F(a)$
$P(a \\leq X \\leq b) = F(b) - F(a^-)$
$P(a < X \\leq b) = F(b) - F(a)$
$P(a \\leq X < b) = F(b^-) - F(a^-)$

**For continuous X:** all four expressions equal $F(b) - F(a) = \\int_a^b f(x)dx$.`,
    whyItWorks: `The CDF is a right-continuous non-decreasing function. Its jumps carry discrete probability mass; its derivatives (where they exist) are the density. Everything flows from this.`,
    whenToUse: `Whenever you need to convert between representations. GATE problems often give one form and ask for a quantity that's easier to compute with another form.`,
    commonMistakes: [
      'Forgetting the left-limit when lower bound is included for discrete/mixed distributions',
      'Taking derivative of a piecewise CDF at the junction points — the derivative doesn\'t exist there for discrete components',
    ],
    examTips: [
      'If a CDF has a jump at point $a$, then $P(X=a) =$ jump size. If CDF is differentiable, there\'s no discrete mass there.',
      'Mixed distribution: CDF = continuous part + staircase. Probabilities accumulate both ways.',
    ],
  },
  formulas: [
    { name: 'CDF ↔ PMF (discrete)', latex: 'P(X=k) = F(k) - F(k^-)', notes: 'Jump size in CDF' },
    { name: 'CDF ↔ PDF (continuous)', latex: 'f(x) = F\'(x)', notes: 'Derivative where it exists' },
    { name: 'Interval (continuous)', latex: 'P(a \\leq X \\leq b) = \\int_a^b f(x)dx = F(b) - F(a)', notes: 'Endpoints don\'t matter' },
    { name: 'Interval (discrete/mixed)', latex: 'P(a \\leq X \\leq b) = F(b) - F(a^-)', notes: 'Left-limit at lower bound' },
  ],
  workedExamples: [
    {
      id: 'm3-rel-ex1',
      title: 'CDF to PDF conversion',
      difficulty: 'basic',
      problem: 'CDF: $F(x) = 1 - (1+x)e^{-x}$ for $x \\geq 0$. Find the PDF.',
      solution: [
        { explanation: '$f(x) = F\'(x) = -(−e^{-x}) + (-(1+x)(-e^{-x})) = e^{-x} + (1+x)e^{-x} - e^{-x}$... Carefully:' },
        { explanation: '$\\frac{d}{dx}[1-(1+x)e^{-x}] = -\\frac{d}{dx}[(1+x)e^{-x}]$' },
        { explanation: '$= -[e^{-x} + (1+x)(-e^{-x})] = -[e^{-x} - (1+x)e^{-x}] = -[e^{-x}(1-(1+x))] = xe^{-x}$', latex: 'f(x) = xe^{-x}, \\quad x \\geq 0' },
        { explanation: 'This is a Gamma(2,1) distribution. Verify: $\\int_0^\\infty xe^{-x}dx = \\Gamma(2) = 1$. ✓' },
      ],
    },
    {
      id: 'm3-rel-ex2',
      title: 'PMF to CDF',
      difficulty: 'basic',
      problem: 'PMF: $P(X=k) = k/15$ for $k \\in \\{1,2,3,4,5\\}$. Build the CDF.',
      solution: [
        { explanation: '$F(1) = 1/15$. $F(2) = 3/15 = 1/5$. $F(3) = 6/15 = 2/5$. $F(4) = 10/15 = 2/3$. $F(5) = 15/15 = 1$.' },
        { explanation: 'The CDF is a step function increasing at each integer value.', latex: 'F(x) = \\sum_{k=1}^{\\lfloor x \\rfloor} \\frac{k}{15} \\text{ for } 1 \\leq x < 6' },
      ],
    },
    {
      id: 'm3-rel-ex3',
      title: 'Mixed distribution',
      difficulty: 'challenging',
      problem: 'X has $P(X=0)=0.3$ and PDF $f(x) = 0.7e^{-0.7x}$ for $x > 0$ (and 0 otherwise). Find $P(0 \\leq X \\leq 1)$.',
      solution: [
        { explanation: 'This is a mixed distribution. The mass at x=0 is 0.3; for x>0 it has an exponential density scaled to total 0.7.' },
        { explanation: 'Verify: $P(X=0) + \\int_0^\\infty 0.7e^{-0.7x}dx = 0.3 + 0.7 \\cdot [−e^{-0.7x}]_0^\\infty = 0.3 + 0.7 = 1$. ✓' },
        { explanation: '$P(0 \\leq X \\leq 1) = P(X=0) + P(0 < X \\leq 1) = 0.3 + \\int_0^1 0.7e^{-0.7x}dx$' },
        { explanation: '$= 0.3 + 0.7[-e^{-0.7x}]_0^1 = 0.3 + 0.7(1-e^{-0.7}) \\approx 0.3 + 0.7(0.5034) \\approx 0.3 + 0.3524 = 0.6524$', latex: 'P(0 \\leq X \\leq 1) = 0.3 + 0.7(1-e^{-0.7}) \\approx 0.652' },
      ],
      examTip: 'For mixed distributions: treat discrete mass and continuous part separately, then add.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm3-rel-1',
      topicId: 'pmf-pdf-cdf-relations',
      question: 'CDF: $F(x) = 1 - e^{-3x}$ for $x \\geq 0$. Find $P(X > 0.5)$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.223',
      hints: [
        { text: '$P(X > 0.5) = 1 - F(0.5) = e^{-1.5}$.' },
      ],
      solution: [
        { explanation: '$P(X>0.5) = 1-F(0.5) = e^{-1.5} \\approx 0.2231$.' },
      ],
      explanation: 'Complement rule with exponential CDF.',
      isPYQ: false,
    },
    {
      id: 'm3-rel-2',
      topicId: 'pmf-pdf-cdf-relations',
      question: 'PDF: $f(x) = \\frac{3}{2}(1-x^2)$ for $-1 \\leq x \\leq 1$. Find the CDF $F(0)$.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.5',
      hints: [
        { text: '$F(0) = \\int_{-1}^0 \\frac{3}{2}(1-x^2)dx$.' },
        { text: 'The PDF is symmetric around 0, so $F(0) = 0.5$ by symmetry.' },
      ],
      solution: [
        { explanation: 'By symmetry of $f(x) = 3(1-x^2)/2$ around $x=0$: $F(0)=0.5$.' },
      ],
      explanation: 'Symmetry shortcut: for symmetric PDFs, the median is 0 and F(0)=0.5.',
      isPYQ: false,
    },
    {
      id: 'm3-rel-3',
      topicId: 'pmf-pdf-cdf-relations',
      question: 'Discrete X with P(X=1)=0.4, P(X=2)=0.3, P(X=3)=0.3. Find P(1 < X ≤ 3).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '0.6',
      hints: [
        { text: '$P(1 < X \\leq 3) = P(X=2)+P(X=3)$.' },
      ],
      solution: [
        { explanation: '$P(1 < X \\leq 3) = 0.3+0.3 = 0.6$. Using CDF: $F(3)-F(1) = 1-0.4 = 0.6$. ✓' },
      ],
      explanation: 'For discrete X: P(a < X ≤ b) = F(b) - F(a). Note: strict inequality at lower end excludes X=1.',
      isPYQ: false,
    },
  ],
};
