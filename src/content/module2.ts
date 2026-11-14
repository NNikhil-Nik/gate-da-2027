import type { Module } from '../types/content';
import { topicCentralTendency, topicExpectedValue, topicVariance } from './topics/m2-central-tendency-variance';
import { topicStdDev, topicExpectationProps, topicVarianceProps, topicCovariance } from './topics/m2-sd-properties-covariance';

export const module2: Module = {
  id: 'module2',
  title: 'Descriptive Statistics',
  description: 'Mean, median, mode, expected value, variance, standard deviation, covariance, and correlation.',
  dayRange: 'Days 3–4',
  topics: [
    topicCentralTendency,
    topicExpectedValue,
    topicVariance,
    topicStdDev,
    topicExpectationProps,
    topicVarianceProps,
    topicCovariance,
  ],
};
