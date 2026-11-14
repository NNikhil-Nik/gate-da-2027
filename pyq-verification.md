# PYQ Solution Verification Report

All 14 questions from "GATE DA Probability and Statistics PYQs with Solutions" verified independently using exact arithmetic (Python `fractions.Fraction`).

## Summary

| Q# | Year | Topic | PDF Answer | Verified | Status |
|----|------|-------|------------|----------|--------|
| Q1 | 2024 | Conditional Probability | (C) P(E1∩E2)=1/12 | 1/12 ✓ | CORRECT — Note: (B) is also numerically true |
| Q2 | 2024 | Hypergeometric | 0.55 | 23/42 ≈ 0.5476 → 0.55 | CORRECT |
| Q3 | 2024 | Bayes' Theorem | (A) 95/293 | 95/293 ✓ | CORRECT |
| Q4 | 2025 | Bayes' Theorem | 0.77 | 10/13 ≈ 0.7692 → 0.77 | CORRECT |
| Q5 | Sample | Permutations | (B) 6720 | P(8,5) = 6720 ✓ | CORRECT |
| Q6 | 2024 | Linear Transformations | (A),(C),(D) | (A),(C),(D) ✓ | CORRECT |
| Q7 | 2024 | Pooled SD | 8.44 | √71.2 ≈ 8.4381 → 8.44 | CORRECT |
| Q8 | 2025 | Population Variance | 19.64 | 11 + 4√42/3 ≈ 19.641 → 19.64 | CORRECT |
| Q9 | 2024 | Skewness | (B) Mo < M < μ | Standard result ✓ | CORRECT |
| Q10 | 2024 | PDF/Integration | 0.156 | 5/32 = 0.15625 → 0.156 | CORRECT |
| Q11 | 2024 | Mixed CDF | (B) 5/12 | 5/12 ✓ | CORRECT |
| Q12 | 2024 | Variance of Transform | 9 | 9 ✓ | CORRECT |
| Q13 | 2025 | Derived Distribution | (A) 1/(4√y) | 1/(4√y) ✓ | CORRECT |
| Q14 | 2024 | Memoryless Property | 0.368 | e⁻¹ ≈ 0.36788 → 0.368 | CORRECT |

**Result: All 14 solutions are mathematically correct.**

## Detailed Notes

### Q1 — Nuance on MCQ answer
Both option (B) P(E1|E2) = 1/2 and option (C) P(E1∩E2) = 1/12 are numerically true. Option (D) P(E1∪E2) = 7/12 is FALSE (actual value is 1/2 = 6/12). The PDF correctly identifies (C) as the official answer key choice while noting (B) is also an equivalent identity.

### Q5 — Source labeling
This question is labeled "GATE DA Sample / Practice PYQ Pattern" — not an actual GATE exam question. The PDF correctly distinguishes this.

### Q8 — Exact answer
The exact value is x = 11 + 4√42/3 ≈ 19.6410. Rounding to two decimal places gives 19.64.

### Q13 — Range caveat
The PDF correctly notes the answer 1/(4√y) only applies for 0 < y < 1. For 1 < y < 9, the PDF is different: f_Y(y) = 1/(8√y). The solution includes this important caveat.
