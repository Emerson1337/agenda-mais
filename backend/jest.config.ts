import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@(.*)$': '<rootDir>/src$1',
    '^@presentation(.*)$': '<rootDir>/presentation$1',
    '^@infra(.*)$': '<rootDir>/infra$1',
    '^@domain(.*)$': '<rootDir>/domain$1',
  },
};

export default jestConfig;
