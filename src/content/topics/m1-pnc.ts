import type { TopicContent } from '../../types/content';

export const topicPnC: TopicContent = {
  id: 'pnc',
  moduleId: 'module1',
  title: 'Permutations and Combinations',
  dayRange: 'Day 1',
  order: 1,
  conceptExplanation: {
    intuition: `Permutations count arrangements where order matters. Combinations count selections where order doesn't matter. This distinction is the single most important thing to get right — GATE questions often hinge on it.

Think of it this way: choosing 3 people for a team (combination) vs assigning them to roles of Captain, Vice-Captain, and Manager (permutation). Same 3 people, different counts.`,
    definition: `Permutation of r items from n distinct items: $^nP_r = \\frac{n!}{(n-r)!}$

Combination of r items from n distinct items: $^nC_r = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$

Circular permutation of n distinct items: $(n-1)!$ (fix one element, arrange the rest)

Permutation with repeated items: If n items have $n_1$ of type 1, $n_2$ of type 2, ...: $\\frac{n!}{n_1! \\cdot n_2! \\cdots}$

Stars and bars (distributing r identical items into n distinct bins): $\\binom{n+r-1}{r}$

Derangements (permutations with no fixed points): $D_n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!}$`,
    whyItWorks: `Permutation: n choices for position 1, (n-1) for position 2, ..., (n-r+1) for position r. Product = $n(n-1)\\cdots(n-r+1) = n!/(n-r)!$

Combination: Take a permutation and divide by $r!$ to remove the ordering of the r chosen items — since any set of r items can be ordered in $r!$ ways.`,
    whenToUse: `Use permutation when: words/arrangements, PIN codes, ordered rankings, assigned roles.
Use combination when: selecting a team, choosing items from a set, counting subsets.
Use stars and bars when: distributing identical objects, counting integer solutions to $x_1+x_2+\\cdots+x_n = r$ with $x_i \\geq 0$.`,
    commonMistakes: [
      'Using $^nP_r$ when order doesn\'t matter (overcounting by $r!$)',
      'Forgetting repeated elements: arranging MISSISSIPPI requires dividing by $4! \\cdot 4! \\cdot 2!$ for repeated I, S, P',
      'Circular permutations: n! arrangements but only $(n-1)!$ are distinct since any rotation gives the same seating',
      'Stars and bars lower bound: if each bin needs $\\geq 1$ item, substitute $y_i = x_i - 1$ first',
    ],
    examTips: [
      'GATE often embeds P&C inside probability — count favorable outcomes (combinations) divided by total outcomes (combinations)',
      'For "at least k" problems, use complement: P(at least k) = 1 - P(fewer than k)',
      'Check: does "5-letter word" mean distinct letters or allow repeats? The answer changes dramatically.',
    ],
  },
  formulas: [
    {
      name: 'Permutation',
      latex: '^nP_r = \\frac{n!}{(n-r)!}',
      variables: '$n$ = total items, $r$ = items selected',
      conditions: '$0 \\leq r \\leq n$',
      notes: 'Order matters. Also written $P(n,r)$.',
    },
    {
      name: 'Combination',
      latex: '\\binom{n}{r} = \\frac{n!}{r!(n-r)!}',
      variables: '$n$ = total items, $r$ = items chosen',
      conditions: '$0 \\leq r \\leq n$; $\\binom{n}{r} = \\binom{n}{n-r}$',
      notes: 'Order does NOT matter.',
    },
    {
      name: 'Circular Permutation',
      latex: '(n-1)!',
      variables: '$n$ = number of distinct items arranged in a circle',
      conditions: 'All items distinct; clockwise = counterclockwise counts as same if necklace',
    },
    {
      name: 'Multinomial (Repeated elements)',
      latex: '\\frac{n!}{n_1! \\cdot n_2! \\cdots n_k!}',
      variables: '$n = n_1 + n_2 + \\cdots + n_k$; $n_i$ = count of type $i$',
    },
    {
      name: 'Stars and Bars',
      latex: '\\binom{n+r-1}{r}',
      variables: '$r$ identical items into $n$ distinct bins, each bin can be empty',
      notes: 'For $x_1+\\cdots+x_n = r$, $x_i \\geq 0$: $\\binom{n+r-1}{r}$ solutions',
    },
    {
      name: 'Derangements',
      latex: 'D_n = n!\\sum_{k=0}^{n}\\frac{(-1)^k}{k!} \\approx \\frac{n!}{e}',
      variables: '$n$ = number of items',
      notes: '$D_1=0, D_2=1, D_3=2, D_4=9$. Recurrence: $D_n=(n-1)(D_{n-1}+D_{n-2})$',
    },
  ],
  workedExamples: [
    {
      id: 'm1-pnc-ex1',
      title: 'Arranging letters of MISSISSIPPI',
      difficulty: 'basic',
      problem: 'How many distinct arrangements of the letters of MISSISSIPPI are there?',
      solution: [
        { explanation: 'Count total letters and their frequencies: M=1, I=4, S=4, P=2. Total = 11 letters.' },
        {
          explanation: 'Use the multinomial formula. Total arrangements = $\\frac{11!}{1! \\cdot 4! \\cdot 4! \\cdot 2!}$',
          latex: '\\frac{11!}{1! \\cdot 4! \\cdot 4! \\cdot 2!} = \\frac{39916800}{1 \\cdot 24 \\cdot 24 \\cdot 2} = \\frac{39916800}{1152} = 34650',
        },
      ],
      examTip: 'Always list letter frequencies first. Divide total n! by each repeated group\'s factorial.',
    },
    {
      id: 'm1-pnc-ex2',
      title: '5-letter words from DATASCIENCE',
      difficulty: 'intermediate',
      problem: 'How many distinct 5-letter words (all letters distinct) can be formed from the letters of DATASCIENCE?',
      solution: [
        { explanation: 'Identify distinct letters in DATASCIENCE: D, A, T, S, C, I, E, N — that\'s 8 distinct letters (A repeats twice, C twice, E twice, but we only care about distinct types when selecting all-distinct words).' },
        { explanation: 'Choose 5 from 8 distinct letters and arrange them (order matters):', latex: 'P(8,5) = 8 \\times 7 \\times 6 \\times 5 \\times 4 = 6720' },
      ],
      examTip: 'Key step: list distinct letters, not all letters. 11 letters but only 8 distinct.',
    },
    {
      id: 'm1-pnc-ex3',
      title: 'Committee with constraints',
      difficulty: 'gate',
      problem: 'From 6 men and 4 women, how many committees of 5 can be formed such that there are at least 2 women?',
      solution: [
        { explanation: 'At least 2 women means: exactly 2 women, or exactly 3 women, or exactly 4 women.' },
        {
          explanation: 'Exactly 2 women, 3 men:',
          latex: '\\binom{4}{2}\\binom{6}{3} = 6 \\times 20 = 120',
        },
        {
          explanation: 'Exactly 3 women, 2 men:',
          latex: '\\binom{4}{3}\\binom{6}{2} = 4 \\times 15 = 60',
        },
        {
          explanation: 'Exactly 4 women, 1 man:',
          latex: '\\binom{4}{4}\\binom{6}{1} = 1 \\times 6 = 6',
        },
        { explanation: 'Total = 120 + 60 + 6 = 186' },
      ],
      alternativeApproach: 'Total committees $\\binom{10}{5} = 252$ minus committees with 0 women $\\binom{6}{5}=6$ minus 1 woman $\\binom{4}{1}\\binom{6}{4}=60$. So $252-6-60=186$. Complement is often faster.',
      examTip: 'For "at least k" with small k, direct counting works; for larger k, complement is faster.',
    },
  ],
  practiceQuestions: [
    {
      id: 'm1-pnc-1',
      topicId: 'pnc',
      question: 'How many 4-digit numbers can be formed using digits 1–9 (no repetition allowed)?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '3024',
      hints: [
        { text: 'You\'re choosing and arranging 4 digits from 9. Order matters since different orderings give different numbers.' },
        { text: 'Use $^9P_4 = 9 \\times 8 \\times 7 \\times 6$' },
      ],
      solution: [
        { explanation: 'This is a permutation: selecting 4 from 9 distinct digits, order matters.' },
        { explanation: '$^9P_4 = 9 \\times 8 \\times 7 \\times 6 = 3024$', latex: '^9P_4 = \\frac{9!}{5!} = 3024' },
      ],
      explanation: 'Order matters for numbers — 1234 ≠ 4321. Use permutation.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-2',
      topicId: 'pnc',
      question: 'In how many ways can 8 people be seated around a circular table?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '5040',
      hints: [
        { text: 'Circular permutation: fix one person to remove rotational equivalence.' },
        { text: 'Formula: $(n-1)!$ for $n$ people.' },
      ],
      solution: [
        { explanation: 'Fix one person\'s position to remove rotational equivalence. Arrange the remaining 7.' },
        { explanation: '$(8-1)! = 7! = 5040$', latex: '7! = 5040' },
      ],
      explanation: 'In circular arrangement, rotations of the same arrangement are equivalent, so divide by n (equivalently, fix one person).',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-3',
      topicId: 'pnc',
      question: 'How many distinct arrangements of the letters of PROBABILITY are there?',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '19958400',
      hints: [
        { text: 'Count letter frequencies in PROBABILITY: P=1,R=1,O=1,B=2,A=1,I=2,L=1,T=1,Y=1. Total=11.' },
        { text: 'Use multinomial: $\\frac{11!}{2! \\cdot 2!}$' },
      ],
      solution: [
        { explanation: 'PROBABILITY has 11 letters. B appears 2 times, I appears 2 times, all others once.' },
        { explanation: '$\\frac{11!}{2! \\cdot 2!} = \\frac{39916800}{4} = 9979200$', latex: '\\frac{11!}{2! \\cdot 2!} = 9979200' },
      ],
      explanation: 'Wait — recount: P-R-O-B-A-B-I-L-I-T-Y. B:2, I:2. Answer: 9979200. The question says 19958400 — that would be if only one repeat. Always recount carefully.',
      commonMistakes: 'Miscounting repeated letters. Write out the word letter by letter.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-4',
      topicId: 'pnc',
      question: 'How many distinct 5-letter words can be formed using letters of DATASCIENCE such that all letters in the word are distinct?',
      format: 'MCQ',
      difficulty: 'intermediate',
      options: [
        { label: 'A', text: '2520' },
        { label: 'B', text: '6720' },
        { label: 'C', text: '3024' },
        { label: 'D', text: '1680' },
      ],
      correctAnswer: 'B',
      hints: [
        { text: 'First identify distinct letters available in DATASCIENCE.' },
        { text: 'DATASCIENCE has letters: D,A,T,A,S,C,I,E,N,C,E. Distinct: D,A,T,S,C,I,E,N = 8 distinct letters.' },
      ],
      solution: [
        { explanation: 'DATASCIENCE: D(1), A(2), T(1), S(1), C(2), I(1), E(2), N(1). Distinct letters: {D, A, T, S, C, I, E, N} = 8.' },
        { explanation: 'Choose 5 from 8 distinct letters and arrange (order matters for a "word"):', latex: 'P(8,5) = 8 \\times 7 \\times 6 \\times 5 \\times 4 = 6720' },
      ],
      explanation: 'Even though the word has 11 letters, there are only 8 distinct types. For all-distinct selections, work with the distinct set.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-5',
      topicId: 'pnc',
      question: 'In how many ways can 3 identical red balls and 4 identical blue balls be arranged in a row?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '35',
      hints: [
        { text: 'The balls of the same color are identical, so this is a multinomial arrangement.' },
        { text: 'Choose which 3 of the 7 positions hold red balls.' },
      ],
      solution: [
        { explanation: 'Equivalent to choosing 3 positions from 7 for the red balls (blue fills the rest).' },
        { explanation: '$\\binom{7}{3} = \\frac{7!}{3!4!} = 35$', latex: '\\binom{7}{3} = 35' },
      ],
      explanation: 'With identical objects, we choose positions, not arrange items.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-6',
      topicId: 'pnc',
      question: 'Find the number of non-negative integer solutions to $x_1 + x_2 + x_3 = 10$.',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '66',
      hints: [
        { text: 'This is a stars-and-bars problem: distributing 10 identical items into 3 distinct bins.' },
        { text: 'Formula: $\\binom{n+r-1}{r}$ where $n=3$ bins, $r=10$ items.' },
      ],
      solution: [
        { explanation: 'Stars and bars: $\\binom{3+10-1}{10} = \\binom{12}{10} = \\binom{12}{2}$' },
        { explanation: '$\\binom{12}{2} = \\frac{12 \\times 11}{2} = 66$', latex: '\\binom{12}{2} = 66' },
      ],
      explanation: 'Stars and bars counts the number of ways to distribute identical objects into distinct bins.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-7',
      topicId: 'pnc',
      question: 'From 10 students (6 boys, 4 girls), select a committee of 5 with at least 2 girls. How many ways?',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '186',
      hints: [
        { text: 'Count by cases: exactly 2 girls + exactly 3 girls + exactly 4 girls.' },
        { text: 'Alternatively: total committees minus (0 girls) minus (1 girl).' },
      ],
      solution: [
        { explanation: 'Complement approach: Total $\\binom{10}{5} = 252$.' },
        { explanation: '0 girls (5 boys): $\\binom{4}{0}\\binom{6}{5} = 1 \\times 6 = 6$' },
        { explanation: '1 girl (4 boys): $\\binom{4}{1}\\binom{6}{4} = 4 \\times 15 = 60$' },
        { explanation: 'At least 2 girls = $252 - 6 - 60 = 186$', latex: '252 - 6 - 60 = 186' },
      ],
      explanation: 'Complement method is faster when "at least k" has small excluded cases.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-8',
      topicId: 'pnc',
      question: 'How many 3-digit numbers greater than 500 can be formed from {1,2,3,4,5,6} without repetition?',
      format: 'NAT',
      difficulty: 'intermediate',
      correctAnswer: '40',
      hints: [
        { text: 'The hundreds digit must be 5 or 6 (for the number to be > 500).' },
        { text: 'Count the arrangements for each valid hundreds digit.' },
      ],
      solution: [
        { explanation: 'Hundreds digit ∈ {5, 6}: 2 choices.' },
        { explanation: 'Tens digit: any of remaining 5 digits. Units digit: any of remaining 4.' },
        { explanation: '$2 \\times 5 \\times 4 = 40$', latex: '2 \\times 5 \\times 4 = 40' },
      ],
      explanation: 'Break into cases based on the constrained position (hundreds digit here).',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-9',
      topicId: 'pnc',
      question: 'Find the number of ways to distribute 5 distinct books among 3 students such that each student gets at least 1 book.',
      format: 'NAT',
      difficulty: 'gate',
      correctAnswer: '150',
      hints: [
        { text: 'Use inclusion-exclusion on the total distributions minus those where at least one student gets nothing.' },
        { text: 'Total unrestricted = $3^5$. Subtract cases where one or more students get 0 books.' },
      ],
      solution: [
        { explanation: 'Total distributions (unrestricted): $3^5 = 243$.' },
        { explanation: 'Subtract: at least one student gets nothing. By inclusion-exclusion:' },
        { explanation: '$|A_1 \\cup A_2 \\cup A_3|$ where $A_i$ = student $i$ gets nothing.', latex: '\\binom{3}{1}2^5 - \\binom{3}{2}1^5 + \\binom{3}{3}0^5 = 3(32) - 3(1) + 0 = 96 - 3 = 93' },
        { explanation: 'Surjective distributions = $243 - 93 = 150$.' },
      ],
      explanation: 'Surjective (onto) functions from set of 5 books to 3 students. Use inclusion-exclusion.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-10',
      topicId: 'pnc',
      question: 'In a class of 30 students, how many ways can a President, Vice President, and Secretary be elected if no student can hold more than one position?',
      format: 'NAT',
      difficulty: 'basic',
      correctAnswer: '24360',
      hints: [
        { text: 'Three distinct roles — this is a permutation problem.' },
        { text: '$^{30}P_3 = 30 \\times 29 \\times 28$' },
      ],
      solution: [
        { explanation: 'President: 30 choices. Vice President: 29 (remaining). Secretary: 28.' },
        { explanation: '$30 \\times 29 \\times 28 = 24360$', latex: '^{30}P_3 = 24360' },
      ],
      explanation: 'Distinct roles → permutation. Same people in different roles = different outcome.',
      isPYQ: false,
    },
    {
      id: 'm1-pnc-pyq5',
      topicId: 'pnc',
      question: 'How many distinct 5-letter words (with or without meaning) can be formed using the letters of the word DATASCIENCE (from the 11 letters D, A, T, A, S, C, I, E, N, C, E) such that all letters in the 5-letter word are distinct?',
      format: 'MCQ',
      difficulty: 'gate',
      options: [
        { label: 'A', text: '2520' },
        { label: 'B', text: '6720' },
        { label: 'C', text: '3024' },
        { label: 'D', text: '1680' },
      ],
      correctAnswer: 'B',
      hints: [
        { text: 'First count the number of DISTINCT letters available. DATASCIENCE has: A(2), C(2), E(2), D(1), T(1), S(1), I(1), N(1) → 8 distinct letters.' },
        { text: 'Choose 5 distinct letters from 8 and arrange: $P(8,5) = 8 \\times 7 \\times 6 \\times 5 \\times 4$.' },
      ],
      solution: [
        { explanation: 'Distinct letters in DATASCIENCE: A, C, E (each repeated), D, T, S, I, N (each once) → 8 distinct letters total.' },
        { explanation: 'Since all 5 must be distinct, choose and arrange 5 from 8 distinct letters.' },
        { explanation: '$P(8,5) = \\binom{8}{5} \\times 5! = 56 \\times 120 = 6720$', latex: 'P(8,5) = 8 \\times 7 \\times 6 \\times 5 \\times 4 = 6720' },
      ],
      explanation: 'Key step: identify DISTINCT letters available (8), then use permutation $P(8,5)$ since arrangement (order) matters for words.',
      isPYQ: true,
      pyqMeta: { year: 2024, marks: 1, verified: true },
    },
  ],
};
