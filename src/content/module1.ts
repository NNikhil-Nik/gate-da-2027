import type { Module } from '../types/content';
import { topicPnC } from './topics/m1-pnc';
import { topicCounting, topicAxioms, topicAddMultRules } from './topics/m1-axioms-addrules';
import { topicConditionalProb, topicIndependence } from './topics/m1-conditional-independence';
import { topicBayes, topicTotalProbability } from './topics/m1-bayes-totprob';

export const module1: Module = {
  id: 'module1',
  title: 'Probability Fundamentals',
  description: 'Counting, probability axioms, conditional probability, independence, Bayes\' theorem, and total probability.',
  dayRange: 'Days 1–2',
  topics: [
    topicPnC,
    topicCounting,
    topicAxioms,
    topicAddMultRules,
    topicConditionalProb,
    topicIndependence,
    topicBayes,
    topicTotalProbability,
  ],
};
