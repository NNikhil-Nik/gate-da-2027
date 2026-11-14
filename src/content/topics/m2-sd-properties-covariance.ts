import type { TopicContent } from '../../types/content';

export const topicStdDev: TopicContent = {
  id: 'std-deviation',
  moduleId: 'module2',
  title: 'Standard Deviation',
  dayRange: 'Day 3',
  order: 4,
  conceptExplanation: {
    intuition: `Standard deviation is the square root of variance — it's in the same units as the data, making it interpretable. A small SD means data clusters tightly around the mean; a large SD means wide spread.

The pooled SD formula is crucial for GATE DA questions involving two groups.`,
    definition: `**Standard Deviation:** $\\sigma = \\sqrt{\\text{Var}(X)}$

**Pooled population variance (combining two groups):**
$$\\sigma^2_{\\text{combined}} = \\frac{n_1(\\sigma_1^2 + (\\mu_1-\\mu)^2) + n_2(\\sigma_2^2 + (\\mu_2-\\mu)^2)}{n_1+n_2}$$
where $\\mu = \\frac{n_1\\mu_1+n_2\\mu_2}{n_1+n_2}$ is the combined mean.

**Coefficient of Variation:** $CV = \\frac{\\sigma}{\\mu} \\times 100\\%$ (relative spread, unit-free)

**Chebyshev's Inequality:** For any distribution with finite mean $\\mu$ and SD $\\sigma$:
$$P(|X - \\mu| \\geq k\\sigma) \\leq \\frac{1}{k^2} \\quad \\text{for } k > 1$$`,
    whyItWorks: `The pooled variance formula decomposes total variation into within-group variation ($\\sigma_i^2$) and between-group variation ($(\\mu_i - \\mu)^2$). It generalises the parallel axis theorem in mechanics.`,
    whenToUse: `Use pooled SD when combining two groups with different means and SDs. Use Chebyshev when no distribution is specified (it applies to ALL distributions).`,
    commonMistakes: [
      'Taking the simple average of two SDs to get combined SD is WRONG — you must combine variances via the pooled formula',
      'Chebyshev is a worst-case bound — for specific distributions (e.g. normal), the actual probability can be much smaller',
    ],
    examTips: [
      'GATE 2024 tested the pooled SD formula exactly — compute combined mean first, then use the full formula',
      'Chebyshev says at least $1-1/k^2$ of data lies within $k$ SDs. For $k=2$: at least 75%. For $k=3$: at least 88.9%.',
    ],
  },
  formulas: [
    { name: 'Standard Deviation', latex: '\\sigma = \\sqrt{\\text{Var}(X)} = \\sqrt{E[X^2] - (E[X])^2}', variables: 'SD is in same units as X' },
    { name: 'Pooled Population Variance', latex: '\\sigma^2 = \\frac{n_1(\\sigma_1^2 + d_1^2) + n_2(\\sigma_2^2 + d_2^2)}{n_1+n_2}', variables: '$d_i = \\mu_i - \\mu_{\\text{combined}}$', notes: 'Generalises to k groups' },
    { name: "Chebyshev's Inequality", latex: 'P(|X - \\mu| \\geq k\\sigma) \\leq \\frac{1}{k^2}', conditions: '$k > 1$, any distribution with finite mean and variance' },
  ],
  workedExamples: [
    {
      id: 'm2-sd-ex1',
      title: 'GATE DA 2024 — Pooled standard deviation',
      difficulty: 'gate',
      problem: 'Batch 1: 20 students, mean 70, population SD 8. Batch 2: 30 students, mean 80, population SD 6. Find the combined population SD.',
      solution: [
        { explanation: 'Combined mean: $\\mu = \\frac{20(70)+30(80)}{50} = 3800/50 = 76$.' },
        { explanation: '$d_1 = 70-76 = -6$, $d_2 = 80-76 = 4$.' },
        { explanation: 'Combined variance:', latex: '\\sigma^2 = \\frac{20(64 + 36) + 30(36 + 16)}{50} = \\frac{20(100)+30(52)}{50} = \\frac{2000+1560}{50} = \\frac{3560}{50} = 71.2' },
        { explanation: '$\\sigma = \\sqrt{71.2} \\approx 8.438$. Rounded to 2 d.p.: $\\mathbf{8.44}$.' },
      ],
      examTip: 'Steps: (1) combined mean, (2) $d_i = \\mu_i - \\mu$, (3) pooled variance, (4) take square root.',
    },
    {
      id: 'm2-sd-ex2',
      title: 'Chebyshev application',
      difficulty: 'intermediate',
      problem: 'A distribution has mean 50 and SD 10. Using Chebyshev, find the minimum probability that X lies between 20 and 80.',
      solution: [
        { explanation: '[20, 80] = [50-30, 50+30] = within $k=3$ SDs.' },
        { explanation: 'Chebyshev: $P(|X-50| \\geq 30) \\leq 1/9$. So $P(|X-50| < 30) \\geq 8/9 \\approx 0.889$.' },
        { explanation: '$P(20 < X < 80) \\geq 1 - 1/9 = 8/9 \\approx 0.889$', latex: 'P(20 \\leq X \\leq 80) \\geq 1 - \\frac{1}{3^2} = \\frac{8}{9}' },
      ],
    },
    {
      id: 'm2-sd-ex3',
      title: 'Coefficient of variation comparison',
      difficulty: 'intermediate',
      problem: 'Dataset A: mean=50, SD=5. Dataset B: mean=200, SD=15. Which has relatively higher variability?',
      solution: [
        { explanation: '$CV_A = 5/50 = 10\\%$. $CV_B = 15/200 = 7.5\\%$.' },
        { explanation: 'Dataset A has higher relative variability (10% > 7.5%), even though its absolute SD is lower.' },
      ],
      examTip: 'CV is unit-free — use it to compare variability across datasets with different scales or units.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm2-sd-pyq7',
      topicId: 'std-deviation',
      question: 'Two batches of students took a Machine Learning quiz. Batch 1 consists of 20 students with a mean score of 70 and a population standard deviation of 8. Batch 2 consists of 30 students with a mean score of 80 and a population standard deviation of 6. What is the pooled (combined) population standard deviation of all 50 students combined? (Round off to two decimal places.)',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '8.44',
      hints: [
        { text: 'First find the combined mean: $\\mu = (20 \\times 70 + 30 \\times 80)/50 = 76$.' },
        { text: 'Then use pooled variance formula: $\\sigma^2 = [n_1(\\sigma_1^2+(\\mu_1-\\mu)^2)+n_2(\\sigma_2^2+(\\mu_2-\\mu)^2)]/(n_1+n_2)$.' },
      ],
      solution: [
        { explanation: 'Combined mean $\\mu = 76$. $d_1=70-76=-6$, $d_2=80-76=4$.' },
        { explanation: '$\\sigma^2 = [20(64+36)+30(36+16)]/50 = [2000+1560]/50 = 71.2$.' },
        { explanation: '$\\sigma = \\sqrt{71.2} \\approx 8.44$', latex: '\\sigma = \\sqrt{71.2} \\approx 8.44' },
      ],
      explanation: 'The pooled variance accounts for both within-group spread and between-group differences in means.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 2, verified: true },
    },
    {
      id: 'm2-sd-1',
      topicId: 'std-deviation',
      question: 'A distribution has mean 100 and SD 20. What is the minimum probability that X lies between 60 and 140?',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.75',
      hints: [
        { text: '[60, 140] = [100-40, 100+40] = within $k = 40/20 = 2$ SDs.' },
        { text: 'Chebyshev: $P(|X-\\mu| \\geq 2\\sigma) \\leq 1/4$, so $P(60 \\leq X \\leq 140) \\geq 3/4$.' },
      ],
      solution: [
        { explanation: 'k = 40/20 = 2. Chebyshev gives $P(|X-100| \\geq 40) \\leq 1/4$.' },
        { explanation: '$P(60 \\leq X \\leq 140) \\geq 1 - 1/4 = 3/4 = 0.75$.' },
      ],
      explanation: 'Chebyshev works for ANY distribution — not just normal.',
      isPYQ: false,
    },
    {
      id: 'm2-sd-2',
      topicId: 'std-deviation',
      question: 'If $\\text{Var}(X) = 16$, what is $\\text{SD}(2X+5)$?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '8',
      hints: [{ text: '$\\text{SD}(aX+b) = |a| \\cdot \\text{SD}(X)$. Here $a=2$, so SD doubles.' }],
      solution: [
        { explanation: '$\\text{SD}(X) = \\sqrt{16} = 4$.' },
        { explanation: '$\\text{SD}(2X+5) = |2| \\times 4 = 8$.' },
      ],
      explanation: 'SD scales linearly with the coefficient; constants have no effect on SD.',
      isPYQ: false,
    },
  ],
};

export const topicExpectationProps: TopicContent = {
  id: 'expectation-properties',
  moduleId: 'module2',
  title: 'Properties of Expectation',
  dayRange: 'Day 4',
  order: 5,
  conceptExplanation: {
    intuition: `Linearity of expectation is one of the most useful tools in probability — it holds always, regardless of dependence. This makes many otherwise hard problems trivial.`,
    definition: `**Linearity (always holds):**
$E[aX + bY + c] = aE[X] + bE[Y] + c$

This extends to any finite number of random variables:
$E\\left[\\sum_{i=1}^n a_i X_i\\right] = \\sum_{i=1}^n a_i E[X_i]$

**Product (independence required):**
$E[XY] = E[X]E[Y]$ if X and Y are independent.

**Jensen's Inequality:** For convex $g$: $E[g(X)] \\geq g(E[X])$. For concave $g$: $E[g(X)] \\leq g(E[X])$.

**Tower Property (Law of Iterated Expectation):**
$E[X] = E[E[X|Y]]$

**Markov's Inequality:** For $X \\geq 0$ and $a > 0$: $P(X \\geq a) \\leq \\frac{E[X]}{a}$`,
    whyItWorks: `Linearity: $E[X+Y] = \\int (x+y)f(x,y)dxdy = \\int x f(x,y)dxdy + \\int y f(x,y)dxdy = E[X]+E[Y]$. No assumption about dependence needed.`,
    whenToUse: `Use linearity to break complex expectations into sums of simpler ones. Use Jensen to bound $E[g(X)]$. Use tower property for conditional expectation.`,
    commonMistakes: [
      '$E[X^2] \\neq (E[X])^2$ — Jensen\'s says $E[X^2] \\geq (E[X])^2$ (since $x^2$ is convex)',
      '$E[1/X] \\neq 1/E[X]$ — $1/x$ is convex for $x>0$, so $E[1/X] \\geq 1/E[X]$',
      'Linearity works for $E$, but NOT for $\\text{Var}$ when variables are dependent',
    ],
    examTips: [
      'The indicator variable trick: for counting problems, write $X = \\sum X_i$ where $X_i \\in \\{0,1\\}$, then $E[X] = \\sum P(X_i=1)$ by linearity',
    ],
  },
  formulas: [
    { name: 'Linearity', latex: 'E\\left[\\sum_{i} a_i X_i + c\\right] = \\sum_i a_i E[X_i] + c', notes: 'No independence assumption needed — always holds' },
    { name: "Jensen's Inequality (convex)", latex: 'E[g(X)] \\geq g(E[X]) \\text{ if } g \\text{ convex}', notes: 'e.g., $g(x)=x^2$: $E[X^2] \\geq (E[X])^2$' },
    { name: 'Tower Property', latex: 'E[X] = E[E[X|Y]]', notes: 'Marginalise by taking expectation over conditioning variable' },
    { name: "Markov's Inequality", latex: 'P(X \\geq a) \\leq \\frac{E[X]}{a}, \\quad X \\geq 0, a > 0', notes: 'Weak but universal upper bound' },
  ],
  workedExamples: [
    {
      id: 'm2-ep-ex1',
      title: 'Indicator variable trick',
      difficulty: 'intermediate',
      problem: 'Roll 3 dice. Find the expected number of sixes.',
      solution: [
        { explanation: 'Let $X_i = 1$ if die $i$ shows a 6, else 0. $E[X_i] = 1/6$.' },
        { explanation: '$E[\\text{total 6s}] = E[X_1+X_2+X_3] = E[X_1]+E[X_2]+E[X_3] = 3 \\times \\frac{1}{6} = \\frac{1}{2}$', latex: 'E[X_1+X_2+X_3] = \\frac{3}{6} = \\frac{1}{2}' },
      ],
      examTip: 'Indicator + linearity: define $X_i \\in \\{0,1\\}$ for each "success." Works even when $X_i$ are dependent.',
    },
    {
      id: 'm2-ep-ex2',
      title: "Jensen's Inequality application",
      difficulty: 'gate',
      problem: 'For X with $E[X] = 2$, is $E[e^X]$ greater than, equal to, or less than $e^{E[X]} = e^2$?',
      solution: [
        { explanation: '$g(x) = e^x$ is convex (its second derivative $e^x > 0$).' },
        { explanation: 'By Jensen: $E[e^X] \\geq e^{E[X]} = e^2$.' },
      ],
      examTip: 'Convex: $g\'\'(x) > 0$. Common convex functions: $e^x$, $x^2$, $|x|$. Common concave: $\\ln x$, $\\sqrt{x}$.',
    },
    {
      id: 'm2-ep-ex3',
      title: 'Tower property',
      difficulty: 'gate',
      problem: 'X is uniform on {1,...,N}, where N is uniform on {1,2,3}. Find E[X].',
      solution: [
        { explanation: '$E[X|N=n] = (n+1)/2$ (mean of uniform on $\\{1,\\ldots,n\\}$).' },
        { explanation: '$E[X] = E[E[X|N]] = E[(N+1)/2] = (E[N]+1)/2$.' },
        { explanation: '$E[N] = (1+2+3)/3 = 2$. So $E[X] = (2+1)/2 = 3/2$.' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm2-ep-1',
      topicId: 'expectation-properties',
      question: 'A hat contains cards numbered 1 to 10. Draw one card. Let X = card number. Find E[X²] - E[X]² and state what this equals.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '8.25',
      hints: [
        { text: 'E[X] = (1+...+10)/10 = 5.5. E[X²] = (1+4+...+100)/10.' },
        { text: 'E[X²] = Σk²/10 for k=1 to 10. Sum of squares 1 to n = n(n+1)(2n+1)/6.' },
      ],
      solution: [
        { explanation: '$E[X]=5.5$. $E[X^2]=\\frac{1^2+\\cdots+10^2}{10}=\\frac{385}{10}=38.5$.' },
        { explanation: '$E[X^2]-(E[X])^2=38.5-30.25=8.25=\\text{Var}(X)$.' },
      ],
      explanation: 'This equals the variance, confirming $\\text{Var}(X) = E[X^2]-(E[X])^2$.',
      isPYQ: false,
    },
    {
      id: 'm2-ep-2',
      topicId: 'expectation-properties',
      question: 'Roll 10 fair dice. What is the expected number of dice showing an even number?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '5',
      hints: [{ text: 'Indicator variable: $X_i=1$ if die $i$ shows even. $P(X_i=1)=1/2$. Sum over 10 dice.' }],
      solution: [
        { explanation: '$E[\\text{even count}] = \\sum_{i=1}^{10} P(\\text{die } i \\text{ even}) = 10 \\times \\frac{1}{2} = 5$.' },
      ],
      explanation: 'Linearity of expectation with indicator variables.',
      isPYQ: false,
    },
    {
      id: 'm2-ep-3',
      topicId: 'expectation-properties',
      question: 'For a non-negative random variable X with E[X] = 4, what is the upper bound on P(X ≥ 20)?',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.2',
      hints: [{ text: 'Markov\'s inequality: $P(X \\geq a) \\leq E[X]/a$.' }],
      solution: [
        { explanation: '$P(X \\geq 20) \\leq E[X]/20 = 4/20 = 0.2$.' },
      ],
      explanation: "Markov's inequality gives an upper bound using only the mean.",
      isPYQ: false,
    },
  ],
};

export const topicVarianceProps: TopicContent = {
  id: 'variance-properties',
  moduleId: 'module2',
  title: 'Properties of Variance',
  dayRange: 'Day 4',
  order: 6,
  conceptExplanation: {
    intuition: `Unlike expectation, variance is NOT linear. Adding dependent random variables introduces a covariance term. This is why variance of a sum has the cross term $2\\text{Cov}(X,Y)$.`,
    definition: `**Scaling:**
$\\text{Var}(aX+b) = a^2 \\text{Var}(X)$

**Sum of two RVs:**
$\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X,Y)$

**Independent RVs:**
$\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y)$ (since $\\text{Cov}(X,Y)=0$)

**General linear combination:**
$\\text{Var}(aX+bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y) + 2ab\\text{Cov}(X,Y)$

**Sample mean variance:**
$\\text{Var}(\\bar{X}) = \\sigma^2/n$ for i.i.d. samples from distribution with variance $\\sigma^2$`,
    whyItWorks: `$\\text{Var}(X+Y) = E[(X+Y-\\mu_{X+Y})^2] = E[(X-\\mu_X)^2] + E[(Y-\\mu_Y)^2] + 2E[(X-\\mu_X)(Y-\\mu_Y)] = \\text{Var}(X)+\\text{Var}(Y)+2\\text{Cov}(X,Y)$.`,
    whenToUse: `Whenever computing variance of a linear combination. If X and Y are independent, the covariance term vanishes.`,
    commonMistakes: [
      '$\\text{Var}(X-Y) = \\text{Var}(X) + \\text{Var}(Y) - 2\\text{Cov}(X,Y)$ — NOT $\\text{Var}(X)-\\text{Var}(Y)$',
      '$\\text{Var}(X+Y) \\neq \\text{Var}(X)+\\text{Var}(Y)$ unless independent (or at least uncorrelated)',
      'Adding a constant $b$: $\\text{Var}(X+b) = \\text{Var}(X)$ — the constant shifts but doesn\'t spread',
    ],
    examTips: [
      'GATE 2024 MSQ tested this: asked which of four statements about linear transformations are ALWAYS true',
    ],
  },
  formulas: [
    { name: 'Variance of linear transform', latex: '\\text{Var}(aX+b) = a^2\\text{Var}(X)', notes: 'Constant has zero variance' },
    { name: 'Variance of sum', latex: '\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X,Y)', notes: 'Cross term vanishes when uncorrelated' },
    { name: 'Variance of difference', latex: '\\text{Var}(X-Y) = \\text{Var}(X) + \\text{Var}(Y) - 2\\text{Cov}(X,Y)', notes: 'Note the minus sign on Cov' },
    { name: 'Variance of sample mean', latex: '\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}', conditions: 'i.i.d. samples' },
  ],
  workedExamples: [
    {
      id: 'm2-vp-ex1',
      title: 'GATE DA 2024 — Linear transformation MSQ',
      difficulty: 'gate',
      problem: 'Dataset $x_1,\\ldots,x_n$ with mean $\\bar{x}$ and sample variance $s^2 > 0$. Define $y_i = ax_i + b$, $a \\neq 0$. Which statements are ALWAYS TRUE: (A) $\\bar{y}=a\\bar{x}+b$; (B) $s^2_y = a^2s^2+b^2$; (C) $s_y = |a|s$; (D) z-score of $y_i$ equals z-score of $x_i$ for $a>0$?',
      solution: [
        { explanation: '(A) $\\bar{y} = \\frac{1}{n}\\sum(ax_i+b) = a\\bar{x}+b$. TRUE.' },
        { explanation: '(B) $s^2_y = \\frac{1}{n-1}\\sum(ax_i+b - a\\bar{x}-b)^2 = \\frac{a^2}{n-1}\\sum(x_i-\\bar{x})^2 = a^2 s^2$. The $b$ disappears. So $s^2_y = a^2s^2 \\neq a^2s^2+b^2$. FALSE.' },
        { explanation: '(C) $s_y = \\sqrt{a^2 s^2} = |a|s$. TRUE.' },
        { explanation: '(D) z-score of $y_i$: $\\frac{y_i-\\bar{y}}{s_y} = \\frac{a(x_i-\\bar{x})}{|a|s} = \\frac{a}{|a|}\\cdot\\frac{x_i-\\bar{x}}{s}$. For $a>0$: $a/|a|=1$, so z-scores are equal. TRUE for $a>0$.' },
        { explanation: 'Correct answers: (A), (C), (D).' },
      ],
      examTip: 'The key trap in (B): adding $b$ shifts location, it does NOT affect spread/variance.',
    },
    {
      id: 'm2-vp-ex2',
      title: 'Variance of sum with known covariance',
      difficulty: 'intermediate',
      problem: 'Var(X)=4, Var(Y)=9, Cov(X,Y)=3. Find Var(2X-Y).',
      solution: [
        { explanation: '$\\text{Var}(2X-Y) = 4\\text{Var}(X) + \\text{Var}(Y) - 2(2)(-1)\\text{Cov}(X,Y)$... Let me use the direct formula.' },
        { explanation: '$\\text{Var}(2X-Y) = 2^2\\text{Var}(X) + (-1)^2\\text{Var}(Y) + 2(2)(-1)\\text{Cov}(X,Y) = 4(4)+1(9)+2(2)(-1)(3) = 16+9-12 = 13$', latex: '\\text{Var}(2X-Y) = 4\\text{Var}(X)+\\text{Var}(Y)-4\\text{Cov}(X,Y) = 16+9-12=13' },
      ],
    },
    {
      id: 'm2-vp-ex3',
      title: 'Variance of sample mean',
      difficulty: 'intermediate',
      problem: 'Draw $n=25$ i.i.d. samples from a distribution with $\\sigma^2 = 100$. Find SD of the sample mean.',
      solution: [
        { explanation: '$\\text{Var}(\\bar{X}) = \\sigma^2/n = 100/25 = 4$.' },
        { explanation: '$\\text{SD}(\\bar{X}) = \\sqrt{4} = 2$. The standard error is 2.' },
      ],
      examTip: 'Larger n → smaller SE → more reliable estimates. SD of sample mean = $\\sigma/\\sqrt{n}$ = "standard error".',
    },
  ],
  practiceQuestions: [
    {
      id: 'm2-vp-pyq6',
      topicId: 'variance-properties',
      question: 'Let $x_1, x_2, \\ldots, x_n$ ($n \\geq 2$) be a dataset with sample mean $\\bar{x}$ and sample variance $s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i - \\bar{x})^2 > 0$. Define $y_i = ax_i + b$ for $i = 1, \\ldots, n$, where $a, b \\in \\mathbb{R}$ and $a \\neq 0$. Which of the following statements is/are ALWAYS TRUE?\n(A) The sample mean of $y_1, \\ldots, y_n$ is $a\\bar{x} + b$.\n(B) The sample variance of $y_1, \\ldots, y_n$ is $a^2s^2 + b^2$.\n(C) The sample standard deviation of $y_1, \\ldots, y_n$ is $|a|s$.\n(D) The z-score of $y_i$ is equal to $\\frac{x_i - \\bar{x}}{s}$ for all $a > 0$.',
      format: 'MSQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: 'The sample mean of $y_1, \\ldots, y_n$ is $a\\bar{x} + b$.' },
        { label: 'B', text: 'The sample variance of $y_1, \\ldots, y_n$ is $a^2s^2 + b^2$.' },
        { label: 'C', text: 'The sample standard deviation of $y_1, \\ldots, y_n$ is $|a|s$.' },
        { label: 'D', text: 'The z-score of $y_i$ equals $\\frac{x_i - \\bar{x}}{s}$ for all $a > 0$.' },
      ],
      correctAnswer: ['A', 'C', 'D'],
      hints: [
        { text: 'For sample variance: $s^2_y = \\frac{1}{n-1}\\sum(y_i-\\bar{y})^2 = \\frac{1}{n-1}\\sum a^2(x_i-\\bar{x})^2 = a^2 s^2$. No $b^2$ term.' },
        { text: 'z-score of $y_i$: $\\frac{y_i-\\bar{y}}{s_y} = \\frac{a(x_i-\\bar{x})}{|a|s}$. For $a>0$: equals $\\frac{x_i-\\bar{x}}{s}$.' },
      ],
      solution: [
        { explanation: '(A) $\\bar{y} = a\\bar{x}+b$. TRUE.' },
        { explanation: '(B) $s^2_y = a^2 s^2$, NOT $a^2 s^2 + b^2$. FALSE — $b$ shifts mean, not variance.' },
        { explanation: '(C) $s_y = |a|s$. TRUE.' },
        { explanation: '(D) For $a>0$: z-score of $y_i = a(x_i-\\bar{x})/(as) = (x_i-\\bar{x})/s$. TRUE.' },
      ],
      explanation: 'The key insight: a constant added to all values shifts the mean but leaves the spread unchanged.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 2, verified: true },
    },
    {
      id: 'm2-vp-1',
      topicId: 'variance-properties',
      question: 'Var(X)=5, Var(Y)=3. If X and Y are independent, find Var(X-Y).',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '8',
      hints: [
        { text: 'Independent → Cov(X,Y)=0. Use Var(X-Y) = Var(X) + Var(Y) - 2Cov(X,Y).' },
        { text: 'Note: Var(X-Y) = Var(X) + (-1)²Var(Y) = Var(X) + Var(Y) when independent.' },
      ],
      solution: [
        { explanation: '$\\text{Var}(X-Y) = \\text{Var}(X)+(-1)^2\\text{Var}(Y)-2(0) = 5+3=8$.' },
      ],
      explanation: 'Variance of difference of independent variables is the SUM (not difference) of variances.',
      commonMistakes: 'Writing Var(X-Y) = Var(X) - Var(Y) = 2. Wrong! Variance is always non-negative.',
      isPYQ: false,
    },
  ],
};

export const topicCovariance: TopicContent = {
  id: 'covariance-correlation',
  moduleId: 'module2',
  title: 'Covariance and Correlation',
  dayRange: 'Day 4',
  order: 7,
  conceptExplanation: {
    intuition: `Covariance measures the direction of linear relationship between two variables. Positive covariance: they tend to move together. Negative: they move oppositely. Zero: no linear relationship.

Correlation standardises covariance to [-1, 1], making it comparable across different scales.`,
    definition: `**Covariance:**
$\\text{Cov}(X,Y) = E[(X-\\mu_X)(Y-\\mu_Y)] = E[XY] - E[X]E[Y]$

**Properties:**
- $\\text{Cov}(X,X) = \\text{Var}(X)$
- $\\text{Cov}(X,Y) = \\text{Cov}(Y,X)$ (symmetric)
- $\\text{Cov}(aX+b, cY+d) = ac\\cdot\\text{Cov}(X,Y)$
- $\\text{Cov}(X+Y, Z) = \\text{Cov}(X,Z) + \\text{Cov}(Y,Z)$ (bilinear)

**Pearson Correlation Coefficient:**
$\\rho_{XY} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}$, where $-1 \\leq \\rho \\leq 1$

**Key fact:** $X \\perp Y$ (independent) $\\Rightarrow$ $\\text{Cov}(X,Y)=0$. The CONVERSE IS FALSE: $\\text{Cov}(X,Y)=0$ does NOT imply independence.`,
    whyItWorks: `$\\text{Cov}(X,Y) = E[XY]-E[X]E[Y]$ follows from expanding $E[(X-\\mu_X)(Y-\\mu_Y)]$. The correlation divides by both standard deviations to remove scale effects, giving a dimensionless measure.`,
    whenToUse: `Use covariance/correlation to measure linear relationships. Important for variance of sums (Var(X+Y) formula). $\\rho = \\pm 1$ implies perfect linear relationship; $\\rho = 0$ means no linear relationship (but possibly non-linear).`,
    commonMistakes: [
      '$\\rho = 0$ does NOT mean X and Y are independent. E.g., $Y=X^2$ gives $\\text{Cov}(X,Y)=0$ if $X$ is symmetric, but Y is completely determined by X.',
      'Correlation measures LINEAR association only',
    ],
    examTips: [
      'GATE tests: correlation 0 ≠ independence — this is a classic trap',
      'For the sample correlation: $r = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{\\sqrt{\\sum(x_i-\\bar{x})^2}\\sqrt{\\sum(y_i-\\bar{y})^2}}$',
    ],
  },
  formulas: [
    { name: 'Covariance (computational)', latex: '\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]', notes: 'Most useful for calculations' },
    { name: 'Pearson Correlation', latex: '\\rho = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}', variables: '$\\sigma_X, \\sigma_Y$ = standard deviations; $-1 \\leq \\rho \\leq 1$' },
    { name: 'Bilinearity of Cov', latex: '\\text{Cov}(aX+b, cY+d) = ac \\cdot \\text{Cov}(X,Y)', notes: 'Constants inside Cov vanish' },
  ],
  workedExamples: [
    {
      id: 'm2-cov-ex1',
      title: 'Compute covariance from joint distribution',
      difficulty: 'intermediate',
      problem: 'X and Y have $E[X]=2$, $E[Y]=3$, $E[XY]=7$. Find Cov(X,Y) and state whether X and Y are positively or negatively correlated.',
      solution: [
        { explanation: '$\\text{Cov}(X,Y) = E[XY]-E[X]E[Y] = 7-2(3) = 7-6 = 1 > 0$.' },
        { explanation: 'Positive covariance: X and Y tend to move in the same direction.' },
      ],
    },
    {
      id: 'm2-cov-ex2',
      title: 'Zero correlation ≠ independence',
      difficulty: 'gate',
      problem: 'Let $X \\sim \\text{Uniform}(-1,1)$ and $Y=X^2$. Show $\\text{Cov}(X,Y)=0$ but X and Y are not independent.',
      solution: [
        { explanation: '$E[X]=0$ (symmetric). $E[Y]=E[X^2]=\\int_{-1}^1 x^2 \\cdot \\frac{1}{2}dx = \\frac{1}{3}$.' },
        { explanation: '$E[XY]=E[X^3]=\\int_{-1}^1 x^3 \\cdot \\frac{1}{2}dx = 0$ (odd function).' },
        { explanation: '$\\text{Cov}(X,Y) = E[XY]-E[X]E[Y] = 0 - 0 = 0$. Zero covariance.' },
        { explanation: 'But Y is completely determined by X ($Y=X^2$), so they are NOT independent.' },
      ],
      examTip: 'Covariance/correlation only measures LINEAR dependence. Non-linear dependence can exist with zero correlation.',
    },
    {
      id: 'm2-cov-ex3',
      title: 'Correlation coefficient',
      difficulty: 'intermediate',
      problem: 'X and Y have $\\sigma_X=2$, $\\sigma_Y=3$, $\\text{Cov}(X,Y)=4$. Find $\\rho$.',
      solution: [
        { explanation: '$\\rho = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y} = \\frac{4}{2 \\times 3} = \\frac{4}{6} = \\frac{2}{3} \\approx 0.667$', latex: '\\rho = \\frac{4}{2 \\times 3} = \\frac{2}{3}' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm2-cov-1',
      topicId: 'covariance-correlation',
      question: 'E[X]=1, E[Y]=2, E[X²]=3, E[Y²]=6, E[XY]=4. Find Cov(X,Y).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '2',
      hints: [{ text: 'Cov(X,Y) = E[XY] - E[X]E[Y] = 4 - 1×2.' }],
      solution: [{ explanation: '$\\text{Cov}(X,Y) = 4 - (1)(2) = 2$.' }],
      explanation: 'Computational formula: Cov = E[XY] - E[X]E[Y].',
      isPYQ: false,
    },
    {
      id: 'm2-cov-2',
      topicId: 'covariance-correlation',
      question: 'Which statement is TRUE about $\\rho_{XY} = 0$?',
      format: 'MCQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: 'X and Y are independent' },
        { label: 'B', text: 'X and Y have no linear relationship' },
        { label: 'C', text: 'Var(X+Y) = Var(X) + Var(Y) always' },
        { label: 'D', text: 'E[XY] = 0' },
      ],
      correctAnswer: 'B',
      hints: [
        { text: 'Zero correlation means no LINEAR relationship. Non-linear relationships can still exist.' },
        { text: 'Cov(X,Y)=0 (uncorrelated) is weaker than independence.' },
      ],
      solution: [
        { explanation: '(B) is correct: $\\rho=0$ means no linear relationship between X and Y.' },
        { explanation: '(A) is false: uncorrelated ≠ independent in general.' },
        { explanation: '(C) requires uncorrelated (Cov=0), which $\\rho=0$ implies. So (C) is also technically true for uncorrelated variables.' },
        { explanation: '(D) is false: $\\text{Cov}=E[XY]-E[X]E[Y]=0$ means $E[XY]=E[X]E[Y]$, not $E[XY]=0$.' },
        { explanation: 'The best answer is (B) as it directly states the meaning of $\\rho=0$.' },
      ],
      explanation: 'Zero correlation only rules out LINEAR dependence, not all dependence.',
      isPYQ: false,
    },
    {
      id: 'm2-cov-3',
      topicId: 'covariance-correlation',
      question: 'If $\\text{Cov}(X,Y)=6$, $\\sigma_X=3$, find the minimum possible $\\sigma_Y$ (since $|\\rho| \\leq 1$).',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '2',
      hints: [
        { text: '$|\\rho| = |\\text{Cov}(X,Y)|/(\\sigma_X \\sigma_Y) \\leq 1$.' },
        { text: '$\\sigma_Y \\geq |\\text{Cov}(X,Y)|/\\sigma_X = 6/3 = 2$.' },
      ],
      solution: [
        { explanation: '$|\\rho| \\leq 1 \\Rightarrow \\sigma_X \\sigma_Y \\geq |\\text{Cov}(X,Y)|$. So $\\sigma_Y \\geq 6/3 = 2$.' },
      ],
      explanation: 'The Cauchy-Schwarz inequality ensures $|\\rho| \\leq 1$, which constrains the SD.',
      isPYQ: false,
    },
  ],
};
