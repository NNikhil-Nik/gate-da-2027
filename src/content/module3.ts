import type { Module } from '../types/content';
import { topicRandomVariables, topicDiscreteVsContinuous, topicPMF, topicPDF } from './topics/m3-rv-pmf-pdf';
import { topicCDF, topicPMFPDFCDFRelations } from './topics/m3-cdf-relations';
import { topicCalculatingProbabilities, topicRVExpectationVariance } from './topics/m3-calcprob-ev';

export const module3: Module = {
  id: 'module3',
  title: 'Random Variables',
  description: 'Discrete and continuous random variables, PMF, PDF, CDF, transformations, and expectation.',
  dayRange: 'Days 5–7',
  topics: [
    topicRandomVariables,
    topicDiscreteVsContinuous,
    topicPMF,
    topicPDF,
    topicCDF,
    topicPMFPDFCDFRelations,
    topicCalculatingProbabilities,
    topicRVExpectationVariance,
  ],
};
