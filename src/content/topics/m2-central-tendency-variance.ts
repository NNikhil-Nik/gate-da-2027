import type { TopicContent } from '../../types/content';

export const topicCentralTendency: TopicContent = {
  id: 'central-tendency',
  moduleId: 'module2',
  title: 'Mean, Median and Mode',
  dayRange: 'Day 3',
  order: 1,
  conceptExplanation: {
    intuition: `These three measures locate the "centre" of a distribution, but they locate it differently. The mean uses all values and is sensitive to outliers. The median uses only the middle value and is robust. The mode finds the most common value.

The key insight for GATE: in a skewed distribution, the three measures separate in a predictable order.`,
    definition: `**Arithmetic Mean:** $\\mu = \\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i$

**Weighted Mean:** $\\bar{x}_w = \\frac{\\sum w_i x_i}{\\sum w_i}$

**Geometric Mean:** $G = \\left(\\prod_{i=1}^n x_i\\right)^{1/n} = \\exp\\left(\\frac{1}{n}\\sum \\ln x_i\\right)$

**Harmonic Mean:** $H = \\frac{n}{\\sum_{i=1}^n \\frac{1}{x_i}}$

Relationship: $H \\leq G \\leq A$ (AM-GM-HM inequality, equality iff all values equal)

**Median:** Middle value when sorted. For even n, average of the two middle values.

**Mode:** Most frequently occurring value. A distribution can be unimodal, bimodal, or multimodal.

**Skewness and central measures:**
- Right-skewed (positive): $\\text{Mode} < \\text{Median} < \\text{Mean}$
- Left-skewed (negative): $\\text{Mean} < \\text{Median} < \\text{Mode}$
- Symmetric: $\\text{Mean} = \\text{Median} = \\text{Mode}$`,
    whyItWorks: `In a right-skewed distribution, the long tail on the right pulls the mean toward higher values, while the median (50th percentile) is dragged less, and the mode (the peak) stays at the most common lower value. This gives the ordering Mode < Median < Mean.`,
    whenToUse: `Use mean when data is symmetric and you need all values to contribute. Use median when data is skewed or has outliers (e.g., incomes, house prices). Use mode for categorical data or when the most common value matters.`,
    commonMistakes: [
      'For even n, median = average of the n/2-th and (n/2+1)-th values — not just the n/2-th',
      'The mean is affected by every value; adding a large outlier drastically changes the mean but not the median',
      'The skewness ordering (Mode < Median < Mean for right-skewed) is a general rule for unimodal distributions — it can fail for multimodal ones',
    ],
    examTips: [
      'GATE 2024 tested the skewness ordering directly — memorise: right-skewed → Mo < M < μ; left-skewed → μ < M < Mo',
      'Geometric mean is used for rates (average growth rates, returns), harmonic mean for rates where the denominator is the variable (average speed)',
    ],
  },
  formulas: [
    { name: 'Arithmetic Mean', latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i', variables: '$n$ = sample size, $x_i$ = data values' },
    { name: 'Weighted Mean', latex: '\\bar{x}_w = \\frac{\\sum_{i=1}^n w_i x_i}{\\sum_{i=1}^n w_i}', variables: '$w_i$ = weight of $x_i$' },
    { name: 'Combined Mean', latex: '\\bar{x} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}', variables: 'Two groups of sizes $n_1$, $n_2$ with means $\\bar{x}_1$, $\\bar{x}_2$' },
    { name: 'AM-GM-HM Inequality', latex: 'H \\leq G \\leq A', variables: '$H$ = harmonic mean, $G$ = geometric mean, $A$ = arithmetic mean', conditions: 'Equality iff all values are equal' },
    { name: 'Right-skew Order', latex: '\\text{Mode} < \\text{Median} < \\text{Mean}', notes: 'Applies to unimodal right-skewed distributions' },
  ],
  workedExamples: [
    {
      id: 'm2-ct-ex1',
      title: 'Skewness ordering',
      difficulty: 'basic',
      problem: 'Identify the correct order of mean, median, mode for income data (typically right-skewed, with a few very high earners).',
      solution: [
        { explanation: 'Income data is right-skewed: a few very high incomes create a long right tail.' },
        { explanation: 'The tail pulls the mean rightward. Mode is at the peak (most common income). Median is in between.' },
        { explanation: 'Order: Mode < Median < Mean' },
      ],
      examTip: 'Right-skewed = positive skew = long tail to the right. Mean is pulled toward the tail.',
    },
    {
      id: 'm2-ct-ex2',
      title: 'Combined mean of two groups',
      difficulty: 'intermediate',
      problem: 'Group 1: 20 students, mean score 70. Group 2: 30 students, mean score 80. What is the combined mean?',
      solution: [
        { explanation: 'Combined mean = $\\frac{n_1\\bar{x}_1 + n_2\\bar{x}_2}{n_1+n_2} = \\frac{20(70)+30(80)}{50} = \\frac{1400+2400}{50} = \\frac{3800}{50} = 76$', latex: '\\frac{20 \\times 70 + 30 \\times 80}{50} = \\frac{3800}{50} = 76' },
      ],
      examTip: 'Combined mean is a weighted average, not a simple average of the two means (which would give 75).',
    },
    {
      id: 'm2-ct-ex3',
      title: 'Effect of adding an outlier on mean vs median',
      difficulty: 'gate',
      problem: 'Dataset: {10, 12, 14, 16, 18}. A value 100 is added. How do mean and median change?',
      solution: [
        { explanation: 'Original mean = 70/5 = 14. Original median = 14 (middle value).' },
        { explanation: 'New mean = 170/6 = 28.33. New median: sorted {10,12,14,16,18,100}, median = (14+16)/2 = 15.' },
        { explanation: 'Mean increased by 14.33 (dramatic). Median increased by only 1 (robust).' },
      ],
      examTip: 'Median is robust to outliers. If a GATE question asks which measure is less affected by an extreme value, the answer is the median.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm2-ct-pyq9',
      topicId: 'central-tendency',
      question: 'In a right-skewed (positively skewed) unimodal distribution, which of the following orderings of the mean ($\\mu$), median ($M$), and mode ($M_o$) generally holds?\n(A) $\\mu < M < M_o$ (B) $M_o < M < \\mu$ (C) $M < M_o < \\mu$ (D) $\\mu < M_o < M$',
      format: 'MCQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: '$\\mu < M < M_o$' },
        { label: 'B', text: '$M_o < M < \\mu$' },
        { label: 'C', text: '$M < M_o < \\mu$' },
        { label: 'D', text: '$\\mu < M_o < M$' },
      ],
      correctAnswer: 'B',
      hints: [
        { text: 'Right-skewed = long tail to the right. The tail pulls the mean toward higher values.' },
        { text: 'The mode is at the peak of the distribution (leftmost of the three for right-skew). Mean is pulled furthest right.' },
      ],
      solution: [
        { explanation: 'In right-skewed distributions, extreme high values pull the mean rightward.' },
        { explanation: 'Order: Mode (peak, left) < Median (50th percentile) < Mean (pulled by tail).' },
        { explanation: 'So $M_o < M < \\mu$. Answer: (B).' },
      ],
      explanation: 'Mnemonic for right-skew: "MMM goes left to right as Mo, M, μ" i.e. Mode < Median < Mean.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 1, verified: true },
    },
    {
      id: 'm2-ct-1',
      topicId: 'central-tendency',
      question: 'Find the median of the dataset: {5, 2, 8, 1, 9, 3, 7, 4}.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '4.5',
      hints: [
        { text: 'Sort the data first.' },
        { text: 'For n=8 (even), median = average of 4th and 5th values.' },
      ],
      solution: [
        { explanation: 'Sorted: {1, 2, 3, 4, 5, 7, 8, 9}.' },
        { explanation: 'n=8, median = (4th + 5th)/2 = (4+5)/2 = 4.5.' },
      ],
      explanation: 'Always sort before finding median. For even n, average the two middle values.',
      isPYQ: false,
    },
    {
      id: 'm2-ct-2',
      topicId: 'central-tendency',
      question: 'A dataset has values {4, 7, 7, 9, 10}. What is the mode?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '7',
      hints: [{ text: 'Mode = most frequently occurring value.' }],
      solution: [{ explanation: '7 appears twice, all others appear once. Mode = 7.' }],
      explanation: 'Mode is the value with highest frequency.',
      isPYQ: false,
    },
    {
      id: 'm2-ct-3',
      topicId: 'central-tendency',
      question: 'For a symmetric distribution, which relationship holds between mean, median, and mode?',
      format: 'MCQ',
      difficulty: 'basic',
      options: [
        { label: 'A', text: 'Mean > Median > Mode' },
        { label: 'B', text: 'Mean < Median < Mode' },
        { label: 'C', text: 'Mean = Median = Mode' },
        { label: 'D', text: 'Mean ≠ Median' },
      ],
      correctAnswer: 'C',
      hints: [{ text: 'In a symmetric unimodal distribution, all three measures coincide at the centre.' }],
      solution: [{ explanation: 'For a symmetric distribution (like normal), Mean = Median = Mode at the centre.' }],
      explanation: 'The normal distribution is the canonical example: mean = median = mode.',
      isPYQ: false,
    },
  ],
};

export const topicExpectedValue: TopicContent = {
  id: 'expected-value',
  moduleId: 'module2',
  title: 'Expected Value',
  dayRange: 'Day 3',
  order: 2,
  conceptExplanation: {
    intuition: `The expected value is the probability-weighted average of all possible values. If you repeat an experiment many times, the average outcome converges to E[X] (by the law of large numbers).

It doesn't need to be a "possible" value — E[X] = 3.5 for a die, but no die shows 3.5.`,
    definition: `**Discrete:** $E[X] = \\sum_{x} x \\cdot P(X=x)$

**Continuous:** $E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\, dx$

**LOTUS (Law of the Unconscious Statistician):**
$E[g(X)] = \\sum_x g(x)P(X=x)$ (discrete) or $\\int g(x)f(x)dx$ (continuous)

**Linearity of Expectation:**
$E[aX + b] = aE[X] + b$
$E[aX + bY + c] = aE[X] + bE[Y] + c$ — always true, regardless of dependence between X and Y

**Key fact:** $E[XY] = E[X]E[Y]$ if and only if X and Y are uncorrelated (which follows from independence, but doesn't imply it).`,
    whyItWorks: `Linearity comes from the linearity of summation/integration: $\\sum (ax_i + b)P(X=x_i) = a\\sum x_i P(X=x_i) + b = aE[X]+b$.`,
    whenToUse: `Linearity of expectation is extremely powerful — it works even when X and Y are dependent! This is used in almost every GATE probability question involving sums or linear functions.`,
    commonMistakes: [
      '$E[g(X)] \\neq g(E[X])$ in general (Jensen\'s inequality). Exception: when $g$ is linear.',
      '$E[X^2] \\neq (E[X])^2$ — their difference is the variance!',
      'Linearity works for expectation but NOT for variance when variables are dependent',
    ],
    examTips: [
      'For any linear function $Y = aX + b$: $E[Y] = aE[X]+b$ and $\\text{Var}(Y) = a^2\\text{Var}(X)$',
      'LOTUS lets you compute $E[X^2]$ without finding the distribution of $X^2$: just integrate $x^2 f(x)$',
    ],
  },
  formulas: [
    { name: 'Expected Value (Discrete)', latex: 'E[X] = \\sum_{x} x \\cdot P(X=x)', variables: 'Sum over support of X' },
    { name: 'Expected Value (Continuous)', latex: 'E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f_X(x)\\, dx', variables: '$f_X$ = PDF of X' },
    { name: 'Linearity', latex: 'E[aX + bY + c] = aE[X] + bE[Y] + c', notes: 'Always true — no independence needed' },
    { name: 'LOTUS', latex: 'E[g(X)] = \\sum_x g(x)P(X=x) = \\int g(x)f(x)\\,dx', notes: 'Compute E[g(X)] without finding distribution of g(X)' },
    { name: 'Product (independent)', latex: 'E[XY] = E[X] \\cdot E[Y] \\quad \\text{if X, Y independent}', notes: 'Fails when X, Y are dependent' },
  ],
  workedExamples: [
    {
      id: 'm2-ev-ex1',
      title: 'Expected value of a die',
      difficulty: 'basic',
      problem: 'Find E[X] where X is the outcome of one roll of a fair die.',
      solution: [
        { explanation: '$E[X] = 1(1/6) + 2(1/6) + \\cdots + 6(1/6) = \\frac{1+2+3+4+5+6}{6} = \\frac{21}{6} = 3.5$', latex: 'E[X] = \\frac{21}{6} = 3.5' },
      ],
      examTip: '3.5 is not a possible outcome, but it\'s the long-run average.',
    },
    {
      id: 'm2-ev-ex2',
      title: 'E[X²] using LOTUS',
      difficulty: 'intermediate',
      problem: 'For a fair die, find $E[X^2]$ using LOTUS.',
      solution: [
        { explanation: '$E[X^2] = \\sum_{x=1}^{6} x^2 \\cdot P(X=x) = \\frac{1+4+9+16+25+36}{6} = \\frac{91}{6} \\approx 15.17$', latex: 'E[X^2] = \\frac{1^2+2^2+3^2+4^2+5^2+6^2}{6} = \\frac{91}{6}' },
        { explanation: 'Note: $E[X^2] = 91/6 \\neq (E[X])^2 = (3.5)^2 = 12.25$. The difference is $\\text{Var}(X) = 91/6 - 49/4 = 35/12 \\approx 2.92$.' },
      ],
    },
    {
      id: 'm2-ev-ex3',
      title: 'Linearity across multiple events',
      difficulty: 'gate',
      problem: 'A fair coin is tossed 100 times. Let $X_i = 1$ if toss $i$ is heads, 0 otherwise. Find $E[\\text{total heads}]$.',
      solution: [
        { explanation: 'Let $X = \\sum_{i=1}^{100} X_i$. By linearity: $E[X] = \\sum_{i=1}^{100} E[X_i] = 100 \\times (1/2) = 50$', latex: 'E[X] = \\sum_{i=1}^{100} E[X_i] = 100 \\times \\frac{1}{2} = 50' },
        { explanation: 'Linearity works here even though the tosses are correlated with each other — oh wait, they\'re independent. But the key point is: linearity works even without independence.' },
      ],
      examTip: 'The indicator random variable technique: define $X_i \\in \\{0,1\\}$ for each "success," then $E[\\sum X_i] = \\sum E[X_i]$. Extremely powerful for counting problems.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm2-ev-1',
      topicId: 'expected-value',
      question: 'Let X have PMF: P(X=1)=0.2, P(X=2)=0.5, P(X=3)=0.3. Find E[X].',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '2.1',
      hints: [{ text: '$E[X] = \\sum x \\cdot P(X=x)$.' }],
      solution: [{ explanation: '$E[X] = 1(0.2)+2(0.5)+3(0.3) = 0.2+1.0+0.9 = 2.1$' }],
      explanation: 'Basic application of the expectation formula for a discrete distribution.',
      isPYQ: false,
    },
    {
      id: 'm2-ev-2',
      topicId: 'expected-value',
      question: 'If $E[X]=3$ and $E[Y]=5$, find $E[2X - 3Y + 7]$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '-2',
      hints: [{ text: 'Use linearity: $E[aX+bY+c] = aE[X]+bE[Y]+c$.' }],
      solution: [{ explanation: '$E[2X-3Y+7] = 2E[X]-3E[Y]+7 = 2(3)-3(5)+7 = 6-15+7 = -2$' }],
      explanation: 'Linearity of expectation — no need to know the distributions, just the expectations.',
      isPYQ: false,
    },
    {
      id: 'm2-ev-3',
      topicId: 'expected-value',
      question: 'X has PDF $f(x) = 2x$ for $0 \\leq x \\leq 1$, 0 otherwise. Find $E[X]$.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.667',
      hints: [
        { text: '$E[X] = \\int_0^1 x \\cdot 2x\\, dx = \\int_0^1 2x^2\\, dx$.' },
      ],
      solution: [
        { explanation: '$E[X] = \\int_0^1 2x^2\\, dx = \\left[\\frac{2x^3}{3}\\right]_0^1 = \\frac{2}{3} \\approx 0.667$', latex: 'E[X] = \\int_0^1 2x^2\\, dx = \\frac{2}{3}' },
      ],
      explanation: 'Continuous expectation: integrate $x \\cdot f(x)$ over the support.',
      isPYQ: false,
    },
    {
      id: 'm2-ev-4',
      topicId: 'expected-value',
      question: 'For the same X with PDF $f(x)=2x$, $0 \\leq x \\leq 1$, find $E[X^2]$ using LOTUS.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.5',
      hints: [
        { text: '$E[X^2] = \\int_0^1 x^2 \\cdot 2x\\, dx = \\int_0^1 2x^3\\, dx$.' },
      ],
      solution: [
        { explanation: '$E[X^2] = \\int_0^1 2x^3\\, dx = \\left[\\frac{x^4}{2}\\right]_0^1 = \\frac{1}{2} = 0.5$', latex: 'E[X^2] = \\int_0^1 2x^3 dx = \\frac{1}{2}' },
      ],
      explanation: 'LOTUS: substitute $g(x) = x^2$ into the expectation integral.',
      isPYQ: false,
    },
  ],
};

export const topicVariance: TopicContent = {
  id: 'variance',
  moduleId: 'module2',
  title: 'Variance',
  dayRange: 'Day 3',
  order: 3,
  conceptExplanation: {
    intuition: `Variance measures the average squared deviation from the mean — how "spread out" the data is. The squared deviation ensures positive contribution from both sides of the mean and penalises large deviations more heavily.`,
    definition: `**Variance (Population):** $\\sigma^2 = \\text{Var}(X) = E[(X-\\mu)^2] = E[X^2] - (E[X])^2$

**Computational formula (most useful):** $\\text{Var}(X) = E[X^2] - \\mu^2$

**Sample variance (Bessel's correction):** $s^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2$

**Why n-1?** Using $\\bar{x}$ instead of $\\mu$ introduces bias — dividing by $n-1$ corrects it, making $s^2$ an unbiased estimator of $\\sigma^2$.

**Key property:** $\\text{Var}(aX + b) = a^2\\text{Var}(X)$ (shifting by $b$ doesn't change spread; scaling by $a$ changes variance by $a^2$).`,
    whyItWorks: `$E[(X-\\mu)^2] = E[X^2 - 2\\mu X + \\mu^2] = E[X^2] - 2\\mu E[X] + \\mu^2 = E[X^2] - \\mu^2$. The computational formula is preferred for calculations.`,
    whenToUse: `Whenever a question asks about spread, dispersion, or the second moment. Use the computational formula $E[X^2]-(E[X])^2$ for calculations. Use sample variance $s^2$ (with $n-1$) when given a sample, population variance $\\sigma^2$ (with $n$) when given the full population.`,
    commonMistakes: [
      '$\\text{Var}(aX+b) = a^2\\text{Var}(X)$, NOT $a^2\\text{Var}(X) + b^2$ — constants don\'t affect spread',
      'Confusing population variance ($1/n$) with sample variance ($1/(n-1)$)',
      '$\\text{Var}(X+Y) \\neq \\text{Var}(X) + \\text{Var}(Y)$ unless X and Y are uncorrelated',
    ],
    examTips: [
      'GATE 2025 had a variance question requiring solving a quadratic — set up $E[X^2]-(E[X])^2 = \\sigma^2$ and solve for the unknown',
      'Always use computational formula: compute $E[X^2]$ and $E[X]$ separately, then subtract',
    ],
  },
  formulas: [
    { name: 'Variance (computational)', latex: '\\text{Var}(X) = E[X^2] - (E[X])^2', variables: '$E[X]$ = mean, $E[X^2]$ computed via LOTUS', notes: 'Most useful formula for calculations' },
    { name: 'Variance (definitional)', latex: '\\text{Var}(X) = E[(X-\\mu)^2]', variables: '$\\mu = E[X]$' },
    { name: 'Linear transformation', latex: '\\text{Var}(aX+b) = a^2\\text{Var}(X)', notes: 'Constant $b$ does not affect variance' },
    { name: 'Sample variance', latex: 's^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2', variables: '$n$ = sample size, Bessel\'s correction' },
    { name: 'Population variance', latex: '\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\mu)^2', conditions: 'Full population known' },
  ],
  workedExamples: [
    {
      id: 'm2-var-ex1',
      title: 'Variance of a die',
      difficulty: 'basic',
      problem: 'Find $\\text{Var}(X)$ for a fair die.',
      solution: [
        { explanation: 'From earlier: $E[X] = 7/2$, $E[X^2] = 91/6$.' },
        { explanation: '$\\text{Var}(X) = E[X^2] - (E[X])^2 = 91/6 - 49/4 = 182/12 - 147/12 = 35/12 \\approx 2.917$', latex: '\\text{Var}(X) = \\frac{91}{6} - \\left(\\frac{7}{2}\\right)^2 = \\frac{91}{6} - \\frac{49}{4} = \\frac{35}{12}' },
      ],
    },
    {
      id: 'm2-var-ex2',
      title: 'GATE DA 2025 — Find x given variance',
      difficulty: 'gate',
      problem: 'Dataset $\\{4,7,10,12,15,18,x\\}$ with $x \\geq 18$. Population variance = 28. Find $x$.',
      solution: [
        { explanation: 'Mean $\\mu = (66+x)/7$. Sum of squares of first 6: $16+49+100+144+225+324=858$.' },
        { explanation: 'Population variance: $\\sigma^2 = \\frac{858+x^2}{7} - \\left(\\frac{66+x}{7}\\right)^2 = 28$' },
        { explanation: 'Multiply by 49: $7(858+x^2) - (66+x)^2 = 1372$' },
        { explanation: 'Expand: $6006+7x^2 - 4356-132x-x^2 = 1372$', latex: '6x^2 - 132x + 278 = 0 \\implies 3x^2 - 66x + 139 = 0' },
        { explanation: 'Quadratic formula: $x = \\frac{66 \\pm \\sqrt{4356-1668}}{6} = \\frac{66 \\pm \\sqrt{2688}}{6}$. Since $x \\geq 18$, take the positive root: $x \\approx 11 + 8.64 = 19.64$', latex: 'x = \\frac{66 + \\sqrt{2688}}{6} \\approx 19.64' },
      ],
      examTip: 'Set up variance equation systematically. The quadratic will have two roots — use the constraint ($x \\geq 18$) to pick the right one.',
    },
    {
      id: 'm2-var-ex3',
      title: 'Variance of linear transformation',
      difficulty: 'intermediate',
      problem: 'If $\\text{Var}(X) = 9$, find $\\text{Var}(5X - 3)$.',
      solution: [
        { explanation: '$\\text{Var}(5X-3) = 5^2 \\text{Var}(X) = 25 \\times 9 = 225$', latex: '\\text{Var}(5X-3) = 25 \\times 9 = 225' },
        { explanation: 'The $-3$ does not affect variance (shifting doesn\'t change spread).' },
      ],
    },
  ],
  practiceQuestions: [
    {
      id: 'm2-var-pyq8',
      topicId: 'variance',
      question: 'Consider a dataset of 7 observations: $\\{4, 7, 10, 12, 15, 18, x\\}$, where $x \\geq 18$. If the population variance of this dataset is equal to 28, find the value of $x$.',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '19.64',
      hints: [
        { text: 'Compute the mean $\\mu = (66+x)/7$. Set up $\\frac{\\sum x_i^2}{7} - \\mu^2 = 28$.' },
        { text: 'Sum of squares of first 6 values = 858. Leads to quadratic $3x^2-66x+139=0$.' },
      ],
      solution: [
        { explanation: 'Sum of first 6 values: 66. Sum of squares: $16+49+100+144+225+324=858$.' },
        { explanation: '$\\mu = (66+x)/7$. Variance equation: $\\frac{858+x^2}{7} - \\left(\\frac{66+x}{7}\\right)^2 = 28$.' },
        { explanation: 'Multiply by 49, expand, simplify to: $3x^2 - 66x + 139 = 0$.' },
        { explanation: '$x = \\frac{66 \\pm \\sqrt{66^2 - 4(3)(139)}}{6} = \\frac{66 \\pm \\sqrt{2688}}{6}$. For $x \\geq 18$: $x = \\frac{66+\\sqrt{2688}}{6} \\approx 19.64$', latex: 'x \\approx 19.64' },
      ],
      explanation: 'Set up the variance equation, multiply through to clear fractions, simplify to a quadratic, apply the constraint.',
      isPYQ: true,
      pyqMeta: { year: 2025, marks: 1, verified: true },
    },
    {
      id: 'm2-var-1',
      topicId: 'variance',
      question: 'PMF: P(X=1)=0.2, P(X=2)=0.5, P(X=3)=0.3. Find Var(X).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.49',
      hints: [
        { text: 'Compute E[X] and E[X²], then use Var(X) = E[X²] - (E[X])².' },
        { text: 'E[X]=2.1 (from before). E[X²] = 1²(0.2)+2²(0.5)+3²(0.3).' },
      ],
      solution: [
        { explanation: '$E[X]=2.1$. $E[X^2]=1(0.2)+4(0.5)+9(0.3)=0.2+2.0+2.7=4.9$.' },
        { explanation: '$\\text{Var}(X) = 4.9 - 2.1^2 = 4.9 - 4.41 = 0.49$' },
      ],
      explanation: 'Computational formula is fastest. Never forget to subtract (E[X])² not E[X].',
      isPYQ: false,
    },
    {
      id: 'm2-var-2',
      topicId: 'variance',
      question: 'X has PDF $f(x)=2x$, $0 \\leq x \\leq 1$. Find Var(X).',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '0.0556',
      hints: [
        { text: 'Earlier: E[X]=2/3, E[X²]=1/2. Use Var(X) = E[X²] - (E[X])².' },
      ],
      solution: [
        { explanation: '$\\text{Var}(X) = E[X^2] - (E[X])^2 = \\frac{1}{2} - \\left(\\frac{2}{3}\\right)^2 = \\frac{1}{2} - \\frac{4}{9} = \\frac{9-8}{18} = \\frac{1}{18} \\approx 0.0556$', latex: '\\text{Var}(X) = \\frac{1}{2} - \\frac{4}{9} = \\frac{1}{18}' },
      ],
      explanation: 'Use the computed E[X] and E[X²] from the previous examples.',
      isPYQ: false,
    },
    {
      id: 'm2-var-3',
      topicId: 'variance',
      question: 'If $\\text{Var}(X) = 4$, find $\\text{Var}(3 - 2X)$.',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '16',
      hints: [{ text: '$\\text{Var}(aX+b) = a^2 \\text{Var}(X)$. Here $a=-2$, so $a^2=4$.' }],
      solution: [{ explanation: '$\\text{Var}(3-2X) = (-2)^2 \\text{Var}(X) = 4 \\times 4 = 16$' }],
      explanation: 'The constant 3 disappears; $a=-2$ gives $a^2=4$.',
      isPYQ: false,
    },
  ],
};
